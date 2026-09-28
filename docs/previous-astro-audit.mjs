// =============================================================================
// SEO / QA audit over the BUILT output in dist/.
//
// Run with: npm run build && npm run audit
//
// It reads the actual generated HTML rather than the source, so it catches what
// really ships: duplicate titles, thin pages, broken internal links, missing
// disclosures, sitemap drift, and escaped-unicode leaks.
// =============================================================================
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, dirname, posix } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'dist');
const { site } = await import(pathToFileURL(join(ROOT, 'src/config.js')).href);
const BASE = site.url.replace(/\/$/, '');

// ---------- collect every built HTML page ----------
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = await walk(DIST);

const get = (html, re) => (html.match(re)?.[1] ?? '').trim();
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const rows = [];
const problems = { error: [], warn: [] };
const err = (m) => problems.error.push(m);
const warn = (m) => problems.warn.push(m);

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const rel = '/' + relative(DIST, file).split('\\').join('/');
  const urlPath = rel.endsWith('/index.html')
    ? rel.slice(0, -'index.html'.length)
    : rel.replace(/\.html$/, '');

  const title = get(html, /<title>([\s\S]*?)<\/title>/);
  const desc = get(html, /<meta name="description" content="([\s\S]*?)"/);
  const canonical = get(html, /<link rel="canonical" href="([\s\S]*?)"/);
  const h1s = all(html, /<h1[^>]*>/g);
  const body = html.replace(/<head[\s\S]*?<\/head>/i, '');
  const words = stripTags(body).split(/\s+/).filter(Boolean).length;
  const hasAffiliate = html.includes('nordvpn.sjv.io');
  const hasDisclosure = /affiliate disclosure/i.test(html);
  const jsonLdBlocks = all(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);

  rows.push({ urlPath, title, desc, canonical, words, h1: h1s.length, hasAffiliate, hasDisclosure, jsonLd: jsonLdBlocks.length });

  // --- structural checks ---
  if (!title) err(`${urlPath}: missing <title>`);
  if (title.length > 65) warn(`${urlPath}: title ${title.length} chars (>65): "${title}"`);
  if (!desc) err(`${urlPath}: missing meta description`);
  if (desc.length < 80) warn(`${urlPath}: meta description short (${desc.length} chars)`);
  if (desc.length > 170) warn(`${urlPath}: meta description long (${desc.length} chars)`);
  if (h1s.length !== 1) err(`${urlPath}: ${h1s.length} <h1> elements (expected exactly 1)`);
  if (canonical && canonical !== `${BASE}${urlPath === '/' ? '/' : urlPath.replace(/\/$/, '')}`) {
    err(`${urlPath}: canonical "${canonical}" does not match expected path`);
  }
  if (words < 350) warn(`${urlPath}: thin page (${words} words)`);

  // --- escaped-unicode and markup leaks ---
  if (/\\u[0-9a-fA-F]{4}/.test(html)) err(`${urlPath}: literal \\uXXXX escape leaked into HTML`);
  if (/&lt;br\s*\/?&gt;/.test(html)) err(`${urlPath}: literal escaped <br> leaked into HTML`);
  if (/\[object Object\]/.test(html)) err(`${urlPath}: "[object Object]" rendered`);
  if (/\bundefined\b/.test(stripTags(body))) warn(`${urlPath}: the word "undefined" appears in body text`);

  // --- compliance ---
  if (!hasDisclosure) warn(`${urlPath}: no affiliate disclosure text found`);
  if (!/registered trademark of Nord/i.test(html)) warn(`${urlPath}: missing Nord trademark notice`);

  // --- JSON-LD validity ---
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block);
    } catch (e) {
      err(`${urlPath}: invalid JSON-LD (${e.message})`);
    }
  }
}

// ---------- duplicate title / description detection ----------
const byTitle = new Map();
const byDesc = new Map();
for (const r of rows) {
  if (!byTitle.has(r.title)) byTitle.set(r.title, []);
  byTitle.get(r.title).push(r.urlPath);
  if (!byDesc.has(r.desc)) byDesc.set(r.desc, []);
  byDesc.get(r.desc).push(r.urlPath);
}
for (const [t, paths] of byTitle) {
  if (paths.length > 1) err(`DUPLICATE TITLE across ${paths.length} pages: "${t}"\n     ${paths.slice(0, 6).join('\n     ')}`);
}
for (const [d, paths] of byDesc) {
  if (paths.length > 1) err(`DUPLICATE META DESCRIPTION across ${paths.length} pages:\n     "${d.slice(0, 90)}..."\n     ${paths.slice(0, 6).join('\n     ')}`);
}

