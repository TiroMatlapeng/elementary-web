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
    <section id="services" style={{ padding: "80px 32px", background: "var(--color-base)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
        <SectionReveal delay={0}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>
              01 / WHAT WE BUILD
            </span>
            <span style={{ flex: 1, height: "1px", background: "var(--color-border)", display: "block" }} />
          </div>
        </SectionReveal>

        <SectionReveal delay={1}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 900, letterSpacing: "-0.01em", color: "var(--color-ink)", lineHeight: 1.0, marginBottom: "48px", maxWidth: "560px" }}>
            End-to-end engineering,{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-text-muted)" }}>from idea to production.</em>
          </h2>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--color-border)", border: "1px solid var(--color-border)" }}>
          {SERVICES.map(({ num, name, desc }, i) => (
            <SectionReveal key={num} delay={i + 2}>
              <div
                className="service-card"
                style={{ background: "var(--color-base)", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "10px", transition: "background 0.2s", height: "100%" }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--color-ink)", color: "var(--color-accent)", fontFamily: "var(--font-mono)", fontSize: "9px", fontWeight: 500, letterSpacing: "0.06em", width: "24px", height: "24px", borderRadius: "2px", flexShrink: 0 }}>
                  {num}
                </span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 700, color: "var(--color-ink)", letterSpacing: "0.01em" }}>{name}</div>
                <div style={{ fontSize: "12px", lineHeight: 1.65, color: "var(--color-text-muted)" }}>{desc}</div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
