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
            <div style={{ fontFamily: "var(--font-ed)", fontSize: "12.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "14px" }}>
              How we build
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-ink)", lineHeight: 1.05, marginBottom: "16px" }}>
              Serious engineers.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--color-accent)" }}>Proven stack.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-ed)", fontSize: "16.5px", lineHeight: 1.7, color: "var(--color-text-secondary)", maxWidth: "360px" }}>
              We choose tools for production, not portfolios. Every technology has real delivery behind it — from core banking integrations to high-throughput data pipelines.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={1}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {TECH_PILLS.map((tech) => (
              <span
                key={tech}
                style={{ display: "inline-block", border: "1px solid var(--color-border)", borderRadius: "3px", padding: "7px 14px", fontSize: "13px", fontWeight: 500, color: "var(--color-text-secondary)", background: "var(--color-base)", transition: "all 0.2s", cursor: "default" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--color-ink)"; el.style.background = "var(--color-ink)"; el.style.color = "var(--color-light)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--color-border)"; el.style.background = "var(--color-base)"; el.style.color = "var(--color-text-secondary)"; }}
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
