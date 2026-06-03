import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

const LOCALES = [
  "en", "th", "es", "ru", "pt-BR", "fr", "ja", "zh", "zh-TW",
  "ar", "de", "id", "ko", "it", "vi",
] as const;
type Locale = (typeof LOCALES)[number];

const COUNTRY_LOCALE: Record<string, Locale> = {
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

const MESSAGES: Record<Locale, () => Promise<{ default: unknown }>> = {
  en: () => import("./messages/en.json"),
  th: () => import("./messages/th.json"),
  es: () => import("./messages/es.json"),
  ru: () => import("./messages/ru.json"),
  "pt-BR": () => import("./messages/pt-BR.json"),
  fr: () => import("./messages/fr.json"),
  ja: () => import("./messages/ja.json"),
  zh: () => import("./messages/zh.json"),
  "zh-TW": () => import("./messages/zh-TW.json"),
  ar: () => import("./messages/ar.json"),
  de: () => import("./messages/de.json"),
  id: () => import("./messages/id.json"),
  ko: () => import("./messages/ko.json"),
  it: () => import("./messages/it.json"),
  vi: () => import("./messages/vi.json"),
};

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  let locale: Locale = "en";
  if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
    locale = cookieLocale as Locale;
  } else {
    const headersList = await headers();
    const country =
      headersList.get("x-vercel-ip-country") ??
      headersList.get("cf-ipcountry") ??
      "";
    locale = COUNTRY_LOCALE[country] ?? "en";
  }

  const messages = (await MESSAGES[locale]()).default as Record<string, unknown>;
  return { locale, messages };
});
