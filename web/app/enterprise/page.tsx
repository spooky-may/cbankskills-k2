import Link from "next/link";
import { verticals } from "@/content/verticals";
import PageHeader from "@/components/PageHeader";

const SKILLS_GITHUB = "https://github.com/spooky-may/project-jane-street/tree/main/skills";
const totalSkills = verticals.reduce((acc, v) => acc + v.skills.length, 0);

const USE_CASES = [
  {
    vertical: "investment-banking",
    eyebrow: "M&A workflow",
    heading: "From data room to CIM in hours.",
    body: "Pitch decks, CIMs, buyer lists, merger models — the full sell-side package. What used to take a junior analyst a week now ships before the weekend.",
    trigger: "/cim-builder Draft CIM for SaaS co — data room attached",
    result: "50-page CIM draft with exec summary and financials ready",
  },
  {
    vertical: "equity-research",
    eyebrow: "Research operations",
    heading: "Earnings note drafted before market open.",
    body: "Feed it a transcript and a prior model. Get a 400-word morning note with beat/miss, key takeaways, and revised thesis. Every quarter, every name in coverage.",
    trigger: "/morning-note NVDA Q2 — maintain Buy, attached transcript",
    result: "Morning note ready in under 2 minutes",
  },
  {
    vertical: "private-equity",
    eyebrow: "Deal workflow",
    heading: "IC memo in a day, not a week.",
    body: "Screen inbound CIMs against your fund criteria, run returns sensitivity, and draft the IC memo — all from the same data room you already have.",
    trigger: "/ic-memo Write IC memo for $250M acquisition — attached DD",
    result: "Structured 20-page IC memo with thesis, risks, and recommendation",
  },
];

const WHY = [
  {
    icon: "◆",
    title: "No new vendor",
    body: "Runs entirely inside Claude for Work. No external API, no data leaving your Claude environment, no additional vendor contracts to negotiate.",
  },
  {
    icon: "◆",
    title: "Modify for your firm",
    body: "Apache-2.0 licensed. Fork the repo, edit the SKILL.md files to match your templates, terminology, and output format. Your workflows, your standards.",
  },
  {
    icon: "◆",
    title: "Plugs into your data feeds",
    body: "Optional MCP connectors for FactSet, Bloomberg/LSEG, PitchBook, Morningstar, S&P Global, Chronograph, and Daloopa. Use what you already subscribe to.",
  },
];

const STEPS = [
  { n: "01", title: "Browse and download", desc: "Pick the skills your team needs from the directory. Download the ZIP — one skill or the entire vertical." },
  { n: "02", title: "Upload to Claude", desc: "Open claude.ai/customize/skills, upload the ZIP. Appears as a slash command for your entire Claude workspace immediately." },
  { n: "03", title: "Team starts using it", desc: "Type /skill-name in Claude, attach a file, describe the task. No configuration. No training. It just works." },
];

