import {site} from '../../config.js';
export const dynamic='force-static';
export function GET(){return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}
