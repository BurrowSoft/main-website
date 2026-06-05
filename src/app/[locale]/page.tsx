import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const SITE_DESCRIPTION =
  "BurrowSoft builds honest, focused search tools — flights, hotels, cars, news, games, and shopping with no dark patterns and no hidden fees.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const tNoAds = await getTranslations("noAds");
  return {
    title: "BurrowSoft — Find better deals. No tricks.",
    description: `${tNoAds("tagline")} — ${SITE_DESCRIPTION}`,
  };
}

const values = [
  {
    icon: "⚡",
    title: "Fast",
    body: "Results in under a second. No spinners, no waiting.",
  },
  {
    icon: "🔍",
    title: "Transparent",
    body: "The price you see is the price you pay. Always.",
  },
  {
    icon: "🎯",
    title: "Focused",
    body: "One job per product, done extremely well.",
  },
];

const PRODUCTS_BASE = [
  {
    name: "FlyMole",
    href: "https://flymole.com",
    mascot: "/mascots/flymole.svg",
    tKey: "flymole" as const,
    tagline: "Search flights",
    cta: "Search flights",
    mascotBg: "bg-sky-50",
    accent: "border-sky-200 hover:border-sky-400",
    ctaColor: "bg-sky-600 hover:bg-sky-700",
  },
  {
    name: "BookingMole",
    href: "https://bookingmole.com",
    mascot: "/mascots/bookingmole.svg",
    tKey: "bookingmole" as const,
    tagline: "Book hotels",
    cta: "Browse hotels",
    mascotBg: "bg-violet-50",
    accent: "border-violet-200 hover:border-violet-400",
    ctaColor: "bg-violet-600 hover:bg-violet-700",
  },
  {
    name: "InsightMole",
    href: "https://insightmole.com",
    mascot: "/mascots/insightmole.svg",
    tKey: "insightmole" as const,
    tagline: "Trending news",
    cta: "Read the news",
    mascotBg: "bg-amber-50",
    accent: "border-amber-200 hover:border-amber-400",
    ctaColor: "bg-amber-500 hover:bg-amber-600",
  },
  {
    name: "RentACarMole",
    href: "https://rentacarmole.com",
    mascot: "/mascots/rentacarmole.svg",
    tKey: "rentacarmole" as const,
    tagline: "Rent a car",
    cta: "Find a car",
    mascotBg: "bg-teal-50",
    accent: "border-teal-200 hover:border-teal-400",
    ctaColor: "bg-teal-600 hover:bg-teal-700",
  },
  {
    name: "GamesMole",
    href: "https://gamesmole.com",
    mascot: "/mascots/gamesmole.svg",
    tKey: "gamesmole" as const,
    tagline: "Games & rankings",
    cta: "Explore games",
    mascotBg: "bg-emerald-50",
    accent: "border-emerald-200 hover:border-emerald-400",
    ctaColor: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    name: "ShoppingMole",
    href: "https://shoppingmole.com",
    mascot: "/mascots/shoppingmole.svg",
    tKey: "shoppingmole" as const,
    tagline: "Shop smarter",
    cta: "Start shopping",
    mascotBg: "bg-rose-50",
    accent: "border-rose-200 hover:border-rose-400",
    ctaColor: "bg-rose-600 hover:bg-rose-700",
  },
];

export default async function HomePage() {
  const tHero = await getTranslations("hero");
  const tProducts = await getTranslations("products");
  const tCta = await getTranslations("hero.ctaLabels");
  const tNoAds = await getTranslations("noAds");

  const products = PRODUCTS_BASE.map((p) => ({
    ...p,
    description: tProducts(p.tKey),
  }));

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-10 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
          6 products · No dark patterns
        </p>
        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
          {tHero("title")}{" "}
          <span className="text-indigo-600">{tHero("titleAccent")}</span>
        </h1>
        <p className="mt-3 text-base font-semibold tracking-wide text-amber-600">
          {tNoAds("tagline")}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500 leading-relaxed">
          {tHero("subtitle")}
        </p>

        {/* Mascot collage */}
        <div className="mx-auto mt-10 mb-2 flex items-end justify-center gap-1 sm:gap-3 overflow-hidden">
          {products.map((p) => (
            <img
              key={p.name}
              src={p.mascot}
              alt=""
              aria-hidden="true"
              className="h-20 sm:h-28 w-auto opacity-85"
            />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://flymole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            ✈ {tCta("flights")}
          </a>
          <a
            href="https://bookingmole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-violet-400 hover:text-violet-600 transition-colors"
          >
            🏨 {tCta("hotels")}
          </a>
          <a
            href="https://insightmole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-amber-400 hover:text-amber-600 transition-colors"
          >
            📰 {tCta("news")}
          </a>
          <a
            href="https://rentacarmole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-teal-400 hover:text-teal-600 transition-colors"
          >
            🚗 {tCta("cars")}
          </a>
          <a
            href="https://gamesmole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-emerald-400 hover:text-emerald-600 transition-colors"
          >
            🎮 {tCta("games")}
          </a>
          <a
            href="https://shoppingmole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-rose-400 hover:text-rose-600 transition-colors"
          >
            🛍️ {tCta("shopping")}
          </a>
        </div>
      </section>

      {/* Products showcase */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {tProducts("sectionTitle")}
            </h2>
            <p className="mt-3 text-slate-500">Six focused tools. One mission.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col rounded-2xl border bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${p.accent}`}
              >
                {/* Mascot */}
                <div className={`mb-5 flex items-end justify-center rounded-xl py-3 ${p.mascotBg}`}>
                  <img
                    src={p.mascot}
                    alt={`${p.name} mascot`}
                    className="h-36 w-auto"
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {p.tagline}
                </p>
                <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {p.description}
                </p>
                <span
                  className={`mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${p.ctaColor}`}
                >
                  {p.cta}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">How we build</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
                  {v.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-indigo-600 py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold text-white">Ready to explore?</h2>
          <p className="mt-3 text-indigo-200">{tHero("cta")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://flymole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors"
            >
              ✈ FlyMole
            </a>
            <a
              href="https://bookingmole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              🏨 BookingMole
            </a>
            <a
              href="https://insightmole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              📰 InsightMole
            </a>
            <a
              href="https://rentacarmole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              🚗 RentACarMole
            </a>
            <a
              href="https://gamesmole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              🎮 GamesMole
            </a>
            <a
              href="https://shoppingmole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              🛍️ ShoppingMole
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
