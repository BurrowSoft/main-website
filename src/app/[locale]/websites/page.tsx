import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MOLE_SITES, alternatesFor, localeUrl, SITE_NAME, type MoleKey } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("websitesTitle");
  const description = t("websitesDescription");
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, "/websites"),
    openGraph: {
      type: "website",
      locale: locale.replace("-", "_"),
      url: localeUrl(locale, "/websites"),
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const values = [
  { icon: "⚡", key: "fast" },
  { icon: "🔍", key: "transparent" },
  { icon: "🎯", key: "focused" },
] as const;

const SITE_STYLE: Record<MoleKey, { ctaKey: string; ctaEmoji: string; mascotBg: string; accent: string; ctaColor: string }> = {
  flymole: { ctaKey: "flights", ctaEmoji: "✈", mascotBg: "bg-sky-50", accent: "border-sky-200 hover:border-sky-400", ctaColor: "bg-sky-600 hover:bg-sky-700" },
  bookingmole: { ctaKey: "hotels", ctaEmoji: "🏨", mascotBg: "bg-violet-50", accent: "border-violet-200 hover:border-violet-400", ctaColor: "bg-violet-600 hover:bg-violet-700" },
  insightmole: { ctaKey: "news", ctaEmoji: "📰", mascotBg: "bg-amber-50", accent: "border-amber-200 hover:border-amber-400", ctaColor: "bg-amber-700 hover:bg-amber-800" },
  rentacarmole: { ctaKey: "cars", ctaEmoji: "🚗", mascotBg: "bg-teal-50", accent: "border-teal-200 hover:border-teal-400", ctaColor: "bg-teal-600 hover:bg-teal-700" },
  gamesmole: { ctaKey: "games", ctaEmoji: "🎮", mascotBg: "bg-emerald-50", accent: "border-emerald-200 hover:border-emerald-400", ctaColor: "bg-emerald-600 hover:bg-emerald-700" },
  shoppingmole: { ctaKey: "shopping", ctaEmoji: "🛍️", mascotBg: "bg-rose-50", accent: "border-rose-200 hover:border-rose-400", ctaColor: "bg-rose-600 hover:bg-rose-700" },
};

export default async function WebsitesPage() {
  const tHero = await getTranslations("hero");
  const tProducts = await getTranslations("products");
  const tCta = await getTranslations("hero.ctaLabels");
  const tNoAds = await getTranslations("noAds");
  const t = await getTranslations("websitesPage");

  const products = MOLE_SITES.map((p) => ({ ...p, ...SITE_STYLE[p.key] }));

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-10 text-center">
        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
          {tHero("title")}{" "}
          <span className="text-indigo-600">{tHero("titleAccent")}</span>
        </h1>
        <p className="mt-3 text-base font-semibold tracking-wide text-amber-700">
          {tNoAds("tagline")}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 leading-relaxed">
          {tHero("subtitle")}
        </p>

        {/* Mascots + aligned CTA buttons */}
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-x-3 gap-y-6">
          {products.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-3">
              <div className="flex h-24 sm:h-28 items-end justify-center">
                <img
                  src={p.mascot}
                  alt=""
                  aria-hidden="true"
                  width={160}
                  height={160}
                  className="max-h-full w-auto"
                />
              </div>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 rounded-lg px-2 py-2.5 text-xs sm:text-sm font-semibold transition-colors shadow-sm border border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-600"
              >
                <span aria-hidden="true">{p.ctaEmoji}</span>
                {tCta(p.ctaKey)}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Products showcase */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              {tProducts("sectionTitle")}
            </h2>
            <p className="mt-3 text-slate-600">{t("sectionSubtitle")}</p>
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
                    alt={t("mascotAlt", { name: p.name })}
                    width={160}
                    height={160}
                    className="h-36 w-auto"
                    loading="lazy"
                  />
                </div>
                {/* Info */}
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {t(`taglines.${p.key}`)}
                </p>
                <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {tProducts(p.key)}
                </p>
                <span
                  className={`mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${p.ctaColor}`}
                >
                  {t(`ctas.${p.key}`)}
                  <svg className="h-4 w-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t("valuesTitle")}</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.key} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-3xl" aria-hidden="true">
                  {v.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{t(`values.${v.key}Title`)}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{t(`values.${v.key}Body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-indigo-600 py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold text-white">{t("ctaTitle")}</h2>
          <p className="mt-3 text-indigo-100">{tHero("cta")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {products.map((p, i) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  i === 0
                    ? "inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors"
                    : "inline-flex items-center gap-2 rounded-lg border border-indigo-300 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
                }
              >
                <span aria-hidden="true">{p.ctaEmoji}</span> {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
