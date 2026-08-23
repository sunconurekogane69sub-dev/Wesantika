/**
 * The heading block that opens a section.
 *
 * Before this there were five patterns for the same job across six pages: a
 * bare heading; a heading with a coloured word inside it; an eyebrow with a
 * 49x4 rule under it; a centred heading with a 44x3 rule *over* it; and a
 * heading with a lead paragraph at four different sizes. Five patterns is not
 * variety, it is five people not talking to each other — and it is the main
 * reason the pages did not feel like one site.
 *
 * One pattern now: optional eyebrow, heading, optional lead.
 *
 * ## Left-aligned by default
 *
 * Centred headings were used on two sections and they are the weaker choice for
 * this content. A centred block has no fixed edge for the eye to return to, so
 * a multi-line heading followed by a two-line lead makes the reader re-find the
 * start of every line. Centring earns its place when a block is short and
 * genuinely symmetrical; a 60-character heading over a 140-character paragraph
 * is neither. `align="center"` is still there for the cases that are.
 *
 * ## No two-tone heading
 *
 * `AccentedHeading` painted one word of the heading brand blue. That device
 * dates a page — it is the 2014 corporate-site tell — and it does not survive
 * translation: the emphasis lands on a different word in Japanese, and on no
 * word at all in Thai. Emphasis now comes from the eyebrow above the heading,
 * which every locale can place identically.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "start",
  as: Tag = "h2",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** A CTA or filter row, spaced consistently below the lead. */
  children?: React.ReactNode;
}) {
  const centred = align === "center";

  return (
    <header
      className={`${centred ? "mx-auto text-center" : ""} ${className}`.trim()}
    >
      {eyebrow && (
        <p className="eyebrow text-brand-ink">{eyebrow}</p>
      )}
      <Tag
        className={`title-1 text-balance text-current ${eyebrow ? "mt-3" : ""} ${
          centred ? "mx-auto max-w-[26ch]" : "max-w-[22ch]"
        }`}
      >
        {title}
      </Tag>
      {lead && (
        /* 62ch, not the full column. A line of body copy stops being
           comfortable somewhere past 75 characters, and the canvas here is wide
           enough to run to 110 — which is what made the section leads read as
           notes rather than prose. */
        <p
          className={`lead mt-4 max-w-[62ch] opacity-75 ${centred ? "mx-auto" : ""}`}
        >
          {lead}
        </p>
      )}
      {children && <div className="mt-7">{children}</div>}
    </header>
  );
}
