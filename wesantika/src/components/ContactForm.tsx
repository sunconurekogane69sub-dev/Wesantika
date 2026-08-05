"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; previewUrl: string | null }
  | { kind: "error"; message: string };

const FIELD =
  "w-full rounded-field border border-brand bg-navy-700 px-[28px] text-[24px] leading-[29px] text-white placeholder:text-field outline-none transition-colors focus:border-white disabled:opacity-60";

/** Contact form — Figma 180:731-748 / 210:935-952. */
export function ContactForm({ strings }: { strings: Dictionary["footer"] }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus({ kind: "error", message: json.error ?? strings.errorGeneric });
        return;
      }

      form.reset();
      setStatus({ kind: "sent", previewUrl: json.previewUrl ?? null });
    } catch {
      setStatus({ kind: "error", message: strings.errorNetwork });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label className="sr-only" htmlFor="cf-name">
        {strings.fields.name}
      </label>
      <input
        id="cf-name"
        name="name"
        required
        autoComplete="name"
        placeholder={strings.fields.name}
        disabled={sending}
        className={`${FIELD} h-[52px]`}
      />

      <label className="sr-only" htmlFor="cf-email">
        {strings.fields.email}
      </label>
      <input
        id="cf-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={strings.fields.email}
        disabled={sending}
        className={`${FIELD} mt-[29px] h-[52px]`}
      />

      <label className="sr-only" htmlFor="cf-phone">
        {strings.fields.phone}
      </label>
      <input
        id="cf-phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder={strings.fields.phone}
        disabled={sending}
        className={`${FIELD} mt-[31px] h-[52px]`}
      />

      <label className="sr-only" htmlFor="cf-company">
        {strings.fields.company}
      </label>
      <input
        id="cf-company"
        name="company"
        required
        autoComplete="organization"
        placeholder={strings.fields.company}
        disabled={sending}
        className={`${FIELD} mt-[30px] h-[52px]`}
      />

      <label className="sr-only" htmlFor="cf-message">
        {strings.fields.message}
      </label>
      <textarea
        id="cf-message"
        name="message"
        required
        rows={6}
        placeholder={strings.fields.message}
        disabled={sending}
        className={`${FIELD} mt-[30px] h-[276px] resize-none py-[11px]`}
      />

      <button
        type="submit"
        disabled={sending}
        className="mt-[58px] flex h-[46px] w-full items-center justify-center rounded-btn border border-hairline bg-brand px-[20px] text-[16px] leading-[19px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? strings.submitting : strings.submit}
      </button>

      <div aria-live="polite" className="min-h-[24px]">
        {status.kind === "sent" && (
          <p className="mt-4 text-[16px] leading-[22px] text-white">
            {strings.sentMessage}
            {status.previewUrl && (
              <>
                {" "}
                <a
                  href={status.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-white/50 underline-offset-2 hover:decoration-white"
                >
                  {strings.previewLink}
                </a>
              </>
            )}
          </p>
        )}
        {status.kind === "error" && (
          <p className="mt-4 text-[16px] leading-[22px] text-[#ff9a8f]">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
