"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { LanguageSelector, MenuIcon, CloseIcon } from "@burrowsoft/shared";
import { Link } from "@/i18n/navigation";

export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const links = [
    { label: t("systems"), href: { pathname: "/", hash: "systems" } },
    { label: t("websites"), href: { pathname: "/websites" } },
    { label: t("contact"), href: { pathname: "/", hash: "contact" } },
  ];

  return (
    <div ref={ref} className="relative md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("closeMenu") : t("openMenu")}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      {open && (
        <div id="mobile-menu" className="absolute end-0 top-11 z-50 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-slate-100 px-4 pt-3 pb-1">
            <LanguageSelector locales={["en","th","es","ru","pt-BR","fr","ja","zh","zh-TW","ar","de","id","ko","it","vi"]} className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
