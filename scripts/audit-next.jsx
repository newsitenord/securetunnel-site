import fs from 'node:fs/promises';
import {load} from 'cheerio';
import {allPages} from '../src/lib/site-routes.jsx';
import {catalog} from '../src/lib/articles.js';
import {site} from '../src/config.js';
const pages=allPages(),valid=new Set(pages.map(p=>p.path));
const errors=[],titles=new Map(),descriptions=new Map();
const stats={pages:pages.length,internalLinks:0,affiliateLinks:0,jsonLd:0,newGuides:catalog.length};
const assert=(ok,message)=>{if(!ok)errors.push(message);};
const baseline=JSON.parse(await fs.readFile('docs/baseline-routes.json','utf8'));
for(const path of baseline)assert(valid.has(path),`Lost baseline URL ${path}`);
const files=new Set(['/rss.xml','/robots.txt','/sitemap.xml','/favicon.svg','/og-default.svg','/google9a3003e6843e8319.html']);
for(const {path} of pages){
 const filename=`.next/server/app${path==='/'?'/index':path}.html`;
 let html;try{html=await fs.readFile(filename,'utf8');}catch{
  if(!process.env.AUDIT_ORIGIN){errors.push(`${path}: ISR page not prebuilt; start production server and set AUDIT_ORIGIN to audit it`);continue;}
  const response=await fetch(new URL(path,process.env.AUDIT_ORIGIN));
  if(!response.ok){errors.push(`${path}: HTTP ${response.status}`);continue;}
  html=await response.text();
 }
 const $=load(html),title=$('title').text(),description=$('meta[name="description"]').attr('content');
 assert($('h1').length===1,`${path}: expected one h1, found ${$('h1').length}`);
 assert($('main').length===1,`${path}: expected one main`);
 assert(title&&title.length<=70,`${path}: missing or overlong title (${title.length})`);
 assert(description&&description.length<=170,`${path}: missing or overlong description`);
 assert(new URL($('link[rel="canonical"]').attr('href')||'https://invalid.invalid').href===site.url+path,`${path}: wrong canonical`);
 assert(!($('meta[name="robots"]').attr('content')||'').includes('noindex'),`${path}: unexpected noindex`);
 for(const [map,value,label] of [[titles,title,'title'],[descriptions,description,'description']]){
  assert(!map.has(value),`${path}: duplicate ${label} with ${map.get(value)}`);map.set(value,path);
 }
 assert($('footer').text().includes('Affiliate disclosure'),`${path}: missing footer disclosure`);
 assert(!$('main').text().includes('Affiliate disclosure. Affiliate disclosure:'),`${path}: repeated disclosure block`);
 for(const element of $('script[type="application/ld+json"]').toArray()){
  try{JSON.parse($(element).html());stats.jsonLd++;}catch{errors.push(`${path}: invalid JSON-LD`);}
 }
 for(const element of $('a[href]').toArray()){
  const a=$(element),href=a.attr('href');
  if(href.includes('nordvpn.sjv.io')){
   stats.affiliateLinks++;
   assert(href.startsWith('https://nordvpn.sjv.io/Dym2Wa'),`${path}: wrong affiliate URL`);
   assert(['sponsored','nofollow'].every(x=>(a.attr('rel')||'').split(' ').includes(x)),`${path}: affiliate rel missing`);
   const container=a.closest('.cta, .deal-box');
   assert(/affiliate|commission/i.test(container.text()),`${path}: affiliate offer lacks nearby disclosure`);
  }
  if(href.startsWith('#')){assert($(href==='main'?'#main':href).length>0,`${path}: missing fragment ${href}`);continue;}
  if(!href.startsWith('/')&&!href.startsWith(site.url))continue;
  const url=new URL(href,site.url);if(url.origin!==site.url)continue;
  const clean=url.pathname.replace(/\/$/,'')||'/';stats.internalLinks++;
  assert(valid.has(clean)||files.has(clean),`${path}: broken internal link ${href}`);
 }
 if(path.startsWith('/learn/')&&catalog.some(a=>path===`/learn/${a.slug}`)){
  assert($('[data-article-body]').length===1,`${path}: article body missing`);
  assert($('main a[href^="https://"]').length>=2,`${path}: sources missing`);
 }
}
const sitemap=await fs.readFile('.next/server/app/sitemap.xml.body','utf8');
assert(sitemap.includes('<sitemapindex'), 'Sitemap must be an index');
const index=load(sitemap,{xmlMode:true});const listed=[];
for(const loc of index('loc').toArray()){
 const url=index(loc).text(),file=url.replace(site.url,'');
 assert(/^\/sitemaps\/\d+\.xml$/.test(file),`Invalid shard ${url}`);
 const xml=await fs.readFile(`.next/server/app${file}.body`,'utf8');
 assert(Buffer.byteLength(xml)<50*1024*1024,`${file}: exceeds sitemap byte limit`);
 const $=load(xml,{xmlMode:true});const locs=$('url > loc').toArray().map(n=>$(n).text());
 assert(locs.length<=50000,`${file}: exceeds sitemap URL limit`);listed.push(...locs);
}
assert(new Set(listed).size===listed.length,'Duplicate sitemap URL');
assert(listed.length===valid.size,'Sitemap count drift');
for(const p of valid)assert(listed.includes(site.url+p),`Missing sitemap URL ${p}`);
assert((await fs.readFile('.next/server/app/robots.txt.body','utf8')).includes(`Sitemap: ${site.url}/sitemap.xml`),'Wrong robots sitemap');
const report={...stats,baselinePreserved:baseline.length,sitemapUrls:listed.length,errors};
await fs.mkdir('reports',{recursive:true});await fs.writeFile('reports/build-audit.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
process.exitCode=errors.length?1:0;
