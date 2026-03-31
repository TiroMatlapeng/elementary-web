"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Dickson", href: "/dickson" },
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

  // Close menu on route navigation (anchor clicks)
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-base/90 border-b border-border-hover backdrop-blur-md"
          : "bg-base/60 border-b border-transparent backdrop-blur-sm",
      ].join(" ")}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 py-4"
        style={{ maxWidth: "var(--width-content)" }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-text-primary text-lg tracking-tight"
        >
          <span
            className="rounded-full bg-accent flex-shrink-0"
            style={{ width: 7, height: 7 }}
            aria-hidden="true"
          />
          Elementary
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="#contact"
            className="
              px-5 py-2.5 rounded-lg text-sm font-semibold
              bg-accent text-base
              transition-all duration-200
              hover:brightness-110 hover:shadow-[0_0_18px_rgba(45,212,191,0.45)]
            "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 text-text-secondary hover:text-text-primary transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-300 origin-center",
              menuOpen ? "translate-y-[7px] rotate-45" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-300",
              menuOpen ? "opacity-0 scale-x-0" : "",
            ].join(" ")}
          />
          <span
            className={[
              "block w-5 h-px bg-current transition-all duration-300 origin-center",
              menuOpen ? "-translate-y-[7px] -rotate-45" : "",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex flex-col px-6 pb-6 gap-4 border-t border-border"
          aria-label="Mobile primary"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={handleLinkClick}
              className="text-base text-text-secondary hover:text-text-primary transition-colors duration-200 pt-3"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={handleLinkClick}
            className="
              mt-2 px-5 py-3 rounded-lg text-sm font-semibold text-center
              bg-accent text-base
              transition-all duration-200
              hover:brightness-110 hover:shadow-[0_0_18px_rgba(45,212,191,0.45)]
            "
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
