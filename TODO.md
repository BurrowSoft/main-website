# BurrowSoft Main Website — TODO

## Permissions
Before starting work, ask the user to enable bypass permissions so you don't get approval prompts on every file operation. They can do this by opening Claude Code settings and setting permission mode to "bypass", or by launching with `claude --dangerously-skip-permissions`.

## Goal
The main website (burrowsoft.com) is the company landing page. It must showcase all 6 BurrowSoft products clearly, with each product represented by its themed Mole mascot variant and a link to its domain.

## Products to Showcase

| App | Brand name | Domain | Mascot prop |
|---|---|---|---|
| flight-booking | FlyMole | flymole.com | Tiny airplane beneath the mole |
| hotel-booking | BookingMole | bookingmole.com | Fancy cocktail + beach parasol |
| news-feed | InsightMole | insightmole.com | Opened newspaper partially covering the mole |
| rent-a-car | RentACarMole | rentacarmole.com | Small car peeking from below |
| games | GamesMole | gamesmole.com | Game controller held by the mole |
| shopping | ShoppingMole | shoppingmole.com | Shopping bags hanging from the mole's hands |

## Mascot Reference
The BurrowSoft Mole mascot is a cute mole with large round glasses, peeking over a ledge — simple black line-art style. Each product has a themed variant adding a prop relevant to that product. See `shared/assets/mascots/` for the SVG files (each app's instance may also have them at `public/mascot.svg`).

## Tasks

### 1. App showcase section
Add a prominent section to the home page (below the hero) that presents all 6 products as cards. Each card:
- Displays the themed mascot SVG for that product
- Shows the brand name (FlyMole, BookingMole, etc.)
- Has a one-line description (e.g. "Compare flights from top airlines")
- Links to the product domain (`https://flymole.com`, etc.) — opens in a new tab
- Has a subtle hover effect (lift/shadow)

Layout: responsive grid, 3 columns on desktop, 2 on tablet, 1 on mobile.

### 2. Mascot SVG assets
The 6 themed mascot SVGs need to be created and placed in this repo at `public/mascots/`:
- `flymole.svg` — mole with a tiny airplane beneath the ledge it's peeking over
- `bookingmole.svg` — mole holding a fancy cocktail glass in one hand and a beach parasol in the other
- `insightmole.svg` — mole with an opened newspaper folded and partially covering the lower half of its face
- `rentacarmole.svg` — mole with a small cartoon car visible beneath/beside the ledge
- `gamesmole.svg` — mole holding a game controller (hands/paws visible above the ledge gripping the controller)
- `shoppingmole.svg` — mole with shopping bags hanging from its hands/paws

Style requirements for all SVGs:
- Match the line-art style of the base mascot (black strokes, minimal fill, same glasses and face proportions)
- All props drawn in the same stroke weight as the mole itself
- SVG viewBox should be consistent across all variants (e.g. 0 0 200 200) so they display uniformly in the grid
- Each SVG should have clearly named groups: `<g id="mole-base">` and `<g id="prop">` for maintainability

### 3. OG image / social thumbnail for main-website
- `public/og-image.png` — 1200×630px, BurrowSoft logo/wordmark centred on a neutral brand background, tagline below ("Honest search tools, zero dark patterns")
- `public/favicon.ico` — base mole head, 32×32 and 16×16 sizes
- `public/apple-touch-icon.png` — 180×180px, mole head on brand background colour
- Wire into `src/app/layout.tsx` metadata (icons, openGraph.images)

### 4. Hero section update
Update the hero to reflect all 6 products being live:
- Headline: something like "Find better deals. No tricks."
- Subheadline: list the 6 product categories (flights, hotels, cars, news, games, shopping)
- Primary CTA: could cycle through the 6 products or link to the most mature one
- Background or decoration: could use a collage of all 6 mascot variants

### 5. Footer — product links + branding
- "Products" column: all 6 apps with their domains and a one-line description each
- BurrowSoft logo (mole + wordmark) in the footer, prominently placed
- Tagline: "DIGGING DEEP. BUILDING SOLUTIONS."
- Support email: support@burrowsoft.com
- Copyright: "© 2025 BurrowSoft. All rights reserved."

### 6. Place brand logo assets in public/
Copy all brand asset variations from the provided brand kit into `public/brand/`:
- `burrowsoft-logo-horizontal.svg` — full horizontal logo (mole + wordmark + tagline)
- `burrowsoft-logo-compact.svg` — mole + wordmark only (no tagline)
- `burrowsoft-logo-dark.svg` — white version for dark backgrounds
- `burrowsoft-icon.svg` — mole icon only (for favicons and small spaces)
These will be referenced by all 6 product apps' footers.
