import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BurrowSoft — Software systems, built deep.";

async function dataUri(file: string, mime: string) {
  const data = await readFile(join(process.cwd(), "public", file));
  return `data:${mime};base64,${data.toString("base64")}`;
}

export default async function OGImage() {
  const [moleSrc, solvymedSrc, moodbowSrc] = await Promise.all([
    dataUri("brand/logo-no-text-dark.png", "image/png"),
    dataUri("brand/solvymed/solvymed-app-icon-blue-192.png", "image/png"),
    dataUri("brand/moodbow/moodbow-app-icon-light.svg", "image/svg+xml"),
  ]);

  const pill = {
    display: "flex",
    alignItems: "center",
    gap: 18,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 24,
    padding: "16px 28px 16px 16px",
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)",
          fontFamily: "sans-serif",
          padding: "72px 88px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={moleSrc} width={100} height={72} alt="" style={{ borderRadius: 16 }} />
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 76, fontWeight: 900, color: "white", letterSpacing: "-2px" }}>burrow</span>
            <span style={{ fontSize: 76, fontWeight: 400, color: "#a5b4fc", letterSpacing: "-2px" }}>soft</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 54, fontWeight: 800, color: "white", marginTop: 36, letterSpacing: "-1px" }}>
          Software systems, built deep.
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#a5b4fc", letterSpacing: "4px", marginTop: 14 }}>
          DIGGING DEEP. BUILDING SOLUTIONS.
        </div>

        <div style={{ display: "flex", gap: 20, marginTop: 52 }}>
          <div style={pill}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={solvymedSrc} width={64} height={64} alt="" style={{ borderRadius: 16 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 700, color: "white" }}>SolvyMed</span>
              <span style={{ fontSize: 18, color: "#A9D6EC" }}>Clinic management, simplified.</span>
            </div>
          </div>
          <div style={pill}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={moodbowSrc} width={64} height={64} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 30, fontWeight: 700, color: "white" }}>Moodbow</span>
              <span style={{ fontSize: 18, color: "#F7C3D3" }}>Coming soon</span>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 44, right: 88, display: "flex", color: "#94a3b8", fontSize: 20 }}>
          burrowsoft.com
        </div>
      </div>
    ),
    size
  );
}
