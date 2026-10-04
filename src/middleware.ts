import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const COUNTRY_LOCALE: Record<string, string> = {
  TH: "th",
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  UY: "es", PY: "es", BO: "es", EC: "es", CR: "es", PA: "es", DO: "es",
  GT: "es", HN: "es", SV: "es", NI: "es", CU: "es",
  BR: "pt-BR", PT: "pt-BR",
  FR: "fr", BE: "fr", CH: "fr", CA: "fr", LU: "fr", MC: "fr",
  JP: "ja", CN: "zh", TW: "zh-TW", HK: "zh-TW", MO: "zh-TW",
  SA: "ar", AE: "ar", EG: "ar", KW: "ar", QA: "ar",
  BH: "ar", OM: "ar", JO: "ar", LB: "ar", MA: "ar",
  DZ: "ar", TN: "ar", LY: "ar", IQ: "ar", SY: "ar", YE: "ar",
  DE: "de", AT: "de", ID: "id", KR: "ko", IT: "it", VN: "vi",
  RU: "ru", UA: "ru", KZ: "ru", BY: "ru",
};

const intlMiddleware = createMiddleware(routing);

const LOCALE_COOKIE = { maxAge: 60 * 60 * 24 * 365, path: "/", sameSite: "lax" } as const;

// The locale the path names explicitly ("/en", "/th/about"; the whole first
// segment, so "/items" isn't "it"), or null.
function pathLocale(pathname: string): string | null {
  const first = pathname.split("/")[1] ?? "";
  return (routing.locales as readonly string[]).includes(first) ? first : null;
}

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const explicit = pathLocale(pathname);

  if (searchParams.get("dev") === "1") {
    const devParam = searchParams.get("country");
    if (devParam) {
      const isLocale = (routing.locales as readonly string[]).includes(devParam);
      const asISO = devParam.toUpperCase();
      const locale = isLocale ? devParam : (COUNTRY_LOCALE[asISO] ?? "en");
      if (locale !== "en" && !explicit) {
        const url = req.nextUrl.clone();
        url.pathname = `/${locale}${pathname}`;
        const res = NextResponse.redirect(url);
        res.headers.set("x-burrowsoft-geo", asISO);
        return res;
      }
    }
  }

  // A locale in the path (English's "/en" included) is the visitor's choice:
  // never geo-prefixed again (from a Thai IP, /en went to /th/en, a 404).
  // Remember it, so the "/" that next-intl sends "/en" to stays English.
  if (explicit) {
    const res = intlMiddleware(req);
    res.cookies.set("NEXT_LOCALE", explicit, LOCALE_COOKIE);
    return res;
  }

  const isApiOrAsset = /^\/(api|_next|favicon|BingSiteAuth|.*\..*$)/.test(pathname);
  const ua = req.headers.get("user-agent") ?? "";
  const isBot = /googlebot|bingbot|yandexbot|baiduspider|applebot|facebookexternalhit|twitterbot/i.test(ua);

  if (!isApiOrAsset && !req.cookies.has("NEXT_LOCALE") && !isBot) {
    const country = req.headers.get("x-vercel-ip-country") ?? req.headers.get("cf-ipcountry") ?? "US";
    const locale = COUNTRY_LOCALE[country] ?? "en";
    if (locale !== "en") {
      const url = req.nextUrl.clone();
      url.pathname = `/${locale}${pathname}`;
      const res = NextResponse.redirect(url, { status: 302 });
      res.cookies.set("NEXT_LOCALE", locale, LOCALE_COOKIE);
      res.headers.set("x-burrowsoft-geo", country);
      return res;
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|BingSiteAuth|.*\\..*).*)", "/"],
};
