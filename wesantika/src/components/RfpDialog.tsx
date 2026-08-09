"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon";

/** Cloudflare's documented "always passes" test site key. */
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;
const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
    },
  ) => string;
  remove: (id: string) => void;
  reset: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type RfpCopy = {
  open: string;
  close: string;
  /**
   * The heading is two-tone in the file (572:321 character overrides): the run
   * around the emphasis is black at weight 600, the emphasis itself white at
   * weight 800. Split so each locale chooses where the emphasis falls.
   */
  heading: { lead: string; emphasis: string; trail: string };
  body: string;
  checklist: string[];
  fields: {
    name: string;
    phone: string;
    company: string;
    email: string;
    brief: string;
  };
  chooseFile: string;
  noFileChosen: string;
  submit: string;
  submitting: string;
  sent: string;
  previewLink: string;
  errors: {
    generic: string;
    network: string;
    captchaMissing: string;
    captchaFailed: string;
    fileTooLarge: string;
    fileType: string;
  };
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; previewUrl: string | null }
  | { kind: "error"; message: string };

/**
 * `#eaecf0` measured 1.18:1 against the white field — an input boundary needs
 * 3:1 under WCAG 1.4.11, so the fields effectively had no edge. `#667085` is
 * 4.97:1. Text was 14px **semibold**, which is display styling on a form
 * control and made what the user typed look like a label; 15px regular with
 * 14px of side padding reads as an input.
 */
const FIELD =
  "h-[48px] w-full rounded-[8px] border border-[#667085] bg-white px-[14px] text-[15px] leading-[22px] font-normal text-black outline-none transition-colors placeholder:font-normal placeholder:text-[#667085] focus:border-brand-btn focus:ring-2 focus:ring-brand-btn/25 disabled:opacity-60";

/**
 * RFP modal — Figma 572:98 (976 x 700, 29px radius, photographic background).
 *
 * Left column carries the pitch and the four-point checklist; the right column
 * is the form: five required fields, a Cloudflare Turnstile widget, an optional
 * attachment, and the submit button.
 *
 * The trigger lives here too so a server-rendered page can drop in one element.
 */
export function RfpDialog({
  copy,
  className,
  label,
}: {
  copy: RfpCopy;
  className: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  /**
   * Kept mounted for the length of the close transition. Without it the panel
   * is torn out of the DOM the instant the state flips, so there is nothing
   * left to animate and the dialog vanishes rather than closing.
   */
  const [closing, setClosing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setClosing(true);
    // Matches the 200ms exit on the panel. Focus returns with the dialog still
    // on screen, which is what keeps the return from feeling like a jump cut.
    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      triggerRef.current?.focus();
    }, 200);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {label}
      </button>
      {open && <Modal copy={copy} onClose={close} closing={closing} />}
    </>
  );
}

