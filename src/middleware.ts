import { NextRequest, NextResponse } from "next/server";

const COUNTRY_LOCALE: Record<string, string> = {
  TH: "th",
  // Spanish-speaking
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  UY: "es", PY: "es", BO: "es", EC: "es", GT: "es", HN: "es", SV: "es",
  NI: "es", CR: "es", PA: "es", DO: "es", CU: "es",
  // Portuguese (Brazilian)
  BR: "pt-BR", PT: "pt-BR",
  // French
  FR: "fr", BE: "fr", CH: "fr", CA: "fr", LU: "fr",
  // Japanese
  JP: "ja",
  // Chinese Simplified
  CN: "zh",
  // Chinese Traditional
  TW: "zh-TW", HK: "zh-TW", MO: "zh-TW",
  // Arabic
  SA: "ar", AE: "ar", EG: "ar", KW: "ar", QA: "ar",
  BH: "ar", OM: "ar", JO: "ar", LB: "ar", MA: "ar",
  DZ: "ar", TN: "ar", LY: "ar", IQ: "ar", SY: "ar", YE: "ar",
  // German
  DE: "de", AT: "de",
  // Indonesian
  ID: "id",
  // Korean
  KR: "ko",
  // Italian
  IT: "it",
  // Vietnamese
  VN: "vi",
  // Russian
  RU: "ru", UA: "ru", KZ: "ru", BY: "ru",
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // On first visit (no cookie) auto-detect locale from country header
  if (!request.cookies.get("NEXT_LOCALE")) {
    const country =
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry") ??
      "";
    const locale = COUNTRY_LOCALE[country] ?? "en";
    response.cookies.set("NEXT_LOCALE", locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/"],
};
