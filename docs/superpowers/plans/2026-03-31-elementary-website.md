# Elementary Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade Next.js marketing website for Elementary Data & Software Solutions at theelementary.co.za, with a Dickson product page and waitlist forms.

**Architecture:** Next.js 15 App Router with static generation for all pages. Tailwind CSS v4 for styling with custom design tokens matching the approved mockup (dark theme, teal accent). API routes handle waitlist and partner form submissions, storing data in a JSON file initially (swappable for PostgreSQL later). No authentication, no user accounts — this is a marketing site.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, TypeScript, Google Fonts (Syne + DM Sans), Vercel deployment

**Spec:** `docs/superpowers/specs/2026-03-31-elementary-website-redesign-design.md`

**Mockup reference:** `mockup.html` (approved visual direction — teal accent, dark premium theme)

---

## File Structure

```
elementary-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — fonts, metadata, nav, footer
│   │   ├── page.tsx                # Home page — all homepage sections
│   │   ├── dickson/
│   │   │   └── page.tsx            # Dickson product page
│   │   ├── privacy/
│   │   │   └── page.tsx            # Privacy policy page
│   │   ├── terms/
│   │   │   └── page.tsx            # Terms & conditions page
│   │   ├── api/
│   │   │   ├── waitlist/
│   │   │   │   └── route.ts        # POST handler for waitlist submissions
│   │   │   └── partner/
│   │   │       └── route.ts        # POST handler for B2B partner enquiries
│   │   └── globals.css             # Tailwind imports + custom CSS (animations, glow effects)
│   ├── components/
│   │   ├── nav.tsx                 # Sticky navigation with mobile hamburger
│   │   ├── footer.tsx              # Four-column footer
│   │   ├── hero.tsx                # Hero section with animated glow
│   │   ├── dual-path.tsx           # Two equal-weight cards (Products + Services)
│   │   ├── services-grid.tsx       # 8 service cards in responsive grid
│   │   ├── trust-section.tsx       # Social proof / industry badges
│   │   ├── tech-stack.tsx          # Tech stack pill grid
│   │   ├── cta-section.tsx         # CTA with tabbed forms (waitlist + partner)
│   │   ├── waitlist-form.tsx       # Waitlist form component (client component)
│   │   ├── partner-form.tsx        # B2B partner form component (client component)
│   │   ├── section-reveal.tsx      # Scroll reveal wrapper (IntersectionObserver)
│   │   └── dickson-logo.tsx        # Monochromatic Dickson portrait SVG
│   └── lib/
│       └── submissions.ts          # Data storage helper (JSON file, swappable for DB)
├── data/
│   ├── waitlist.json               # Waitlist submissions storage (gitignored)
│   └── partners.json               # Partner enquiry storage (gitignored)
├── public/
│   └── og-image.png                # Open Graph image (placeholder)
├── tailwind.config.ts              # Tailwind config with design tokens
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json
├── .gitignore
└── .env.local                      # Environment variables (gitignored)
```

---

## Task 1: Project Scaffolding & Tailwind Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `.gitignore`, `.env.local`

- [ ] **Step 1: Scaffold Next.js project**

Run from the project root `/Users/edwinmatlapeng/Projects/elementary-web`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --no-turbopack
```

When prompted, accept defaults. This creates the full Next.js scaffolding with Tailwind CSS v4.

- [ ] **Step 2: Verify scaffolding works**

```bash
npm run dev
```

Expected: Dev server starts on `http://localhost:3000` with the default Next.js page. Kill the server after confirming (Ctrl+C).

- [ ] **Step 3: Configure Tailwind design tokens**

Replace the contents of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0b",
        surface: "#141418",
        elevated: "#1c1c22",
        light: "#f5f5f7",
        "light-2": "#eaeaec",
        accent: "#2dd4bf",
        "accent-light": "#5ee7d4",
        "accent-dim": "rgba(45, 212, 191, 0.10)",
        "accent-glow": "rgba(45, 212, 191, 0.22)",
        "text-primary": "#f0f0f4",
        "text-secondary": "#9898a8",
        "text-muted": "#5c5c70",
        "text-dark": "#111114",
        "text-dark-2": "#3a3a4a",
        border: "rgba(255,255,255,0.06)",
        "border-hover": "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      maxWidth: {
        content: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Set up global CSS**

Replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background: #0a0a0b;
  color: #f0f0f4;
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Scroll reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Glow animation for hero */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.7; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.06); }
}

/* Floating orb drift */
@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(20px, -30px); }
  66% { transform: translate(-15px, 20px); }
}

/* Blinking dot */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
```

- [ ] **Step 5: Set up root layout with fonts**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elementary — Engineering from the Ground Up",
  description:
    "South African software engineering and data company. We build modern platforms, modernise legacy systems, and created Dickson — the vetted handyman marketplace.",
  openGraph: {
    title: "Elementary — Engineering from the Ground Up",
    description:
      "South African software engineering and data company. Custom software, cloud migration, data warehousing, and Dickson — the trusted handyman marketplace.",
    url: "https://theelementary.co.za",
    siteName: "Elementary",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create placeholder home page**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="font-display text-4xl font-bold text-accent">
          Elementary
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 7: Update .gitignore**

Ensure these lines are in `.gitignore`:

```
data/
.env.local
.env*.local
```

- [ ] **Step 8: Verify fonts and styling work**

```bash
npm run dev
```

Expected: Page shows "Elementary" in Syne font with teal color on dark background. Verify in browser at `http://localhost:3000`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind design tokens and fonts"
```

---

## Task 2: Navigation Component

**Files:**
- Create: `src/components/nav.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create navigation component**

