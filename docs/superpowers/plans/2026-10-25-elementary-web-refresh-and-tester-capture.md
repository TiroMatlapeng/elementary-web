# Elementary Web — Brand Refresh + Tester Capture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Because the waitlist fixture is a cross-service contract, the contract tasks additionally require superpowers:cross-boundary-contracts.

**Goal:** Restyle the Elementary site to the agreed "Direction B" and turn its `/modiri` page into a working Modiri tester-capture flow (email + phone + device), fixing the current production outage where every `/modiri` signup is rejected.

**Architecture:** Next.js App Router site. The visual system is a set of CSS custom-property tokens in `globals.css` plus three `next/font` families; components are restyled in place. The tester form posts to an internal Next route that maps the payload to the Modiri backend's `WaitlistRegistrationRequest` and forwards it server-side. The one shape crossing a service boundary (that request body, carrying the new `platform` field) is governed by a single canonical fixture with tests on both sides.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, TypeScript, `next/font/google`, `node:test`.

**Spec:** `docs/superpowers/specs/2026-10-25-elementary-refresh-and-tester-capture-design.md` (read it; this plan argues from it). Visual source of truth: the mockups in `.superpowers/brainstorm/76578-1792939426/content/` — `final-signoff.html`, `ventures-final.html`, `palette.html`, `b-depth-v2.html`.

## Global Constraints

- **Palette (exact):** bone `#F4F1EA` (base), ink `#19181B` (text/darkest), bottle green `#1E5A43` (primary accent — all primary actions), navy `#1F2A52` (secondary only: dark Modiri band, secondary buttons/links, "In development" tag).
- **Fonts:** Fraunces (serif display/headlines), DM Sans (body), Spectral (editorial eyebrows/ledes). All via `next/font/google`.
- **Remove entirely:** acid-yellow accent, blueprint annotations ("REV.001 / ZA-2026"), outlined/stroked display type, diagonal section cuts.
- **Next.js 16 / React 19 / Tailwind v4.** Per `AGENTS.md`, read `node_modules/next/dist/docs/` before writing Next code — Next 16 has breaking changes.
- **API envelope:** `{ data, message, status, timestamp }`. The route treats non-2xx **OR** `status !== "success"` as failure.
- **API URL is server-side only** (`MODIRI_API_URL`), never a `NEXT_PUBLIC_*`.
- **`platform` is required** and must be exactly `IOS` or `ANDROID`.
- **Cross-boundary contract:** single source of truth = `../modiri/contracts/fixtures/rest/waitlist_registration_request.json`, mirrored at `src/test/fixtures/waitlist_registration_request.json`. Two-sided tests + two-agent review (cross-boundary-contracts skill).
- **Ventures:** Modiri described + `Beta · live`; LeungoERP, Moreki, Caring **names only** + `In development`; **Mqhubi absent**. Two tiers only.
- **POPIA line** stays on the signup form.

## Review Focus

- **Blank/absent `platform`** → the mapper must throw (→ 400), never forward a null. A reasonable user who somehow submits without a device must not have the request silently rejected downstream with a 502. *(Task 1)*
- **Android selected, confirm checkbox unticked** → the form blocks submission with a clear message; it must not POST, because the Play invite would never arrive. *(Task 2)*
- **Duplicate email** → the Modiri backend returns `status: "success"` for an already-registered email; the UI must render success, not an error. *(Task 2)*
- **Backend unreachable / non-2xx** → the route returns the existing friendly message and the form shows it; no stack trace, no silent spinner. *(Task 2)*
- **Oversized / malformed email or name** → client + mapper validation reject before POST (backend enforces `@Size`/`@Email`). *(Task 1)*

---

## Task 1: Add `platform` to the waitlist contract (fixes the outage)

**Files:**
- Modify: `src/lib/waitlist-mapping.ts`
- Modify: `src/lib/waitlist-mapping.test.ts`
- Modify: `src/test/fixtures/waitlist_registration_request.json`
- Modify (canonical SoT, other repo): `../modiri/contracts/fixtures/rest/waitlist_registration_request.json`

**Interfaces:**
- Produces: `WaitlistRegistrationRequest` now includes `platform: "IOS" | "ANDROID"`. `ElementaryWaitlistBody` gains `platform?: unknown`. `mapWaitlistRequest(body)` throws `WaitlistMappingError` when platform is absent or not one of the two literals.

- [ ] **Step 1: Update both fixtures to the new canonical shape.** Add `"platform": "ANDROID"` to `src/test/fixtures/waitlist_registration_request.json` and the identical value to `../modiri/contracts/fixtures/rest/waitlist_registration_request.json`. Both files must stay byte-equal in the fields they share.

- [ ] **Step 2: Write the failing tests** in `waitlist-mapping.test.ts`:
  - update the existing "canonical homeowner payload" test to pass `platform: "ANDROID"` in the input (so it still deep-equals the updated fixture);
  - `test("throws when platform is missing")` → asserts `mapWaitlistRequest({...valid, platform: undefined})` throws `WaitlistMappingError`;
  - `test("throws when platform is not IOS or ANDROID")` → input `platform: "WINDOWS"` throws;
  - `test("maps platform IOS through unchanged")` → result `.platform === "IOS"`.

