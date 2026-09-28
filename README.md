# SecureTunnel — Next.js publishing site

Native **Next.js 16 App Router + React 19**, preserving the original Astro site's URLs and structured data. There is no Astro build dependency, HTML snapshot wrapper or client-only article rendering.

## What this branch actually contains

- **281 existing indexable URLs preserved** (the repository's baseline build; the 404 is separate).
- **6 new documentation-based guides**, 1,436–1,468 body words each, **8,718 words total**.
- **287 indexable pages**, not 100,000 articles.
- A source-linked learning library at `/learn`, readable article layout, table of contents, related guides and optional contextual affiliate offers.
- The repeated opening disclosure block removed; full disclosure in the footer and a short notice beside affiliate offers.
- The supplied affiliate URL retained: `https://nordvpn.sjv.io/Dym2Wa`.
- A sitemap index and 10,000-URL shards, server-rendered metadata, real 404s and an approved-content-only routing registry.
- Capped prerendering of new articles, with ISR for additional approved catalog entries.

**This is a review branch.** The migration has been built and tested locally; the Netlify runtime/deployment must be verified in a deploy preview before merging. No production deployment is performed by the code in this repository.

## Run locally

Use Node 22 (Netlify is configured for it); the current app was also built on Node 20.20.2.

```bash
npm ci
npm run dev                 # generates validated catalog, binds 0.0.0.0:3000
npm run verify              # content/unit tests, production build, built HTML audit
npm start                   # production server
```

With the production server running:

```bash
npm run audit:http          # checks all original/new page URLs and expected 404s
npx playwright install --with-deps chromium
npm run test:browser        # navigation, citations, mobile width, disclosure, 404s
```

`AUDIT_ORIGIN` can point HTTP/browser audits at another deployment. It is used only by QA scripts, never by browser-facing application code. The built-output audit can also use it to fetch approved ISR pages not prebuilt after the catalog exceeds 24 new guides.

## Files to edit

| Location | Purpose |
|---|---|
| `src/config.js` | Site origin, affiliate link, navigation and shared legal copy |
| `src/data/*.js` | Existing provider/country/device/guide data, retained from the old site |
| `src/templates/**/*.jsx` | Native React equivalents of existing page templates |
| `src/lib/legacy-routes.jsx` | Explicit registry for the preserved routes |
| `content/articles/*.json` | Individually authored new guides; drafts are not public |
| `src/lib/content-policy.js` | Structural publication gates and exact-copy guardrails |
| `src/lib/articles.js` | Catalog lookup and file-backed content adapter |
| `src/lib/site-routes.jsx` | Single URL inventory used by page rendering and sitemaps |
| `src/app/[[...segments]]/page.jsx` | Server-rendered routing, metadata and ISR |
| `src/app/sitemap.xml/route.js` | Sitemap index |
| `src/app/sitemaps/[file]/route.js` | Sitemap shards |
| `reports/` | Local QA results |

`src/generated/catalog.json` is generated before development, tests and production builds. It is intentionally not committed. Never add GitHub tokens or other credentials to configuration, content, commands saved in the repository, or public files.

## Publishing another guide

```bash
npm run content:new -- a-specific-reader-problem
```

This creates a **draft**, not a page. Complete the title, description, distinct intent, introduction, substantive sections, source records, source-to-section references, related links and dates. Each paragraph is plain text rendered safely by React; arbitrary HTML is not accepted.

Then:

1. Compare the intent with both the existing site and other proposed articles. Merge overlapping answers rather than creating keyword variations.
2. Read the supporting sources. A valid URL field does **not** prove that a source supports a claim.
3. Write enough specific guidance to answer the question. The new-guide minimum is 1,200 body words, excluding navigation, footer, references and affiliate copy. Do not pad narrow topics to meet it; improve an existing article instead.
4. Include limitations, relevant non-purchase alternatives and useful cross-links.
5. Set real publication/update/source-check dates. Do not change dates simply to make content look fresh.
6. Set `status` to `published` only after editorial review of the content. The initial six guides are visibly labeled AI-assisted and documentation-based; no human testing or independent review is claimed.
7. Run `npm run verify`, inspect the article, and use a deploy preview before merging.

For a reviewed batch, add its individual JSON files together and run the same gate. **No Cartesian-product or article-spinning generator is included.** Merely adding a keyword to a file does not create a routable page.

### What the gate does and does not prove

The gate validates body length, source fields and citation indices, dates, related links, section structure, placeholder patterns, and duplicate titles/intents/bodies or copied long paragraphs **among the new structured guides**. It rejects unsupported first-person testing language in documentation-based articles.

These are mechanical guardrails, not semantic fact-checking or proof of editorial quality. Paraphrased duplication, outdated product claims and misleading use of a real source still require review. Existing template content is separately preserved and structurally audited; its facts were **not re-verified** during migration.

## SEO behavior

- All approved pages have self-canonicals, distinct titles/descriptions and server-rendered content.
- The sitemap uses the same URL inventory as the page resolver.
- Drafts, unknown slugs and invented platform/country combinations do not resolve.
- New guide `lastmod` values come from their actual content dates. Old page dates are not globally refreshed in sitemaps during migration.
- Article and breadcrumb schema describe visible material; no fabricated ratings are added to the new guides.
- Related links and the library provide discovery without putting a giant keyword list on every page.
- Affiliate offers use `rel="nofollow sponsored noopener noreferrer"`.
- The Google verification HTML file is now served from `public/`.

Changing frameworks or increasing word/page counts does not guarantee indexing or rankings.

## Netlify rollout and rollback

1. Open a pull request into `main`; do not merge before preview review.
2. Netlify should detect Next.js and install its runtime. `netlify.toml` now uses `.next`, not Astro's `dist`.
3. Verify `/`, `/learn`, a new guide, an old watch page, `robots.txt`, both sitemap endpoints, RSS and a nonexistent URL in the deploy preview.
4. Production canonicals intentionally remain `https://securetunnel.netlify.app`. Restrict indexing of the hosting provider's deploy-preview domains in hosting settings; do not submit preview URLs to search engines.
5. Review inherited claims about prices, server counts, legal rules, test results and working streaming servers before treating the whole catalog as current.
6. Merge only after approval. For rollback, revert the migration commit and redeploy; the original Astro version remains in Git history.

## About the 100,000+ target

The sitemap utility has a unit test using **100,001 synthetic URLs**. Those fixtures are never published. That test verifies partitioning and uniqueness, **not** the existence of 100,001 articles, SEO value, Netlify capacity or production performance at that scale.

This branch uses a small file-backed catalog suitable for the current content. At 100,000 articles, bundling every JSON body into server functions, loading a whole catalog and relying on a long pagination chain are not a production architecture to promise without further work. A database/object-store content adapter, indexed topic/search catalog, targeted cache invalidation, hosting-size checks, load tests and a much larger editorial/source workflow are required first. See `docs/expansion-plan.md`.

## Audit history

- `docs/baseline-routes.json`: original 281 indexable URLs.
- `docs/baseline-audit.txt`: original Astro build audit.
- `docs/previous-astro-readme.md`: archived original documentation, not current operating instructions.
- `reports/build-audit.json`: latest Next.js structural/SEO audit.
- `reports/http-audit.json`: latest production-server status checks.
