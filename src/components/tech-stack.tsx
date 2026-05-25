"use client";

import { SectionReveal } from "./section-reveal";

const TECH_PILLS = [
  "Spring Boot", "Angular 19", "Flutter", "Kubernetes", "PostgreSQL",
  "Apache Kafka", "TypeScript", "Docker", "AWS / Azure", "Terraform",
  "Redis", "GraphQL", "Java 21", "dbt", "Airflow", "Tableau",
  "Power BI", "QlikView / Qlik Sense", "Informatica", "SSIS",
  "Oracle", "SQL Server", "MySQL", "MongoDB", "AI / MCP",
] as const;

export function TechStack() {
  return (
    <section id="tech" style={{ padding: "72px 32px", background: "var(--color-base)", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", alignItems: "start" }}>
        <SectionReveal delay={0}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                03 / HOW WE BUILD
              </span>
              <span style={{ flex: 1, height: "1px", background: "var(--color-border)", display: "block" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, letterSpacing: "-0.01em", color: "var(--color-ink)", lineHeight: 1.05, marginBottom: "16px" }}>
              Serious engineers.{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-text-muted)" }}>Proven stack.</em>
            </h2>
            <p style={{ fontSize: "13px", lineHeight: 1.75, color: "var(--color-text-secondary)", maxWidth: "340px" }}>
              We choose tools for production, not portfolios. Every technology has real delivery behind it — from core banking integrations to high-throughput data pipelines.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {TECH_PILLS.map((tech) => (
              <span
                key={tech}
                style={{ display: "inline-block", border: "1px solid var(--color-border)", borderRadius: "2px", padding: "6px 12px", fontSize: "11px", fontWeight: 500, color: "var(--color-ink)", background: "var(--color-base)", transition: "all 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--color-ink)"; el.style.background = "var(--color-ink)"; el.style.color = "var(--color-accent)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--color-border)"; el.style.background = "var(--color-base)"; el.style.color = "var(--color-ink)"; }}
              >
                {tech}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
