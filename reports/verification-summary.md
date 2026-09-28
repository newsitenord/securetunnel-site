# Local verification — 28 September 2026

- Native Next.js 16.3.6 production build: passed.
- Content gate: six published guides; 8,718 body words; all exceed 1,200 words.
- Unit tests: 13 passed.
- Browser tests: 6 passed (Chromium, including mobile-width checks and real 404 responses).
- Built HTML audit: 287 pages, 281 baseline URLs preserved, 17,034 internal links checked, 267 affiliate links checked, 1,043 parseable JSON-LD blocks, 287 sitemap URLs, zero reported errors.
- Production-server HTTP checks: 296 passed, zero failures.
- Production dependency advisory check (`npm audit --omit=dev`): zero reported vulnerabilities at the time of the check.
- Credential-pattern scan of tracked and untracked deliverable files: no GitHub credential patterns found.

These tests do not validate every inherited factual claim, guarantee search indexing, or replace review of Netlify's deployment runtime. The 100,001-URL sitemap unit fixture is synthetic test data, not published content or a production load test.

The long opening affiliate disclosure is removed. The footer retains the full disclosure, and affiliate offers retain a nearby short notice. The supplied link is used without per-page tracking parameters.
