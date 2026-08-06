/**
 * Format a date-only ISO string for a locale.
 *
 * Pinned to UTC on both ends: a bare "2026-07-28" is parsed as midnight UTC,
 * and formatting in the server's local zone would otherwise shift it a day
 * either side of the date line.
 *
 * Note for `th`: Intl renders Thai dates in the Buddhist era by default
 * (2569, not 2026). That is the locale-correct behaviour and is intentional —
 * pass `calendar: "gregory"` here if the brand requires Gregorian everywhere.
 */
export function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
