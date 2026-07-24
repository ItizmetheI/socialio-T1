# Astro migration runbook

Pattern: sequential | Mode: safe
Branch: `astro-migration` (NOT pushed to GitHub until explicitly approved)
Goal: real static HTML per page (LLM/crawler readable) with zero visual/functional regression. Preserve the page-transition feel via Astro ClientRouter (View Transitions) matching current Framer Motion timing (opacity 0→1, y 10→0/-10, 0.3s easeOut).

## Stop conditions
- Any phase that breaks build/lint/visual parity halts before moving to the next phase.
- Nothing pushed to GitHub / production until user reviews the local preview and says go.

## Phases

1. **Scaffold** — Astro + React integration + Tailwind v4, port design tokens/fonts/global CSS 1:1. Verify blank page renders with correct theme.
2. **Static pages** (no interactivity): About, Privacy, Terms, Compare, Industries. Verify visual parity.
3. **Light-interactive pages**: Reviews, Examples, CaseStudies (filter tabs as islands), Blog (newsletter form island), Contact (form island), Pricing (slider + add-to-cart islands).
4. **Heavy pages**: Home (hero tabs/counters/marquee/guarantee ring/portfolio filter), ServiceDetail (dynamic route from servicesData).
5. **Cross-cutting systems**: Cart (shared island/store across pages + CartDrawer), NavBar (mobile menu + megamenus), Footer, AutoplayVideo behavior, useSEO equivalent (Astro handles per-page meta natively via frontmatter/props instead).
6. **Client portal**: ClientLogin/ClientDashboard — kept as-is scope TBD per user answer.
7. **Page transitions**: Astro ClientRouter + custom transition:animate to replicate current cross-fade.
8. **Verification pass**: build, lint/typecheck, local visual walkthrough of every route, raw-HTML (no-JS) content check per route, cart/forms/filters functional test.
9. **Only after explicit user approval**: push branch, open path to deploy.

## Status
- [ ] Phase 1: Scaffold
- [ ] Phase 2: Static pages
- [ ] Phase 3: Light-interactive pages
- [ ] Phase 4: Heavy pages
- [x] Phase 5: Cross-cutting systems
- [x] Phase 6: Client portal
- [x] Phase 7: Page transitions
- [ ] Phase 8: Verification
- [ ] Phase 9: Push (blocked on user approval)
