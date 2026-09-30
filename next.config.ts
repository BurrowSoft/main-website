import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // OG image routes read these from disk at request time; public/ isn't traced into
  // serverless functions by default, so they 500 with ENOENT on Vercel without this.
  outputFileTracingIncludes: {
    "/[locale]/opengraph-image": ["./public/brand/logo-no-text-dark.png", "./public/brand/solvymed/*.png", "./public/brand/moodbow/*.svg"],
    "/[locale]/websites/opengraph-image": ["./public/favicon.ico"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
