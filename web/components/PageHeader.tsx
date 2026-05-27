import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
};

export default function PageHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <div
      className="hero-bg"
      style={{
        position: "relative",
        padding: "52px 48px 44px",
        borderBottom: "1px solid var(--b0)",
        overflow: "hidden",
      }}
    >
      {/* Radial fade — soften grid on left side */}
      <div
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0, left: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 90% 120% at 5% 50%, " +
            "rgba(255,255,255,0.96) 0%, " +
            "rgba(255,255,255,0.75) 45%, " +
            "transparent 100%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        {eyebrow && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 12,
            }}
          >
            {eyebrow}
          </div>
        )}
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(28px, 4vw, 46px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.05,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontSize: 16,
              color: "var(--text-muted)",
              maxWidth: 560,
              lineHeight: 1.68,
              fontWeight: 300,
              marginTop: 12,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
