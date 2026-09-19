// =============================================================================
// rss.xml — a small feed of the guides and reviews. Programmatic pages are
// deliberately excluded: a feed of 200 country pages is noise, not a feed.
// =============================================================================
import { site } from '../config.js';
import guides from '../data/guides.js';
import nordvpn from '../data/nordvpn.js';

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const GET = () => {
  const base = site.url.replace(/\/$/, '');
  const date = new Date(site.factsVerifiedOn).toUTCString();

  const items = [
    {
      title: 'NordVPN review 2026: tested, with the downsides included',
      href: '/reviews/nordvpn',
      desc: `Scored ${nordvpn.score.overall}/5 across six categories, with the cons listed alongside the positives.`,
    },
    ...guides.map((g) => ({ title: g.name, href: `/guides/${g.id}`, desc: g.hook })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)}</title>
  <link>${base}/</link>
  <description>${esc(site.description)}</description>
  <language>en-gb</language>
  <lastBuildDate>${date}</lastBuildDate>
  <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (i) => `  <item>
    <title>${esc(i.title)}</title>
    <link>${base}${i.href}</link>
    <guid isPermaLink="true">${base}${i.href}</guid>
    <description>${esc(i.desc)}</description>
    <pubDate>${date}</pubDate>
  </item>`
  )
  .join('\n')}
</channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
