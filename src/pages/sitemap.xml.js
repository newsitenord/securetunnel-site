// =============================================================================
// sitemap.xml — generated from the same data modules the pages use, so it can
// never drift out of sync with what was actually built.
// =============================================================================
import { site } from '../config.js';
import competitors from '../data/competitors.js';
import countries from '../data/countries.js';
import platforms, { watchMatrix } from '../data/platforms.js';
import devices from '../data/devices.js';
import usecases from '../data/usecases.js';
import guides from '../data/guides.js';
import legalCountries from '../data/legal.js';
import troubleshooting from '../data/troubleshooting.js';

export const GET = () => {
  const base = site.url.replace(/\/$/, '');
  const today = site.factsVerifiedOn;
  const countryIds = new Set(countries.map((c) => c.id));

  /** path, changefreq, priority */
  const urls = [
    ['/', 'daily', '1.0'],
    ['/reviews/nordvpn', 'weekly', '1.0'],
    ['/deals/nordvpn-coupon', 'daily', '0.9'],
    ['/pricing/nordvpn-pricing', 'weekly', '0.9'],
    ['/nordvpn/alternatives', 'monthly', '0.8'],
    ['/compare', 'weekly', '0.8'],
    ['/vpn', 'weekly', '0.8'],
    ['/streaming', 'weekly', '0.8'],
    ['/devices', 'monthly', '0.7'],
    ['/use', 'monthly', '0.7'],
    ['/guides', 'weekly', '0.7'],
    ['/legal', 'monthly', '0.7'],
    ['/fix', 'monthly', '0.7'],
    ['/about', 'yearly', '0.3'],
    ['/editorial-policy', 'yearly', '0.3'],
    ['/affiliate-disclosure', 'yearly', '0.3'],
    ['/privacy-policy', 'yearly', '0.3'],
    ['/contact', 'yearly', '0.3'],

    ...competitors.map((c) => [`/compare/nordvpn-vs-${c.id}`, 'monthly', '0.7']),
    ...countries.map((c) => [`/vpn/${c.id}`, 'monthly', '0.7']),
    ...devices.map((d) => [`/devices/nordvpn-for-${d.id}`, 'yearly', '0.5']),
    ...usecases.map((u) => [`/use/vpn-for-${u.id}`, 'monthly', '0.6']),
    ...guides.map((g) => [`/guides/${g.id}`, 'monthly', '0.6']),
    ...legalCountries.map((l) => [`/legal/${l.id}`, 'monthly', '0.6']),
    ...troubleshooting.map((x) => [`/fix/${x.id}`, 'monthly', '0.6']),
  ];

  // Watch pages: only combinations we actually have country data for.
  for (const [pid, list] of Object.entries(watchMatrix)) {
    const p = platforms.find((x) => x.id === pid);
    if (!p) continue;
    for (const cid of list) {
      if (!countryIds.has(cid)) continue;
      urls.push([`/watch/${p.slugBase}/${cid}`, 'monthly', '0.6']);
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([path, freq, prio]) => `  <url>
    <loc>${base}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