- [ ] **Step 3: Run the tests to verify they fail.** Run: `node --test src/lib/waitlist-mapping.test.ts` — Expected: FAIL (platform not on the type / not mapped).

- [ ] **Step 4: Implement.** In `waitlist-mapping.ts`: add `platform` to `WaitlistRegistrationRequest` and `ElementaryWaitlistBody`; add a `PLATFORMS = ["IOS","ANDROID"] as const` guard; in `mapWaitlistRequest`, read `asTrimmedString(body.platform)`, throw `WaitlistMappingError("Device platform is required")` if empty and `WaitlistMappingError("Unknown platform: …")` if not in the set; include `platform` in the returned object.

- [ ] **Step 5: Run the tests to verify they pass.** Run: `node --test src/lib/waitlist-mapping.test.ts` — Expected: PASS.

- [ ] **Step 6: Backend side of the contract.** In the `modiri` repo, locate any test that consumes `waitlist_registration_request.json` (e.g. a Waitlist contract/deserialization test) and run the waitlist slice: `./gradlew test --tests '*Waitlist*'`. Confirm the DTO (`WaitlistRegistrationRequest`, `platform` `@NotNull`) accepts the updated fixture. Expected: PASS. (This is the two-sided half of the cross-boundary contract.)

- [ ] **Step 7: Commit.** `git add` the four files; `git commit -m "fix(waitlist): carry device platform through the contract (fixes /modiri 400s)"`.

## Task 2: Device selector, Android confirm, and tester-invite copy on the form

**Files:**
- Modify: `src/components/waitlist-form.tsx`
- Verify (no change expected): `src/app/api/waitlist/route.ts` (forwards the mapped payload — now includes platform)

**Interfaces:**
- Consumes: `mapWaitlistRequest` from Task 1 (form state must now carry `platform`).

- [ ] **Step 1: Add platform + consent to form state.** Extend `FormState` with `platform: "IOS" | "ANDROID" | ""` and `googleEmailConfirmed: boolean`. Add a required **device selector** (iPhone / Android) using the two brand SVGs from the `b-depth-v2.html` mockup, styled with the B tokens.

- [ ] **Step 2: Android-only hint + required checkbox.** When `platform === "ANDROID"`, show the hint "Use the email on your Google Play account — that's where the invite goes" and a **required checkbox** `googleEmailConfirmed`. Submit is blocked (with a visible message) if Android is selected and the box is unticked. iOS requires no checkbox.

- [ ] **Step 3: Convert copy to tester-invite.** Replace "Join the waitlist / be among the first when we launch" with the tester-invite wording from `final-signoff.html` (what happens next: iPhone→TestFlight, Android→Google Play test; "we review signups daily"). Keep the POPIA line. Send `platform` in the POST body; keep the existing success/error handling.

- [ ] **Step 4: Verify behaviour.** `npm run build` (Expected: compiles) and `npm run lint` (Expected: clean). Then load `/modiri` in a real browser and confirm: device toggle works; the Android checkbox gates submit; a real submit returns success (watch the network call succeed against the backend); the success state renders. A build is **not** a render verdict — load the page. Record what you saw.

- [ ] **Step 5: Commit.** `git commit -m "feat(modiri): tester-invite capture with device + Google-Play-email confirm"`.

## Task 3: Direction-B design tokens and fonts

**Files:**
- Modify: `src/app/globals.css` (the `@theme` block)
- Modify: `src/app/layout.tsx` (swap `next/font` families)

**Interfaces:**
- Produces: CSS custom properties `--color-base|ink|accent (green)|secondary (navy)|surface|…` at the exact hex values in Global Constraints; font variables `--font-display` (Fraunces), `--font-body` (DM Sans), `--font-ed` (Spectral).

- [ ] **Step 1: Replace the palette tokens** in `globals.css` with the B values; delete acid-yellow tokens. Update the two `.service-card:hover` / reveal helper colours to B.
- [ ] **Step 2: Swap fonts** in `layout.tsx`: replace `Barlow_Condensed` → `Fraunces`, keep `DM_Sans`, replace `DM_Mono` → `Spectral`; update the `variable` names to match the tokens; update the exported `metadata` copy if it still references the old positioning.
- [ ] **Step 3: Verify.** `npm run build` + `npm run lint` clean; load the home page and confirm fonts/background changed site-wide. Record what you saw.
- [ ] **Step 4: Commit.** `git commit -m "feat(brand): Direction B design tokens + Fraunces/DM Sans/Spectral"`.

## Task 4: Nav + Footer to B

**Files:** Modify `src/components/nav.tsx`, `src/components/footer.tsx`.

