import { routing } from "@/i18n/routing";

export const BASE = "https://www.burrowsoft.com";
export const SITE_NAME = "BurrowSoft";
export const SUPPORT_EMAIL = "support@burrowsoft.com";

export const SOLVYMED_URL = "https://www.solvymed.com";
export const MOODBOW_URL = "https://www.moodbow.com";

/** Store pages. Moodbow's App Store page: null until it is known; its badge and chip show already and become links once set. */
export const SOLVYMED_PLAY_URL = "https://play.google.com/store/apps/details?id=com.burrowsoft.solvymed";
export const MOODBOW_PLAY_URL = "https://play.google.com/store/apps/details?id=com.burrowsoft.moodbow";
export const MOODBOW_APP_STORE_URL: string | null = null;

/** Piggybow's site (a coming-soon page until the apps are out) and its "notify me" email. */
export const PIGGYBOW_URL = "https://www.piggybow.com";
export const PIGGYBOW_NOTIFY_MAILTO = `mailto:${SUPPORT_EMAIL}?subject=Notify%20me%20about%20Piggybow`;
/** Piggybow's store pages: null until each exists. Its badges and chips become links once set. */
export const PIGGYBOW_APP_STORE_URL: string | null = null;
export const PIGGYBOW_PLAY_URL: string | null = null;
/**
 * Whether Piggybow's card shows the official store badges under "Coming soon" (true) or the
 * stores' names as plain text chips (false). Apple's guidelines reserve the "Download on the
 * App Store" badge for apps that can be downloaded, so this is the owner's call before launch.
 */
export const PIGGYBOW_STORE_BADGES = true;

/** Piggybow is listed as coming soon, except on these locales for now (a market decision is pending). */
export const PIGGYBOW_HIDDEN_LOCALES: readonly string[] = ["ar", "id"];
export const showPiggybow = (locale: string) => !PIGGYBOW_HIDDEN_LOCALES.includes(locale);

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
