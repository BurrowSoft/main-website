"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const LINKS = [
  {
    href: "https://s.lazada.co.th/s.ZhTKMF?c=b&t=p-i6RvCVf-sRab381",
    label: "🛍️ ช้อปสินค้าที่ Lazada",
    sub: "ดีลพิเศษวันนี้",
  },
  {
    href: "https://s.lazada.co.th/s.ZhTKLe?c=a&t=p-iHa6GOt-s2EYQBV0",
    label: "⚡ Lazada Flash Sale",
    sub: "ลดราคาสูงสุด 90%",
  },
];

export function LazadaFloatingAd() {
  const locale = useLocale();
  const [dismissed, setDismissed] = useState(false);

  if (locale !== "th" || dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-56 overflow-hidden rounded-xl shadow-xl border border-slate-200 bg-white">
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ backgroundColor: "#F57224" }}
      >
        <span className="text-xs font-bold tracking-wide text-white">lazada</span>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss ad"
          className="text-white/80 hover:text-white transition-colors text-base leading-none"
        >
          ✕
        </button>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 p-3">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex flex-col rounded-lg bg-orange-50 px-3 py-2.5 text-sm font-semibold text-orange-900 hover:bg-orange-100 transition-colors"
          >
            {link.label}
            <span className="mt-0.5 text-xs font-normal text-orange-600">{link.sub}</span>
          </a>
        ))}
      </div>

      {/* Disclosure */}
      <p className="px-3 pb-2 text-center text-[10px] text-slate-400">
        โฆษณา · Sponsored
      </p>
    </div>
  );
}
