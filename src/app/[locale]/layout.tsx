import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
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
import { LanguageSelector, AppHeader } from "@burrowsoft/shared";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { BASE, SITE_NAME, SUPPORT_EMAIL, SOLVYMED_URL, MOODBOW_URL, MOLE_SITES } from "@/lib/site";
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
      "description": "BurrowSoft builds software systems: SolvyMed, clinic management software, and Moodbow, a personal journal, plus six free consumer websites.",
      "email": SUPPORT_EMAIL,
      "sameAs": [SOLVYMED_URL, MOODBOW_URL, ...MOLE_SITES.map((s) => s.href.replace("https://", "https://www."))],
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Site-wide defaults only; each page sets its own title, description, canonical and hreflang.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(BASE),
    title: {
      default: t("homeTitle"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t("homeDescription"),
    keywords: ["BurrowSoft","SolvyMed","Moodbow","clinic management software","FlyMole","BookingMole","InsightMole","RentACarMole","GamesMole","ShoppingMole"],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    other: { "google-adsense-account": "ca-pub-1009857008755875" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4f46e5",
};

const navLinkClass =
  "rounded-md px-1 py-1 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";

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
  const tNav = await getTranslations("nav");
  const tHome = await getTranslations("home");
  const fontClass = LOCALE_FONT[locale] ?? "";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={fontClass}>
      <body className="font-sans min-h-screen bg-white text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppHeader
            logo={
              <Link href="/" className="flex items-center">
                <Image src="/brand/logo-header.png" alt="BurrowSoft" height={36} width={160} className="h-9 w-auto shrink-0" priority />
              </Link>
            }
            right={
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
                  <Link href={{ pathname: "/", hash: "systems" }} className={navLinkClass}>{tNav("systems")}</Link>
                  <Link href="/websites" className={navLinkClass}>{tNav("websites")}</Link>
                  <Link href={{ pathname: "/", hash: "contact" }} className={navLinkClass}>{tNav("contact")}</Link>
                  <LanguageSelector locales={ALL_LOCALES} />
                </div>
                <MobileNav />
              </div>
            }
          />

          <main>{children}</main>

          {/* Main-website uses a detailed dark footer with product descriptions */}
          <footer className="border-t border-slate-800 bg-slate-900 text-white">
            <div className="mx-auto max-w-6xl px-6 py-14">
              <div className="grid gap-12 md:grid-cols-[1.1fr_1fr_1.4fr]">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <Image src="/brand/logo-no-text-dark.png" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
                    <span className="text-xl font-extrabold tracking-tight">BurrowSoft</span>
                  </div>
                  <p className="mb-6 text-xs font-bold tracking-[0.18em] text-indigo-300">
                    {tFooter("tagline")}
                  </p>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm text-slate-300 hover:text-indigo-300 transition-colors">
                    {SUPPORT_EMAIL}
                  </a>
                  <p className="mt-6 text-xs text-slate-400">{tFooter("copyright")}</p>
                </div>

                <div>
                  <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                    {tFooter("systems")}
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a href={SOLVYMED_URL} target="_blank" rel="noopener noreferrer" className="group block">
                        <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">SolvyMed</span>
                        <span className="block text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{tHome("solvymed.tagline")}</span>
                      </a>
                    </li>
                    <li>
                      <a href={MOODBOW_URL} target="_blank" rel="noopener noreferrer" className="group block">
                        <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">Moodbow</span>
                        <span className="ms-2 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#F7C3D3]">
                          {tHome("systems.comingSoon")}
                        </span>
                        <span className="block text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{tHome("moodbow.tagline")}</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <Link href="/websites" className="hover:text-white transition-colors">{tFooter("websites")}</Link>
                  </h3>
                  <ul className="space-y-3">
                    {MOLE_SITES.map((p) => (
                      <li key={p.name}>
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-baseline gap-x-2">
                          <span className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{p.name}</span>
                          <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">— {tFooter(`sites.${p.key}`)}</span>
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
