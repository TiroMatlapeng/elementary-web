import { SectionReveal } from "./section-reveal";

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
    conviction: "Enough software is designed for somewhere else.",
    body: "We build for South Africa, from South Africa. The infrastructure, the constraints, the users — we know them.",
  },
] as const;

export function ManifestoSection() {
  return (
    <section style={{ background: "var(--color-elevated)", padding: "72px 32px", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
        <SectionReveal delay={0}>
          <div style={{ fontFamily: "var(--font-ed)", fontSize: "12.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "32px" }}>
            What we believe
          </div>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
          {BELIEFS.map(({ conviction, body }, i) => (
            <SectionReveal key={conviction} delay={i + 1}>
              <div>
                <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "20px" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "21px", fontWeight: 600, color: "var(--color-ink)", lineHeight: 1.15, marginBottom: "12px", letterSpacing: "-0.005em" }}>
                  {conviction}
                </h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
                  {body}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-ed)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
            Elementary · ZA · Est. 2024
          </span>
          <a href="#about" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--color-accent)", textDecoration: "underline", textUnderlineOffset: "5px" }}>
            Read our full approach →
          </a>
        </div>
      </div>
    </section>
  );
}
