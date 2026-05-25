import { SectionReveal } from "./section-reveal";

const STATS = [
  { num: "12", suffix: "+", label: "Years combined engineering experience" },
  { num: "30", suffix: "+", label: "Platforms built from the ground up" },
  { num: "100", suffix: "%", label: "South African owned and operated" },
  { num: "ZA", suffix: "↗", label: "Building for Africa, starting at home" },
] as const;

export function TrustSection() {
  return (
    <section style={{ padding: "72px 32px", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", background: "var(--color-base)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0" }}>
        {STATS.map(({ num, suffix, label }, i) => (
          <SectionReveal key={num} delay={i}>
            <div style={{ paddingRight: "32px", paddingLeft: i === 0 ? "0" : "32px", borderRight: i < STATS.length - 1 ? "1px solid var(--color-border)" : "none" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--color-ink)", marginBottom: "10px" }}>
                {num}
                <span style={{ background: "var(--color-ink)", color: "var(--color-accent)", fontSize: "0.45em", padding: "0 4px", borderRadius: "2px", verticalAlign: "super", fontWeight: 800 }}>
                  {suffix}
                </span>
              </div>
              <div style={{ fontSize: "12px", lineHeight: 1.6, color: "var(--color-text-muted)", maxWidth: "140px" }}>{label}</div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
