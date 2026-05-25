import { SectionReveal } from "./section-reveal";
import { DiagonalCut } from "./diagonal-cut";

const BELIEFS = [
  {
    conviction: "Good software is not a vibe.",
    body: "It is a series of decisions made with clarity — about architecture, about trade-offs, about what to leave out. We are allergic to filler.",
  },
  {
    conviction: "We do not disappear after delivery.",
    body: "We do not use frameworks because they are popular. We do not ship MVPs that embarrass the people who commissioned them.",
  },
  {
    conviction: "South Africa has enough software designed for somewhere else.",
    body: "We build for here, from here. The infrastructure, the constraints, the users — we know them.",
  },
] as const;

export function ManifestoSection() {
  return (
    <>
      <DiagonalCut from="var(--color-base)" to="var(--color-violet)" slope="left" />

      <section style={{ background: "var(--color-violet)", padding: "72px 32px 56px" }}>
        <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
          <SectionReveal delay={0}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
              <span style={{ width: "16px", height: "1px", background: "var(--color-accent)", display: "block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,241,53,0.5)" }}>
                What we believe
              </span>
            </div>
          </SectionReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
            {BELIEFS.map(({ conviction, body }, i) => (
              <SectionReveal key={conviction} delay={i + 1}>
                <div>
                  <div style={{ height: "2px", background: "rgba(255,255,255,0.08)", marginBottom: "20px" }} />
                  <p style={{ fontSize: "13px", lineHeight: 1.8, color: "rgba(240,234,250,0.65)" }}>
                    <strong style={{ color: "#f0eafa", fontWeight: 700 }}>{conviction}</strong>{" "}{body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(201,241,53,0.35)" }}>
              Elementary · ZA · Est. 2024
            </span>
            <a href="#about" style={{ fontSize: "12px", color: "rgba(240,234,250,0.3)", textDecoration: "none" }}>
              Read our full approach →
            </a>
          </div>
        </div>
      </section>

      <DiagonalCut from="var(--color-violet)" to="var(--color-base)" slope="right" />
    </>
  );
}
