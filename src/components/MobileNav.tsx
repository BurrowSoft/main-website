"use client";

import { useState, useEffect, useRef } from "react";
import { LanguageSelector } from "@burrowsoft/shared";

const navLinks = [
  { label: "FlyMole", href: "https://flymole.com" },
  { label: "BookingMole", href: "https://bookingmole.com" },
  { label: "InsightMole", href: "https://insightmole.com" },
  { label: "RentACarMole", href: "https://rentacarmole.com" },
  { label: "GamesMole", href: "https://gamesmole.com" },
  { label: "ShoppingMole", href: "https://shoppingmole.com" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-52 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 border-t border-slate-100 px-4 pt-3 pb-1">
            <LanguageSelector locales={["en","th","es","ru","pt-BR","fr","ja","zh","zh-TW","ar","de","id","ko","it","vi"]} className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
