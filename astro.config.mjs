import { defineConfig } from 'astro/config';

// ---------------------------------------------------------------------------
// siteURL is the ONLY place your domain lives. Change it once, rebuild, and
// every canonical tag, sitemap entry, Open Graph URL and RSS link updates.
// ---------------------------------------------------------------------------
const siteURL = 'https://securetunnel.co';

export default defineConfig({
  site: siteURL,
  trailingSlash: 'never',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  server: { host: '0.0.0.0', port: 4321, allowedHosts: true },
  vite: {
    // Allow any host so the site works behind reverse proxies and preview URLs.
    // Safe here because this is a static site with no secrets or state.
    server: { host: '0.0.0.0', port: 4321, allowedHosts: true },
    preview: { host: '0.0.0.0', port: 4321, allowedHosts: true },
  },
});