Create `src/components/nav.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/#services", label: "Services" },
    { href: "/#products", label: "Products" },
    { href: "/dickson", label: "Dickson" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors ${
        scrolled
          ? "bg-base/90 border-border"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-display font-bold text-lg text-text-primary flex items-center gap-1.5 tracking-tight"
        >
          Elementary
          <span className="inline-block w-[7px] h-[7px] rounded-full bg-accent" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-text-secondary text-sm hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#contact"
          className="hidden md:inline-flex items-center gap-2 bg-accent text-base font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(45,212,191,0.22)] transition-all hover:-translate-y-0.5"
        >
          Get Started
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="2" y1="6" x2="20" y2="6" />
                <line x1="2" y1="11" x2="20" y2="11" />
                <line x1="2" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border px-8 py-6">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-secondary text-sm hover:text-text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                className="inline-flex bg-accent text-base font-medium text-sm px-5 py-2.5 rounded-lg mt-2"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Create footer component**

Create `src/components/footer.tsx`:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-base border-t border-border py-16">
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display font-bold text-lg text-text-primary inline-flex items-center gap-1.5 mb-4"
            >
              Elementary<span className="inline-block w-[7px] h-[7px] rounded-full bg-accent" />
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Elementary Data &amp; Software Solutions.
              <br />
              Engineering from the ground up — for enterprise teams that need
              software they can trust.
            </p>
            <span className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1 text-xs text-text-muted">
              Built in South Africa
            </span>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">About Elementary</Link></li>
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Our approach</Link></li>
              <li><Link href="/#contact" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Software Engineering</Link></li>
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">App Modernisation</Link></li>
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Cloud Migration</Link></li>
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Data Warehousing &amp; Lakes</Link></li>
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Data Management</Link></li>
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">BI &amp; Analytics</Link></li>
              <li><Link href="/#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Data Virtualisation</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-text-muted text-xs font-medium uppercase tracking-widest mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              <li><Link href="/dickson" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Dickson App</Link></li>
              <li><Link href="/dickson#homeowners" className="text-text-secondary text-sm hover:text-text-primary transition-colors">For homeowners</Link></li>
              <li><Link href="/dickson#tradespeople" className="text-text-secondary text-sm hover:text-text-primary transition-colors">For tradespeople</Link></li>
              <li><Link href="/#contact" className="text-text-secondary text-sm hover:text-text-primary transition-colors">Join the waitlist</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; 2026 Elementary Data &amp; Software Solutions (EDSS). All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-text-muted text-xs hover:text-text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-text-muted text-xs hover:text-text-secondary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Add Nav and Footer to root layout**

Update `src/app/layout.tsx` — add imports and wrap `children`:

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elementary — Engineering from the Ground Up",
  description:
    "South African software engineering and data company. We build modern platforms, modernise legacy systems, and created Dickson — the vetted handyman marketplace.",
  openGraph: {
    title: "Elementary — Engineering from the Ground Up",
    description:
      "South African software engineering and data company. Custom software, cloud migration, data warehousing, and Dickson — the trusted handyman marketplace.",
    url: "https://theelementary.co.za",
    siteName: "Elementary",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-body">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify nav and footer render**

```bash
npm run dev
```

Expected: Sticky nav at top with "Elementary" wordmark, teal dot, links, and "Get Started" button. Footer at bottom with four columns. Mobile hamburger menu works at < 768px.

- [ ] **Step 5: Commit**

```bash
git add src/components/nav.tsx src/components/footer.tsx src/app/layout.tsx
git commit -m "feat: add navigation and footer components"
```

---

## Task 3: Scroll Reveal Component

**Files:**
- Create: `src/components/section-reveal.tsx`

- [ ] **Step 1: Create scroll reveal wrapper**

Create `src/components/section-reveal.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay * 0.08}s` }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/section-reveal.tsx
git commit -m "feat: add scroll reveal animation component"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create hero component**

Create `src/components/hero.tsx`:

```tsx
import Link from "next/link";
import { SectionReveal } from "./section-reveal";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial glow */}
        <div
          className="absolute top-[-10%] left-1/2 w-[900px] h-[600px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(45,212,191,0.22) 0%, transparent 70%)",
            animation: "pulse-glow 6s ease-in-out infinite",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
          }}
        />
        {/* Floating orbs */}
        <div
          className="absolute w-[420px] h-[420px] rounded-full bg-accent opacity-[0.18] blur-[80px] top-[15%] left-[-8%]"
          style={{ animation: "drift 12s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[320px] h-[320px] rounded-full bg-accent opacity-10 blur-[80px] top-[50%] right-[-5%]"
          style={{ animation: "drift 12s ease-in-out infinite -4s" }}
        />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-8 py-20 md:py-24 w-full">
        <SectionReveal>
          <div className="inline-flex items-center gap-2 bg-accent-dim border border-accent-glow rounded-full px-3.5 py-1 text-xs font-medium uppercase tracking-widest text-accent mb-7">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: "blink 2.4s ease-in-out infinite" }} />
            South African Software Engineering
          </div>
        </SectionReveal>

        <SectionReveal delay={1}>
          <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-text-primary mb-7 max-w-[860px]">
            Engineering<br />from the<br />
            <em className="not-italic text-accent">ground up.</em>
          </h1>
        </SectionReveal>

        <SectionReveal delay={2}>
          <p className="text-[clamp(1rem,2.2vw,1.25rem)] text-text-secondary max-w-[560px] leading-relaxed font-light mb-12">
            We build modern software platforms and modernise the ones holding you
            back. From data warehouses to mobile apps — engineered in South
            Africa for enterprise teams that need to move.
          </p>
        </SectionReveal>

        <SectionReveal delay={3}>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 bg-accent text-base font-medium px-7 py-3.5 rounded-[10px] hover:bg-accent-light hover:shadow-[0_8px_32px_rgba(45,212,191,0.22)] transition-all hover:-translate-y-0.5"
            >
              Explore our services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
            </Link>
            <Link
              href="/dickson"
              className="inline-flex items-center gap-2 bg-transparent text-text-secondary font-normal px-6 py-3.5 rounded-[10px] border border-border hover:text-text-primary hover:border-border-hover hover:bg-white/[0.04] transition-all"
            >
              Try Dickson
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to home page**

