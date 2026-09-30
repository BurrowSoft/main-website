import { routing } from "@/i18n/routing";

export const BASE = "https://www.burrowsoft.com";
export const SITE_NAME = "BurrowSoft";
export const SUPPORT_EMAIL = "support@burrowsoft.com";

// TODO(owner): confirm — taken from the SolvyMed codebase (its metadataBase).
export const SOLVYMED_URL = "https://www.solvymed.com";
export const MOODBOW_NOTIFY_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=Notify%20me%20about%20Moodbow`;

/** Absolute URL for a path in a given locale, matching the `as-needed` prefix scheme. */
export function localeUrl(locale: string, path = "/") {
  const suffix = path === "/" ? "/" : `${path}`;
  return locale === routing.defaultLocale ? `${BASE}${suffix}` : `${BASE}/${locale}${suffix}`;
}

/** Canonical + hreflang alternates for a path, across all locales. */
export function alternatesFor(locale: string, path = "/") {
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, localeUrl(l, path)])
  );
  languages["x-default"] = localeUrl(routing.defaultLocale, path);
  return { canonical: localeUrl(locale, path), languages };
}

export type MoleKey = "flymole" | "bookingmole" | "insightmole" | "rentacarmole" | "gamesmole" | "shoppingmole";

export const MOLE_SITES: { key: MoleKey; name: string; href: string; mascot: string }[] = [
  { key: "flymole", name: "FlyMole", href: "https://flymole.com", mascot: "/mascots/flymole.png" },
  { key: "bookingmole", name: "BookingMole", href: "https://bookingmole.com", mascot: "/mascots/bookingmole.png" },
  { key: "insightmole", name: "InsightMole", href: "https://insightmole.com", mascot: "/mascots/insightmole.png" },
  { key: "rentacarmole", name: "RentACarMole", href: "https://rentacarmole.com", mascot: "/mascots/rentacarmole.png" },
  { key: "gamesmole", name: "GamesMole", href: "https://gamesmole.com", mascot: "/mascots/gamesmole.png" },
  { key: "shoppingmole", name: "ShoppingMole", href: "https://shoppingmole.com", mascot: "/mascots/shoppingmole.png" },
];
