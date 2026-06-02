# BurrowSoft Main Website — TODO4: Complete Thai Localisation

Finish translation coverage and adopt the shared `LanguageSelector` dropdown component.

## Replace LanguageSelector with shared component
Delete `src/components/LanguageSelector.tsx`. In `layout.tsx`:
```tsx
import { LanguageSelector } from "@burrowsoft/shared";
<LanguageSelector locales={["en", "th"]} />
```

Also update `MobileNav.tsx` — replace the existing LanguageSelector import with the shared one.

## Wire remaining hardcoded strings
From Reports3 — these were left pending:

**CTA button labels in `page.tsx`:**
- `"✈ Search flights"`, `"🏨 Find hotels"`, etc. — add `hero.ctaLabels.*` keys to both message files and replace with `t("hero.ctaLabels.flights")` etc.

**Nav links:**
- `"Products"`, `"About"` — keys exist in `nav` namespace, confirm they're wired in `layout.tsx`

## Verify footer strings
- Footer tagline, Products column heading, copyright — confirm all use `getTranslations("footer")`

## Test end-to-end
1. Load page in EN
2. Switch locale dropdown to TH — verify Thai render + Sarabun font
3. Check MobileNav also shows the dropdown (not pill buttons)
4. Switch back to EN
5. Reload — verify cookie persists

## Note on API Stories
Main website does not have region-specific API work. No API Stories folder needed.