Update `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Verify hero renders**

```bash
npm run dev
```

Expected: Full-viewport hero with animated glow, grid overlay, floating orbs, headline "Engineering from the ground up." in Syne, teal accent on "ground up.", two CTA buttons, scroll reveal animations.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat: add hero section with animated background"
```

---

## Task 5: Dual Path Cards

**Files:**
- Create: `src/components/dual-path.tsx`, `src/components/dickson-logo.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Dickson logo SVG component**

Create `src/components/dickson-logo.tsx`:

```tsx
export function DicksonLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Monochromatic silhouette of an African man — head and shoulders, smiling */}
      <ellipse cx="24" cy="18" rx="11" ry="13" />
      <path d="M6 56c0-12 8-20 18-20s18 8 18 20H6z" />
      {/* Smile line */}
      <path
        d="M19 21c1.5 2 3.5 3 5 3s3.5-1 5-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Create dual path component**

Create `src/components/dual-path.tsx`:

```tsx
import Link from "next/link";
import { SectionReveal } from "./section-reveal";
import { DicksonLogo } from "./dickson-logo";

export function DualPath() {
  return (
    <section className="py-10 pb-24" id="products">
      <div className="max-w-content mx-auto px-8">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted mb-4">
            Two sides of Elementary
          </p>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight leading-tight text-text-primary mb-3">
            We build products. We build for you.
          </h2>
          <p className="text-text-secondary max-w-[520px] leading-relaxed font-light">
            Our own products prove our engineering. Our services bring that same
            rigour to your business.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
          {/* Dickson card */}
          <SectionReveal delay={1}>
            <Link
              href="/dickson"
              className="group block relative bg-surface border border-border rounded-xl p-12 overflow-hidden hover:border-accent-glow hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_0_1px_rgba(45,212,191,0.22)] transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-md bg-elevated border border-border flex items-center justify-center mb-8 group-hover:bg-accent-dim group-hover:border-accent-glow transition-all">
                <DicksonLogo className="w-12 h-14 text-text-muted group-hover:text-accent transition-colors" />
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-accent mb-3">
                Our product
              </p>
              <h3 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-4">
                Dickson
              </h3>
              <p className="text-text-secondary leading-relaxed font-light mb-6">
                A vetted handyman marketplace. SAPS-checked, referenced,
                insured. Trusted tradespeople who can actually get to you.
              </p>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
              </span>
            </Link>
          </SectionReveal>

          {/* Services card */}
          <SectionReveal delay={2}>
            <Link
              href="/#services"
              className="group block relative bg-surface border border-border rounded-xl p-12 overflow-hidden hover:border-accent-glow hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.4),0_0_0_1px_rgba(45,212,191,0.22)] transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-md bg-elevated border border-border flex items-center justify-center mb-8 group-hover:bg-accent-dim group-hover:border-accent-glow transition-all">
                <svg className="w-9 h-9 text-text-muted group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-accent mb-3">
                Our services
              </p>
              <h3 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-4">
                Engineering for enterprise
              </h3>
              <p className="text-text-secondary leading-relaxed font-light mb-6">
                Software engineering, legacy modernisation, cloud migration, and
                end-to-end data solutions for insurance, construction, and
                banking teams.
              </p>
              <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                Explore services
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
              </span>
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add DualPath to home page**

Update `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/hero";
import { DualPath } from "@/components/dual-path";

export default function Home() {
  return (
    <main>
      <Hero />
      <DualPath />
    </main>
  );
}
```

- [ ] **Step 4: Verify dual path renders**

```bash
npm run dev
```

Expected: Two side-by-side cards below hero — Dickson (with silhouette logo) and Services. Hover effects with teal glow border. Stacks on mobile.

- [ ] **Step 5: Commit**

```bash
git add src/components/dickson-logo.tsx src/components/dual-path.tsx src/app/page.tsx
git commit -m "feat: add dual path cards (Dickson + Services)"
```

---

## Task 6: Services Grid Section

**Files:**
- Create: `src/components/services-grid.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create services grid component**

Create `src/components/services-grid.tsx`:

