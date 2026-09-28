// =============================================================================
// SITE CONFIG — the single source of truth for the whole site.
//
// EDIT THIS FILE WHEN:
//   1. You buy your real domain            -> change `site.url`
//   2. NordVPN changes its prices          -> edit `data/nordvpn.js`
//   3. You want per-page affiliate tracking -> set `affiliate.subIdParam`
//
// Everything else on the site reads from here. Nothing is hard-coded elsewhere.
// =============================================================================

export const site = {
  url: 'https://securetunnel.netlify.app',
  name: 'SecureTunnel',
  tagline: 'VPN comparisons and practical privacy guides',
  description:
    'VPN comparisons, practical privacy explainers and country guides. Understand the trade-offs, check the sources and decide whether you need a VPN.',
  author: 'SecureTunnel Editorial Team',
  email: 'editor@securetunnel.co',
  twitter: '@securetunnel',
  locale: 'en-GB',
  // Date every "verified" claim on the site carries. Update when you re-check facts.
  factsVerifiedOn: '2026-09-19',
};

export const affiliate = {
  // Your NordVPN (Impact / Sovrn) short link. One place, used everywhere.
  baseUrl: 'https://nordvpn.sjv.io/Dym2Wa',

  // Per-page tracking. Impact supports subId1..subId5 on tracked links, which lets
  // you see exactly WHICH page generated a sale.
  //
  //   ''           -> plain link (default, safest)
  //   'subId1'     -> link becomes https://nordvpn.sjv.io/Dym2Wa?subId1=nordvpn-vs-expressvpn
  //
  // IMPORTANT: before enabling this, click a generated link once and confirm in
  // your Impact dashboard that the click still lands on nordvpn.com with your
  // campaign attached. If the redirect drops the parameter, leave it as ''.
  subIdParam: '',

  // Anchor text / button labels
  ctaPrimary: 'Check the current NordVPN deal',
  ctaSecondary: 'See NordVPN pricing',
  ctaShort: 'Get NordVPN',
};

export function affiliateLink(slug = '') {
  if (!affiliate.subIdParam || !slug) return affiliate.baseUrl;
  const sep = affiliate.baseUrl.includes('?') ? '&' : '?';
  return `${affiliate.baseUrl}${sep}${affiliate.subIdParam}=${encodeURIComponent(slug)}`;
}

// Affiliate link that opens in a new tab and never leaks referrer.
export const linkAttrs = 'target="_blank" rel="nofollow sponsored noopener noreferrer"';

export const seo = {
  titleTemplate: (title) => `${title} | ${site.name}`,
  defaultOgImage: '/og-default.svg',
};

/**
 * Keep the rendered <title> inside the length Google displays (~60-65 chars
 * including the brand suffix). Tries `base + suffix`, then `base`, then
 * truncates at a word boundary. Used by every generated page so long country
 * or platform names can never blow out the title tag.
 */
export function fitTitle(base, suffix = '', max = 65) {
  const brandLen = ` | ${site.name}`.length;
  const full = `${base}${suffix}`;
  if (full.length + brandLen <= max) return full;
  if (base.length + brandLen <= max) return base;
  const room = Math.max(20, max - brandLen);
  const cut = base.slice(0, room);
  const atSpace = cut.lastIndexOf(' ');
  return (atSpace > room * 0.6 ? cut.slice(0, atSpace) : cut).trim().replace(/[,;:\u2014-]+$/, '');
}

/** Trim a meta description to a safe length on a sentence/word boundary. */
export function fitDescription(text, max = 158) {
  const t = String(text).replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const atSentence = cut.lastIndexOf('. ');
  if (atSentence > max * 0.55) return cut.slice(0, atSentence + 1);
  const atSpace = cut.lastIndexOf(' ');
  return `${(atSpace > max * 0.6 ? cut.slice(0, atSpace) : cut).trim().replace(/[,;:\u2014-]+$/, '')}\u2026`;
}

// Shared legal/compliance copy. Required by the FTC Endorsement Guides and by
// NordVPN's own trademark guidelines. Do not remove the trademark notice.
export const legal = {
  disclosureShort:
    'Affiliate disclosure: some links on this page are NordVPN affiliate links. If you buy through them we may earn a commission, at no extra cost to you. This never changes what we recommend.',
  trademarkNotice:
    'NordVPN is a registered trademark of NordSec B.V. SecureTunnel is an independent, unaffiliated review site and is not endorsed by, sponsored by, or connected to Nord Security in any way. Product names, logos and brands are the property of their respective owners.',
  specDisclaimer:
    'Specifications and prices are taken from each provider\u2019s own published material and third-party testing, and are re-checked periodically. VPN pricing changes often and varies by country and currency — always confirm the final price at checkout.',
};

// Navigation. Hubs are listed so every generated page is at most two clicks deep.
export const nav = [
  { label: 'NordVPN Review', href: '/reviews/nordvpn' },
  { label: 'Deals', href: '/deals/nordvpn-coupon' },
  { label: 'Pricing', href: '/pricing/nordvpn-pricing' },
  { label: 'Comparisons', href: '/compare' },
  { label: 'VPN by Country', href: '/vpn' },
  { label: 'Streaming', href: '/streaming' },
  { label: 'Is a VPN Legal?', href: '/legal' },
  { label: 'Guides', href: '/guides' },
  { label: 'Learn', href: '/learn' },
];
