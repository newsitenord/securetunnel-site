import {catalog} from '../../lib/articles.js';
import {site} from '../../config.js';
import {xmlEscape as e} from '../../lib/sitemap.js';
export const dynamic='force-static';
export function GET(){
 const date=catalog[0]?.updatedAt||site.factsVerifiedOn;
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${e(site.name)}</title><link>${e(site.url)}/</link><description>${e(site.description)}</description><language>en</language><lastBuildDate>${new Date(date).toUTCString()}</lastBuildDate><atom:link href="${e(site.url)}/rss.xml" rel="self" type="application/rss+xml"/>${catalog.slice(0,30).map(a=>`<item><title>${e(a.title)}</title><link>${e(site.url)}/learn/${a.slug}</link><guid isPermaLink="true">${e(site.url)}/learn/${a.slug}</guid><description>${e(a.description)}</description><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate></item>`).join('')}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
