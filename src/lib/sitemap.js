export const SITEMAP_SIZE=10000; // Below the protocol's 50,000 URL ceiling.
export const xmlEscape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
export function chunks(items,size=SITEMAP_SIZE){
 if(!Number.isSafeInteger(size)||size<1||size>50000)throw new Error('Invalid sitemap shard size');
 const result=[];for(let i=0;i<items.length;i+=size)result.push(items.slice(i,i+size));return result;
}
export function urlset(items,base){return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items.map(x=>`<url><loc>${xmlEscape(base+x.path)}</loc>${x.lastmod?`<lastmod>${xmlEscape(x.lastmod)}</lastmod>`:''}</url>`).join('')}</urlset>`;}
export function sitemapIndex(count,base){return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Array.from({length:count},(_,i)=>`<sitemap><loc>${xmlEscape(base)}/sitemaps/${i}.xml</loc></sitemap>`).join('')}</sitemapindex>`;}
