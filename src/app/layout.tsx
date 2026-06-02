import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_NAME = "BurrowSoft";
const SITE_URL = "https://burrowsoft.com";
const SITE_DESCRIPTION =
  "BurrowSoft builds honest travel tools — fast flight search and hotel booking with no hidden fees.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Travel tools built right`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["travel tools", "flight search", "hotel booking", "BurrowSoft", "Fly Mole", "Booking Mole"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Travel tools built right`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Travel tools built right`,
    description: SITE_DESCRIPTION,
  },
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
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
            <div className="hidden sm:flex items-center gap-5 text-sm font-medium text-slate-600">
              <a href="https://flymole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Fly Mole</a>
              <a href="https://bookingmole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Booking Mole</a>
              <a href="https://insightmole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">InsightMole</a>
              <a href="https://shoppingmole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Shopping Mole</a>
              <a href="https://rentacarmole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Rent a Car Mole</a>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-semibold text-slate-700 text-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-indigo-600 text-white text-xs font-black">
                B
              </span>
              BurrowSoft
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <a href="https://flymole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Fly Mole</a>
              <a href="https://bookingmole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Booking Mole</a>
              <a href="https://insightmole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">InsightMole</a>
              <a href="https://shoppingmole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Shopping Mole</a>
              <a href="https://rentacarmole.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Rent a Car Mole</a>
            </div>
            <a
              href="mailto:support@burrowsoft.com"
              className="text-xs text-slate-500 hover:text-indigo-600 transition-colors"
            >
              support@burrowsoft.com
            </a>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} BurrowSoft. All rights reserved.
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
