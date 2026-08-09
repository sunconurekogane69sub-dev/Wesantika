import { Fragment } from "react";

/**
 * Renders `**…**` runs inside a translated string.
 *
 * The Figma write-ups (586:813, 586:1081) carry per-run styling that the
 * dictionary cannot express as plain text: the intro paints PoC / MVP /
 * production brand blue at normal weight, while card bodies bold a phrase in
 * the same grey as the surrounding sentence. Rather than two markers, the
 * dictionary uses one and each call site supplies the class — so a translator
 * only has to keep the asterisks around the equivalent phrase.
 *
 * Unmatched asterisks are left as literal text; nothing here parses Markdown
 * beyond this single case.
 */
export function Emphasis({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const parts = text.split(/\*\*(.+?)\*\*/gs);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className={className}>
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
