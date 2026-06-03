# TODO_X: SEO — Google Crawlability & Structured Data

## App: main-website (https://www.burrowsoft.com)

## Permissions
Run with: `claude --dangerously-skip-permissions`

## Do NOT fill a Reports file for this TODO. Just commit and push when done.

## Overview
Three SEO tasks. Do all three. Do NOT change any existing functionality, API routes, or UI.

---

## Task 1 — WebSite JSON-LD in layout.tsx

Add a `<script type="application/ld+json">` tag inside the `<body>` of`src/app/layout.tsx`.

`	sx
const WEBSITE_SCHEMA = { /* see App-specific section below */ };

// Inside the layout return, inside <body>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
/>
`"

---

## Task 2 — hreflang alternate links

Add to the root `metadata` export in `src/app/layout.tsx`:

`	s
alternates: {
  languages: {
    "en": "https://www.burrowsoft.com",
    "th": "https://www.burrowsoft.com",
    "es": "https://www.burrowsoft.com",
    "ru": "https://www.burrowsoft.com",
    "pt-BR": "https://www.burrowsoft.com",
    "fr": "https://www.burrowsoft.com",
    "ja": "https://www.burrowsoft.com",
    "zh": "https://www.burrowsoft.com",
    "zh-TW": "https://www.burrowsoft.com",
    "ar": "https://www.burrowsoft.com",
    "de": "https://www.burrowsoft.com",
    "id": "https://www.burrowsoft.com",
    "ko": "https://www.burrowsoft.com",
    "it": "https://www.burrowsoft.com",
    "vi": "https://www.burrowsoft.com",
    "x-default": "https://www.burrowsoft.com",
  },
},
`"

---

## Task 3 — robots.ts audit

See App-specific section for exact disallow rules.

---

## App-specific: main-website

### WebSite + Organization schema for Task 1

```ts
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.burrowsoft.com/#organization",
      "name": "BurrowSoft",
      "url": "https://www.burrowsoft.com",
      "description": "BurrowSoft builds focused, honest search and aggregation tools. No dark patterns, no hidden fees.",
      "email": "support@burrowsoft.com",
      "sameAs": [
        "https://www.flymole.com",
        "https://www.bookingmole.com",
        "https://www.insightmole.com",
        "https://www.rentacarmole.com",
        "https://www.gamesmole.com",
        "https://www.shoppingmole.com"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.burrowsoft.com/#website",
      "url": "https://www.burrowsoft.com",
      "name": "BurrowSoft",
      "publisher": { "@id": "https://www.burrowsoft.com/#organization" }
    }
  ]
};
```

### robots.ts

Disallow: `["/api/", "/_next/"]`

---

## Commit and push

```bash
git add -A
git commit -m "seo: JSON-LD structured data, hreflang, robots.txt"
git push origin master
vercel deploy --prod --yes --scope burrowsoft
```