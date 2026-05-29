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
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(168,85,247,0.18), transparent 45%), radial-gradient(circle at 10% 90%, rgba(99,102,241,0.20), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 26,
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 44, fontWeight: 800, color: "#0f172a" }}>
            <span>AL</span>
            <span style={{ color: "#6366f1" }}>Design</span>
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
            color: "#0f172a",
            maxWidth: 1000,
            letterSpacing: -2,
          }}
        >
          <span>Moderne</span>
          <span>websites</span>
          <span>die</span>
          <span style={{ color: "#6366f1" }}>opvallen</span>
          <span>én</span>
          <span>opleveren</span>
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#475569" }}>
          {`Webdesign · Webshops · SEO · Branding - ${site.url.replace("https://", "")}`}
        </div>
      </div>
    ),
    size
  );
}
