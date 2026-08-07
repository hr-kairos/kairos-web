import Head from 'next/head';

export default function MetaHead({
  title = 'Kairos Global Solutions | Enterprise Consulting & Human Capital',
  description = 'High-performance enterprise consulting, executive staffing logistics, technology readiness bootcamps, and business advisory frameworks. Headquartered in Kerala, India.',
  canonicalUrl = 'https://kairosglobalsolutions.vercel.app',
  ogImage = 'https://kairosglobalsolutions.vercel.app/kairos_global_solutions_official_cover.jpg',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Kairos Global Solutions" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
