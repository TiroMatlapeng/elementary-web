import Link from "next/link";
import { SectionReveal } from "./section-reveal";

export function Hero() {
  return (
    <section style={{ paddingTop: "62px", background: "var(--color-base)", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto", padding: "84px 32px 70px" }}>
        <SectionReveal delay={0}>
          <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "22px" }}>
            <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-accent)", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-ed)", fontSize: "12.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)" }}>
              South African Software Engineering
            </span>
          </div>
        </SectionReveal>

        <SectionReveal delay={1}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(46px, 8vw, 94px)", lineHeight: 0.96, letterSpacing: "-0.015em", color: "var(--color-ink)" }}>
            Engineering,
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--color-accent)" }}>from the ground up.</em>
          </h1>
        </SectionReveal>

        <SectionReveal delay={2}>
          <p style={{ fontFamily: "var(--font-ed)", fontSize: "19px", lineHeight: 1.75, color: "var(--color-text-secondary)", maxWidth: "540px", marginTop: "28px" }}>
            We build modern platforms from scratch and breathe new life into legacy systems — precise architecture, real delivery, no filler.
          </p>
        </SectionReveal>

        <SectionReveal delay={3}>
          <div style={{ display: "flex", gap: "18px", alignItems: "center", flexWrap: "wrap", marginTop: "34px" }}>
            <Link href="#services" style={{ background: "var(--color-ink)", color: "var(--color-base)", fontFamily: "var(--font-body)", fontSize: "13.5px", fontWeight: 600, padding: "13px 26px", borderRadius: "4px", textDecoration: "none" }}>
              Explore our services
            </Link>
            <Link href="/modiri" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--color-accent)", textDecoration: "underline", textUnderlineOffset: "5px", whiteSpace: "nowrap" }}>
              Try Modiri →
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
