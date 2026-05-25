import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/section-reveal";
import { DicksonLogo } from "@/components/dickson-logo";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Modiri — Vetted Handyman Services | Elementary",
  description:
    "SAPS-checked, referenced, and insured tradespeople who can actually get to you. South Africa's first properly vetted handyman marketplace.",
};

// ── Feature card data ──────────────────────────────────────────────────────

const HOMEOWNER_FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Every worker SAPS vetted",
    body: "Full criminal record checks, verified identity, zero exceptions. You know who is knocking before they knock.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Real references, real people",
    body: "Not anonymous star ratings. References from real people who know their work and stand behind it.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="9 9 11 11 15 7" />
      </svg>
    ),
    title: "Insured work",
    body: "Not happy? Get reimbursed. Real money back, not store credit. Accountability is built into the platform.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "They actually arrive",
    body: "Modiri Van provides transport for workers who need it. No-shows are not acceptable — we remove the barriers that cause them.",
  },
];

const TRADESPERSON_FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Get work",
    body: "Consistent bookings from verified clients who actually intend to pay. No more chasing ghosts.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Get verified",
    body: "SAPS check + skills vetting + real references = a profile that genuinely stands out and clients trust.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Get transport",
    body: "No vehicle? Modiri Van removes the barrier. Distance should not decide who gets work.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Get dignity",
    body: "We're not building a gig economy. We're building a real economy — where skill is recognised and rewarded.",
  },
];

// ── Icon wrapper ───────────────────────────────────────────────────────────

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
      style={{
        background: "var(--color-accent-dim)",
        color: "var(--color-accent)",
        border: "1px solid var(--color-accent-glow)",
      }}
    >
      {children}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ModiriPage() {
  return (
    <main>
      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center text-center pt-32 pb-20 overflow-hidden"
        style={{ background: "var(--color-base)" }}
      >
        {/* Subtle radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -top-16"
          style={{
            width: 640,
            height: 420,
            background:
              "radial-gradient(ellipse at 50% 0%, var(--color-accent-glow) 0%, transparent 70%)",
            transform: "translateX(-50%)",
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)",
          }}
        />

        <div
          className="relative z-10 flex flex-col items-center px-6"
          style={{ maxWidth: "var(--width-content)" }}
        >
          {/* Logo mark */}
          <SectionReveal delay={0}>
            <div
              className="flex items-center justify-center w-24 h-24 rounded-2xl mb-6"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border-hover)",
              }}
            >
              <DicksonLogo className="w-12 h-14 text-accent" />
            </div>
          </SectionReveal>

          {/* Eyebrow */}
          <SectionReveal delay={1}>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              An Elementary product
            </p>
          </SectionReveal>

          {/* Display heading */}
          <SectionReveal delay={2}>
            <h1
              className="font-display font-extrabold leading-tight tracking-tight mb-6"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                color: "var(--color-text-primary)",
              }}
            >
              Modiri
            </h1>
          </SectionReveal>

          {/* Subtitle */}
          <SectionReveal delay={3}>
            <p
              className="text-lg leading-relaxed max-w-2xl"
              style={{ color: "var(--color-text-secondary)" }}
            >
              South Africa&apos;s first properly vetted handyman marketplace.
              SAPS-checked, referenced, insured — and they can actually get to
              you.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── 2. For Homeowners & Businesses ───────────────────────── */}
      <section
        id="homeowners"
        className="py-20"
        style={{ background: "var(--color-base)" }}
      >
        <div
          className="mx-auto px-6"
          style={{ maxWidth: "var(--width-content)" }}
        >
          {/* Section header */}
          <SectionReveal delay={0}>
            <h2
              className="font-display font-bold leading-tight tracking-tight mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "var(--color-text-primary)",
              }}
            >
              You know exactly who&apos;s coming into your home.
            </h2>
          </SectionReveal>
          <SectionReveal delay={1}>
            <p
              className="text-base leading-relaxed max-w-2xl mb-12"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Whether you live alone or not, Modiri means someone is
              accountable before they ever knock on your door. Your name on our
              system. Their record on ours.
            </p>
          </SectionReveal>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {HOMEOWNER_FEATURES.map((feat, i) => (
              <SectionReveal key={feat.title} delay={i + 2}>
                <article
                  className="feature-card flex flex-col gap-4 p-8 rounded-xl border transition-colors duration-200"
                  style={{
                    background: "var(--color-surface)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <FeatureIcon>{feat.icon}</FeatureIcon>
                  <div>
                    <h3
                      className="font-display font-semibold text-base mb-1"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {feat.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {feat.body}
                    </p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>

          {/* B2B callout */}
          <SectionReveal delay={6}>
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-xl border"
              style={{
                background: "var(--color-elevated)",
                borderColor: "var(--color-border-hover)",
              }}
            >
              <div className="flex flex-col gap-1 max-w-xl">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-accent)" }}
                >
                  For insurance, construction &amp; banking teams
                </p>
                <h3
                  className="font-display font-semibold text-lg leading-snug"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Vetted emergency workforce, on demand.
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Rapid-response repairs after claims, verified contractors for
                  site work, reliable tradespeople for property portfolios.
                  Modiri plugs directly into your operations.
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:brightness-110 active:scale-95 flex-shrink-0"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-ink)",
                }}
              >
                Partner with us
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── 3. For Tradespeople ───────────────────────────────────── */}
      <section
        id="tradespeople"
        className="py-20 border-t border-b"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div
          className="mx-auto px-6"
          style={{ maxWidth: "var(--width-content)" }}
        >
          <SectionReveal delay={0}>
            <h2
              className="font-display font-bold leading-tight tracking-tight mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "var(--color-text-primary)",
              }}
            >
              This is your platform.
            </h2>
          </SectionReveal>
          <SectionReveal delay={1}>
            <p
              className="text-base leading-relaxed max-w-2xl mb-12"
              style={{ color: "var(--color-text-secondary)" }}
            >
              South Africa has millions of skilled hands and nowhere near enough
              work. We built Modiri to change that — a platform where your
              ability is the only thing that matters.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TRADESPERSON_FEATURES.map((feat, i) => (
              <SectionReveal key={feat.title} delay={i + 2}>
                <article
                  className="feature-card flex flex-col gap-4 p-8 rounded-xl border transition-colors duration-200"
                  style={{
                    background: "var(--color-elevated)",
                    borderColor: "var(--color-border)",
                  }}
                >
                  <FeatureIcon>{feat.icon}</FeatureIcon>
                  <div>
                    <h3
                      className="font-display font-semibold text-base mb-1"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {feat.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {feat.body}
                    </p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Waitlist CTA ───────────────────────────────────────── */}
      <section
        className="py-24 flex flex-col items-center px-6"
        style={{ background: "var(--color-base)" }}
      >
        <div className="w-full" style={{ maxWidth: 480 }}>
          <SectionReveal delay={0}>
            <div className="text-center mb-8">
              <h2
                className="font-display font-bold leading-tight tracking-tight mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "var(--color-text-primary)",
                }}
              >
                Join the Modiri waitlist
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Be among the first when we launch in your area.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={1}>
            <div
              className="rounded-xl border p-8"
              style={{
                background: "var(--color-elevated)",
                borderColor: "var(--color-border-hover)",
              }}
            >
              <WaitlistForm />
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
