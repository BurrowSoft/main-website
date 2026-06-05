import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Sarabun,
  Noto_Sans_JP,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_KR,
  Noto_Sans_Arabic,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { MobileNav } from "@/components/MobileNav";
import { LanguageSelector, RegionalFloatingAd } from "@burrowsoft/shared";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const sarabun = Sarabun({ subsets: ["thai", "latin"], weight: ["400", "600", "700"], variable: "--font-sarabun", display: "swap" });
const notoJP  = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-noto-jp", display: "swap" });
const notoSC  = Noto_Sans_SC({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-noto-sc", display: "swap" });
const notoTC  = Noto_Sans_TC({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-noto-tc", display: "swap" });
const notoKR  = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-noto-kr", display: "swap" });
const notoAR  = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-noto-ar", display: "swap" });

const LOCALE_FONT: Record<string, string> = {
  th: sarabun.variable,
  ja: notoJP.variable,
  zh: notoSC.variable,
  "zh-TW": notoTC.variable,
  ko: notoKR.variable,
  ar: notoAR.variable,
};

const ALL_LOCALES = ["en", "th", "es", "ru", "pt-BR", "fr", "ja", "zh", "zh-TW", "ar", "de", "id", "ko", "it", "vi"];

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.burrowsoft.com/#organization",
      "name": "BurrowSoft",
      "url": "https://www.burrowsoft.com",
      "description": "BurrowSoft builds focused, honest search and aggregation tools. No dark patterns, no hidden fees.",
      "email": "support@burrowsoft.com",
      "sameAs": [
        "https://www.flymole.com",
        "https://www.bookingmole.com",
        "https://www.insightmole.com",
        "https://www.rentacarmole.com",
        "https://www.gamesmole.com",
        "https://www.shoppingmole.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.burrowsoft.com/#website",
      "url": "https://www.burrowsoft.com",
      "name": "BurrowSoft",
      "publisher": { "@id": "https://www.burrowsoft.com/#organization" },
    },
  ],
};

const SITE_NAME = "BurrowSoft";
const BASE = "https://www.burrowsoft.com";
const SITE_DESCRIPTION =
  "BurrowSoft builds honest, focused search tools — flights, hotels, cars, news, games, and shopping with no dark patterns and no hidden fees.";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = locale === "en" ? `${BASE}/` : `${BASE}/${locale}/`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === "en" ? `${BASE}/` : `${BASE}/${l}/`])
  );
  languages["x-default"] = `${BASE}/`;

  return {
    metadataBase: new URL(BASE),
    title: {
      default: `${SITE_NAME} — Find better deals. No tricks.`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      "BurrowSoft", "FlyMole", "BookingMole", "InsightMole",
      "RentACarMole", "GamesMole", "ShoppingMole",
      "flight search", "hotel booking", "honest tools",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-touch-icon.svg", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      locale: locale.replace("-", "_"),
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: `${SITE_NAME} — Find better deals. No tricks.`,
      description: SITE_DESCRIPTION,
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "BurrowSoft" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Find better deals. No tricks.`,
      description: SITE_DESCRIPTION,
      images: ["/og-image.svg"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    other: { "google-adsense-account": "ca-pub-1009857008755875" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

const navLinks = [
  { label: "FlyMole", href: "https://flymole.com" },
  { label: "BookingMole", href: "https://bookingmole.com" },
  { label: "InsightMole", href: "https://insightmole.com" },
  { label: "RentACarMole", href: "https://rentacarmole.com" },
  { label: "GamesMole", href: "https://gamesmole.com" },
  { label: "ShoppingMole", href: "https://shoppingmole.com" },
];

const footerProducts = [
  { name: "FlyMole", href: "https://flymole.com", desc: "Compare flights from top airlines" },
  { name: "BookingMole", href: "https://bookingmole.com", desc: "Find hotels with zero hidden fees" },
  { name: "InsightMole", href: "https://insightmole.com", desc: "Top headlines, no clickbait" },
  { name: "RentACarMole", href: "https://rentacarmole.com", desc: "Car rentals from top providers" },
  { name: "GamesMole", href: "https://gamesmole.com", desc: "Live rankings, guides & gaming news" },
  { name: "ShoppingMole", href: "https://shoppingmole.com", desc: "Compare prices across thousands of stores" },
];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const tFooter = await getTranslations("footer");

  const fontClass = LOCALE_FONT[locale] ?? "";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={fontClass}>
      <body className="font-sans min-h-screen bg-white text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
            <nav
              className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
              aria-label="Main navigation"
            >
              <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg tracking-tight">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-white text-xs font-black">
                  B
                </span>
                BurrowSoft
              </Link>
              <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <LanguageSelector locales={ALL_LOCALES} />
              </div>
              <MobileNav />
            </nav>
          </header>

          <main>{children}</main>

          <footer className="border-t border-slate-800 bg-slate-900 text-white">
            <div className="mx-auto max-w-6xl px-6 py-14">
              <div className="grid gap-12 sm:grid-cols-2">
                {/* Brand column */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <img src="/brand/burrowsoft-icon.svg" alt="BurrowSoft" className="h-10 w-10" />
                    <span className="text-xl font-extrabold tracking-tight">BurrowSoft</span>
                  </div>
                  <p className="mb-6 text-xs font-bold tracking-[0.18em] text-indigo-400">
                    {tFooter("tagline")}
                  </p>
                  <a
                    href="mailto:support@burrowsoft.com"
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    support@burrowsoft.com
                  </a>
                  <p className="mt-6 text-xs text-slate-500">{tFooter("copyright")}</p>
                </div>

                {/* Products column */}
                <div>
                  <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                    {tFooter("products")}
                  </h3>
                  <ul className="space-y-3">
                    {footerProducts.map((p) => (
                      <li key={p.name}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-wrap items-baseline gap-x-2"
                        >
                          <span className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                            {p.name}
                          </span>
                          <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                            — {p.desc}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </footer>

          {/* <RegionalFloatingAd /> */}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
