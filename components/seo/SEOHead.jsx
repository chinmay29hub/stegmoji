import Head from 'next/head'

export default function SEOHead({ 
  title = "Stegmoji - Unicode Steganography Tool | Hide Messages in Plain Text",
  description = "Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with encryption, compression, and multiple embedding modes.",
  keywords = "steganography, unicode steganography, hide messages, invisible characters, text steganography, secret messages, encryption, privacy, security",
  canonical = "",
  ogImage = "https://chinmay29hub-stegmoji.vercel.app/og-image.png",
  structuredData = null
}) {
  const fullTitle = title.includes('Stegmoji') ? title : `${title} | Stegmoji`
  const fullDescription = description || "Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with encryption, compression, and multiple embedding modes."
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Stegmoji" />
      {/* robots meta tag removed - should be handled by Next.js metadata API */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#667eea" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical || "https://chinmay29hub-stegmoji.vercel.app"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="2400" />
      <meta property="og:image:height" content="1262" />
      <meta property="og:image:alt" content={`${fullTitle} - ${fullDescription}`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="Stegmoji" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:domain" content="chinmay29hub-stegmoji.vercel.app" />
      <meta name="twitter:url" content={canonical || "https://chinmay29hub-stegmoji.vercel.app"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${fullTitle} - ${fullDescription}`} />
      <meta name="twitter:creator" content="@chinmay29hub" />
      <meta name="twitter:site" content="@chinmay29hub" />
      
      {/* Additional Social Media Meta Tags */}
      <meta property="article:author" content="chinmay29hub" />
      <meta property="article:publisher" content="https://chinmay29hub-stegmoji.vercel.app" />
      <meta name="linkedin:owner" content="chinmay29hub" />
      
      {/* WhatsApp and Telegram specific */}
      <meta property="og:image:secure_url" content={ogImage} />
      <meta name="telegram:channel" content="@chinmay29hub" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="Stegmoji" />
      <meta name="apple-mobile-web-app-title" content="Stegmoji" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Performance Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Additional SEO Meta Tags - robots and googlebot handled by Next.js metadata API */}
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  )
}