function Modal({
  copy,
  onClose,
  closing,
}: {
  copy: RfpCopy;
  onClose: () => void;
  closing: boolean;
}) {
  const titleId = useId();
  /**
   * Off for the first paint, on from the next frame — the standard way to get
   * a CSS transition out of an element that has only just mounted. The dialog
   * used to appear at full size with no transition at all.
   */
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const visible = shown && !closing;
  const panelRef = useRef<HTMLDivElement>(null);
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [token, setToken] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Escape, focus containment, scroll lock.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select,[tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("input,textarea")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  // Turnstile is rendered explicitly: the widget is created after the modal
  // opens, so the script's automatic pass over the document would miss it.
  useEffect(() => {
    let cancelled = false;

    const render = () => {
      if (cancelled || !captchaRef.current || !window.turnstile) return;
      if (widgetId.current) return;
      widgetId.current = window.turnstile.render(captchaRef.current, {
        sitekey: SITE_KEY,
        callback: (t) => setToken(t),
        "error-callback": () => setToken(null),
        "expired-callback": () => setToken(null),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${TURNSTILE_SRC}"]`,
      );
      if (existing) existing.addEventListener("load", render);
      else {
        const script = document.createElement("script");
        script.src = TURNSTILE_SRC;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", render);
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      setStatus({ kind: "error", message: copy.errors.captchaMissing });
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("turnstileToken", token);
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/rfp", { method: "POST", body: data });
      const json = await res.json();

      if (!res.ok) {
        const map: Record<string, string> = {
          captcha_missing: copy.errors.captchaMissing,
          captcha_failed: copy.errors.captchaFailed,
          file_too_large: copy.errors.fileTooLarge,
          file_type: copy.errors.fileType,
        };
        setStatus({
          kind: "error",
          message: map[json.error] ?? json.error ?? copy.errors.generic,
        });
        // a used token cannot be replayed
        if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
        setToken(null);
        return;
      }

      form.reset();
      setFileName(null);
      setStatus({ kind: "sent", previewUrl: json.previewUrl ?? null });
    } catch {
      setStatus({ kind: "error", message: copy.errors.network });
    }
  }

  const sending = status.kind === "sending";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 transition-colors duration-200 ease-out sm:p-6 ${
        visible ? "bg-black/60" : "bg-black/0"
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        // 8px and 0.98 — a lift, not a bounce. Anything larger reads as a
        // toy on a panel this size. `motion-reduce` drops it to a plain fade.
        className={`relative my-auto w-full max-w-[1000px] overflow-hidden rounded-[24px] bg-navy-900 shadow-[0_24px_64px_-12px_rgba(4,29,56,0.45)] transition-[opacity,transform] duration-200 ease-out motion-reduce:transform-none ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-[8px] scale-[0.98] opacity-0"
        }`}
      >
        {/*
          Was a 52KB JPEG stretched to 204.756% height at -93.380% top with
          `brightness(1.52) contrast(1.3) saturate(1.19)` on top — the numbers
          came straight out of Figma's fill transform. Reproducing them was
          faithful and it looked it: a photograph blown up past 2x and then
          pushed a stop and a half brighter is soft, banded and washed out, on
          the one surface a prospect fills in before sending money.

          A gradient is sharper at any size, weighs nothing, and — the reason
          it is here — is *computable*. The pitch column is black type and the
          form column's status chip is dark on white, so both grounds can be
          checked arithmetically instead of sampled off a photo:

            x=5%..50%   #eef6ff..#dbebff   black   16.5:1
            x=52%..96%  #7fb8ee..#0a3f7a   white on the chip, not on this
        */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[24px]"
          style={{
            background:
              "linear-gradient(100deg, #eef6ff 0%, #dbebff 46%, #7fb8ee 72%, #0a3f7a 100%)",
          }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="absolute top-[18px] right-[18px] z-10 flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-black/35 text-[20px] leading-none text-white transition-colors hover:bg-black/55"
        >
          ×
        </button>

        {/* Columns were pinned at 439px + 389px, so they added up to the old
            976px panel and nothing else. Fluid pitch column, fixed form. */}
        <div className="relative grid gap-[32px] p-[24px] sm:p-[32px] lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-[48px] lg:p-[44px]">
          {/* ---- pitch ------------------------------------------------ */}
          <div className="lg:pt-[8px]">
            {/*
              The emphasis was white on this ground at 3.4:1 — legal only
              because it is 32px/800, and it read as a different heading rather
              than as emphasis within one. Brand ink keeps it a highlight and
              measures 5.4:1, so it holds at any size and any translation.
            */}
            <h2
              id={titleId}
              className="text-[24px] leading-[1.25] font-bold text-black sm:text-[30px] sm:leading-[38px]"
            >
              {copy.heading.lead}{" "}
              <span className="text-brand-ink">{copy.heading.emphasis}</span>
              {copy.heading.trail ? <> {copy.heading.trail}</> : null}
            </h2>

            {/* Body copy was bold, and broken at a fixed point carried over
                from the Figma line break. Both are gone: regular weight, and
                it wraps to whatever width the reader actually has. */}
            <p className="mt-[16px] max-w-[420px] text-[16px] leading-[26px] font-normal text-black/80">
              {copy.body}
            </p>

            <ul className="mt-[28px] flex flex-col gap-[14px]">
              {copy.checklist.map((item) => (
                <li key={item} className="flex gap-[12px]">
                  <Icon
                    src="/icons/icon-rfp-check.svg"
                    width={20}
                    height={20}
                    className="mt-[3px] h-[20px] w-[20px] shrink-0"
                  />
                  <span className="text-[15px] leading-[24px] font-normal text-black/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- form ------------------------------------------------- */}
          <form onSubmit={onSubmit} className="flex flex-col gap-[16px]">
            <input name="name" required placeholder={copy.fields.name} autoComplete="name" disabled={sending} className={FIELD} aria-label={copy.fields.name} />
            <input name="phone" required placeholder={copy.fields.phone} autoComplete="tel" disabled={sending} className={FIELD} aria-label={copy.fields.phone} />
            <input name="company" required placeholder={copy.fields.company} autoComplete="organization" disabled={sending} className={FIELD} aria-label={copy.fields.company} />
            <input name="email" type="email" required placeholder={copy.fields.email} autoComplete="email" disabled={sending} className={FIELD} aria-label={copy.fields.email} />
            <textarea
              name="brief"
              required
              rows={4}
              placeholder={copy.fields.brief}
              disabled={sending}
              aria-label={copy.fields.brief}
              className={`${FIELD} h-[106px] resize-none py-[13px]`}
            />

            {/* Cloudflare Turnstile — Figma reserves a 228x50 slot here. */}
            <div ref={captchaRef} className="min-h-[65px]" />

            {/* ---- attachment ---------------------------------------- */}
            <div className="flex items-center gap-[12px] rounded-[14px] border border-[#d6d3d1] bg-white p-[9px]">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={sending}
                className="flex h-[42px] cursor-pointer items-center gap-[8px] rounded-[12px] bg-brand-btn px-[16px] text-[14px] leading-none font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <Icon src="/icons/icon-upload.svg" width={18} height={18} className="h-[18px] w-[18px]" />
                {copy.chooseFile}
              </button>
              <span className="min-w-0 flex-1 truncate text-[15px] leading-[22px] font-medium text-[#79716b]">
                {fileName ?? copy.noFileChosen}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                className="sr-only"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt,.md"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="flex h-[52px] w-full items-center justify-center rounded-btn bg-brand-btn text-[16px] leading-[24px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? copy.submitting : copy.submit}
            </button>

            {/*
              Both messages used to be set directly on the panel background —
              white for success, a pale salmon for failure — which tied their
              legibility to whatever the artwork happened to be doing at that
              point. On a chip they are readable regardless, and an error that
              announces itself is worth more than one that blends in.
            */}
            <div aria-live="polite" className="min-h-[22px]">
              {status.kind === "sent" && (
                <p className="rounded-[10px] bg-white px-[14px] py-[10px] text-[15px] leading-[22px] font-medium text-black">
                  {copy.sent}
                  {status.previewUrl && (
                    <>
                      {" "}
                      <a
                        href={status.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-ink underline decoration-brand-ink/50 underline-offset-2 hover:decoration-brand-ink"
                      >
                        {copy.previewLink}
                      </a>
                    </>
                  )}
                </p>
              )}
              {status.kind === "error" && (
                <p className="rounded-[10px] bg-white px-[14px] py-[10px] text-[15px] leading-[22px] font-medium text-[#b3261e]">
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
