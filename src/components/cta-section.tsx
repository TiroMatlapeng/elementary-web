import Link from "next/link";
import { SectionReveal } from "./section-reveal";

export function CTASection() {
  return (
    <section id="contact" style={{ background: "var(--color-violet-mid)", padding: "80px 32px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,241,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,241,53,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <SectionReveal delay={0}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#f0eafa", lineHeight: 0.97, maxWidth: "520px" }}>
            Ready to build something{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>real?</em>
          </h2>
        </SectionReveal>

        <SectionReveal delay={1}>
          <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
            <Link href="mailto:hello@theelementary.co.za" style={{ background: "var(--color-accent)", color: "var(--color-ink)", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 800, padding: "14px 28px", borderRadius: "3px", textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase" as const, whiteSpace: "nowrap" }}>
              Start a project
            </Link>
            <Link href="mailto:hello@theelementary.co.za" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(240,234,250,0.65)", fontSize: "13px", padding: "14px 28px", borderRadius: "3px", textDecoration: "none", whiteSpace: "nowrap" }}>
              Talk to us first
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
