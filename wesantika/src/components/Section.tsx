/**
 * A page section: vertical rhythm, canvas width and gutter, in one element.
 *
 * These three things were previously spelled out at every call site, which is
 * why there were ten different section paddings — `pt-[64px] xl:pt-[88px]` in
 * one place, `pt-[80px] xl:pt-[120px]` in the next, both meaning "a section
 * starts here". Nobody chose the difference. Naming the rhythm is what stops it
 * drifting again, and it is the same argument as `PageHero` and `gutter`.
 *
 * `tone` exists because a full-bleed coloured band and a white section want the
 * same rhythm but different box structure: the band's colour has to reach the
 * viewport edge while its content stays on the canvas. Doing that by hand is
 * where the stray `w-full` wrappers came from.
 */
type Tone = "default" | "tint" | "dark";
type Size = "sm" | "md" | "lg";

/**
 * Top-only on the page background, symmetric on a coloured band.
 *
 * A band owns the air at both ends because its colour stops where the element
 * does; a section on white does not, because the space below it belongs to the
 * next section's top padding. Claiming it in both places is what doubles a gap.
 */
const RHYTHM: Record<Tone, Record<Size, string>> = {
  default: { sm: "section-t-sm", md: "section-t", lg: "section-t-lg" },
  tint: { sm: "section-y-sm", md: "section-y", lg: "section-y-lg" },
  dark: { sm: "section-y-sm", md: "section-y", lg: "section-y-lg" },
};

const SURFACE: Record<Tone, string> = {
  default: "",
  /* The brand blue laid over white at ~7%. Used to separate adjacent sections
     without a rule — a tinted band reads as a change of subject where a
     hairline reads as a divider inside one. */
  tint: "bg-brand-tint",
  dark: "bg-shell-900 text-white",
};

export function Section({
  children,
  tone = "default",
  size = "md",
  className = "",
  id,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  /** Applied to the inner canvas, not the full-bleed surface. */
  className?: string;
  id?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag id={id} className={`${SURFACE[tone]} ${RHYTHM[tone][size]}`}>
      <div className={`canvas gutter ${className}`}>{children}</div>
    </Tag>
  );
}
