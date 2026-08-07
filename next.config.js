/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Hardened Security Headers ───
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          // Prevent clickjacking — no iframe embedding allowed
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME-type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Control referrer information leakage
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Enforce HTTPS for 1 year with subdomains
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Restrict browser features & permissions
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Content Security Policy — strict but functional
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Scripts: self + Vercel analytics + PostHog + Sentry
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://us.i.posthog.com https://*.sentry.io https://browser.sentry-cdn.com",
              // Styles: self + inline (needed for framer-motion) + Google Fonts + FontAwesome
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
              // Fonts: self + Google Fonts + FontAwesome CDN
              "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:",
              // Images: self + data URIs + Wikimedia (LinkedIn logo in email template)
              "img-src 'self' data: https://upload.wikimedia.org https://*.vercel.app",
              // API connections: self + Vercel + PostHog + Sentry
              "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com https://us.i.posthog.com https://*.sentry.io",
              // Prevent clickjacking via frame-ancestors
              "frame-ancestors 'none'",
              // Frames: deny all
              "frame-src 'none'",
              // Object/embed: deny
              "object-src 'none'",
              // Base URI restriction
              "base-uri 'self'",
              // Form submissions only to self
              "form-action 'self'",
              // Require Trusted Types for DOM XSS prevention
              "require-trusted-types-for 'script'",
            ].join('; '),
          },
          // Prevent DNS prefetching to external domains
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // ─── Disable x-powered-by header to avoid fingerprinting ───
  poweredByHeader: false,
};

module.exports = nextConfig;
