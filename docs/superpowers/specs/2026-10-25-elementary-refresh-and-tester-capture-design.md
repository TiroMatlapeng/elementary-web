# Elementary brand refresh + Modiri tester capture — Design

**Date:** 2026-10-25
**Status:** DRAFT — awaiting founder approval. Nothing is built until this is approved.
**Spans two repos:** `elementary-web` (brand refresh + tester form) and `modiri` (static site + monolith daily digest).

---

## 1. Intent & why

Two linked problems, brainstormed together because they meet on the same pages:

1. **Modiri beta distribution is download-first, and it isn't working.** The sites currently push an APK download. Sideloading an unsigned APK is onerous for ordinary users *and* does nothing for Google Play's **12-tester / 14-day closed-testing gate** that stands between Modiri and a public Play listing. The founder intended to recruit testers personally but has been too busy. We need the website to do that recruiting: capture a would-be tester's details and route them into the right official channel (Play closed testing / Apple TestFlight).

2. **The Elementary brand has outgrown its look.** The current style (acid-yellow accent, "REV.001 / ZA-2026" blueprint annotations, outlined stroked display type, diagonal section cuts) reads playful and wears thin. The founder has moved on from it and wants something that ages better.

The capture **backend already exists** (see §6) — the real work is the front doors and a redesign.

## 2. Goals

- Both web front doors capture **name, email, mobile, device platform (iOS/Android), role** and feed the existing `POST /api/v1/waitlist`.
- Android signups are steered toward **Google Play closed testing**; the form asks for the **Google Play account email** (shown as a hint when Android is selected).
- iOS signups are routed to **TestFlight**.
- The **APK stays as a quiet, de-emphasised fallback** on modiri.co.za — not the headline path.
- A **daily email digest** of the last 24h of signups, split into an iPhone list and an Android list, to a configurable recipient — so no signup sits unseen and the team can batch-invite.
- The **Elementary site is refreshed whole** (home, Modiri, ventures, nav, footer, privacy, terms, partner/contact) to the agreed **Direction B**.
- A **Ventures** section that lists Modiri (described, live) and the unreleased ventures by **name only**.

## 3. Non-goals

- **No automated Play/TestFlight invite integration.** Inviting stays manual: the daily digest tells the operator who to add in Play Console / App Store Connect.
- **No Firebase App Distribution** as the Android channel. (Considered; rejected because it does not count toward the Play gate. The manual APK fallback remains for the stubborn.)
- **No public descriptions, landing pages, or waitlists for unreleased ventures.**
- **No new waitlist schema / migration.** The `platform` and `mobile` columns already exist; the resurface + digest work below reuses `notified_at`.
- **No change to the existing operator `/notify` launch-email flow.** (A *separate* lightweight "mark invited" admin action is added instead — see WS-C.)
- **register() logic WILL change** (founder-approved 2026-10-25): a repeat signup now updates `platform` and resurfaces the entry. This overrides the earlier "idempotent, first-signup-wins" behaviour.

## 4. Anti-goals (would make this a failure even if it "works")

- Telling competitors **what** LeungoERP / Moreki / Caring are. Names only; Modiri is the only described venture.
- Any "launching soon" promise with a date we can't keep.
- A redesign that still reads templated or playful.
- An Android tester giving a **non-Google email** so their Play invite silently never arrives — the copy must actively prevent this.
- A signup landing **silently** — the digest is the safeguard; an unknown/zero day must read as "no signups", not a broken job (per the unknown-is-never-a-zero SOP).

## 5. Decisions locked with the founder

**Visual — Direction B ("Editorial Serif"):**
- Palette: **bone `#F4F1EA`** base · **ink `#19181B`** text/darkest · **bottle green `#1E5A43`** primary accent (every primary action) · **navy `#1F2A52`** secondary, supporting only (dark Modiri band, secondary buttons/links, "In development" tag, the odd eyebrow).
- Type: **Fraunces** (serif display/headlines), **DM Sans** (body), **Spectral** (editorial eyebrows/ledes).
- Remove entirely: acid-yellow, blueprint annotations, outlined/stroked display type, diagonal section cuts. Replace with serif headlines, hairline rules, numbered editorial grids, generous whitespace.
- Scope: **whole site.**

