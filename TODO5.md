# BurrowSoft Main Website — TODO5: Complete TODO4 + Shared RegionalFloatingAd

## Permissions
Ask the user to enable bypass permissions before starting: `claude --dangerously-skip-permissions`.

## Please fill in Reports5.md when done.

## Large batch of pending TODO4 changes (uncommitted — verify then commit)
- `src/i18n.ts` — reads NEXT_LOCALE cookie, falls back to country header
- `src/middleware.ts` — seeds cookie on first visit
- `src/messages/en.json` + `th.json` — nav, hero, products, footer
- `src/app/layout.tsx` — NextIntlClientProvider, shared LanguageSelector, Sarabun font
- `src/app/page.tsx` — hero, product cards, CTA labels translated
- `src/components/MobileNav.tsx` — LanguageSelector in mobile nav
- `next.config.ts`, `tsconfig.json`, `package.json` — next-intl setup

## Replace local LazadaFloatingAd with shared RegionalFloatingAd
Delete `src/components/LazadaFloatingAd.tsx`.

In `src/app/layout.tsx`:
```tsx
import { RegionalFloatingAd } from "@burrowsoft/shared";
<RegionalFloatingAd />
```

## Verify packages/shared is clean
`packages/shared/src/providers/flights/amadeus.ts` must NOT exist.

## Verify end-to-end
- EN: strings in English, no floating ad
- TH: strings in Thai, Sarabun font, Lazada ad bottom-right
- MobileNav language dropdown works

## Commit and push + fill Reports5.md