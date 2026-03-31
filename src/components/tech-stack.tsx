"use client";

import { SectionReveal } from "@/components/section-reveal";

const TECH_PILLS = [
  "Spring Boot",
  "Angular 19",
  "Flutter",
  "Kubernetes",
  "PostgreSQL",
  "Apache Kafka",
  "TypeScript",
  "Docker",
  "AWS / Azure",
  "Terraform",
  "Redis",
  "GraphQL",
  "Java 21",
  "dbt",
  "Airflow",
  "Tableau",
  "Power BI",
  "QlikView / Qlik Sense",
  "Informatica",
  "SSIS",
  "Oracle",
  "SQL Server",
  "MySQL",
  "MongoDB",
  "AI / MCP",
] as const;

export function TechStack() {
  return (
    <section
      id="tech"
      className="py-20 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div
        className="mx-auto px-6 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16"
        style={{ maxWidth: "var(--width-content)" }}
      >
        {/* Left column */}
        <SectionReveal delay={0}>
          <div>
            <div
              className="border-t-2 w-12 mb-6"
              style={{ borderColor: "var(--color-accent)" }}
            />
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Engineering depth
            </p>
            <h2
              className="font-display font-bold leading-tight mb-4"
              style={{
                fontSize: "1.8rem",
                color: "var(--color-text-primary)",
              }}
            >
              Serious engineers.
              <br />
              Proven stack.
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              We choose tools for production, not portfolios. Every technology
              in our stack has real delivery behind it — from core banking
              integrations to high-throughput data pipelines and cloud-native
              platforms built to scale.
            </p>
          </div>
        </SectionReveal>

        {/* Right column */}
        <SectionReveal delay={1}>
          <div className="flex flex-wrap gap-2">
            {TECH_PILLS.map((tech) => (
              <TechPill key={tech} label={tech} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <span
      className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs border cursor-default transition-colors duration-200"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
        color: "var(--color-text-secondary)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color = "var(--color-accent)";
        el.style.borderColor = "var(--color-accent-glow)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.color = "var(--color-text-secondary)";
        el.style.borderColor = "var(--color-border)";
      }}
    >
      <span
        className="block w-1 h-1 rounded-full flex-shrink-0"
        style={{ background: "var(--color-accent)", opacity: 0.7 }}
      />
      {label}
    </span>
  );
}
