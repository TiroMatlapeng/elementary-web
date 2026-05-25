"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Modiri", href: "/modiri" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(248,247,244,0.95)" : "var(--color-base)",
        borderBottom: scrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "var(--width-content)",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: "62px",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <span
            aria-hidden="true"
            style={{
              width: "9px", height: "9px",
              background: "var(--color-accent)",
              borderRadius: "1px", transform: "rotate(45deg)",
              flexShrink: 0, display: "block",
            }}
          />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 800, color: "var(--color-ink)", letterSpacing: "0.01em" }}>
            Elementary
          </span>
        </Link>

        <nav className="hidden md:flex" style={{ gap: "32px" }} aria-label="Primary">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--color-ink)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--color-text-muted)")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="#contact"
            style={{
              background: "var(--color-ink)", color: "var(--color-accent)",
              fontFamily: "var(--font-display)", fontSize: "12px", fontWeight: 700,
              padding: "9px 20px", borderRadius: "3px", textDecoration: "none",
              letterSpacing: "0.04em", textTransform: "uppercase" as const, transition: "opacity 0.2s",
            }}
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden"
          style={{ display: "flex", flexDirection: "column" as const, justifyContent: "center", alignItems: "center", gap: "5px", width: "36px", height: "36px", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((p) => !p)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block", width: "20px", height: "1.5px",
                background: "currentColor", borderRadius: "1px", transition: "all 0.3s ease",
                transform: menuOpen && i === 0 ? "translateY(6.5px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      <div
        className="md:hidden"
        style={{ overflow: "hidden", maxHeight: menuOpen ? "320px" : "0", opacity: menuOpen ? 1 : 0, transition: "max-height 0.3s ease, opacity 0.3s ease" }}
        aria-hidden={!menuOpen}
      >
        <nav style={{ display: "flex", flexDirection: "column" as const, padding: "0 32px 24px", borderTop: "1px solid var(--color-border)" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-text-secondary)", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid var(--color-border)" }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{ marginTop: "16px", background: "var(--color-ink)", color: "var(--color-accent)", fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: 700, padding: "12px 20px", borderRadius: "3px", textDecoration: "none", textAlign: "center" as const, letterSpacing: "0.04em", textTransform: "uppercase" as const }}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
