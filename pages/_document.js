import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kairos Global Solutions',
    url: 'https://kairosglobalsolutions.vercel.app',
    logo: 'https://kairosglobalsolutions.vercel.app/logo-transparentbg.png',
    sameAs: ['https://www.linkedin.com/company/kairos-global-solutions-official/'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kerala',
      addressCountry: 'India',
    },
    description: 'Enterprise consulting, executive staffing logistics, technology readiness bootcamps, and business advisory frameworks.',
  };

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Kairos Global Solutions delivers high-performance enterprise consulting, executive staffing logistics, adaptive technology frameworks, and human capital infrastructure globally. Headquartered in Kerala, India." />
        <meta name="keywords" content="Kairos Global Solutions, Executive Staffing Chennai, IT Consulting, Corporate L&D Bootcamps, Legal Governance Frameworks, HR Architecture, Business Restructuring" />
        <meta name="author" content="Kairos Global Solutions" />

        {/* Open Graph / Social Share Card (LinkedIn & WhatsApp) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kairos Global Solutions | Enterprise Consulting & Human Capital" />
        <meta property="og:description" content="Architecting the future of global commerce with high-performance consulting, adaptive tech frameworks, and human capital infrastructure." />
        <meta property="og:image" content="https://kairosglobalsolutions.vercel.app/logo-transparentbg.png" />
        <meta property="og:url" content="https://kairosglobalsolutions.vercel.app" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kairos Global Solutions" />
        <meta name="twitter:description" content="Enterprise consulting, technology frameworks, and executive human capital." />
        <meta name="twitter:image" content="https://kairosglobalsolutions.vercel.app/logo-transparentbg.png" />

        {/* Fonts & Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="icon" type="image/png" href="/logo-transparentbg.png" />

        {/* Google Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}