```tsx
import { SectionReveal } from "./section-reveal";

const services = [
  {
    title: "Software Engineering",
    desc: "Greenfield and iterative builds using modern cloud-native architectures. APIs, microservices, and data-intensive platforms.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Application Modernisation",
    desc: "Lift legacy systems into maintainable, scalable modern stacks — without losing business continuity or institutional knowledge.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z" />
        <path d="M14 17h6M17 14v6" />
      </svg>
    ),
  },
  {
    title: "Cloud Migration & Readiness",
    desc: "Strategy, architecture, and execution for moving on-premise workloads to AWS, Azure, GCP, or Hetzner — securely and at pace.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15a4 4 0 004 4h10a4 4 0 004-4V9a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
        <polyline points="7 10 12 15 17 10" />
      </svg>
    ),
  },
  {
    title: "Data Warehousing & Data Lakes",
    desc: "End-to-end data warehouse and data lake design, build, and optimisation. From raw ingestion to star schemas — tool-agnostic and platform-independent.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="12" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 15v4M16 15v4M6 19h12" />
      </svg>
    ),
  },
  {
    title: "Data Management & Governance",
    desc: "Data quality, lineage, cataloguing, and governance frameworks. We help you trust your data and meet regulatory obligations including POPIA.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Business Intelligence & Analytics",
    desc: "Dashboards and reporting with Tableau, Power BI, QlikView, and Qlik Sense. We work with every major BI tool — your data, your choice.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <path d="M3 17h7l4-4" />
      </svg>
    ),
  },
  {
    title: "ETL & Data Integration",
    desc: "Extract, transform, load pipelines using Informatica, Talend, SSIS, dbt, Airflow, and custom solutions. All major databases supported.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Data Virtualisation",
    desc: "Unified data access without moving data — using traditional tools and AI-powered MCP integrations. Query across sources as one, in real time.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    ),
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-light py-24" id="services">
      <div className="max-w-content mx-auto px-8">
        <SectionReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8888a0] mb-4">
              Capabilities
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight text-text-dark mb-3">
              What we build &amp; how we think
            </h2>
            <p className="text-text-dark-2 max-w-[520px] mx-auto leading-relaxed font-light">
              From first commit to production scale, we handle the full
              engineering lifecycle.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((svc, i) => (
            <SectionReveal key={svc.title} delay={(i % 4) + 1}>
              <div className="bg-white border border-[#e4e4e8] rounded-lg p-8 hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all duration-250 h-full">
                <div className="w-10 h-10 rounded-md bg-light flex items-center justify-center mb-5 text-text-dark-2">
                  {svc.icon}
                </div>
                <h3 className="font-display text-base font-bold text-text-dark mb-2 tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-text-dark-2 text-sm leading-relaxed font-light">
                  {svc.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add ServicesGrid to home page**

Update `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/hero";
import { DualPath } from "@/components/dual-path";
import { ServicesGrid } from "@/components/services-grid";

export default function Home() {
  return (
    <main>
      <Hero />
      <DualPath />
      <ServicesGrid />
    </main>
  );
}
```

- [ ] **Step 3: Verify services grid renders**

```bash
npm run dev
```

Expected: Light-background section with 8 service cards in a 4-column grid. Cards have hover lift effect with teal border. Responsive: 2 cols on tablet, 1 col on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/services-grid.tsx src/app/page.tsx
git commit -m "feat: add 8-card services grid section"
```

---

## Task 7: Trust Section & Tech Stack

**Files:**
- Create: `src/components/trust-section.tsx`, `src/components/tech-stack.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create trust section component**

Create `src/components/trust-section.tsx`:

```tsx
import { SectionReveal } from "./section-reveal";

const industries = [
  "Insurance companies",
  "Commercial banks",
  "Construction firms",
  "Marketplace operators",
];

export function TrustSection() {
  return (
    <section className="py-20">
      <div className="max-w-content mx-auto px-8 text-center">
        <SectionReveal>
          <p className="text-text-muted text-sm mb-8">
            Trusted by teams across
          </p>
        </SectionReveal>
        <SectionReveal delay={1}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 text-xs text-text-secondary"
              >
                {industry}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create tech stack component**

Create `src/components/tech-stack.tsx`:

```tsx
import { SectionReveal } from "./section-reveal";

const techPills = [
  "Spring Boot", "Angular 19", "Flutter", "Kubernetes", "PostgreSQL",
  "Apache Kafka", "TypeScript", "Docker", "AWS / Azure", "Terraform",
  "Redis", "GraphQL", "Java 21", "dbt", "Airflow",
  "Tableau", "Power BI", "QlikView / Qlik Sense", "Informatica", "SSIS",
  "Oracle", "SQL Server", "MySQL", "MongoDB", "AI / MCP",
];

export function TechStack() {
  return (
    <section className="py-20 border-t border-border" id="tech">
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 items-start">
          <SectionReveal>
            <div className="border-t-2 border-accent w-12 mb-6" />
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted mb-3">
              Engineering depth
            </p>
            <h2 className="font-display text-[1.8rem] font-bold tracking-tight text-text-primary leading-tight">
              Serious engineers.<br />Proven stack.
            </h2>
            <p className="text-text-secondary text-sm mt-3 font-light leading-relaxed">
              We don&apos;t follow trends — we choose the right tool for each
              problem. Our stack reflects years of production experience across
              financial and high-throughput systems.
            </p>
          </SectionReveal>

          <SectionReveal delay={1}>
            <div className="flex flex-wrap gap-2">
              {techPills.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-3.5 py-1.5 text-xs text-text-secondary hover:text-accent hover:border-accent-glow transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-40" />
                  {tech}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add both to home page**

Update `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/hero";
import { DualPath } from "@/components/dual-path";
import { ServicesGrid } from "@/components/services-grid";
import { TrustSection } from "@/components/trust-section";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <DualPath />
      <ServicesGrid />
      <TrustSection />
      <TechStack />
    </main>
  );
}
```

- [ ] **Step 4: Verify both render**

```bash
npm run dev
```

Expected: Trust badges after services grid, tech stack pill grid with two-column layout below.

- [ ] **Step 5: Commit**

```bash
git add src/components/trust-section.tsx src/components/tech-stack.tsx src/app/page.tsx
git commit -m "feat: add trust section and tech stack grid"
```

---

## Task 8: CTA Section with Tabbed Forms

**Files:**
- Create: `src/components/cta-section.tsx`, `src/components/waitlist-form.tsx`, `src/components/partner-form.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create waitlist form component**

Create `src/components/waitlist-form.tsx`:

