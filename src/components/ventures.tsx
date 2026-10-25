import { SectionReveal } from "./section-reveal";
import { VENTURES, type VentureTier } from "./ventures-data";

const CHIP: Record<VentureTier, { label: string; style: React.CSSProperties }> = {
  live: {
    label: "Beta · live",
    style: { background: "var(--color-accent)", color: "#fff", border: "1.5px solid var(--color-accent)" },
  },
  dev: {
    label: "In development",
    style: { background: "transparent", color: "var(--color-secondary)", border: "1.5px solid var(--color-secondary)" },
  },
};

export function Ventures() {
  return (
    <section id="ventures" style={{ padding: "76px 32px", background: "var(--color-base)", borderTop: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
        <SectionReveal delay={0}>
          <div style={{ fontFamily: "var(--font-ed)", fontSize: "12.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: "14px" }}>
            Our ventures
          </div>
        </SectionReveal>

        <SectionReveal delay={1}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px, 4.5vw, 46px)", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-ink)", lineHeight: 1.04 }}>
            We build and run our{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--color-accent)" }}>own products.</em>
          </h2>
        </SectionReveal>

        <SectionReveal delay={2}>
          <p style={{ fontFamily: "var(--font-ed)", fontSize: "17px", lineHeight: 1.6, color: "var(--color-text-secondary)", maxWidth: "560px", marginTop: "16px" }}>
            Modiri is live and in your hands today. Behind it, more is in development — we&apos;ll say more when each is ready to stand on its own.
          </p>
        </SectionReveal>

        <ul style={{ listStyle: "none", margin: "44px 0 0", padding: 0, borderTop: "1px solid var(--color-border)" }}>
          {VENTURES.map(({ name, description, tier }, i) => (
            <SectionReveal key={name} delay={i + 3}>
              <li style={{ display: "flex", alignItems: "center", gap: "26px", padding: "26px 4px", borderBottom: "1px solid var(--color-border)" }}>
                <span className="venture-num" style={{ fontFamily: "var(--font-ed)", fontSize: "13px", color: "var(--color-text-muted)", minWidth: "22px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(22px, 3vw, 26px)", letterSpacing: "-0.01em", color: "var(--color-ink)" }}>
                    {name}
                  </span>
                  {description && (
                    <span style={{ display: "block", fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "3px" }}>{description}</span>
                  )}
                </span>
                <span style={{ ...CHIP[tier].style, fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "6px 13px", borderRadius: "999px", whiteSpace: "nowrap" }}>
                  {CHIP[tier].label}
                </span>
              </li>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