export default function EnterprisePage() {
  return (
    <>
      <PageHeader
        eyebrow="For financial services teams"
        title={
          <>
            Production AI workflows.{" "}
            <span style={{ color: "var(--text-fade)" }}>Deploy in minutes.</span>
          </>
        }
        subtitle={`${totalSkills} production-ready Claude skills for investment banking, equity research, private equity, and fund operations. No API keys. No vendor lock-in. Your data stays in Claude for Work.`}
      />

      {/* Stats */}
      <div style={{
        borderBottom: "1px solid var(--b0)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
        className="stats-bar"
      >
        {[
          { n: String(totalSkills), label: "production skills" },
          { n: "7",               label: "financial verticals" },
          { n: "< 5 min",         label: "to deploy" },
          { n: "Apache-2.0",      label: "open source" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{ padding: "28px 0", textAlign: "center", borderRight: "1px solid var(--b0)" }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", lineHeight: 1 }}>
              {stat.n}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 6 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Use cases — dark section */}
      <section
        className="bg-diamond-dark"
        style={{ background: "var(--text)", padding: "80px 0" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(46,139,87,0.7)", marginBottom: 12 }}>
            ◆ Use cases
          </div>
          <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginBottom: 48, maxWidth: 520 }}>
            What your team will actually use it for
          </h2>

          <div className="grid lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc) => (
              <div
                key={uc.vertical}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "24px 22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(46,139,87,0.7)", marginBottom: 8 }}>
                    {uc.eyebrow}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.3, marginBottom: 8 }}>
                    {uc.heading}
                  </h3>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, fontWeight: 300 }}>
                    {uc.body}
                  </p>
                </div>

                <div style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(46,139,87,0.18)",
                  borderLeft: "2px solid rgba(46,139,87,0.4)",
                  borderRadius: 6,
                  padding: "10px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>
                    <span style={{ color: "var(--accent)", marginRight: 8 }}>›</span>
                    {uc.trigger}
                  </div>
                  <div style={{ color: "rgba(46,139,87,0.7)", fontSize: 10 }}>
                    ✓ {uc.result}
                  </div>
                </div>

                <Link
                  href={`/skills/${uc.vertical}`}
                  style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(46,139,87,0.7)", textDecoration: "none", letterSpacing: "0.02em" }}
                >
                  View vertical →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid var(--b0)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
            ◆ Why CBANK
          </div>
          <h2 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 48, maxWidth: 480 }}>
            Built for firms that care about{" "}
            <span style={{ color: "var(--text-fade)" }}>security and control.</span>
          </h2>

          <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
            {WHY.map((w, i) => (
              <div
                key={w.title}
                style={{
                  padding: "32px 28px",
                  borderRight: i < 2 ? "1px solid var(--b0)" : "none",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--accent)", marginBottom: 14, opacity: 0.6 }}>
                  {w.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 10 }}>
                  {w.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, fontWeight: 300 }}>
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deploy steps */}
      <section style={{ padding: "80px 0", background: "var(--s1)", borderBottom: "1px solid var(--b0)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
            ◆ Deployment
          </div>
          <h2 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 48 }}>
            Three steps.{" "}
            <span style={{ color: "var(--text-fade)" }}>No setup required.</span>
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div
                key={step.n}
                style={{
                  background: "#fff",
                  border: "1px solid var(--b0)",
                  borderRadius: 12,
                  padding: "24px 22px",
                }}
              >
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 28,
                  fontWeight: 800,
                  color: "var(--accent-dim)",
                  letterSpacing: "-0.04em",
                  marginBottom: 16,
                  lineHeight: 1,
                  WebkitTextStroke: "1px var(--accent-mid)",
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7, fontWeight: 300 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link
              href="/docs"
              style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}
            >
              Read the full install guide →
            </Link>
          </div>
        </div>
      </section>

      {/* Verticals grid */}
      <section style={{ padding: "60px 0", borderBottom: "1px solid var(--b0)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
            ◆ All verticals
          </div>
          <h2 style={{ fontSize: "clamp(20px,2vw,28px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 28 }}>
            {verticals.length} verticals,{" "}
            <span style={{ color: "var(--text-fade)" }}>{totalSkills} skills total.</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/skills/${v.slug}`}
                className="skill-card group"
                style={{
                  background: "var(--s1)",
                  border: "1px solid var(--b0)",
                  borderRadius: 10,
                  padding: "16px 18px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 3 }}>
                    {v.title}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 300 }}>
                    {v.tagline}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--accent)", background: "var(--accent-dim)", padding: "2px 7px", borderRadius: 3 }}>
                    {v.skills.length} skills
                  </span>
                  <span style={{ fontSize: 11, color: "var(--accent)", opacity: 0, transition: "opacity 0.15s" }} className="group-hover:opacity-100">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6" style={{ padding: "64px 24px" }}>
        <div
          className="bg-diamond-dark"
          style={{ background: "var(--text)", borderRadius: 14, padding: "56px 48px", textAlign: "center" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(46,139,87,0.7)", marginBottom: 12 }}>
            Get started
          </div>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", marginBottom: 10 }}>
            Ready to deploy?
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.70)", marginBottom: 28, fontWeight: 300, maxWidth: 420, margin: "0 auto 28px" }}>
            Browse the skills directory or read the install guide. No account required to browse — Claude for Work needed to deploy.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/skills"
              style={{
                background: "var(--accent)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                padding: "10px 22px",
                borderRadius: 7,
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              Browse all {totalSkills} skills →
            </Link>
            <Link
              href="/docs"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 22px",
                borderRadius: 7,
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              Read install guide
            </Link>
            <a
              href={SKILLS_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: 13,
                fontWeight: 500,
                padding: "10px 22px",
                borderRadius: 7,
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
