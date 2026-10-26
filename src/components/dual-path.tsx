"use client";

import Link from "next/link";
import { SectionReveal } from "./section-reveal";

export function DualPath() {
  return (
    <section id="products" style={{ padding: "72px 32px", background: "var(--color-base)", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "64px", alignItems: "start" }}>
        <div>
          <SectionReveal delay={0}>
            <div style={{ fontFamily: "var(--font-ed)", fontSize: "12.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "14px" }}>
              Our product
            </div>
          </SectionReveal>

          <SectionReveal delay={1}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-ink)", lineHeight: 1.05, marginBottom: "20px" }}>
              Meet <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--color-accent)" }}>Modiri</em> — the handyman app built for South Africa.
            </h2>
          </SectionReveal>

          <SectionReveal delay={2}>
            <p style={{ fontFamily: "var(--font-ed)", fontSize: "17px", lineHeight: 1.7, color: "var(--color-text-secondary)", marginBottom: "36px", maxWidth: "440px" }}>
              A two-sided marketplace connecting homeowners with trusted, verified tradespeople. Real jobs. Real artisans. No friction.
            </p>
          </SectionReveal>

          <SectionReveal delay={3}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "var(--color-border)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
              {[
                { key: "Launch", val: "Q3 2026", accent: false },
                { key: "Market", val: "South Africa", accent: false },
                { key: "Status", val: "Waitlist open", accent: true },
              ].map(({ key, val, accent }) => (
                <div key={key} style={{ background: "var(--color-base)", padding: "18px 18px 20px" }}>
                  <div style={{ fontFamily: "var(--font-ed)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "6px" }}>{key}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 600, color: accent ? "var(--color-accent)" : "var(--color-ink)" }}>{val}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { title: "I need a handyman", desc: "Browse verified tradespeople in your area. Book, pay, and review — all in one place.", cta: "Register interest →", href: "/modiri#waitlist" },
              { title: "I am a tradesperson", desc: "Get found by clients near you. Zero commission on your first 10 jobs.", cta: "Join the waitlist →", href: "/modiri#waitlist" },
            ].map(({ title, desc, cta, href }) => (
              <div
                key={title}
                style={{ border: "1px solid var(--color-border)", padding: "26px 28px", borderRadius: "4px", background: "var(--color-base)", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-hover)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "8px", letterSpacing: "-0.005em" }}>{title}</div>
                <div style={{ fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{desc}</div>
                <Link href={href} style={{ display: "inline-block", marginTop: "16px", fontSize: "13.5px", fontWeight: 600, color: "var(--color-accent)", textDecoration: "underline", textUnderlineOffset: "5px" }}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
