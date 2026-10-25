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

// ── Feature data (numbered, Direction B — no icon cards) ─────────────────────

const HOMEOWNER_FEATURES = [
  {
    num: "01",
    title: "Every worker SAPS vetted",
    body: "Full criminal record checks, verified identity, zero exceptions. You know who is knocking before they knock.",
  },
  {
    num: "02",
    title: "Real references, real people",
    body: "Not anonymous star ratings. References from real people who know their work and stand behind it.",
  },
  {
    num: "03",
    title: "Insured work",
    body: "Not happy? Get reimbursed. Real money back, not store credit. Accountability is built into the platform.",
  },
  {
    num: "04",
    title: "They actually arrive",
    body: "Modiri Van provides transport for workers who need it. No-shows are not acceptable — we remove the barriers that cause them.",
  },
] as const;

const TRADESPERSON_FEATURES = [
  {
    num: "01",
    title: "Get work",
    body: "Consistent bookings from verified clients who actually intend to pay. No more chasing ghosts.",
  },
  {
    num: "02",
    title: "Get verified",
    body: "SAPS check + skills vetting + real references = a profile that genuinely stands out and clients trust.",
  },
  {
    num: "03",
    title: "Get transport",
    body: "No vehicle? Modiri Van removes the barrier. Distance should not decide who gets work.",
  },
  {
    num: "04",
    title: "Get dignity",
    body: "We're not building a gig economy. We're building a real economy — where skill is recognised and rewarded.",
  },
] as const;

// ── Reusable bits ────────────────────────────────────────────────────────────

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-ed)",
        fontSize: "12.5px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-accent)",
        marginBottom: "14px",
      }}
    >
      {children}
    </div>
  );
}

const H2_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(28px, 4.5vw, 44px)",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--color-ink)",
  lineHeight: 1.05,
  maxWidth: "720px",
};

const LEDE_STYLE: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--color-text-secondary)",
  maxWidth: "640px",
  marginTop: "18px",
};

