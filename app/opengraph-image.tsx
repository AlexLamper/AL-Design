import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} - ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08080a",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.10), transparent 45%), radial-gradient(circle at 10% 90%, rgba(255,255,255,0.07), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 26,
              background: "linear-gradient(135deg, #ffffff, #cfcfd6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0c",
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 44, fontWeight: 800, color: "#f6f5fc" }}>
            <span>AL</span>
            <span style={{ color: "#a6a6af" }}>Design</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0 18px",
            marginTop: 48,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#f6f5fc",
            maxWidth: 1000,
            letterSpacing: -2,
          }}
        >
          <span>Moderne</span>
          <span>websites</span>
          <span>die</span>
          <span style={{ color: "#a6a6af" }}>opvallen</span>
          <span>én</span>
          <span>opleveren</span>
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#b4b0cf" }}>
          {`Webdesign · Webshops · SEO · Branding - ${site.url.replace("https://", "")}`}
        </div>
      </div>
    ),
    size
  );
}