- [ ] **Step 1: Restyle** both to B per `final-signoff.html` (serif wordmark "Elementary." with a green dot; bone/hairline nav; ink footer). Nav links incl. a "Ventures" entry. No gimmicks.
- [ ] **Step 2: Verify.** Build + lint clean; load any page, confirm nav/footer render in B on desktop and at phone width (no horizontal scroll). Record what you saw.
- [ ] **Step 3: Commit.** `git commit -m "feat(brand): nav + footer in Direction B"`.

## Task 5: Hero to B

**Files:** Modify `src/components/hero.tsx` (and `src/components/diagonal-cut.tsx` usage — remove the cut).

- [ ] **Step 1: Rebuild the hero** per `final-signoff.html`: serif headline with a green italic line, Spectral lede, ink + green buttons. **Delete** the outlined "ENGI/NEER/ING", the blueprint registration cross, the "REV.001 / ZA-2026" annotation, and the `DiagonalCut`. If `diagonal-cut.tsx` is now unused anywhere, delete it (zero-baggage rule).
- [ ] **Step 2: Verify.** Build + lint clean; load home, confirm the gimmicks are gone and the hero is B. Record what you saw.
- [ ] **Step 3: Commit.** `git commit -m "feat(brand): hero in Direction B, gimmicks removed"`.

## Task 6: Home body sections to B

**Files:** Modify `src/app/page.tsx` and any home-only section components (e.g. `dual-path.tsx`, services section).

- [ ] **Step 1: Restyle** the home sections to B — the "what we do" numbered hairline grid from `final-signoff.html` replaces playful cards. Keep content; change presentation.
- [ ] **Step 2: Verify.** Build + lint clean; load home top-to-bottom. Record what you saw.
- [ ] **Step 3: Commit.** `git commit -m "feat(brand): home sections in Direction B"`.

## Task 7: Ventures section (names-only)

**Files:** Create `src/components/ventures-data.ts` (the data, unit-testable without a React runner), `src/components/ventures.tsx` (presentation); add the component to `src/app/page.tsx` (and/or `/modiri` per layout). Create `src/components/ventures-data.test.ts`.

**Interfaces:**
- Produces: `VENTURES: { name: string; description?: string; tier: "live" | "dev" }[]` in `ventures-data.ts`; a `Ventures` component rendering it.

- [ ] **Step 1: Write a failing test** `src/components/ventures-data.test.ts` (node:test): assert `VENTURES` has Modiri with a non-empty `description` and `tier: "live"`; LeungoERP / Moreki / Caring each have `tier: "dev"` and no non-empty `description`; and no entry is named "Mqhubi".
- [ ] **Step 2: Run it to verify it fails.** Run: `node --test src/components/ventures-data.test.ts` — Expected: FAIL (module absent).
- [ ] **Step 3: Implement** `ventures-data.ts` (the array) and `ventures.tsx` per `ventures-final.html`: a list with the two chip styles (green `Beta · live`, navy `In development`). Modiri described; the other three names-only.
- [ ] **Step 4: Run it to verify it passes.** Expected: PASS. Then load the page and confirm the strip renders in B.
- [ ] **Step 5: Commit.** `git commit -m "feat(ventures): names-only In-development strip"`.

## Task 8: Modiri page to B (navy band) + integrate the form

**Files:** Modify `src/app/modiri/page.tsx`.

- [ ] **Step 1: Restyle** per `final-signoff.html`: B feature sections, the **Modiri hero band in navy `#1F2A52`**, the tester-invite section wrapping the Task-2 form, APK fallback as a quiet line, and the navy-outline "Partner with us" callout.
- [ ] **Step 2: Verify.** Build + lint clean; load `/modiri`, confirm the navy band, the restyled form still submits (device toggle + Android checkbox intact), and the APK link works. Record what you saw.
- [ ] **Step 3: Commit.** `git commit -m "feat(brand): Modiri page in Direction B with navy band"`.

## Task 9: Privacy / Terms shells to B

**Files:** Modify `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`.

- [ ] **Step 1: Confirm/adjust** these inherit the B tokens and read correctly (serif headings, bone background, legible body). Fix any element still pinned to old colours.
- [ ] **Step 2: Verify.** Build + lint clean; load both pages. Record what you saw.
- [ ] **Step 3: Commit.** `git commit -m "style(legal): privacy + terms in Direction B"`.

## Task 10: Whole-site verification

- [ ] **Step 1:** `npm run build` and `npm run lint` — Expected: both clean.
- [ ] **Step 2:** Run the contract tests both sides: `node --test src/lib/waitlist-mapping.test.ts` (Elementary) and `./gradlew test --tests '*Waitlist*'` (modiri). Expected: PASS.
- [ ] **Step 3: Real-render sweep** at desktop and phone width: home, `/modiri`, privacy, terms. Confirm: no acid-yellow / blueprint / diagonal-cut survivors anywhere; a live `/modiri` submit reaches the backend and shows success; no horizontal scroll at phone width. Record what you saw.
- [ ] **Step 4: Cross-boundary review** (cross-boundary-contracts skill): two-agent review of the `platform` contract change before merge.
- [ ] **Step 5: Final commit / open PR** per repo convention.
