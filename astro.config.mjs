import { defineConfig } from 'astro/config';
import { site } from './src/config.js';

// The production URL is defined once in src/config.js and reused by Astro.
export default defineConfig({
  site: site.url,
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
