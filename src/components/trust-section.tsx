import { SectionReveal } from "@/components/section-reveal";

const BADGES = [
  "Insurance companies",
  "Commercial banks",
  "Construction firms",
  "Marketplace operators",
] as const;

export function TrustSection() {
  return (
    <section className="py-20">
      <div
        className="mx-auto px-6 text-center"
        style={{ maxWidth: "var(--width-content)" }}
      >
        <SectionReveal delay={0}>
          <p
            className="text-sm mb-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            Trusted by teams across
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full text-xs border"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
