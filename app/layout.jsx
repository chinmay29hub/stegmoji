import React from 'react'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { getMainStructuredData } from '@/lib/seo/structuredData'
import ClientLayout from '@/components/client-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Stegmoji - Hide Messages in Plain Text',
    template: '%s | Stegmoji'
  },
  description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with encryption, compression, and multiple embedding modes.',
  keywords: ['steganography', 'unicode steganography', 'hide messages', 'invisible characters', 'text steganography', 'secret messages', 'encryption', 'privacy', 'security', 'free tool', 'online tool', 'global', 'worldwide', 'international', 'viral', 'trending', 'popular'],
  authors: [{ name: 'chinmay29hub' }],
  creator: 'chinmay29hub',
  publisher: 'Stegmoji',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://chinmay29hub-stegmoji.vercel.app',
    title: 'Stegmoji - Hide Messages in Plain Text',
    description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with encryption, compression, and multiple embedding modes.',
    siteName: 'Stegmoji',
    locale: 'en_US',
    images: [
      {
        url: 'https://chinmay29hub-stegmoji.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stegmoji - Unicode Steganography Tool',
        type: 'image/png',
        secureUrl: 'https://chinmay29hub-stegmoji.vercel.app/og-image.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chinmay29hub',
    creator: '@chinmay29hub',
    title: 'Stegmoji - Hide Messages in Plain Text',
    description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with encryption, compression, and multiple embedding modes.',
    images: ['https://chinmay29hub-stegmoji.vercel.app/og-image.png'],
  },
  other: {
    'theme-color': '#667eea',
    'application-name': 'Stegmoji',
    'apple-mobile-web-app-title': 'Stegmoji',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#667eea',
    'msapplication-config': '/browserconfig.xml',
  },
  verification: {
    google: 'google7af5221bd040abb5',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://chinmay29hub-stegmoji.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Additional Open Graph tags for better social media support */}
        <meta property="og:image:secure_url" content="https://chinmay29hub-stegmoji.vercel.app/og-image.png" />
        <meta property="og:updated_time" content={new Date().toISOString()} />
        <meta property="article:author" content="chinmay29hub" />
        <meta property="article:publisher" content="https://chinmay29hub-stegmoji.vercel.app" />
        
        {/* Twitter Card additional meta tags */}
        <meta name="twitter:domain" content="chinmay29hub-stegmoji.vercel.app" />
        <meta name="twitter:image:alt" content="Stegmoji - Unicode Steganography Tool" />
        
        {/* Additional social media meta tags */}
        <meta name="linkedin:owner" content="chinmay29hub" />
        <meta name="telegram:channel" content="@chinmay29hub" />
        
        {/* Security headers - only include meta tags that work in HTML */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Bot-friendly meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="slurp" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="duckduckbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="baiduspider" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="yandexbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="facebookexternalhit" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="twitterbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="linkedinbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="whatsapp" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="telegrambot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Additional SEO meta tags for global reach */}
        <meta name="language" content="en" />
        <meta name="geo.region" content="global" />
        <meta name="geo.placename" content="Worldwide" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="weekly" />
        <meta name="expires" content="never" />
        <meta name="cache-control" content="public, max-age=31536000" />
        
        {/* Global targeting meta tags */}
        <meta name="target-country" content="all" />
        <meta name="audience" content="global" />
        <meta name="coverage" content="worldwide" />
        <meta name="geo.coverage" content="global" />
        
        {/* Multi-language support hints */}
        <meta name="available-languages" content="en" />
        <meta name="content-language" content="en" />
        
        {/* Viral content optimization */}
        <meta name="content-type" content="tool,utility,steganography" />
        <meta name="category" content="security,privacy,tools,technology" />
        <meta name="keywords-global" content="steganography,unicode,privacy,security,encryption,hidden messages,text steganography,free tool,online tool,global" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8GZFMGL6M3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8GZFMGL6M3');
          `}
        </Script>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getMainStructuredData()),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('darkMode');
                  if (saved === 'true') {
                    document.documentElement.classList.add('dark');
                  } else if (saved === 'false') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    // No preference, default to dark mode for new users
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // Ignore localStorage errors, default to dark mode
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}