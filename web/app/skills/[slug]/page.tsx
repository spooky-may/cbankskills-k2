import { notFound } from "next/navigation";
import Link from "next/link";
import { verticals } from "@/content/verticals";
import PageHeader from "@/components/PageHeader";

type Props = { params: { slug: string } };

const GITHUB_BASE = "https://github.com/spooky-may/project-jane-street/tree/main/skills/plugins/vertical-plugins";

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export default function VerticalPage({ params }: Props) {
  const v = verticals.find((v) => v.slug === params.slug);
  if (!v) notFound();

  const githubUrl = `${GITHUB_BASE}/${v.slug}`;

  return (
    <>
      <PageHeader
        eyebrow={`${v.skills.length} skills · v${v.version}`}
        title={v.title}
        subtitle={v.tagline}
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginBottom: 32, display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <Link href="/skills" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Skills</Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <span style={{ color: "var(--text-muted)" }}>{v.title}</span>
        </nav>

        {/* Description + CTAs */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.75, fontWeight: 300, marginBottom: 24 }}>
            {v.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "var(--accent)", color: "#fff", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, padding: "10px 20px", borderRadius: 7, textDecoration: "none" }}
            >
              Download from GitHub →
            </a>
            <a
              href="https://claude.ai/customize/skills"
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: "1px solid var(--b1)", color: "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 7, textDecoration: "none", background: "transparent" }}
              className="btn-outline"
            >
              Upload to Claude Skills
            </a>
            <Link href="/docs" style={{ fontSize: 13, color: "var(--text-muted)", alignSelf: "center", textDecoration: "none" }}>
              How to install →
            </Link>
          </div>
        </div>

        {/* Install command */}
        <div style={{ background: "var(--s1)", border: "1px solid var(--b0)", borderRadius: 10, padding: "16px 20px", marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
            CLI Install
          </div>
          <code style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--accent)" }}>{v.installCommand}</code>
        </div>

        {/* Skills grid */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
            Included skills
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 20 }}>
            {v.skills.length} skills{" "}
            <span style={{ color: "var(--text-fade)" }}>in this vertical</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {v.skills.map((s) => (
              <Link
                key={s.slug}
                href={`/skills/${v.slug}/${s.slug}`}
                className="skill-card group"
                style={{
                  background: "var(--s1)",
                  border: "1px solid var(--b0)",
                  borderRadius: 12,
                  padding: "18px 20px",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", letterSpacing: "-0.01em" }}>
                    {s.name}
                  </h3>
                  <code style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--accent)", background: "var(--accent-dim)", padding: "3px 7px", borderRadius: 4, flexShrink: 0 }}>
                    /{s.slug}
                  </code>
                </div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, fontWeight: 300 }}>
                  {s.description}
                </p>
                <div style={{ fontSize: 11, color: "rgba(13,31,20,0.4)" }}>
                  <span style={{ fontWeight: 500, color: "var(--text-muted)" }}>Best for: </span>{s.bestFor}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", opacity: 0, transition: "opacity 0.15s" }} className="group-hover:opacity-100">
                  View full details + download →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other verticals */}
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
            Other verticals
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {verticals
              .filter((other) => other.slug !== v.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/skills/${other.slug}`}
                  style={{
                    background: "var(--s1)",
                    border: "1px solid var(--b0)",
                    color: "var(--text-muted)",
                    fontSize: 12,
                    padding: "6px 14px",
                    borderRadius: 6,
                    textDecoration: "none",
                    transition: "border-color 0.15s, color 0.15s",
                    fontFamily: "var(--font-sans)",
                  }}
                  className="btn-outline"
                >
                  {other.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
