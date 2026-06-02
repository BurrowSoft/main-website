import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Sarabun } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { MobileNav } from "@/components/MobileNav";
import { LanguageSelector, RegionalFloatingAd } from "@burrowsoft/shared";
import "./globals.css";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sarabun",
});

const SITE_NAME = "BurrowSoft";
const SITE_URL = "https://burrowsoft.com";
const SITE_DESCRIPTION =
  "BurrowSoft builds honest, focused search tools — flights, hotels, cars, news, games, and shopping with no dark patterns and no hidden fees.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Find better deals. No tricks.`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "BurrowSoft",
    "FlyMole",
    "BookingMole",
    "InsightMole",
    "RentACarMole",
    "GamesMole",
    "ShoppingMole",
    "flight search",
    "hotel booking",
    "honest tools",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
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

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const tFooter = await getTranslations("footer");

  return (
    <html lang={locale}>
      <body className={`${sarabun.variable} font-sans min-h-screen bg-white text-slate-900 antialiased`}>
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
                <LanguageSelector locales={["en", "th"]} />
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
                    <img
                      src="/brand/burrowsoft-icon.svg"
                      alt="BurrowSoft"
                      className="h-10 w-10"
                    />
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

          <RegionalFloatingAd />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