// ---------- internal link integrity ----------
const validPaths = new Set(rows.map((r) => r.urlPath.replace(/\/$/, '') || '/'));
const builtFiles = new Set(
  files.map((f) => '/' + relative(DIST, f).split('\\').join('/').replace(/\/index\.html$/, '') || '/')
);
let linkCount = 0;
const broken = new Map();
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const rel = '/' + relative(DIST, file).split('\\').join('/');
  for (const href of all(html, /<a\s[^>]*href="([^"]+)"/g)) {
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) continue;
    linkCount++;
    const clean = href.split('#')[0].replace(/\/$/, '') || '/';
    if (!validPaths.has(clean) && !builtFiles.has(clean)) {
      const key = `${clean}`;
      if (!broken.has(key)) broken.set(key, []);
      broken.get(key).push(rel);
    }
  }
}
for (const [href, from] of broken) {
  err(`BROKEN INTERNAL LINK -> ${href} (referenced from ${from.length} page${from.length > 1 ? 's' : ''}, e.g. ${from[0]})`);
}

// ---------- sitemap vs actual pages ----------
const sitemapXml = await readFile(join(DIST, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set(
  all(sitemapXml, /<loc>([\s\S]*?)<\/loc>/g).map((u) => u.replace(/\/$/, '').replace(BASE, '') || '/')
);
const missingFromSitemap = [...validPaths].filter(
  (p) => !sitemapUrls.has(p) && p !== '/404' && !p.includes('404')
);
const inSitemapNotBuilt = [...sitemapUrls].filter((u) => !validPaths.has(u));
if (missingFromSitemap.length) {
  err(`${missingFromSitemap.length} built page(s) missing from sitemap.xml, e.g. ${missingFromSitemap.slice(0, 8).join(', ')}`);
}
if (inSitemapNotBuilt.length) {
  err(`${inSitemapNotBuilt.length} sitemap URL(s) with no built page: ${inSitemapNotBuilt.slice(0, 8).join(', ')}`);
}

// ---------- robots ----------
const robots = await readFile(join(DIST, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap:')) err('robots.txt has no Sitemap directive');
const robotsSitemap = (robots.match(/Sitemap:\s*(\S+)/)?.[1] ?? '').trim();
if (robotsSitemap !== `${BASE}/sitemap.xml`) err(`robots.txt sitemap URL is "${robotsSitemap}", expected "${BASE}/sitemap.xml"`);

// ---------- affiliate link presence on money pages ----------
const moneyPrefixes = ['/reviews/', '/deals/', '/pricing/', '/compare/', '/vpn/', '/watch/', '/use/'];
const moneyPages = rows.filter((r) => moneyPrefixes.some((p) => r.urlPath.startsWith(p)));
const moneyWithoutAffiliate = moneyPages.filter((r) => !r.hasAffiliate);
if (moneyWithoutAffiliate.length) {
  warn(`${moneyWithoutAffiliate.length} commercial page(s) have no affiliate link, e.g. ${moneyWithoutAffiliate.slice(0, 5).map((r) => r.urlPath).join(', ')}`);
}

// ---------- report ----------
const avg = (rows.reduce((s, r) => s + r.words, 0) / rows.length).toFixed(0);
const thin = rows.filter((r) => r.words < 350);
const byPrefix = {};
for (const r of rows) {
  const seg = r.urlPath.split('/').filter(Boolean)[0] ?? 'home';
  byPrefix[seg] = (byPrefix[seg] ?? 0) + 1;
}

console.log('\n================ BUILD AUDIT ================');
console.log(`Pages built            : ${rows.length}`);
console.log(`Site URL               : ${BASE}`);
console.log(`Avg words per page     : ${avg}`);
console.log(`Min / max words        : ${Math.min(...rows.map((r) => r.words))} / ${Math.max(...rows.map((r) => r.words))}`);
console.log(`Pages under 350 words  : ${thin.length}`);
console.log(`Internal links checked : ${linkCount} (broken: ${broken.size})`);
console.log(`Sitemap URLs           : ${sitemapUrls.size}`);
console.log(`Unique titles          : ${byTitle.size}`);
console.log(`Unique descriptions    : ${byDesc.size}`);
console.log(`Pages with JSON-LD     : ${rows.filter((r) => r.jsonLd > 0).length}`);
console.log(`Pages with disclosure  : ${rows.filter((r) => r.hasDisclosure).length}`);
console.log('\nSection breakdown:');
for (const [k, v] of Object.entries(byPrefix).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(v).padStart(4)}  /${k}`);
}

if (thin.length) {
  console.log('\nThinnest pages:');
  for (const r of [...rows].sort((a, b) => a.words - b.words).slice(0, 8)) {
    console.log(`  ${String(r.words).padStart(5)} words  ${r.urlPath}`);
  }
}

console.log(`\n--- ERRORS: ${problems.error.length} ---`);
problems.error.forEach((e) => console.log('  ✗ ' + e));
console.log(`\n--- WARNINGS: ${problems.warn.length} (grouped) ---`);
const groups = new Map();
for (const w of problems.warn) {
  const key = w.replace(/^[^:]*:\s*/, '').replace(/\d+/g, 'N');
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(w);
}
for (const [key, list] of [...groups].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ! [${list.length}] ${key}`);
  for (const ex of list.slice(0, 3)) console.log(`        e.g. ${ex}`);
}

console.log('\n' + (problems.error.length === 0 ? '✅ AUDIT PASSED (no errors)' : `❌ AUDIT FAILED (${problems.error.length} errors)`));
process.exit(problems.error.length === 0 ? 0 : 1);
