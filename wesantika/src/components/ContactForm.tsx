"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; previewUrl: string | null }
  | { kind: "error"; message: string };

/**
 * The footer sits on the navy panel; the Contact page sits on white. Same form,
 * two grounds — so the field skin is a variant rather than a second component.
 *
 * Three things changed when the footer was cut down from 958px tall:
 *
 *  - **Fields pair up.** Name/email and phone/company sit side by side from
 *    640px up. Five stacked full-width rows is what made the panel taller than
 *    most of the pages it sat under.
 *  - **Labels are visible.** They used to be `sr-only`, with the placeholder
 *    carrying the whole meaning — so the moment you typed, the field stopped
 *    saying what it was, and nothing marked which four were required.
 *  - **Type came down** from 24px to 16px. 24px inputs read as display type,
 *    not as a form, and they forced the 52px rows and 276px textarea that made
 *    the panel so tall.
 */
type Tone = "dark" | "light";

const FIELD_BASE =
  "w-full rounded-field border outline-none transition-colors disabled:opacity-60";

const TONES: Record<
  Tone,
  { field: string; label: string; sent: string; error: string; link: string }
> = {
  dark: {
    field:
      // white/45, not /25: an input's boundary is a UI component and needs 3:1
      // under WCAG 1.4.11. /25 measured 2.18 against the panel, /45 gives 4.05.
      "border-white/45 bg-navy-700 px-[16px] text-[16px] leading-[24px] text-white placeholder:text-white/40 focus:border-brand-cta",
    label: "text-white/70",
    sent: "text-white",
    error: "text-[#ff9a8f]",
    link: "underline decoration-white/50 underline-offset-2 hover:decoration-white",
  },
  light: {
    field:
      "border-hairline bg-white px-[16px] text-[16px] leading-[24px] text-black placeholder:text-black/40 focus:border-brand",
    label: "text-black/70",
    sent: "text-black/80",
    // #b3261e on white is 5.9:1 — the dark palette's salmon is 2.6:1 here.
    error: "text-[#b3261e]",
    link: "underline decoration-brand-ink/50 underline-offset-2 hover:decoration-brand-ink",
  },
};

const LABEL = "block text-[13px] leading-[16px] font-bold tracking-[0.02em]";

export function ContactForm({
  strings,
  tone = "dark",
  idPrefix = "cf",
}: {
  strings: Dictionary["footer"];
  tone?: Tone;
  /** Both placements can appear on one page; ids have to stay unique. */
  idPrefix?: string;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const skin = TONES[tone];
  const FIELD = `${FIELD_BASE} ${skin.field}`;
  const id = (name: string) => `${idPrefix}-${name}`;

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

  const field = (
    name: "name" | "email" | "phone" | "company",
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div>
      <label className={`${LABEL} ${skin.label}`} htmlFor={id(name)}>
        {strings.fields[name]}
      </label>
      <input
        id={id(name)}
        name={name}
        disabled={sending}
        className={`${FIELD} mt-[6px] h-[46px]`}
        {...props}
      />
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[16px]">
      {/* Paired from 640px up — the two rows this saves are most of the height
          the footer panel used to take. */}
      <div className="grid gap-[16px] sm:grid-cols-2">
        {field("name", { required: true, autoComplete: "name" })}
        {field("email", { required: true, type: "email", autoComplete: "email" })}
        {field("phone", { type: "tel", autoComplete: "tel" })}
        {field("company", { required: true, autoComplete: "organization" })}
      </div>

      <div>
        <label className={`${LABEL} ${skin.label}`} htmlFor={id("message")}>
          {strings.fields.message}
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          rows={4}
          disabled={sending}
          className={`${FIELD} mt-[6px] h-[112px] resize-none py-[12px]`}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-[4px] flex h-[48px] w-full items-center justify-center rounded-btn bg-brand-btn px-[24px] text-[16px] leading-[19px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit sm:min-w-[200px]"
      >
        {sending ? strings.submitting : strings.submit}
      </button>

      <div aria-live="polite" className="min-h-[22px]">
        {status.kind === "sent" && (
          <p className={`text-[15px] leading-[22px] ${skin.sent}`}>
            {strings.sentMessage}
            {status.previewUrl && (
              <>
                {" "}
                <a
                  href={status.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={skin.link}
                >
                  {strings.previewLink}
                </a>
              </>
            )}
          </p>
        )}
        {status.kind === "error" && (
          <p className={`text-[15px] leading-[22px] ${skin.error}`}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
