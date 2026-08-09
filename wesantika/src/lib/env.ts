/**
 * Read an environment variable, treating blank as unset.
 *
 * `.env.example` declares every key with an empty value so the shape is
 * self-documenting, and `.env.local` is copied from it. That means
 * `process.env.X` is `""` rather than `undefined` for anything not filled in,
 * and `??` keeps the empty string — which sent a blank secret to Cloudflare and
 * would have addressed mail to nobody. Everything reading optional config goes
 * through here.
 */
export function env(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

/** Same, for numeric settings. */
export function envInt(name: string, fallback: number): number {
  const raw = env(name);
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}
