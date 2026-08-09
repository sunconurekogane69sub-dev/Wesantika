"use client";

import Image from "next/image";
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
  headingLines: string[];
  bodyLines: string[];
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

const FIELD =
  "h-[46px] w-full rounded-[6px] border border-[#eaecf0] bg-white px-[9px] text-[14px] leading-[20px] font-semibold text-black outline-none transition-colors placeholder:text-[#757575] focus:border-brand disabled:opacity-60";

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
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
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
      {open && <Modal copy={copy} onClose={close} />}
    </>
  );
}

function Modal({ copy, onClose }: { copy: RfpCopy; onClose: () => void }) {
  const titleId = useId();
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
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative my-auto w-full max-w-[976px] overflow-hidden rounded-[29px] bg-navy-900"
      >
        <Image
          src="/images/rfp-modal-bg.jpg"
          alt=""
          fill
          sizes="976px"
          className="object-cover"
          priority
        />

        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="absolute top-[18px] right-[18px] z-10 flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-black/35 text-[20px] leading-none text-white transition-colors hover:bg-black/55"
        >
          ×
        </button>

        <div className="relative grid gap-[28px] p-[28px] sm:p-[40px] lg:grid-cols-[439px_389px] lg:gap-[42px] lg:px-[49px] lg:py-[52px]">
          {/* ---- pitch ------------------------------------------------ */}
          <div className="lg:pt-[45px]">
            <h2
              id={titleId}
              className="text-[26px] leading-[1.2] font-semibold text-white sm:text-[32px] sm:leading-[38px]"
            >
              {copy.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-[24px] text-[16px] leading-[24px] font-bold text-black sm:text-[18px] sm:leading-[27px]">
              {copy.bodyLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <ul className="mt-[36px] flex flex-col gap-[10px]">
              {copy.checklist.map((item) => (
                <li key={item} className="flex gap-[12px]">
                  <Icon
                    src="/icons/icon-rfp-check.svg"
                    width={24}
                    height={24}
                    className="mt-[2px] h-[24px] w-[24px] shrink-0"
                  />
                  <span className="text-[16px] leading-[24px] font-bold text-black sm:text-[18px] sm:leading-[27px]">
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
                className="flex h-[42px] cursor-pointer items-center gap-[8px] rounded-[12px] bg-brand px-[16px] text-[14px] leading-none font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
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
              className="flex h-[52px] w-full items-center justify-center rounded-btn bg-brand text-[16px] leading-[24px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? copy.submitting : copy.submit}
            </button>

            <div aria-live="polite" className="min-h-[22px]">
              {status.kind === "sent" && (
                <p className="text-[15px] leading-[22px] font-medium text-white">
                  {copy.sent}
                  {status.previewUrl && (
                    <>
                      {" "}
                      <a
                        href={status.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-white/50 underline-offset-2 hover:decoration-white"
                      >
                        {copy.previewLink}
                      </a>
                    </>
                  )}
                </p>
              )}
              {status.kind === "error" && (
                <p className="text-[15px] leading-[22px] font-medium text-[#ffd0c9]">
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
