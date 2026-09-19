// =============================================================================
// Zero-dependency static server for the built site in dist/.
//
//   npm run serve            -> http://localhost:4321
//   PORT=8080 npm run serve
//
// Unlike `astro preview` (which is a Vite server and validates the Host header),
// this accepts any host, so it works behind reverse proxies, tunnels and preview
// URLs without extra configuration. It is for previewing only — use Netlify in
// production.
// =============================================================================
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname } from 'node:path';

const ROOT = join(dirname(dirname(fileURLToPath(import.meta.url))), 'dist');
const PORT = Number(process.env.PORT ?? 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

async function resolve(pathname) {
  // Prevent path traversal, then map /vpn/india -> /vpn/india/index.html
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const candidates = [
    join(ROOT, safe),
    join(ROOT, safe, 'index.html'),
    join(ROOT, `${safe}.html`),
  ];
  for (const c of candidates) {
    if (!c.startsWith(ROOT)) continue;
    try {
      const s = await stat(c);
      if (s.isFile()) return c;
    } catch { /* try next */ }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = await resolve(pathname === '/' ? '/index.html' : pathname);

  if (!file) {
    const notFound = await readFile(join(ROOT, '404.html')).catch(() => null);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(notFound ?? '<h1>404</h1>');
    return;
  }

  const body = await readFile(file);
  res.writeHead(200, {
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
    'Cache-Control': file.includes('/_astro/') ? 'public, max-age=31536000, immutable' : 'no-cache',
  });
  res.end(body);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  SecureTunnel preview`);
  console.log(`  > serving dist/ on http://0.0.0.0:${PORT}\n`);
});
