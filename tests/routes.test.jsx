import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolveRoute,routeMetadata,allPages,prebuiltPaths} from '../src/lib/site-routes.jsx';
import {chunks,urlset,sitemapIndex} from '../src/lib/sitemap.js';
import {pageMetadata} from '../src/lib/metadata.js';
import {catalog} from '../src/lib/articles.js';
test('all 281 original indexable URLs survive',()=>{
 const baseline=JSON.parse(fs.readFileSync('docs/baseline-routes.json','utf8'));
 assert.equal(baseline.length,281);for(const path of baseline)assert(resolveRoute(path),path);
});
test('every route has distinct metadata and a self canonical',()=>{
 const titles=new Set(),descriptions=new Set();for(const {path} of allPages()){
  const m=pageMetadata(routeMetadata(resolveRoute(path)),path);
  assert(!titles.has(m.title),path);assert(!descriptions.has(m.description),path);
  titles.add(m.title);descriptions.add(m.description);assert(m.alternates.canonical.endsWith(path));
 }
});
test('unknown combinations, traversal and fake pagination do not resolve',()=>{
 for(const path of ['/learn/nonexistent','/vpn/fictional-country','/watch/unknown/france','/learn/../secrets','/learn/page/0','/learn/page/1','/learn/page/999999','/learn/page/02'])assert.equal(resolveRoute(path),null,path);
});
test('only bounded approved articles are eagerly prebuilt',()=>{
 assert(prebuiltPaths().length<=281+24);assert.equal(allPages().length,281+catalog.length);
});
test('sitemap sharding handles 100001 URLs without loss',()=>{
 const items=Array.from({length:100001},(_,i)=>({path:`/learn/fixture-${i}`}));
 const groups=chunks(items);assert.equal(groups.length,11);assert.equal(groups.at(-1).length,1);
 assert.equal(new Set(groups.flat().map(p=>p.path)).size,100001);assert(groups.every(g=>g.length<=10000));
 // Synthetic test data is NOT written to the catalog or published as pages.
 assert(sitemapIndex(groups.length,'https://example.com').includes('/sitemaps/10.xml'));
});
test('sitemap XML escapes special characters and rejects oversized batches',()=>{
 assert(urlset([{path:'/a?x=1&y=2'}],'https://example.com').includes('&amp;'));
 assert.throws(()=>chunks([],50001));assert.throws(()=>chunks([],0));
});
