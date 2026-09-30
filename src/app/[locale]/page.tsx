import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BurrowSoftIcon } from "@burrowsoft/shared";
import { Link } from "@/i18n/navigation";
import {
  MOLE_SITES,
  MOODBOW_NOTIFY_MAILTO,
  MOODBOW_URL,
  SITE_NAME,
  SOLVYMED_URL,
  SUPPORT_EMAIL,
  alternatesFor,
  localeUrl,
} from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("homeTitle");
  const description = t("homeDescription");
  return {
    title: { absolute: title },
    description,
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      type: "website",
      locale: locale.replace("-", "_"),
      url: localeUrl(locale, "/"),
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const SOLVYMED_FEATURES = ["scheduling", "records", "prescriptions", "payments", "secretary", "patientApp"] as const;
const MOODBOW_FEATURES = [
  { key: "mood", color: "#F2A07B" },
  { key: "sleep", color: "#9B84D6" },
  { key: "habits", color: "#E27D9A" },
] as const;
const MOODBOW_HIGHLIGHTS = ["charts", "reports", "timeline", "private"] as const;

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`${className} rtl:-scale-x-100`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function ExternalIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={`${className} rtl:-scale-x-100`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M10 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-4" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="burrow-dots pointer-events-none absolute inset-0" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 start-1/2 h-[480px] w-[720px] -translate-x-1/2 rtl:translate-x-1/2 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.3fr_1fr] lg:pb-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm font-semibold text-slate-700 shadow-sm">
              <BurrowSoftIcon className="h-5 w-5 text-indigo-600" />
              BurrowSoft
            </p>
            <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
              <span className="block">{t("hero.titleLine1")}</span>
              <span className="block text-indigo-600">{t("hero.titleLine2")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#systems"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                {t("hero.primaryCta")}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
                </svg>
              </a>
              <Link
                href="/websites"
                className="group inline-flex items-center gap-1.5 rounded-md text-base font-semibold text-slate-700 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {t("hero.secondaryCta")}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* "What we build" index panel */}
          <div className="relative">
            <div aria-hidden="true" className="pointer-events-none absolute -top-8 -end-6 h-40 w-40 rounded-full bg-[#116E99]/25 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 -start-6 h-40 w-40 rounded-full bg-[#F2A07B]/30 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-10 end-10 h-32 w-32 rounded-full bg-[#9B84D6]/25 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-6">
              <div className="mb-4 flex items-center justify-between px-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{t("hero.panelTitle")}</p>
                <BurrowSoftIcon className="h-6 w-6 text-slate-400" />
              </div>

              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{tNav("systems")}</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-4 rounded-2xl border border-[#116E99]/15 bg-[#116E99]/[0.04] p-3">
                  <Image src="/brand/solvymed/solvymed-app-icon-blue-192.png" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900">SolvyMed</p>
                    <p className="truncate text-sm text-slate-600">{t("solvymed.tagline")}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    {t("systems.live")}
                  </span>
                </li>
                <li className="flex items-center gap-4 rounded-2xl border border-[#E27D9A]/20 bg-[#FBF6F1] p-3">
                  <Image src="/brand/moodbow/moodbow-app-icon-light.svg" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl ring-1 ring-[#EADFD6]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#2B2438]">Moodbow</p>
                    <p className="truncate text-sm text-[#5B5068]">{t("moodbow.tagline")}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#A8456A]/10 px-2.5 py-1 text-xs font-semibold text-[#A8456A]">
                    {t("systems.comingSoon")}
                  </span>
                </li>
              </ul>

              <div className="my-4 border-t border-dashed border-slate-200" />

              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{tNav("websites")}</p>
              <Link
                href="/websites"
                className="group flex items-center justify-between gap-3 rounded-2xl p-2 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span className="flex flex-wrap gap-1.5">
                  {MOLE_SITES.map((s) => (
                    <Image key={s.key} src={s.mascot} alt="" width={40} height={40} className="h-10 w-10 rounded-full bg-white ring-1 ring-slate-200" />
                  ))}
                </span>
                <span className="sr-only">{t("teaser.link")}</span>
                <ArrowIcon className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-indigo-600" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Systems ──────────────────────────────────────────── */}
      <section id="systems" className="scroll-mt-20 border-t border-slate-100 bg-slate-50/60 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">{tNav("systems")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t("systems.title")}</h2>
            <p className="mt-3 text-lg text-slate-600">{t("systems.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* SolvyMed — live, visually first and larger */}
            <article className="relative flex flex-col overflow-hidden rounded-3xl bg-[#0C2230] p-8 text-white shadow-xl shadow-[#0C2230]/20 sm:p-10 lg:col-span-3">
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -end-40 h-[28rem] w-[28rem] rounded-full bg-[#116E99]/40 blur-3xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -end-24 h-72 w-72 rounded-full border border-white/10" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -end-12 h-48 w-48 rounded-full border border-white/10" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 end-0 h-24 w-24 rounded-full border border-white/10" />

              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <Image
                  src="/brand/solvymed/solvymed-logo-horizontal-dark-small.png"
                  alt={t("logoAlt", { name: "SolvyMed" })}
                  width={433}
                  height={200}
                  className="h-16 w-auto sm:h-20"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#A9D6EC] ring-1 ring-white/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  {t("systems.live")}
                </span>
              </div>

              <h3 className="relative mt-8 text-2xl font-bold tracking-tight sm:text-3xl">{t("solvymed.tagline")}</h3>
              <p className="relative mt-3 max-w-xl leading-relaxed text-white/80">{t("solvymed.description")}</p>

              <ul className="relative mt-7 grid gap-3 sm:grid-cols-2">
                {SOLVYMED_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-medium text-white/90">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#116E99] text-white">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {t(`solvymed.features.${f}`)}
                  </li>
                ))}
              </ul>

              <div className="relative mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#A9D6EC] to-[#116E99] text-white" aria-hidden="true">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2zm7 12l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-white">{t("solvymed.features.solvyai")}</span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-[#A9D6EC]">
                  {t("systems.comingSoon")}
                </span>
              </div>

              <div className="relative mt-auto pt-9">
                <a
                  href={SOLVYMED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#116E99] shadow-sm transition-colors hover:bg-[#E6F3F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A9D6EC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C2230]"
                >
                  {t("solvymed.cta")}
                  <ExternalIcon />
                </a>
              </div>
            </article>

            {/* Moodbow — coming soon */}
            <article className="relative flex flex-col overflow-hidden rounded-3xl border border-[#EADFD6] bg-[#FBF6F1] p-8 text-[#2B2438] sm:p-10 lg:col-span-2">
              <div aria-hidden="true" className="pointer-events-none absolute -top-16 -end-10 h-40 w-40 rounded-full bg-[#F2A07B]/30 blur-2xl" />
              <div aria-hidden="true" className="pointer-events-none absolute -top-6 end-20 h-32 w-32 rounded-full bg-[#9B84D6]/25 blur-2xl" />
              <div aria-hidden="true" className="pointer-events-none absolute top-10 -end-4 h-24 w-24 rounded-full bg-[#E27D9A]/25 blur-2xl" />

              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <Image
                  src="/brand/moodbow/moodbow-logo-horizontal-light.svg"
                  alt={t("logoAlt", { name: "Moodbow" })}
                  width={686}
                  height={140}
                  className="h-10 w-auto sm:h-11"
                />
                <span className="rounded-full border border-[#A8456A]/25 bg-white/70 px-3 py-1 text-xs font-semibold text-[#A8456A]">
                  {t("systems.comingSoon")}
                </span>
              </div>

              <h3 className="relative mt-8 text-2xl font-semibold tracking-tight sm:text-3xl">{t("moodbow.tagline")}</h3>
              <p className="relative mt-3 leading-relaxed text-[#4A4257]">{t("moodbow.description")}</p>

              <ul className="relative mt-7 flex flex-wrap gap-2">
                {MOODBOW_FEATURES.map((f) => (
                  <li key={f.key} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-[#2B2438] ring-1 ring-[#EADFD6]">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: f.color }} aria-hidden="true" />
                    {t(`moodbow.features.${f.key}`)}
                  </li>
                ))}
              </ul>

              <ul className="relative mt-6 space-y-2.5">
                {MOODBOW_HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-[#2B2438]">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A8456A]/10 text-[#A8456A]">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {t(`moodbow.highlights.${h}`)}
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-9">
                <a
                  href={MOODBOW_NOTIFY_MAILTO}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2B2438] px-5 py-3 text-sm font-semibold text-[#FBF6F1] transition-colors hover:bg-[#3D344D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8456A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF6F1]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
                  </svg>
                  {t("moodbow.cta")}
                </a>
                <a
                  href={MOODBOW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-[#A8456A] transition-colors hover:text-[#2B2438] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8456A]"
                >
                  {t("moodbow.visit")}
                  <ExternalIcon />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Websites teaser ─────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center">
            <ul className="flex shrink-0 flex-wrap gap-2" aria-hidden="true">
              {MOLE_SITES.map((s) => (
                <li key={s.key}>
                  <Image src={s.mascot} alt="" width={48} height={48} className="h-12 w-12 rounded-full bg-white ring-1 ring-slate-200" />
                </li>
              ))}
            </ul>
            <p className="flex-1 text-base leading-relaxed text-slate-700">{t("teaser.text")}</p>
            <Link
              href="/websites"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-indigo-400 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {t("teaser.link")}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section id="contact" className="scroll-mt-20 pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-indigo-600 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <BurrowSoftIcon aria-hidden="true" className="pointer-events-none absolute -bottom-10 -end-6 h-56 w-56 text-white/10" />
            <p className="relative text-sm font-bold uppercase tracking-widest text-indigo-100">{tNav("contact")}</p>
            <h2 className="relative mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t("contact.title")}</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-lg text-indigo-100">{t("contact.text")}</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-indigo-700 shadow-sm transition-colors hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
