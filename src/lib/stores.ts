/**
 * The app stores' official badges and legal lines. The artwork in
 * public/brand/stores/ is Apple's and Google's own, unmodified: Google Play's
 * in every language the site has, Apple's in English.
 */

const GOOGLE_PLAY_LOCALES = new Set([
  "en", "ar", "de", "es", "fr", "id", "it", "ja", "ko", "pt-BR", "ru", "th", "vi", "zh", "zh-TW",
]);

/** Google's en and ar badges are its older artwork, with more built-in padding. */
const GOOGLE_PLAY_OLD_ARTWORK = new Set(["en", "ar"]);

/** Google Play's badge for a locale (English where Google has none): its file and its artwork style. */
export function googlePlayBadge(locale: string) {
  const l = GOOGLE_PLAY_LOCALES.has(locale) ? locale : "en";
  return { src: `/brand/stores/google-play/${l}.png`, oldArtwork: GOOGLE_PLAY_OLD_ARTWORK.has(l) };
}

/** Apple's badge, in English everywhere for now; its alt text is the badge's own words. */
export const APP_STORE_BADGE = { src: "/brand/stores/app-store/en.svg", alt: "Download on the App Store" };

/** The legal lines the badges need, in English in every locale (Apple's international form). */
export const TRADEMARK_LINES = {
  apple:
    "Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. " +
    "App Store is a service mark of Apple Inc., registered in the U.S. and other countries.",
  google: "Google Play and the Google Play logo are trademarks of Google LLC.",
};
