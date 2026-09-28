import {allPages} from '../../lib/site-routes.jsx';
import {chunks,sitemapIndex} from '../../lib/sitemap.js';
import {site} from '../../config.js';
export const dynamic='force-static';
export function GET(){return new Response(sitemapIndex(chunks(allPages()).length,site.url),{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600'}});}
