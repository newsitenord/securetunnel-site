import { site } from '../config.js';

export const GET = () => {
  const base = site.url.replace(/\/$/, '');
  const body = `User-agent: *
Allow: /

# Affiliate links already carry rel="nofollow sponsored", so there is nothing
# to disallow here. Keeping the whole site crawlable.

Sitemap: ${base}/sitemap.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
