/** Native Next.js App Router; existing URLs remain unchanged. */
export default {
  poweredByHeader: false,
  trailingSlash: false,
  allowedDevOrigins: ['*.e2b.app'],
  outputFileTracingIncludes: { '/*': ['./content/articles/**/*.json'] },
  experimental: { cpus: 2 },
  async headers() {
    return [{source: '/:path*', headers: [
      {key:'X-Content-Type-Options',value:'nosniff'},
      {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
      {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
    ]}];
  },
};
