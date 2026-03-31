# Elementary Website Redesign — Design Spec

**Date:** 2026-03-31
**Project:** theelementary.co.za rebuild
**Status:** Approved for implementation

---

## 1. Purpose

Replace the current Canva-built website for Elementary Data & Software Solutions (EDSS) with a modern, production-grade Next.js site that:

- Positions Elementary as a leading South African software engineering and data company
- Promotes Dickson (formerly Modiri), a handyman services marketplace, as the flagship product
- Provides sign-up functionality for users who want to try Elementary's apps
- Serves B2B clients (insurance, construction, banking) who are also potential consumers of the marketplace
- Establishes trust, credibility, and a contemporary brand presence

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js (App Router) | SSR/SSG for SEO, React ecosystem, API routes for forms |
| Styling | Tailwind CSS | Utility-first, rapid iteration, consistent design tokens |
| Typography | Syne (display) + DM Sans (body) via Google Fonts | Distinctive, contemporary, excellent readability |
| Deployment | Vercel (primary) or Netlify | Free tier, automatic GitHub deploys, edge CDN |
| Forms backend | Next.js API routes → PostgreSQL or email relay (initially) | No third-party form dependency; later connects to auth-service |
| Domain | theelementary.co.za | Existing domain, DNS update required |

---

## 3. Brand Identity

### 3.1 Elementary (parent company)

- **Name:** Elementary (full: Elementary Data & Software Solutions / EDSS)
- **Visual direction:** Dark, premium, contemporary
  - Primary background: Near-black (`#0a0a0b`)
  - Secondary surfaces: Dark slate (`#141418`)
  - Light contrast sections: Off-white (`#f5f5f7`)
  - Accent color: TBD (user choosing between warm amber `#d4a853` and teal `#2dd4bf` — toggle in mockup)
  - Text: White/light gray on dark sections, dark gray on light sections
- **Typography:** Syne (display headings) + DM Sans (body text)
- **Motion:** Smooth scroll-triggered fade-ins (IntersectionObserver), subtle hover effects, micro-interactions. No aggressive parallax.
- **Feel:** Linear.app meets premium South African engineering firm. Dark, confident, spacious, with moments of warmth.

### 3.2 Dickson (product brand)

- **Name:** Dickson — named in honour of a real handyman from Malawi
- **Logo concept:** Monochromatic portrait of a generic African man smiling (not the real Dickson). Warm, dignified, approachable. "Dickson" in clean, confident type alongside or below the portrait. Not a memorial — a brand with soul.
- **Connection to Elementary:** Presented as "An Elementary product" — not a separate company

---

## 4. Sitemap & Page Specifications

### 4.1 Home (`/`)

**Sections (in order):**

1. **Navigation** — Sticky, frosted-glass dark nav
   - Left: Elementary wordmark with accent dot
   - Centre/right: Services, Products, About, Contact links
   - Right: "Sign Up" (ghost button) + "Get Started" (accent button)

2. **Hero** — Full-viewport dark section
   - Animated radial glow/gradient behind headline
   - Subtle grid overlay with masked edges
   - Large display headline (e.g., "Engineering from the ground up.")
   - Subtitle about building AND modernising software
   - CTAs: "Explore our services" + "Try Dickson"
   - Optional: accent colour toggle (for user review; removed in production)

3. **Dual Path** — Two equal-weight cards
   - **Our Products:** Dickson logo (monochromatic portrait), brief description, "Learn more" CTA
   - **Our Services:** Engineering icon, brief description targeting enterprise clients, "Explore services" CTA

4. **Services** — Light background (`#f5f5f7`) for contrast. 8 service cards in a 4-column grid:
   - Software Engineering
   - Application Modernisation
   - Cloud Migration & Readiness (AWS, Azure, GCP, Hetzner)
   - Data Warehousing & Data Lakes (end-to-end, tool-agnostic)
   - Data Management & Governance (quality, lineage, cataloguing, POPIA)
   - Business Intelligence & Analytics (Tableau, Power BI, QlikView, Qlik Sense)
   - ETL & Data Integration (Informatica, Talend, SSIS, dbt, Airflow, custom)
   - Data Virtualisation (traditional tools + AI-powered MCP integrations)