```tsx
"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-text-muted mb-1.5">First name</label>
          <input name="firstName" required placeholder="First name" className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
        </div>
        <div>
          <label className="block text-xs text-text-muted mb-1.5">Last name</label>
          <input name="lastName" required placeholder="Last name" className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1.5">Mobile number (primary)</label>
        <input name="mobile" type="tel" required placeholder="+27 82 000 0000" className="w-full bg-surface border border-border rounded-lg px-3.5 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors text-base" />
      </div>

      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1.5">Email</label>
        <input name="email" type="email" required placeholder="you@example.co.za" className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1.5">City / Area</label>
        <select name="city" required className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors">
          <option value="" disabled>Select your area</option>
          <option value="johannesburg">Johannesburg</option>
          <option value="pretoria">Pretoria</option>
          <option value="cape-town">Cape Town</option>
          <option value="durban">Durban</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-xs text-text-muted mb-2">I am a...</label>
        <div className="flex flex-col gap-2">
          {[
            { value: "homeowner", label: "Homeowner — I need reliable help" },
            { value: "tradesperson", label: "Tradesperson — I want work" },
            { value: "business", label: "Business — insurance, construction, or property" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 bg-surface border border-border rounded-lg px-3.5 py-2.5 cursor-pointer hover:border-border-hover transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent-dim">
              <input type="radio" name="role" value={opt.value} required className="accent-accent" />
              <span className="text-sm text-text-secondary">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        className="w-full bg-accent text-base font-medium py-3 rounded-lg hover:bg-accent-light hover:shadow-[0_8px_32px_rgba(45,212,191,0.22)] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        style={status === "sent" ? { background: "#22c55e" } : {}}
      >
        {status === "sent" ? (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="2 8 6 12 14 4" /></svg>
            You&apos;re on the list!
          </>
        ) : status === "sending" ? "Joining..." : (
          <>
            Join the waitlist
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
          </>
        )}
      </button>

      <p className="text-text-muted text-[11px] mt-3 leading-relaxed">
        We&apos;ll reach out via WhatsApp when Dickson launches in your area. No spam. POPIA compliant.
      </p>
    </form>
  );
}
```

- [ ] **Step 2: Create partner form component**

Create `src/components/partner-form.tsx`:

```tsx
"use client";

import { useState } from "react";

export function PartnerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1.5">Full name</label>
        <input name="fullName" required placeholder="Full name" className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1.5">Work email</label>
        <input name="email" type="email" required placeholder="you@company.co.za" className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1.5">Company</label>
        <input name="company" required placeholder="Acme Corp" className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1.5">Role / Title</label>
        <input name="role" placeholder="Head of Procurement" className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors" />
      </div>

      <div className="mb-3">
        <label className="block text-xs text-text-muted mb-1.5">Industry</label>
        <select name="industry" required className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors">
          <option value="" disabled>Select industry</option>
          <option value="insurance">Insurance</option>
          <option value="construction">Construction</option>
          <option value="banking">Banking</option>
          <option value="property">Property</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-xs text-text-muted mb-1.5">Tell us about your use case</label>
        <textarea name="message" rows={3} placeholder="Brief context about how you'd use Dickson..." className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-y" />
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        className="w-full bg-accent text-base font-medium py-3 rounded-lg hover:bg-accent-light hover:shadow-[0_8px_32px_rgba(45,212,191,0.22)] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        style={status === "sent" ? { background: "#22c55e" } : {}}
      >
        {status === "sent" ? (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="2 8 6 12 14 4" /></svg>
            We&apos;ll be in touch!
          </>
        ) : status === "sending" ? "Sending..." : (
          <>
            Request a conversation
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
          </>
        )}
      </button>

      <p className="text-text-muted text-[11px] mt-3 leading-relaxed">
        We respond to every enquiry within one business day.
      </p>
    </form>
  );
}
```

- [ ] **Step 3: Create CTA section with tabs**

Create `src/components/cta-section.tsx`:

