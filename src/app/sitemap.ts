import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { alternatesFor, localeUrl } from "@/lib/site";

const PAGES = [
  { path: "/", priority: 1 },
  { path: "/websites", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: alternatesFor(locale, path).languages },
    }))
  );
}
