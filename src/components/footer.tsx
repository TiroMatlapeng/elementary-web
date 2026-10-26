"use client";

import Link from "next/link";

const SERVICE_LINKS = [
  { label: "Software Engineering", href: "/#services" },
  { label: "App Modernisation", href: "/#services" },
  { label: "Cloud Migration", href: "/#services" },
  { label: "Data Warehousing", href: "/#services" },
  { label: "BI & Analytics", href: "/#services" },
] as const;

const PRODUCT_LINKS = [
  { label: "Modiri", href: "/modiri" },
  { label: "For homeowners", href: "/modiri#homeowners" },
  { label: "For tradespeople", href: "/modiri#tradespeople" },
  { label: "Join the waitlist", href: "/modiri#waitlist" },
] as const;

const COMPANY_LINKS = [
  { label: "About Elementary", href: "/#about" },
  { label: "Our approach", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

function FooterColumn({ heading, links }: { heading: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-ed)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(244,241,234,0.6)", marginBottom: "14px" }}>
        {heading}
      </div>
      {links.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          style={{ display: "block", fontSize: "13px", color: "#cfcad9", textDecoration: "none", marginBottom: "10px", transition: "color 0.2s" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f4f1ea")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#cfcad9")}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-ink)", padding: "60px 32px 36px" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-base)" }}>
                Elementary<span style={{ color: "#cfcad9" }}>.</span>
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#9a97a2", lineHeight: 1.6, maxWidth: "200px" }}>
              South African software engineering. Modern platforms, real delivery, no filler.
            </p>
          </div>
          <FooterColumn heading="Services" links={SERVICE_LINKS} />
          <FooterColumn heading="Products" links={PRODUCT_LINKS} />
          <FooterColumn heading="Company" links={COMPANY_LINKS} />
        </div>

        <div style={{ borderTop: "1px solid var(--color-border-violet)", paddingTop: "22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#9a97a2" }}>
            © {new Date().getFullYear()} Elementary — All rights reserved
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map(({ label, href }) => (
              <Link key={label} href={href} style={{ fontSize: "13px", color: "#cfcad9", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