```tsx
"use client";

import { useState } from "react";
import { SectionReveal } from "./section-reveal";
import { WaitlistForm } from "./waitlist-form";
import { PartnerForm } from "./partner-form";

const benefits = [
  "Every worker SAPS vetted — zero criminal records, zero exceptions",
  "Insured work — not happy, get reimbursed. Real money, not credit",
  "Dickson Van — transport for workers who need it, so they actually arrive",
  "WhatsApp updates — we'll keep you in the loop, not your spam folder",
];

export function CTASection() {
  const [tab, setTab] = useState<"waitlist" | "partner">("waitlist");

  return (
    <section className="py-24 relative" id="contact">
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <SectionReveal>
            <div className="border-t-2 border-accent w-12 mb-6" />
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted mb-3">
              Get in touch
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight text-text-primary leading-tight mb-4">
              Get involved early
            </h2>
            <p className="text-text-secondary leading-relaxed font-light mb-8">
              Whether you need a trusted handyman or you want to partner with us
              — the earlier you&apos;re in, the better your position.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-dim border border-accent-glow flex items-center justify-center mt-0.5">
                    <svg viewBox="0 0 9 9" className="w-2.5 h-2.5 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="1.5 4.5 3.5 6.5 7.5 2.5" /></svg>
                  </span>
                  <span className="text-text-secondary text-sm leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Right — tabbed form */}
          <SectionReveal delay={1}>
            <div className="bg-elevated border border-border rounded-xl p-8">
              {/* Tab toggle */}
              <div className="inline-flex bg-surface border border-border rounded-full p-1 mb-6">
                <button
                  onClick={() => setTab("waitlist")}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    tab === "waitlist"
                      ? "bg-elevated text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  Join the Waitlist
                </button>
                <button
                  onClick={() => setTab("partner")}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    tab === "partner"
                      ? "bg-elevated text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  Partner with Dickson
                </button>
              </div>

              {tab === "waitlist" ? (
                <>
                  <h3 className="font-display text-lg font-bold text-text-primary mb-1">
                    Be first in line
                  </h3>
                  <p className="text-text-secondary text-sm mb-6 font-light">
                    Join the waitlist for early access to Dickson — South
                    Africa&apos;s first properly vetted handyman platform.
                  </p>
                  <WaitlistForm />
                </>
              ) : (
                <>
                  <h3 className="font-display text-lg font-bold text-text-primary mb-1">
                    For insurance, construction &amp; banking teams
                  </h3>
                  <p className="text-text-secondary text-sm mb-6 font-light">
                    We&apos;re onboarding anchor partners before public launch.
                    Let&apos;s talk.
                  </p>
                  <PartnerForm />
                </>
              )}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add CTA section to home page**

Update `src/app/page.tsx`:

```tsx
import { Hero } from "@/components/hero";
import { DualPath } from "@/components/dual-path";
import { ServicesGrid } from "@/components/services-grid";
import { TrustSection } from "@/components/trust-section";
import { TechStack } from "@/components/tech-stack";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <DualPath />
      <ServicesGrid />
      <TrustSection />
      <TechStack />
      <CTASection />
    </main>
  );
}
```

- [ ] **Step 5: Verify CTA section renders**

```bash
npm run dev
```

Expected: Two-column layout with benefit bullets on left, tabbed form card on right. Tab toggle switches between waitlist and partner forms. Mobile number field is slightly larger. Radio buttons highlight on selection. Forms submit (will 404 until API routes are created — that's fine).

- [ ] **Step 6: Commit**

```bash
git add src/components/waitlist-form.tsx src/components/partner-form.tsx src/components/cta-section.tsx src/app/page.tsx
git commit -m "feat: add CTA section with tabbed waitlist and partner forms"
```

---

## Task 9: API Routes for Form Submissions

**Files:**
- Create: `src/app/api/waitlist/route.ts`, `src/app/api/partner/route.ts`, `src/lib/submissions.ts`, `data/.gitkeep`

- [ ] **Step 1: Create data storage helper**

Create `src/lib/submissions.ts`:

```typescript
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // directory exists
  }
}

export async function appendSubmission(
  file: string,
  data: Record<string, unknown>
) {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);

  let existing: Record<string, unknown>[] = [];
  try {
    const content = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(content);
  } catch {
    // file doesn't exist yet
  }

  existing.push({
    ...data,
    submittedAt: new Date().toISOString(),
  });

  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
}
```

- [ ] **Step 2: Create waitlist API route**

Create `src/app/api/waitlist/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { appendSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, mobile, email, city, role } = body;

  if (!firstName || !lastName || !mobile || !email || !city || !role) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  await appendSubmission("waitlist.json", {
    firstName,
    lastName,
    mobile,
    email,
    city,
    role,
  });

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Create partner API route**

Create `src/app/api/partner/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { appendSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, company, role, industry, message } = body;

  if (!fullName || !email || !company || !industry) {
    return NextResponse.json(
      { error: "Required fields missing" },
      { status: 400 }
    );
  }

  await appendSubmission("partners.json", {
    fullName,
    email,
    company,
    role,
    industry,
    message,
  });

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 4: Create data directory placeholder**

```bash
mkdir -p data && touch data/.gitkeep
```

- [ ] **Step 5: Verify form submission works end-to-end**

```bash
npm run dev
```

Fill out the waitlist form and submit. Expected: Button shows green "You're on the list!", `data/waitlist.json` contains the submission. Test partner form similarly.

- [ ] **Step 6: Commit**

```bash
git add src/lib/submissions.ts src/app/api/waitlist/route.ts src/app/api/partner/route.ts data/.gitkeep
git commit -m "feat: add API routes for waitlist and partner form submissions"
```

---

## Task 10: Dickson Product Page

**Files:**
- Create: `src/app/dickson/page.tsx`

- [ ] **Step 1: Create Dickson product page**

Create `src/app/dickson/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/section-reveal";
import { DicksonLogo } from "@/components/dickson-logo";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Dickson — Vetted Handyman Services | Elementary",
  description:
    "SAPS-checked, referenced, and insured tradespeople who can actually get to you. South Africa's first properly vetted handyman marketplace.",
};

const homeownerFeatures = [
  {
    title: "Every worker SAPS vetted",
    desc: "Full criminal record checks. Verified identity. Zero exceptions. You know exactly who's coming into your home.",
  },
  {
    title: "Real references, real people",
    desc: "Not anonymous reviews — references from clients and colleagues who know their work. Social testimonials with photos of completed jobs.",
  },
  {
    title: "Insured work",
    desc: "Not happy with the job? You're covered. Reimbursement built into every booking. Real money back, not store credit.",
  },
  {
    title: "They actually arrive",
    desc: "Dickson Van provides transport for workers who need it. No more \"sorry, I couldn't get there.\" Reliability you can count on.",
  },
];

const tradespersonFeatures = [
  {
    title: "Get work",
    desc: "Consistent bookings from verified clients. No more hustling for jobs — they come to you through the platform.",
  },
  {
    title: "Get verified",
    desc: "SAPS check + skills vetting + real references = a profile that stands out. Clients trust verified workers first.",
  },
  {
    title: "Get transport",
    desc: "No vehicle? No problem. Dickson Van removes the transport barrier so your skills — not your car — determine your income.",
  },
  {
    title: "Get dignity",
    desc: "We're not building a gig economy. We're building a real economy. Vetted, dignified, consistent work for skilled people.",
  },
];

