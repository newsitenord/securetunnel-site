# SecureTunnel — programmatic SEO site for NordVPN affiliate promotion

A static [Astro 5](https://astro.build) site that generates **279 pages** from structured
data files, ready to deploy on Netlify.

> ⚠️ **This site contains affiliate links.** Every page carries an FTC-compliant
> disclosure and the Nord trademark notice. Do not remove them — NordVPN's
> affiliate terms and the FTC Endorsement Guides both require them.

---

## Quick start

```bash
npm install
npm run dev        # local dev server on http://localhost:4321
npm run build      # builds to dist/
npm run audit      # SEO + QA audit over the built output
```

Netlify is preconfigured in `netlify.toml` — build command `npm run build`,
publish directory `dist`. Nothing else to set up.

---

## The three files you will actually edit

| File | When to edit it |
|---|---|
| `src/config.js` | Your domain, your affiliate link, per-page tracking, nav |
| `src/data/nordvpn.js` | NordVPN changes a price, adds a feature, changes server counts |
| `src/data/*.js` | You want to add a country, competitor, platform, device or guide |

### 1. Change the domain

Open `src/config.js` and change one line:

```js
export const site = {
  url: 'https://securetunnel.co',   // <-- your real domain
  ...
}
```

That single change updates every canonical tag, the whole of `sitemap.xml`,
`robots.txt`, Open Graph URLs and the RSS feed. Nothing else is hard-coded.

Also update `netlify.toml` if you add redirect rules, and set the domain in the
Netlify dashboard under **Domain settings**.

### 2. Change the affiliate link

Also in `src/config.js`:

```js
export const affiliate = {
  baseUrl: 'https://nordvpn.sjv.io/Dym2Wa',
  subIdParam: '',   // see below
  ...
}
```

### 3. Per-page affiliate tracking (worth doing)

Impact supports `subId1`–`subId5` on tracked links. Setting `subIdParam` makes
every link carry the page it came from, so your Impact dashboard shows you
exactly which pages earn commissions:

```js
subIdParam: 'subId1',
// -> https://nordvpn.sjv.io/Dym2Wa?subId1=watch-netflix-us-india
```

**Test it first.** Click one generated link and confirm in Impact that the click
still lands on nordvpn.com with your campaign attached. If the parameter breaks
the redirect, set it back to `''`.

---

## What gets generated

| Section | Path | Pages | Source data |
|---|---|---|---|
| NordVPN review | `/reviews/nordvpn` | 1 | `data/nordvpn.js` |
| Deals / coupon | `/deals/nordvpn-coupon` | 1 | `data/nordvpn.js` |
| Pricing | `/pricing/nordvpn-pricing` | 1 | `data/nordvpn.js` |
| Alternatives | `/nordvpn/alternatives` | 1 | `data/competitors.js` |
| Comparisons | `/compare/nordvpn-vs-{id}` | 22 + hub | `data/competitors.js` |
| Country guides | `/vpn/{country}` | 40 + hub | `data/countries.js` |
| Streaming matrix | `/watch/{platform}/{country}` | 122 | `data/platforms.js` |
| Device guides | `/devices/nordvpn-for-{device}` | 16 + hub | `data/devices.js` |
| Use cases | `/use/vpn-for-{usecase}` | 10 + hub | `data/usecases.js` |
| Guides | `/guides/{slug}` | 14 + hub | `data/guides.js` |
| VPN legality | `/legal/{country}` | 26 + hub | `data/legal.js` |
| Troubleshooting | `/fix/{slug}` | 10 + hub | `data/troubleshooting.js` |
| Trust pages | `/about`, `/editorial-policy`, `/affiliate-disclosure`, `/privacy-policy`, `/contact` | 5 | — |

Plus `sitemap.xml`, `robots.txt`, `rss.xml` and `404.html`.

## Adding a page

To add a country, append an object to `src/data/countries.js`:

```js
c({
  id: 'portugal',              // URL: /vpn/portugal
  name: 'Portugal',
  region: 'Europe',
  risk: 'low',                 // 'low' | 'medium' | 'high'
  legal: null,                 // id in data/legal.js, if a legality page exists
  situation: 'Two or three sentences of genuinely country-specific context.',
  restrictions: ['The specific things that are blocked or restricted.'],
  popular: ['RTP Play', 'Opto', 'Netflix Portugal'],
  serverAdvice: 'Which NordVPN servers to use and why.',
  speedNote: 'Realistic speed expectations from this country.',
  faq: [{ q: 'Is a VPN legal in Portugal?', a: 'Yes.' }],
})
```

Rebuild. The page appears, the hub index updates, the sitemap updates, and the
internal links from related pages update. Nothing else to touch.

**The rule that matters:** every entry needs facts specific to that item. The
whole reason this site can survive a programmatic-SEO rollout is that a
Bangladesh page and a Netherlands page share no sentences. If you add an entry
that could describe any country, it becomes a doorway page — which is explicitly
prohibited by NordVPN's affiliate terms and penalised by Google.

---

## Quality gate

`npm run audit` checks the **built output**, not the source. It fails the build
if it finds:

- duplicate `<title>` or meta description across pages
- broken internal links (checks all 16,000+)
- pages with zero or multiple `<h1>` elements
- canonical tags that do not match the page URL
- sitemap entries with no page, or pages missing from the sitemap
- invalid JSON-LD
- literal `\uXXXX` escapes or `[object Object]` leaking into HTML
- missing affiliate disclosure or Nord trademark notice

It also warns on titles over 65 characters, descriptions over 158, and pages
under 350 words. Run it in CI or before every deploy:

```bash
npm run build && npm run audit
```

---

## Compliance notes

1. **FTC Endorsement Guides (16 CFR Part 255).** A disclosure appears at the
   top of every page with an affiliate link, not only in the footer.
2. **NordVPN affiliate terms.** No keyword bidding on trademark terms, no
   doorway pages, no keyword stuffing, no incentivised clicks, and no
   implication of sponsorship. The site is structured to satisfy all of these.
3. **Nord Security trademark guidelines.** "Nord" must not appear in your
   domain name, must not be combined with your brand, and the site must not
   imply endorsement. The trademark notice is in the footer of every page.
4. **Legal pages are not legal advice.** Every `/legal/` page says so
   explicitly, with the date it was checked.

## Facts and pricing

All prices and specifications were verified on **19 September 2026** against
nordvpn.com, `nordvpn.com/servers/` and independent 2026 reviews. VPN pricing
changes constantly — update `src/data/nordvpn.js` and the `factsVerifiedOn`
date in `src/config.js` when you re-check.

## Structure

```
src/
├── config.js              # domain, affiliate link, nav, legal copy, title fitting
├── data/                  # all content lives here — 10 data modules
├── layouts/Base.astro     # head, meta, canonical, JSON-LD, title fitting
├── components/            # Header, Footer, Cta, Disclosure, Crumbs, Faq
├── pages/                 # templates; dynamic routes use getStaticPaths
└── styles/global.css      # system font stack, no external requests
scripts/audit.mjs          # build audit
```

No external fonts, no analytics, no third-party scripts, no cookies. The entire
site is static HTML.