// Numbered hairline grid of features (Direction B). The wrapper background shows
// through the 1px gaps as hairline rules — no cards, no shadows.
function FeatureGrid({
  features,
  cellBg,
}: {
  features: readonly { num: string; title: string; body: string }[];
  cellBg: string;
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-px"
      style={{
        background: "var(--color-border)",
        borderTop: "1px solid var(--color-border)",
        marginTop: "44px",
      }}
    >
      {features.map(({ num, title, body }, i) => (
        <SectionReveal key={num} delay={i + 2}>
          <div
            style={{
              background: cellBg,
              padding: "28px 26px 32px",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-ed)",
                fontSize: "13px",
                color: "var(--color-accent)",
                marginBottom: "12px",
              }}
            >
              {num}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "21px",
                fontWeight: 600,
                color: "var(--color-ink)",
                marginBottom: "8px",
                letterSpacing: "-0.005em",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: 1.6,
                color: "var(--color-text-secondary)",
              }}
            >
              {body}
            </p>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ModiriPage() {
  return (
    <main>
      {/* ── 1. Hero — NAVY band ───────────────────────────────────── */}
      <section
        style={{ paddingTop: "62px", background: "var(--color-secondary)" }}
      >
        <div
          style={{
            maxWidth: "var(--width-content)",
            margin: "0 auto",
            padding: "78px 32px 82px",
          }}
        >
          <SectionReveal delay={0}>
            {/* Bone mark on navy — a logo, not green text. */}
            <span style={{ color: "#f4f5fa", display: "inline-block", marginBottom: "28px" }}>
              <DicksonLogo className="w-11 h-14" />
            </span>
          </SectionReveal>

          {/* Eyebrow — light tint on navy (never green on navy) */}
          <SectionReveal delay={1}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "11px",
                marginBottom: "22px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  background: "#aab6dd",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-ed)",
                  fontSize: "12.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#aab6dd",
                }}
              >
                An Elementary venture
              </span>
            </div>
          </SectionReveal>

          <SectionReveal delay={2}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(46px, 8vw, 88px)",
                lineHeight: 0.98,
                letterSpacing: "-0.015em",
                color: "#f4f5fa",
                maxWidth: "820px",
              }}
            >
              Modiri — the one you can{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#aab6dd" }}>
                use today.
              </em>
            </h1>
          </SectionReveal>

          <SectionReveal delay={3}>
            <p
              style={{
                fontFamily: "var(--font-ed)",
                fontSize: "19px",
                lineHeight: 1.75,
                color: "#c3cbe6",
                maxWidth: "560px",
                marginTop: "26px",
              }}
            >
              South Africa&apos;s first properly vetted handyman marketplace.
              SAPS-checked, referenced, insured — and they can actually get to
              you. It&apos;s in beta right now, and we&apos;re looking for
              testers.
            </p>
          </SectionReveal>

          <SectionReveal delay={4}>
            <div style={{ marginTop: "32px" }}>
              <Link
                href="#waitlist"
                style={{
                  background: "var(--color-light)",
                  color: "var(--color-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  padding: "13px 26px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Request a test invite →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── 2. For Homeowners & Businesses ───────────────────────── */}
      <section
        id="homeowners"
        style={{
          padding: "72px 32px",
          background: "var(--color-base)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
          <SectionReveal delay={0}>
            <Kicker>For homeowners &amp; businesses</Kicker>
          </SectionReveal>
          <SectionReveal delay={1}>
            <h2 style={H2_STYLE}>
              You know exactly who&apos;s{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--color-accent)" }}>
                coming into your home.
              </em>
            </h2>
          </SectionReveal>
          <SectionReveal delay={1}>
            <p style={LEDE_STYLE}>
              Whether you live alone or not, Modiri means someone is accountable
              before they ever knock on your door. Your name on our system.
              Their record on ours.
            </p>
          </SectionReveal>

          <FeatureGrid features={HOMEOWNER_FEATURES} cellBg="var(--color-base)" />
        </div>
      </section>

      {/* ── 3. For Tradespeople ───────────────────────────────────── */}
      <section
        id="tradespeople"
        style={{
          padding: "72px 32px",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
          <SectionReveal delay={0}>
            <Kicker>For tradespeople</Kicker>
          </SectionReveal>
          <SectionReveal delay={1}>
            <h2 style={H2_STYLE}>
              This is{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--color-accent)" }}>
                your platform.
              </em>
            </h2>
          </SectionReveal>
          <SectionReveal delay={1}>
            <p style={LEDE_STYLE}>
              South Africa has millions of skilled hands and nowhere near enough
              work. We built Modiri to change that — a platform where your
              ability is the only thing that matters.
            </p>
          </SectionReveal>

          <FeatureGrid
            features={TRADESPERSON_FEATURES}
            cellBg="var(--color-surface)"
          />
        </div>
      </section>

      {/* ── 4. Tester invite — wraps the WaitlistForm ─────────────── */}
      <section
        id="waitlist"
        style={{
          padding: "72px 32px",
          background: "var(--color-base)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
            {/* Left — the invitation copy */}
            <div>
              <SectionReveal delay={0}>
                <Kicker>Join the beta</Kicker>
              </SectionReveal>
              <SectionReveal delay={1}>
                <h2 style={H2_STYLE}>
                  Help us test Modiri{" "}
                  <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--color-accent)" }}>
                    before everyone else.
                  </em>
                </h2>
              </SectionReveal>
              <SectionReveal delay={1}>
                <p style={{ ...LEDE_STYLE, fontFamily: "var(--font-ed)", fontSize: "16.5px" }}>
                  Leave your details and we&apos;ll send you a proper invite —
                  straight to the right place for your phone. No manual
                  installing, no fuss.
                </p>
              </SectionReveal>

              <SectionReveal delay={2}>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "26px 0 0",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <li style={{ display: "flex", gap: "12px", fontSize: "14.5px", color: "var(--color-text-secondary)", alignItems: "flex-start" }}>
                    <Check />
                    <span>
                      <b style={{ color: "var(--color-ink)" }}>iPhone:</b> you&apos;ll
                      get a TestFlight invite from Apple.
                    </span>
                  </li>
                  <li style={{ display: "flex", gap: "12px", fontSize: "14.5px", color: "var(--color-text-secondary)", alignItems: "flex-start" }}>
                    <Check />
                    <span>
                      <b style={{ color: "var(--color-ink)" }}>Android:</b> you&apos;ll
                      be added to our Google Play test and get the install link
                      by email.
                    </span>
                  </li>
                  <li style={{ display: "flex", gap: "12px", fontSize: "14.5px", color: "var(--color-text-secondary)", alignItems: "flex-start" }}>
                    <Check />
                    <span>We review signups daily and send invites in batches.</span>
                  </li>
                </ul>
              </SectionReveal>

              {/* APK fallback — quiet, links out to modiri.co.za (RULING R8) */}
              <SectionReveal delay={3}>
                <p style={{ marginTop: "24px", fontSize: "13px", color: "var(--color-text-muted)" }}>
                  Prefer to install the Android APK yourself? Grab it from{" "}
                  <a
                    href="https://modiri.co.za/download.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}
                  >
                    modiri.co.za
                  </a>{" "}
                  — but the invite above is the easy way.
                </p>
              </SectionReveal>
            </div>

            {/* Right — the form, in a clean white card */}
            <SectionReveal delay={2}>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "12px",
                  padding: "30px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "20px",
                    color: "var(--color-ink)",
                    marginBottom: "4px",
                  }}
                >
                  Request your test invite
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginBottom: "22px" }}>
                  Takes 20 seconds. POPIA compliant.
                </p>
                <WaitlistForm />
              </div>
            </SectionReveal>
          </div>

          {/* Partner callout — navy outline on bone */}
          <SectionReveal delay={3}>
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              style={{
                marginTop: "48px",
                padding: "28px 30px",
                border: "1px solid var(--color-border)",
                borderRadius: "12px",
                background: "var(--color-surface)",
              }}
            >
              <div style={{ maxWidth: "560px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-ed)",
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-secondary)",
                    marginBottom: "6px",
                  }}
                >
                  For insurance, construction &amp; property teams
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "20px",
                    color: "var(--color-ink)",
                  }}
                >
                  Need a vetted workforce on demand?
                </h3>
                <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                  Rapid-response repairs after claims, verified contractors for
                  site work, reliable trades for property portfolios.
                </p>
              </div>
              <Link
                href="/#contact"
                className="flex-shrink-0 whitespace-nowrap"
                style={{
                  background: "transparent",
                  border: "1.5px solid var(--color-secondary)",
                  color: "var(--color-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Partner with us →
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}

// Small green check used in the tester-invite bullets (green on bone is fine).
function Check() {
  return (
    <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}
