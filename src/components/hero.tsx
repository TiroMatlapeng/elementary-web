import Link from "next/link";
import { SectionReveal } from "./section-reveal";
import { DiagonalCut } from "./diagonal-cut";

export function Hero() {
  return (
    <section style={{ paddingTop: "62px" }}>
      <div style={{ background: "var(--color-violet)", padding: "72px 32px 64px", position: "relative", overflow: "hidden" }}>
        {/* Blueprint registration cross */}
        <div aria-hidden="true" style={{ position: "absolute", top: "28px", right: "56px", width: "20px", height: "20px", background: "linear-gradient(rgba(201,241,53,0.2) 1px, transparent 1px) 50% 0/1px 100%, linear-gradient(90deg, rgba(201,241,53,0.2) 1px, transparent 1px) 0 50%/100% 1px" }} />
        <span aria-hidden="true" style={{ position: "absolute", top: "18px", right: "82px", fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(201,241,53,0.3)" }}>
          REV.001 / ZA-2026
        </span>

        <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
          <SectionReveal delay={0}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <span style={{ display: "block", width: "20px", height: "1px", background: "var(--color-accent)", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(201,241,53,0.65)" }}>
                South African Software Engineering
              </span>
            </div>
          </SectionReveal>

          <SectionReveal delay={1}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em" }}>
              <span style={{ display: "block", fontSize: "clamp(72px, 11vw, 140px)", color: "#f0eafa" }}>ENGI</span>
              <span style={{ display: "block", fontSize: "clamp(72px, 11vw, 140px)", color: "#f0eafa" }}>NEER</span>
              <span style={{ display: "block", fontSize: "clamp(72px, 11vw, 140px)", color: "transparent", WebkitTextStroke: "2px var(--color-accent)" }}>ING</span>
              <span style={{ display: "block", fontSize: "clamp(52px, 7.5vw, 96px)", color: "var(--color-accent)", fontStyle: "italic", marginTop: "8px" }}>
                FROM THE GROUND UP.
              </span>
            </h1>
          </SectionReveal>
        </div>
      </div>

      <DiagonalCut from="var(--color-violet)" to="var(--color-base)" slope="right" />

      <div style={{ background: "var(--color-base)", padding: "40px 32px 64px", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: "var(--width-content)", margin: "0 auto", display: "flex", gap: "80px", alignItems: "flex-start", flexWrap: "wrap" }}>
          <SectionReveal delay={2}>
            <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--color-text-secondary)", maxWidth: "480px", flex: "1 1 320px" }}>
              We build modern platforms from scratch and breathe new life into legacy systems —{" "}
              <strong style={{ color: "var(--color-ink)", fontWeight: 700 }}>precise architecture, real delivery, no filler.</strong>
            </p>
          </SectionReveal>

          <SectionReveal delay={3}>
            <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap", paddingTop: "4px" }}>
              <Link href="#services" style={{ background: "var(--color-ink)", color: "var(--color-base)", fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 700, padding: "13px 26px", borderRadius: "3px", textDecoration: "none" }}>
                Explore our services
              </Link>
              <Link href="/modiri" style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-ink)", textDecoration: "underline", textUnderlineOffset: "4px", whiteSpace: "nowrap" }}>
                Try Modiri →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