export default function DicksonPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 w-[800px] h-[500px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(45,212,191,0.15) 0%, transparent 70%)",
              animation: "pulse-glow 6s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-8 text-center">
          <SectionReveal>
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl bg-surface border border-border flex items-center justify-center">
                <DicksonLogo className="w-14 h-16 text-accent" />
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={1}>
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-accent mb-4">
              An Elementary product
            </p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-[-0.04em] text-text-primary mb-6">
              Dickson
            </h1>
            <p className="text-text-secondary text-xl max-w-[600px] mx-auto leading-relaxed font-light">
              South Africa&apos;s first properly vetted handyman marketplace.
              SAPS-checked, referenced, insured — and they can actually get to
              you.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* For homeowners */}
      <section className="py-20" id="homeowners">
        <div className="max-w-content mx-auto px-8">
          <SectionReveal>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted mb-4">
              For homeowners &amp; businesses
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight text-text-primary mb-3 max-w-[600px]">
              You know exactly who&apos;s coming into your home.
            </h2>
            <p className="text-text-secondary max-w-[520px] leading-relaxed font-light mb-4">
              Whether you live alone or not, Dickson means someone is
              accountable before they ever knock on your door. Your name on our
              system. Their record on ours.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {homeownerFeatures.map((feature, i) => (
              <SectionReveal key={feature.title} delay={i + 1}>
                <div className="bg-surface border border-border rounded-xl p-8 hover:border-accent-glow transition-colors h-full">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={5}>
            <div className="mt-12 bg-elevated border border-border rounded-xl p-8">
              <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                For insurance, construction &amp; banking teams
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light mb-4">
                When your insured client calls with a burst pipe, you need a
                vetted worker on site within hours. When your construction
                project needs skilled tradespeople, you need them verified and
                reliable. Dickson is building that capability.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
              >
                Partner with us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* For tradespeople */}
      <section className="py-20 bg-surface border-t border-b border-border" id="tradespeople">
        <div className="max-w-content mx-auto px-8">
          <SectionReveal>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted mb-4">
              For tradespeople
            </p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight text-text-primary mb-3 max-w-[600px]">
              This is your platform.
            </h2>
            <p className="text-text-secondary max-w-[520px] leading-relaxed font-light">
              South Africa has millions of skilled hands and nowhere near enough
              work. We built Dickson to change that. Every booking connects you
              to someone whose skills weren&apos;t the problem — access was.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {tradespersonFeatures.map((feature, i) => (
              <SectionReveal key={feature.title} delay={i + 1}>
                <div className="bg-elevated border border-border rounded-xl p-8 hover:border-accent-glow transition-colors h-full">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="py-24">
        <div className="max-w-[480px] mx-auto px-8">
          <SectionReveal>
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
                Join the Dickson waitlist
              </h2>
              <p className="text-text-secondary text-sm font-light">
                Be among the first when we launch in your area.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal delay={1}>
            <div className="bg-elevated border border-border rounded-xl p-8">
              <WaitlistForm />
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify Dickson page renders**

```bash
npm run dev
```

Navigate to `http://localhost:3000/dickson`. Expected: Dickson hero with logo, homeowner section (4 feature cards + B2B callout), tradespeople section (4 feature cards), waitlist form at bottom.

- [ ] **Step 3: Commit**

```bash
git add src/app/dickson/page.tsx
git commit -m "feat: add Dickson product page with two-audience layout"
```

---

## Task 11: Privacy Policy & Terms Pages

**Files:**
- Create: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`

- [ ] **Step 1: Create privacy policy page**

Create `src/app/privacy/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Elementary",
  description: "How Elementary Data & Software Solutions handles your personal information under POPIA.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-[720px] mx-auto px-8">
        <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
          Privacy Policy
        </h1>
        <p className="text-text-muted text-sm mb-12">
          Last updated: 31 March 2026
        </p>

        <div className="prose-dark space-y-8 text-text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">1. Who we are</h2>
            <p>Elementary Data &amp; Software Solutions (EDSS) (&quot;Elementary&quot;, &quot;we&quot;, &quot;us&quot;) is a South African registered company. This privacy policy applies to the website theelementary.co.za and any forms or services provided through it.</p>
            <p>Information Officer: Edwin Matlapeng<br />Email: privacy@theelementary.co.za</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">2. What information we collect</h2>
            <p>We collect information you provide directly through our website forms:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Waitlist registration:</strong> First name, last name, mobile number, email address, city/area, role (homeowner, tradesperson, or business)</li>
              <li><strong>Partner enquiries:</strong> Full name, work email, company name, role/title, industry, message</li>
              <li><strong>Technical data:</strong> We may collect standard web analytics data including IP address, browser type, pages visited, and referring URL</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">3. How we use your information</h2>
            <p>We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>To manage your position on the Dickson waitlist and notify you when we launch in your area</li>
              <li>To contact you via WhatsApp and/or email regarding Dickson&apos;s launch and updates</li>
              <li>To respond to partner enquiries and facilitate business conversations</li>
              <li>To improve our website and understand how visitors use it</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">4. Legal basis for processing</h2>
            <p>Under the Protection of Personal Information Act (POPIA), we process your personal information based on your consent, which you provide when submitting a form on our website. You may withdraw consent at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">5. Who we share your information with</h2>
            <p>We do not sell your personal information. We may share your data with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>WhatsApp Business API provider</strong> (e.g., Twilio or Bird) — to send you WhatsApp messages about Dickson&apos;s launch</li>
              <li><strong>Hosting provider</strong> (Vercel) — your form data passes through their servers</li>
            </ul>
            <p className="mt-2">We do not share your information with any other third parties without your explicit consent.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">6. Data storage and security</h2>
            <p>Your data is stored securely. We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">7. Your rights under POPIA</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to the processing of your personal information</li>
              <li>Withdraw your consent at any time</li>
              <li>Lodge a complaint with the Information Regulator</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, contact us at privacy@theelementary.co.za.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">8. Data retention</h2>
            <p>We retain your waitlist and enquiry data for as long as it remains relevant to its purpose, or until you request deletion. If you do not engage with our communications for 12 months, we will delete your data unless there is a legal reason to retain it.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">9. Changes to this policy</h2>
            <p>We may update this privacy policy from time to time. We will notify you of significant changes via the communication channel you provided (WhatsApp or email).</p>
          </section>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Create terms and conditions page**

Create `src/app/terms/page.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Elementary",
  description: "Terms of use for the Elementary website and waitlist.",
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-[720px] mx-auto px-8">
        <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-text-muted text-sm mb-12">
          Last updated: 31 March 2026
        </p>

        <div className="prose-dark space-y-8 text-text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">1. Introduction</h2>
            <p>These terms and conditions (&quot;Terms&quot;) govern your use of the website theelementary.co.za (&quot;Website&quot;), operated by Elementary Data &amp; Software Solutions (EDSS) (&quot;Elementary&quot;, &quot;we&quot;, &quot;us&quot;), a company registered in South Africa.</p>
            <p>By accessing or using the Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">2. Website purpose</h2>
            <p>The Website serves as a marketing and informational platform for Elementary&apos;s software engineering services and products, including the Dickson handyman marketplace. The Website allows visitors to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Learn about Elementary&apos;s services and products</li>
              <li>Register interest in the Dickson waitlist</li>
              <li>Submit business partnership enquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">3. Waitlist participation</h2>
            <p>Joining the Dickson waitlist does not guarantee access to the Dickson platform, a specific launch date, or any particular service. Waitlist position may be determined by geographic area, role, and registration date. We reserve the right to modify or discontinue the waitlist at any time.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">4. Intellectual property</h2>
            <p>All content on the Website — including text, graphics, logos, the &quot;Elementary&quot; and &quot;Dickson&quot; brand names, and design elements — is the property of Elementary Data &amp; Software Solutions and is protected by South African intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our written permission.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">5. Disclaimer of warranties</h2>
            <p>The Website is provided &quot;as is&quot; without warranties of any kind, express or implied. We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">6. Limitation of liability</h2>
            <p>To the maximum extent permitted by South African law, Elementary shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Website or reliance on any information provided on it.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">7. Privacy</h2>
            <p>Your use of the Website is also governed by our <a href="/privacy" className="text-accent hover:text-accent-light">Privacy Policy</a>, which explains how we collect, use, and protect your personal information in compliance with the Protection of Personal Information Act (POPIA).</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">8. Governing law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the South African courts.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">9. Changes to these terms</h2>
            <p>We may update these Terms from time to time. Continued use of the Website after changes constitutes acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">10. Contact</h2>
            <p>For questions about these Terms, contact us at:<br />Email: legal@theelementary.co.za</p>
          </section>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify both pages render**

```bash
npm run dev
```

Navigate to `/privacy` and `/terms`. Expected: Clean, readable legal pages with proper heading hierarchy, dark theme, consistent styling.

- [ ] **Step 4: Commit**

```bash
git add src/app/privacy/page.tsx src/app/terms/page.tsx
git commit -m "feat: add privacy policy and terms pages (POPIA compliant)"
```

---

## Task 12: Build Verification & Final Polish

**Files:**
- Modify: `src/app/globals.css` (if needed for any polish)

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors. All pages are statically generated except API routes.

- [ ] **Step 2: Fix any build errors**

If TypeScript or build errors occur, fix them. Common issues:
- Missing `"use client"` directives on components using hooks
- Import path issues (should use `@/components/...`)

- [ ] **Step 3: Run production preview**

```bash
npm run start
```

Navigate through all pages in browser:
- `/` — all sections render, forms work, scroll animations fire
- `/dickson` — hero, homeowner features, tradespeople features, waitlist form
- `/privacy` — readable, all sections present
- `/terms` — readable, all sections present
- Mobile responsive — test at 375px width
- Nav hamburger menu works on mobile
- All links navigate correctly

- [ ] **Step 4: Test form submissions**

Submit waitlist form. Check `data/waitlist.json` contains the entry.
Submit partner form. Check `data/partners.json` contains the entry.

- [ ] **Step 5: Remove accent toggle from mockup reference**

The accent toggle in `mockup.html` was for review only. The production site uses teal. No action needed — the mockup is a separate file.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete Elementary website - all pages, forms, and styles"
```

---

## Summary

| Task | What it builds | Key files |
|---|---|---|
| 1 | Project scaffolding, Tailwind tokens, fonts | `tailwind.config.ts`, `layout.tsx`, `globals.css` |
| 2 | Navigation + Footer | `nav.tsx`, `footer.tsx` |
| 3 | Scroll reveal animation | `section-reveal.tsx` |
| 4 | Hero section | `hero.tsx` |
| 5 | Dual path cards + Dickson logo | `dual-path.tsx`, `dickson-logo.tsx` |
| 6 | 8-card services grid | `services-grid.tsx` |
| 7 | Trust section + tech stack | `trust-section.tsx`, `tech-stack.tsx` |
| 8 | CTA with tabbed forms | `cta-section.tsx`, `waitlist-form.tsx`, `partner-form.tsx` |
| 9 | API routes for submissions | `route.ts` (x2), `submissions.ts` |
| 10 | Dickson product page | `dickson/page.tsx` |
| 11 | Privacy + Terms pages | `privacy/page.tsx`, `terms/page.tsx` |
| 12 | Build verification + polish | All files |
