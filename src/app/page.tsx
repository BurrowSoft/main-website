import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BurrowSoft — Travel tools built right",
};

const products = [
  {
    name: "Fly Mole",
    href: "https://flymole.com",
    icon: "✈",
    tagline: "Search flights",
    description:
      "Compare fares from hundreds of airlines in seconds. Fast results, honest prices, no booking fees.",
    cta: "Search flights",
    accent: "bg-sky-50 border-sky-200 hover:border-sky-400",
    iconBg: "bg-sky-100 text-sky-600",
    ctaColor: "bg-sky-600 hover:bg-sky-700",
  },
  {
    name: "Booking Mole",
    href: "https://bookingmole.com",
    icon: "🏨",
    tagline: "Book hotels",
    description:
      "Find the perfect room at the best available rate. Millions of properties, zero hidden charges.",
    cta: "Browse hotels",
    accent: "bg-violet-50 border-violet-200 hover:border-violet-400",
    iconBg: "bg-violet-100 text-violet-600",
    ctaColor: "bg-violet-600 hover:bg-violet-700",
  },
];

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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-600" />
          Travel tools, built right
        </p>
        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
          Explore the world,{" "}
          <span className="text-indigo-600">simply.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-500 leading-relaxed">
          BurrowSoft makes honest travel apps that get out of your way. No dark
          patterns, no hidden fees — just useful tools for real travelers.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://flymole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            ✈ Search flights
          </a>
          <a
            href="https://bookingmole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition-colors"
          >
            🏨 Browse hotels
          </a>
        </div>
      </section>

      {/* Products */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Our products</h2>
            <p className="mt-3 text-slate-500">Two focused tools. One mission.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col rounded-2xl border p-8 transition-all duration-200 ${p.accent}`}
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${p.iconBg}`}>
                  {p.icon}
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {p.tagline}
                </p>
                <h3 className="text-2xl font-bold text-slate-900">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {p.description}
                </p>
                <span
                  className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors ${p.ctaColor}`}
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
          <p className="mt-3 text-indigo-200">Pick a product and start planning your next trip.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://flymole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors"
            >
              ✈ Fly Mole
            </a>
            <a
              href="https://bookingmole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-400 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              🏨 Booking Mole
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
