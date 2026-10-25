import { SectionReveal } from "./section-reveal";

const SERVICES = [
  { num: "01", name: "Software Engineering", desc: "Full-stack platforms built from scratch. Web, mobile, API — whatever the system demands." },
  { num: "02", name: "App Modernisation", desc: "Legacy systems rebuilt without disruption. We migrate, refactor, and re-architect incrementally." },
  { num: "03", name: "Cloud Migration", desc: "Move to cloud infrastructure that scales. AWS, Azure, GCP — we handle the full transition." },
  { num: "04", name: "Data Warehousing", desc: "Architecture for data at scale. Lakes, warehouses, pipelines that stay clean." },
  { num: "05", name: "BI & Analytics", desc: "Dashboards and reporting that actually get used. Built around how decisions are made." },
  { num: "06", name: "Data Virtualisation", desc: "Unified data access across sources without moving the data. Real-time, federated views." },
] as const;

export function ServicesGrid() {
  return (
    <section id="services" style={{ padding: "72px 32px", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
        <SectionReveal delay={0}>
          <div style={{ fontFamily: "var(--font-ed)", fontSize: "12.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "14px" }}>
            What we build
          </div>
        </SectionReveal>

        <SectionReveal delay={1}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-ink)", lineHeight: 1.05, maxWidth: "720px" }}>
            End-to-end engineering,{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--color-accent)" }}>from idea to production.</em>
          </h2>
        </SectionReveal>

        <div className="svc-grid" style={{ background: "var(--color-border)", borderTop: "1px solid var(--color-border)", marginTop: "44px" }}>
          {SERVICES.map(({ num, name, desc }, i) => (
            <SectionReveal key={num} delay={i + 2}>
              <div style={{ background: "var(--color-surface)", padding: "26px 24px 30px", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ fontFamily: "var(--font-ed)", fontSize: "13px", color: "var(--color-accent)", marginBottom: "12px" }}>{num}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "21px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "8px", letterSpacing: "-0.005em" }}>{name}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>{desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
