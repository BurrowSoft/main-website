# BurrowSoft Main Website — TODO3: Thai Localisation + Language Selector

## Permissions
Ask the user to enable bypass permissions before starting: `claude --dangerously-skip-permissions`.

## Please fill in Reports3.md when done.

## Overview
When a user visits from Thailand (`x-vercel-ip-country: TH`), the main website defaults to Thai. All users get a language selector (EN / TH) in the header.

## Architecture: `next-intl` with cookie-based locale (no URL changes)
- Install `next-intl`
- Messages: `src/messages/en.json` and `src/messages/th.json`
- Locale in `NEXT_LOCALE` cookie
- Locale detection: cookie → `detectCountry()` → TH defaults to `th`, else `en`

## Tasks

### 1. Install and configure next-intl
```bash
npm install next-intl
```
- `src/i18n.ts`, `src/middleware.ts`, wrap layout with `NextIntlClientProvider`

### 2. Translation files

**`src/messages/en.json`**
```json
{
  "nav": { "products": "Products", "about": "About" },
  "hero": {
    "title": "Find better deals.",
    "titleAccent": "No tricks.",
    "subtitle": "Honest search tools for flights, hotels, cars, news, games and shopping. No dark patterns, no hidden fees.",
    "cta": "Explore our products"
  },
  "products": {
    "sectionTitle": "Our Products",
    "flymole": "Compare flights from top airlines",
    "bookingmole": "Find & compare hotels worldwide",
    "insightmole": "Stay informed with top news",
    "rentacarmole": "Compare car rentals worldwide",
    "gamesmole": "Top games live right now",
    "shoppingmole": "Compare product prices"
  },
  "footer": {
    "tagline": "DIGGING DEEP. BUILDING SOLUTIONS.",
    "products": "Products",
    "support": "Support",
    "copyright": "© 2025 BurrowSoft. All rights reserved."
  }
}
```

**`src/messages/th.json`**
```json
{
  "nav": { "products": "ผลิตภัณฑ์", "about": "เกี่ยวกับเรา" },
  "hero": {
    "title": "ค้นหาดีล",
    "titleAccent": "ไม่มีกลโกง",
    "subtitle": "เครื่องมือค้นหาที่ซื่อสัตย์สำหรับตั๋วเครื่องบิน โรงแรม รถเช่า ข่าว เกม และช้อปปิ้ง ไม่มี Dark Pattern ไม่มีค่าธรรมเนียมซ่อน",
    "cta": "สำรวจผลิตภัณฑ์ของเรา"
  },
  "products": {
    "sectionTitle": "ผลิตภัณฑ์ของเรา",
    "flymole": "เปรียบเทียบราคาตั๋วเครื่องบิน",
    "bookingmole": "ค้นหาและเปรียบเทียบโรงแรม",
    "insightmole": "ติดตามข่าวสารทันสมัย",
    "rentacarmole": "เปรียบเทียบราคารถเช่า",
    "gamesmole": "เกมยอดนิยมถ่ายทอดสดตอนนี้",
    "shoppingmole": "เปรียบเทียบราคาสินค้า"
  },
  "footer": {
    "tagline": "ค้นหาลึก สร้างสรรค์โซลูชัน",
    "products": "ผลิตภัณฑ์",
    "support": "ช่วยเหลือ",
    "copyright": "© 2025 BurrowSoft สงวนลิขสิทธิ์"
  }
}
```

### 3. Language selector
`src/components/LanguageSelector.tsx` — 🇬🇧 EN / 🇹🇭 TH, sets cookie + `router.refresh()`. Place in the main nav, right side. Also include in the mobile nav (`MobileNav.tsx`).

### 4. Replace hardcoded strings
Priority: `layout.tsx` (nav), `page.tsx` (hero + product grid + footer).

### 5. Thai font
```tsx
import { Sarabun } from "next/font/google";
const sarabun = Sarabun({ subsets: ["thai", "latin"], weight: ["400", "600", "700"] });
```
