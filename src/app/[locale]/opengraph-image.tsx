import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "BurrowSoft — Digging Deep. Building Solutions.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const iconData = await readFile(join(process.cwd(), "public/icon-512.png"));
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #334155 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo + wordmark row */}
        <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={96} height={96} alt="" />
          <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
            <span style={{ fontSize: 90, fontWeight: 900, color: "white", letterSpacing: "-2px" }}>
              burrow
            </span>
            <span style={{ fontSize: 90, fontWeight: 400, color: "#94a3b8", letterSpacing: "-2px" }}>
              soft
            </span>
          </div>
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#64748b",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          DIGGING DEEP. BUILDING SOLUTIONS.
        </div>
        {/* Product pills */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {["FlyMole", "BookingMole", "InsightMole", "RentACarMole", "GamesMole", "ShoppingMole"].map(
            (name) => (
              <div
                key={name}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 99,
                  padding: "8px 20px",
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 18,
                }}
              >
                {name}
              </div>
            )
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 48,
            color: "#475569",
            fontSize: 18,
          }}
        >
          burrowsoft.com
        </div>
      </div>
    ),
    size
  );
}