5. **Social Proof / Trust** — "Trusted by teams across" with industry icons: Insurance, Banking, Construction, Fintech, Proptech

6. **Tech Stack** — Pill grid showing engineering depth:
   - Spring Boot, Angular 19, Flutter, Kubernetes, PostgreSQL, Apache Kafka, TypeScript, Docker, AWS/Azure, Terraform, Redis, GraphQL, Java 21, dbt, Airflow
   - Tableau, Power BI, QlikView/Qlik Sense, Informatica, SSIS
   - Oracle, SQL Server, MySQL, MongoDB, AI/MCP

7. **CTA / Get Involved** — Two-column layout with tabbed forms
   - Left: Heading "Get involved early", benefit bullets:
     - Every worker SAPS vetted — zero criminal records, zero exceptions
     - Insured work — not happy, get reimbursed. Real money, not credit
     - Dickson Van — transport for workers who need it
     - WhatsApp updates — we'll keep you in the loop, not your spam folder
   - Right: Tabbed form card with two tabs:
     - **Tab 1 "Join the Waitlist"**: First name, last name, mobile (prominent — primary channel), email, city/area dropdown (Johannesburg, Pretoria, Cape Town, Durban, Other), role radio buttons (Homeowner / Tradesperson / Business). Submit: "Join the waitlist". Disclaimer: WhatsApp contact, POPIA compliant.
     - **Tab 2 "Partner with Dickson"**: Full name, work email, company, role/title, industry dropdown (Insurance, Construction, Banking, Property, Other), message textarea. Submit: "Request a conversation". Higher-friction, relationship-driven B2B path.

9. **Footer** — Four columns: Brand, Company links, Services links, Products links. "Built in South Africa" badge. POPIA compliance note. Copyright 2026.

### 4.2 Dickson Product Page (`/dickson`)

**Single page, two audience voices.**

**Top half — For homeowners and businesses:**
- Hero with Dickson branding (monochromatic portrait logo)
- Headline emphasising safety and trust
- Key messaging (in warm, casual, exciting marketing tone):
  - **Safety:** "You know exactly who's coming into your home." SAPS criminal record checks. Verified identity. Especially important for women living alone.
  - **Real references:** Not anonymous reviews — references from real people who know their work. Social testimonials with photos.
  - **Insured work:** Not happy? You're covered. Reimbursement built into the platform.
  - **Reliable:** Workers can actually get to you — Dickson Van provides transport for those who need it.
  - **For businesses:** Insurance companies sourcing vetted tradespeople for claims. Construction firms finding skilled labour. Banks needing property maintenance partners.
- CTA: "Join the waitlist" → scrolls to waitlist form or embeds one inline

**Bottom half — For tradespeople:**
- Messaging shift: "This is your platform"
- **Get work:** Consistent bookings from verified clients
- **Get verified:** SAPS check + skills vetting + references = a profile that stands out
- **Get transport:** Dickson Van removes the transport barrier
- **Get dignity:** "We're not building a gig economy. We're building a real economy." Fighting unemployment by removing barriers, not offering handouts.
- CTA: "Join as a tradesperson" → waitlist form with tradesperson pre-selected

### 4.3 Privacy Policy (`/privacy`)

- POPIA-compliant data privacy policy **for the Elementary website only** (not the Dickson app — that will have its own policies on its own platform)
- Covers: what data is collected (waitlist forms, contact forms, cookies), how it's stored, purpose of collection (waitlist management, WhatsApp communication, B2B follow-up), user rights (access, correction, deletion, objection), data retention periods, third parties (WhatsApp Business API provider), contact details for information officer
- Explicit consent statement at point of registration: "We'll contact you via WhatsApp and email about Dickson's launch"
- Plain language where possible, legally sound
- Should be reviewed by a lawyer before going live

### 4.4 Terms & Conditions (`/terms`)

