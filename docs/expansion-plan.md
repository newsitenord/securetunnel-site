# Quality-first expansion plan

## Current delivery, not a volume promise

The migration preserves 281 existing indexable URLs and adds six documentation-based articles, for 287 indexable pages. Each new article exceeds 1,200 words without counting the shared layout, citations or affiliate offer. No 100,000-page generation job has been run.

The requested 100,000 × 1,200-word corpus would be at least **120 million words**. A meaningful page needs an independently useful question and supporting information; the number of possible keyword combinations is not a content inventory.

## First batch

| URL | Distinct reader task | Body words |
|---|---|---:|
| `/learn/vpn-vs-private-browsing` | Distinguish local browser retention from network routing | 1,468 |
| `/learn/vpn-vs-proxy` | Compare routing scope, encryption boundaries and intermediary trust | 1,453 |
| `/learn/vpn-captive-portal-login` | Resolve a captive-network login without leaving controls disabled | 1,446 |
| `/learn/vpn-and-password-managers` | Prioritize account security versus a separate network privacy need | 1,466 |
| `/learn/read-vpn-no-logs-audits` | Evaluate policy categories, evidence, audit scope and exclusions | 1,436 |
| `/learn/test-vpn-speed-fairly` | Design an honest, repeatable personal speed comparison | 1,449 |

The articles disclose their documentation-based, AI-assisted preparation. No invented test measurements, fake authors, fabricated provider ratings or streaming guarantees were added. Optional affiliate offers appear only on two of the six pages; every article is useful without clicking one.

## Next editorial work

Before increasing page count, audit inherited commercial and legal material. The original data includes current-price, speed, server-count, jurisdiction and working-server assertions. Migration preserves the original pages; it does not authenticate their evidence. Do not relabel all older material as newly verified.

Build the next batch around demonstrated gaps. The following are **research candidates, not approved pages**:

| Candidate task | Evidence needed | Overlap decision |
|---|---|---|
| Explain VPN versus browser tracking protection | Current browser documentation and a clear observer model | Extend private-browsing article if answer is mostly shared |
| Diagnose a printer disappearing after VPN connection | Specific client LAN-access documentation and reproducible device observations | Compare with existing split-tunneling/router guides |
| Understand IPv6 behavior in a VPN client | Version-specific provider documentation and controlled leak checks | Prefer updating the existing IP-leak guide until evidence differs |
| Evaluate an employer's VPN versus a consumer service | Enterprise access/security documentation | Distinct purpose, but avoid workplace-monitoring promises |
| Plan secure recovery while traveling without a phone | Official account and authenticator recovery guidance | Link to, rather than duplicate, password-manager discussion |
| Read a VPN subscription's total and renewal price | Current regional checkout, taxes, term and cancellation terms | Update existing pricing page unless a genuinely distinct decision exists |
| Interpret a reported DNS resolver location | Resolver operator documentation and test-method limits | Likely expansion of existing DNS guide |
| Distinguish GPS location from IP geolocation | Platform permission documentation | Potential standalone guide with platform-specific examples |
| Understand public IP versus private LAN address | Networking references and safe local diagnostic examples | Potential standalone educational guide |
| Set up a travel router safely | Exact hardware/firmware support and tested setup | Do not generate untested router-model variations |
| Compare security-audit types | Actual publicly available reports and their scopes | Extend the audit-reading guide unless a specific reader need is different |
| Troubleshoot video-call instability under VPN | Reproducible metrics and app-specific documentation | Distinguish from generic slow-speed troubleshooting |

Publish approved articles in reviewable batches. Track corrections and source availability. There is no justified final page count until an inventory exists.

## Before moving from hundreds to thousands

- Add topic hubs only when there is enough distinct material to make each useful.
- Check semantic overlap against the **entire** existing site, not only exact hashes among new JSON files.
- Link new answers from relevant older articles, not just global navigation.
- Add reportable source-check queues and named human editorial accountability.
- Establish an update schedule appropriate to claim volatility; pricing and legal assertions need different handling from basic networking explanations.
- Inspect Search Console coverage, canonical selection, crawl errors and user engagement. These data are not available in this session.
- Measure Netlify build size, function bundle size, cold-start latency and cache behavior using real reviewed content.

## Before attempting 100,000 approved articles

The native route model already allows approved articles beyond the first 24 to be rendered through ISR, and the sitemap can be partitioned below protocol limits. These features are necessary but insufficient.

Required additional work:

1. **Source of truth:** an external content database/CMS with indexed status, slug, topic, publication date and modification date; article bodies in a suitable database or object store. The current file adapter traces all article JSON into deployment assets and should not be assumed viable at that scale.
2. **Bounded queries:** paginated catalog reads, per-slug body fetches and per-shard sitemap queries rather than loading the full corpus for every build/runtime operation.
3. **Publishing operations:** authenticated publishing, validation, review approval, targeted revalidation and reliable unpublish/cache-purge behavior. The current repository model requires a deploy to change the catalog.
4. **Discovery:** meaningful topic hierarchy and searchable library, not thousands of sequential pagination hops or a footer full of keywords.
5. **Editorial evidence:** enough original research, properly licensed structured data or verified documentation to support each distinct page. Never multiply countries/devices merely to reach a quota.
6. **Scale tests:** representative real article bodies, bundle size budgets, cold/warm request tests, cache invalidation tests, crawl simulations and cost monitoring on the actual hosting plan.
7. **Governance:** monitoring, rollback, corrections, legal-content review, source retention and explicit ownership of stale-content remediation.

The 100,001-URL unit fixture proves only sitemap chunking. It must not be described as a 100,001-page production load test.

## Explicit non-goals

- No ranking or indexing guarantee.
- No same-article country/city/device multiplication.
- No automatic new-page publication from arbitrary URL parameters.
- No fake independent tests or invented legal conclusions.
- No hidden-only affiliate relationship: the long notice is in the footer, with a brief notice beside affiliate offers.
- No automatic production merge or deployment in this delivery.