**Tester capture:**
- Android → **Google Play closed testing**; request the **Google Play account email** (hint appears on Android select). iOS → **TestFlight**.
- **Both** sites become a tester-invite flow (the Elementary `/modiri` page converts from "launch waitlist" to "test invite").
- APK kept as a collapsed fallback on modiri.co.za.

**Alert:** **daily email digest**, last 24h, grouped iPhone/Android, to a **configurable** recipient (default: founder's email).

**Ventures:** two tiers only — **Beta · live** (Modiri, with description) and **In development** (LeungoERP, Moreki, Caring — names only, navy tag). **Mqhubi is dead** and does not appear. Product name is **LeungoERP** (corrected from an earlier "LeungERP" typo).

### Resolved 2026-10-25 (post builder-check)

- **Broken Elementary form:** fixed *within* WS-B (no separate hotfix). Consequence: WS-B's Elementary form work leads sequencing, because until it ships the `/modiri` signup keeps rejecting every submission in production.
- **Android email:** **hint + a required confirmation checkbox** ("this is my Google Play account email"). No hard domain validation — Google accounts can be any domain, so `@gmail`-only blocking would wrongly reject valid Workspace testers.
- **Repeat signups:** **update & resurface** — a duplicate email updates `platform` and puts the entry back on the to-invite list (overrides the old first-signup-wins idempotency).
- **Digest recipient:** **admin@modiri.co.za** (role mailbox; config-driven so more can be added).
- **One invite email** per signup (reuse the existing `email` field, reframed per device). **iOS stays capture-and-emailed-invite** — no public TestFlight self-serve link (not requested).

## 6. Existing system to build on (do not rebuild)

- **`waitlist.entries`** (monolith): `name, email, mobile, city, track(HOMEOWNER|ARTISAN|COMPANY|VAN_DRIVER), platform(IOS|ANDROID), registered_at, notified_at`. Unique on email.
- **`POST /api/v1/waitlist`** — public registration. **Idempotent on email: first signup wins and the originally recorded platform is NOT overwritten** on a duplicate (edge case to note in copy/ء expectations).
- **`GET /api/v1/waitlist`** (admin) — filter by track/platform/notified. **`POST /api/v1/waitlist/notify`** (admin) — existing launch-email flow, left untouched.
- Email send: `JavaMailSender` + `EmailNotificationSender` already wired (from-email/from-name already config-driven in `WaitlistService`). Scheduling: `@EnableScheduling` + `SchedulerConfig` + Redisson distributed locks available.
- **modiri.co.za** = `frontend/website/` static HTML. `download.html` **already has a beta form** posting name/email/track/platform to the live API — but it **omits mobile** and still surfaces the APK + a Firebase-worded confirmation. Deploy: `website.yml` rsync→Hetzner, which **mirrors git with `--delete`** (untracked files get wiped — keep APK + build.txt in the tracked tree).
- **Elementary `/modiri`** = `waitlist-form.tsx` → `/api/waitlist` route → `waitlist-mapping.ts` → backend. Captures mobile but **no device/platform**, and the mapping does **not** forward platform. A **two-sided contract test** (`waitlist-mapping.test.ts`) and a canonical fixture already exist.

## 7. Workstreams & what's left to the builder

### WS-A — Elementary brand refresh (`elementary-web`)
- Replace design tokens in `globals.css` with the B palette; load Fraunces/Spectral (prefer `next/font`). **Next.js 16 / React 19 / Tailwind v4** — read `node_modules/next/dist/docs/` before writing Next code (per AGENTS.md; Next 16 has breaking changes).
- Rework `hero.tsx` (drop outlined type, blueprint cross, "REV.001", diagonal cut), home sections, `nav`, `footer`, `/modiri` page, and the privacy/terms shells to B.
- Add a **Ventures** section (names-only treatment; mockup: `.superpowers/brainstorm/.../ventures-final.html`).
- Builder owns component structure; match existing conventions.

### WS-B — Tester capture (both front ends + the contract)
- **Elementary `/modiri`:** add a **device/platform selector**, add the **Google-Play-email hint + required confirm checkbox** on Android, **forward `platform`** (this also fixes the current production outage), and reword from "launch waitlist" to "test invite". Update `waitlist-mapping.ts`, the **canonical fixture**, and the **two-sided tests**. Built in the new B skin.
- **modiri.co.za `download.html`:** add the **mobile** field (its only missing capture — the form already sends `platform`, so it is NOT broken), add the **Google-email hint + confirm checkbox** on Android, reword the Android confirmation from **Firebase → Google Play closed testing**, keep the APK as a **collapsed fallback**, and point any homepage "download" CTA (`index.html`) at the tester invite. **Keeps its own Modiri navy/amber brand — NOT the Elementary B redesign.**
- **Mandatory:** follow the `cross-boundary-contracts` skill (single source-of-truth fixture + two-sided tests + two-agent review) because `platform` now crosses the Elementary→Modiri boundary.

### WS-C — Signup digest + resurface (`modiri` monolith)
- **Digest model = outstanding, not a time window** (refined from the earlier "watermark" idea after the repeat-signup decision; simpler *and* complete). The digest lists entries **not yet invited** (`notified_at IS NULL`), grouped by platform — reusing the existing `findByTrackInAndPlatformAndNotifiedAtIsNull` query. Nothing is ever lost to a missed/delayed run, and no watermark state is needed. Each row = name, email, mobile, city, role.
- **`register()` resurface:** a duplicate-email signup now **updates `platform`** (if changed/absent) and ensures `notified_at` is `NULL`, so returning or device-switching testers reappear on the list. Replaces first-signup-wins idempotency.
- **Mark-invited admin action:** a new lightweight endpoint stamps `notified_at` for the ids the operator has added to Play/TestFlight — **without** sending the launch email (distinct from the existing `/notify` flow, which is untouched). This is what removes someone from the next digest.
- **Scheduled daily job**, **Redisson-locked** so it fires once across rolling-deploy instances. Empty day → an explicit "no signups awaiting invite" line, never a blank/zero that looks broken (unknown-is-never-a-zero SOP).
- Config (`application.yml`/env, never hardcoded): send-time, enable flag, recipient list — **default `admin@modiri.co.za`**.
- **Mandatory testing protocol** (modiri `CLAUDE.md`): `./gradlew cleanTest test`, report counts; bump `MonolithSmokeTest` for the new endpoint/bean. No Flyway migration required (reuses existing columns).

## 8. Sequencing

1. **WS-B Elementary form first** — it fixes a live production outage (every `/modiri` signup currently fails). Highest priority.
2. **WS-A + rest of WS-B (elementary)** done together — the tester form is built directly in the new B skin.
3. **WS-C** (backend digest + resurface) — isolated; can run in parallel in the `modiri` repo.
4. **WS-B (static site)** — small, independent edit to `download.html` + homepage CTA.
5. **Cross-boundary review** of the `platform` contract change before merge.
6. Deploy + **real-render** verification (not just a green build).

## 9. Testing & deploy

- **modiri monolith:** full suite, reported counts (binding protocol).
- **elementary-web:** `npm run build` + `npm run lint`; load the pages in a real browser (visual changes need a real render, per standing SOP) — a build is not a rendering verdict.
- **Deploy:** elementary-web via Helm; modiri.co.za via `website.yml` (mind the `--delete` mirror).

## 10. Open questions for the founder

**All resolved 2026-10-25** (see §5 "Resolved" subsection): broken form folded into WS-B; Android = hint + confirm checkbox; repeat signups update & resurface; digest recipient = admin@modiri.co.za. No open questions remain.

Separately noted (not blocking this build): the `admin@modiri.co.za` mailbox is on GoDaddy Workspace Email and is currently prompting for its password repeatedly — being diagnosed on its own track. The digest's usefulness depends on that inbox being reliably reachable.

---

### Mockups (persisted, for the builder)
`elementary-web/.superpowers/brainstorm/76578-1792939426/content/` — `final-signoff.html` (whole look), `ventures-final.html` (ventures treatment), `palette.html` (colour system), `b-depth-v2.html` (device-icon SVGs + form).
