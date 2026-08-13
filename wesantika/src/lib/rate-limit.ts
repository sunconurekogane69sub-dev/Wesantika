/**
 * A fixed-window request limiter, keyed by client IP.
 *
 * ---------------------------------------------------------------------------
 * What this is for
 *
 * `/api/contact` accepts JSON and sends mail, and until now it had nothing in
 * front of it: no captcha, no limit, no authentication. The form it serves is in
 * the footer of every page on the site, so the endpoint is trivially
 * discoverable, and one loop could put an unbounded number of messages into the
 * company inbox — or, worse, get the sending domain classified as a spam source
 * by its own provider, which is the kind of damage that takes weeks to undo.
 *
 * `/api/rfp` has Turnstile, which stops the naive case, but a captcha limits how
 * *easily* a request is made, not how *many*. A solved token plus a loop is
 * still a loop.
 * ---------------------------------------------------------------------------
 *
 * ## What this does not do
 *
 * The counters live in this process's memory. On a platform that runs several
 * instances, or that freezes and thaws one per request, each instance keeps its
 * own tally and the effective limit is the configured one multiplied by however
 * many instances happen to be warm. It also resets on deploy.
 *
 * That is a real limitation and it is written here rather than hidden, because
 * the number in the config will otherwise be read as a guarantee. What this
 * gives you is the removal of the *unbounded* case — a single client can no
 * longer send thousands of messages from one connection — and a seam to put a
 * shared store behind. When one exists, replace the body of `hit()` with a Redis
 * `INCR`/`EXPIRE` pair and every caller stays as it is.
 *
 * ## Why not a sliding window
 *
 * A fixed window lets a client send up to `2 * limit` across a window boundary.
 * For a contact form measured in a handful of messages an hour, that is a
 * distinction without a difference, and a fixed window costs one integer per
 * client instead of a timestamp list.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Dropped entries are only reclaimed when `hit()` runs, so a burst from many
 * addresses leaves that many entries behind until the next call sweeps them.
 * The sweep is bounded work — it only ever walks entries that have expired.
 */
function sweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Requests left in this window, floored at zero. */
  remaining: number;
  /** Seconds until the window resets — the value for `Retry-After`. */
  retryAfter: number;
};

/**
 * Count one request against `key`.
 *
 * @param limit  requests permitted per window
 * @param windowMs  window length in milliseconds
 */
export function hit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count++;
  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return {
    ok: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfter,
  };
}

/**
 * Best-effort client address.
 *
 * `x-forwarded-for` is client-controlled unless a proxy overwrites it, so this
 * is a spam-control heuristic and must never be used for anything that needs to
 * be *correct* about who is calling. The leftmost entry is the original client
 * where the proxy appends honestly; `cf-connecting-ip` is preferred because
 * Cloudflare sets it itself and strips any inbound copy.
 *
 * Everything unidentifiable shares the `"unknown"` bucket. That deliberately
 * makes the anonymous pool self-limiting rather than unlimited.
 */
export function clientKey(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
