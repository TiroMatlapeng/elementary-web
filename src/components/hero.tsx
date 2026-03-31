import Link from "next/link";
import { SectionReveal } from "./section-reveal";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-24"
        style={{
          width: 900,
          height: 600,
          background:
            "radial-gradient(ellipse at 50% 0%, var(--color-accent-glow) 0%, transparent 70%)",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      {/* Floating orb — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: 480,
          height: 480,
          top: "10%",
          right: "-8%",
          background: "var(--color-accent)",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.18,
          animation: "drift 14s ease-in-out infinite",
        }}
      />

      {/* Floating orb — bottom left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: 360,
          height: 360,
          bottom: "8%",
          left: "-6%",
          background: "var(--color-accent)",
          borderRadius: "50%",
          filter: "blur(80px)",
          opacity: 0.1,
          animation: "drift 18s ease-in-out infinite reverse",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full mx-auto px-6"
        style={{ maxWidth: "var(--width-content)" }}
      >
        {/* Eyebrow badge */}
        <SectionReveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
            style={{
              background: "var(--color-accent-dim)",
              borderColor: "var(--color-accent-glow)",
            }}
          >
            <span
              className="block w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--color-accent)",
                animation: "blink 2s ease-in-out infinite",
              }}
            />
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: "var(--color-accent)" }}
            >
              South African Software Engineering
            </span>
          </div>
        </SectionReveal>

        {/* Headline */}
        <SectionReveal delay={1}>
          <h1
            className="font-display font-extrabold leading-[1.06] tracking-tight mb-6"
            style={{
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "var(--color-text-primary)",
            }}
          >
            Engineering from the{" "}
            <em
              className="not-italic"
              style={{ color: "var(--color-accent)" }}
            >
              ground up.
            </em>
          </h1>
        </SectionReveal>

        {/* Subtitle */}
        <SectionReveal delay={2}>
          <p
            className="text-lg leading-relaxed max-w-xl mb-10"
            style={{ color: "var(--color-text-secondary)" }}
          >
            We build modern platforms from scratch and breathe new life into
            legacy systems — precise architecture, real delivery, no filler.
          </p>
        </SectionReveal>

        {/* CTAs */}
        <SectionReveal delay={3}>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-text-dark)",
              }}
            >
              Explore our services
            </Link>
            <Link
              href="/dickson"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border transition-all duration-200 hover:bg-white/5 active:scale-95"
              style={{
                borderColor: "var(--color-border-hover)",
                color: "var(--color-text-primary)",
              }}
            >
              Try Dickson
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
