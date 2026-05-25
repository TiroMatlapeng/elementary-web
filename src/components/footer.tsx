"use client";

import Link from "next/link";

const SERVICE_LINKS = [
  { label: "Software Engineering", href: "#services" },
  { label: "App Modernisation", href: "#services" },
  { label: "Cloud Migration", href: "#services" },
  { label: "Data Warehousing", href: "#services" },
  { label: "BI & Analytics", href: "#services" },
] as const;

const PRODUCT_LINKS = [
  { label: "Modiri", href: "/modiri" },
  { label: "For homeowners", href: "/modiri#homeowners" },
  { label: "For tradespeople", href: "/modiri#tradespeople" },
  { label: "Join the waitlist", href: "/modiri#waitlist" },
] as const;

const COMPANY_LINKS = [
  { label: "About Elementary", href: "#about" },
  { label: "Our approach", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

function FooterColumn({ heading, links }: { heading: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(240,234,250,0.25)", marginBottom: "14px" }}>
        {heading}
      </div>
      {links.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          style={{ display: "block", fontSize: "12px", color: "rgba(240,234,250,0.45)", textDecoration: "none", marginBottom: "10px", transition: "color 0.2s" }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f0eafa")}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(240,234,250,0.45)")}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-violet)", padding: "60px 32px 36px" }}>
      <div style={{ maxWidth: "var(--width-content)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "40px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ width: "8px", height: "8px", background: "var(--color-accent)", borderRadius: "1px", transform: "rotate(45deg)", display: "block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 800, color: "#f0eafa" }}>Elementary</span>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(240,234,250,0.3)", lineHeight: 1.6, maxWidth: "200px" }}>
              South African software engineering. Modern platforms, real delivery, no filler.
            </p>
          </div>
          <FooterColumn heading="Services" links={SERVICE_LINKS} />
          <FooterColumn heading="Products" links={PRODUCT_LINKS} />
          <FooterColumn heading="Company" links={COMPANY_LINKS} />
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(240,234,250,0.2)" }}>
            © {new Date().getFullYear()} Elementary — All rights reserved
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }].map(({ label, href }) => (
              <Link key={label} href={href} style={{ fontSize: "11px", color: "rgba(240,234,250,0.2)", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