- Terms of use **for the Elementary website** (not the Dickson platform — separate terms when that launches)
- Covers: website usage, waitlist participation, intellectual property, disclaimer of warranties, limitation of liability, governing law (South African law), POPIA compliance
- Draft provided; lawyer review recommended before go-live

### 4.5 About (`/about`) — Future

- Elementary story, team, values
- Not MVP-critical; placeholder link in nav/footer for now

---

## 5. Waitlist & Lead Generation Strategy

**This is a marketing site, not an application.** No user accounts, no authentication, no app functionality. The site generates leads and builds a waitlist.

### 5.1 Waitlist Registration (Consumer & Tradesperson)

**Stage 1 — On-site form (low friction):**
- Captures: first name, last name, mobile (primary — WhatsApp is the channel in SA), email, city/area, role (homeowner / tradesperson / business)
- Stored via Next.js API route → PostgreSQL or simple data store
- Instant confirmation via WhatsApp Business API (Twilio or Bird): "You're on the Dickson founding list."

**Stage 2 — Deep qualification (48-72hrs later, via WhatsApp):**
- Homeowners: "What's the one home job you've been putting off?" + frequency + biggest worry
- Tradespeople: trade type, experience, vehicle availability, area of operation
- Data feeds product prioritisation and investor pitch

### 5.2 B2B Partner Enquiries

- Separate "Partner with Dickson" form — higher friction, company/role/industry required
- These are relationship-driven, not drip-email targets
- Handled personally by Elementary team within one business day

### 5.3 Pre-Launch Engagement

- WhatsApp-first drip sequence (8 weeks), email as backup
- Referral mechanic: unique short-URL referral links designed for WhatsApp group forwarding
- Incentives: free first booking (R150-R250 credit) for homeowners, zero platform fee for 60 days for tradespeople
- Geographic phased rollout — waitlist queue has real teeth per area

### 5.4 Launch Readiness Indicators

Before public launch in any area:
- Minimum 30 fully vetted tradespeople covering core trades
- Minimum 500 consumer registrants in that geography
- At least 1 B2B anchor client (even pilot agreement)
- 50-100 successful beta bookings with NPS 70+

---

## 6. Responsive Design

- Mobile-first approach
- Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop), 1160px (max content width)
- Mobile nav: hamburger menu
- Services grid: 4 cols → 2 cols → 1 col
- Dual path cards: side-by-side → stacked
- Forms: full-width on mobile

---

## 7. SEO & Performance

- Server-side rendered pages for SEO (Next.js SSR/SSG)
- Semantic HTML (proper heading hierarchy, landmark elements)
- Open Graph and Twitter card meta tags per page
- Structured data (Organization, Product schemas)
- Target: Lighthouse score 90+ across all categories
- Image optimisation via Next.js `<Image>` component
- Font loading: `display=swap` for Google Fonts

---

## 8. Deployment

- Source: GitHub repository (`elementary-web`)
- Deploy: Vercel (connected to GitHub repo, auto-deploy on push to main)
- Domain: `theelementary.co.za` — DNS A/CNAME records pointed to Vercel
- Environment: Production branch = `main`
- SSL: Automatic via Vercel (Let's Encrypt)

---

## 9. Out of Scope (for now)

- Blog/content management system
- Careers page
- Case studies
- User authentication (full OAuth flow — Phase 2)
- Dickson app download links (app not yet in stores)
- Payment integration on the website
- Analytics dashboard (though Google Analytics / Plausible should be added)

---

## 10. Reference: Competitor Insights

- **SweepSouth:** Clean white + green, animated service tiles, task-focused booking UX, mobile-first
- **Kandua:** Blue primary, AI assistant "Jess", trust-heavy (85k+ reviews, 4.6 rating), educational content, vetting documentation
- **M4Jam:** Micro-task gig platform, survey/delivery focused

Elementary/Dickson differentiators vs. all competitors:
- Criminal record vetting (SAPS)
- Real-person references (not anonymous reviews)
- Insured work with reimbursement
- Transport provided (Dickson Van)
- Safety focus for vulnerable users (women living alone)
- B2B angle (insurance, construction, banking clients)
- Full-stack engineering company behind it (not just a marketplace startup)
