import Link from "next/link";
import { SectionReveal } from "./section-reveal";

export function CTASection() {
  return (
    <section id="contact" style={{ background: "var(--color-violet-mid)", padding: "80px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <SectionReveal delay={0}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-base)", lineHeight: 0.97, maxWidth: "520px" }}>
            Ready to build something{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "#aab6dd" }}>real?</em>
          </h2>
        </SectionReveal>

        <SectionReveal delay={1}>
          <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
            <Link href="mailto:hello@theelementary.co.za" style={{ background: "var(--color-accent)", color: "var(--color-base)", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, padding: "14px 28px", borderRadius: "3px", textDecoration: "none", whiteSpace: "nowrap" }}>
              Start a project
            </Link>
            <Link href="mailto:hello@theelementary.co.za" style={{ border: "1px solid rgba(244,241,234,0.45)", color: "var(--color-base)", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500, padding: "14px 28px", borderRadius: "3px", textDecoration: "none", whiteSpace: "nowrap" }}>
              Talk to us first
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
