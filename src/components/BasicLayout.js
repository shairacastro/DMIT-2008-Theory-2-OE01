import Head from "next/head";

export default function BasicLayout({
  title,
  description,
  children,
  page,
  pubDate,
  seoProfile,
}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const image =
    page === "travel"
      ? `${origin}/globe_preview.webp`
      : `${origin}/og-image.png`;
  const sameAs = Array.isArray(seoProfile?.sameAs) ? seoProfile.sameAs : [];

  const schema =
    page !== "blog"
      ? {
          "@context": "http://schema.org",
          "@type": "Person",
          name: seoProfile?.personName || "",
          url: origin,
          sameAs,
          image: `${origin}/og-image.png`,
          jobTitle: seoProfile?.jobTitle || "",
          worksFor: {
            "@type": "Organization",
            name: seoProfile?.worksFor || "",
            address: {
              "@type": "PostalAddress",
              addressLocality: seoProfile?.location || "",
              addressCountry: seoProfile?.countryCode || "",
            },
          },
          nationality: {
            "@type": "Country",
            name: seoProfile?.nationality || "",
          },
        }
      : {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": origin,
          },
          headline: title || title,
          description: description || title,
          image: `${origin}/og-image.png`,
          author: {
            "@type": "Person",
            name: seoProfile?.personName || "",
            url: origin,
            sameAs,
          },
          publisher: {
            "@type": "Organization",
            name: seoProfile?.publisherName || seoProfile?.personName || "",
            logo: {
              "@type": "ImageObject",
              url: `${origin}/og-image.png`,
            },
          },
          datePublished: pubDate || new Date().toISOString(),
          dateModified: pubDate || new Date().toISOString(),
        };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />

        {/* OG Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={origin} />
        <meta property="og:image" content={image || `${origin}/og-image.png`} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image || `${origin}/og-image.png`} />

        <link rel="preconnect" href="https://cdn.fontshare.com" />
        <link rel="canonical" href={origin} />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <div className="bg-darkslate-700 min-h-screen flex flex-col justify-start md:justify-center items-center py-2 md:py-3">
        {children}
      </div>
    </>
  );
}
