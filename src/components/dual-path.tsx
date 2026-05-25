"use client";

import Link from "next/link";
import { SectionReveal } from "./section-reveal";

export function DualPath() {
  return (
    <section id="products" style={{ padding: "80px 32px", background: "var(--color-base)", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "80px", alignItems: "start" }}>
        <div>
          <SectionReveal delay={0}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "12px" }}>
              02 / OUR PRODUCT
            </div>
          </SectionReveal>

          <SectionReveal delay={1}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.01em", color: "var(--color-ink)", lineHeight: 1.0, marginBottom: "20px" }}>
              Meet <em style={{ fontStyle: "italic" }}>Modiri.</em><br />
              The handyman app<br />
              built for South Africa.
            </h2>
          </SectionReveal>

          <SectionReveal delay={2}>
            <p style={{ fontSize: "14px", lineHeight: 1.75, color: "var(--color-text-secondary)", marginBottom: "32px", maxWidth: "400px" }}>
              A two-sided marketplace connecting homeowners with trusted, verified tradespeople. Real jobs. Real artisans. No friction.
            </p>
          </SectionReveal>

          <SectionReveal delay={3}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "var(--color-border)", border: "1px solid var(--color-border)" }}>
              {[
                { key: "Launch", val: "Q3 2026", dark: false },
                { key: "Market", val: "South Africa", dark: false },
                { key: "Status", val: "Waitlist open", dark: true },
              ].map(({ key, val, dark }) => (
                <div key={key} style={{ background: dark ? "var(--color-ink)" : "var(--color-base)", padding: "14px 16px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(201,241,53,0.45)" : "var(--color-text-muted)", marginBottom: "4px" }}>{key}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: dark ? "var(--color-accent)" : "var(--color-ink)" }}>{val}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={2}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { title: "I need a handyman", desc: "Browse verified tradespeople in your area. Book, pay, and review — all in one place.", cta: "Register interest →", href: "/modiri#waitlist" },
              { title: "I am a tradesperson", desc: "Get found by clients near you. Zero commission on your first 10 jobs.", cta: "Join the waitlist →", href: "/modiri#waitlist" },
            ].map(({ title, desc, cta, href }) => (
              <div
                key={title}
                style={{ border: "1px solid var(--color-border)", padding: "22px", borderRadius: "4px", transition: "border-color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(15,10,32,0.2)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)")}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--color-ink)", marginBottom: "6px" }}>{title}</div>
                <div style={{ fontSize: "12px", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{desc}</div>
                <Link href={href} style={{ display: "inline-block", marginTop: "12px", fontSize: "12px", fontWeight: 700, color: "var(--color-ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
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
