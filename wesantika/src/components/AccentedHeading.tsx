/**
 * A heading with one word in the brand colour and the rest in ink.
 *
 * The accent is given as a **substring of the heading**, not as a separate
 * fragment, and the heading is split on it at render time. That is what makes
 * it work in five languages: the accented word is not in the same place twice.
 *
 *   en          "Our Full-Range |Services|"        trailing
 *   ja          "提供|サービス|"                    trailing
 *   zh-Hant-TW  "完整|服務|範圍"                    medial
 *   th          "|บริการ|ครบวงจรของเรา"             leading
 *   vi          "|Dịch vụ| toàn diện"               leading
 *
 * Splitting also means the spacing comes free. A lead/accent/trail triple would
 * need a separator, and the separator is a space in Latin and Vietnamese but
 * nothing at all in Japanese, Chinese and Thai — get it wrong and you ship
 * "提供 サービス".
 *
 * If the accent is not found the whole heading renders in ink, which is the safe
 * failure: a locale that has not named its accent yet still reads correctly.
 */
export function AccentedHeading({
  as: Tag = "h2",
  text,
  accent,
  className = "",
  accentClassName = "text-brand",
}: {
  as?: "h1" | "h2" | "h3";
  text: string;
  accent: string;
  className?: string;
  accentClassName?: string;
}) {
  const at = accent ? text.indexOf(accent) : -1;

  if (at === -1) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {text.slice(0, at)}
      <span className={accentClassName}>{accent}</span>
      {text.slice(at + accent.length)}
    </Tag>
  );
}
