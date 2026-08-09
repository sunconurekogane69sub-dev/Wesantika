import { NextResponse, type NextRequest } from "next/server";
import { isLocale, negotiateLocale, resolveLocale } from "@/lib/i18n/locales";

/**
 * Every page lives under a locale segment. This proxy:
 *   /                -> negotiates Accept-Language, e.g. /ja
 *   /about           -> /en/about (or the negotiated locale)
 *   /zh-TW/about     -> /zh-Hant-TW/about  (alias -> canonical BCP 47 tag)
 *   /ja/about        -> passes through
 *
 * Renamed from the deprecated `middleware` convention in Next.js 16.3.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Pass the resolved locale downstream. `not-found.tsx` cannot read route
  // params, and it is the one page that has to render without them.
  if (first && isLocale(first)) {
    const headers = new Headers(request.headers);
    headers.set("x-locale", first);
    return NextResponse.next({ request: { headers } });
  }

  if (first) {
    const canonical = resolveLocale(first);
    if (canonical) {
      segments[0] = canonical;
      return NextResponse.redirect(
        new URL(`/${segments.join("/")}${search}`, request.url),
      );
    }
  }

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const rest = pathname === "/" ? "" : pathname;
  return NextResponse.redirect(new URL(`/${locale}${rest}${search}`, request.url));
}

export const config = {
  // Skip the API, Next internals, and anything that looks like a file.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
