import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { getMainStructuredData } from '@/lib/seo/structuredData'
import ClientLayout from '@/components/client-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Stegmoji - Unicode Steganography Tool | Hide Messages in Plain Text',
    template: '%s | Stegmoji'
  },
  description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with encryption, compression, and multiple embedding modes.',
  keywords: ['steganography', 'unicode steganography', 'hide messages', 'invisible characters', 'text steganography', 'secret messages', 'encryption', 'privacy', 'security'],
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
    title: 'Stegmoji - Unicode Steganography Tool | Hide Messages in Plain Text',
    description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with encryption, compression, and multiple embedding modes.',
    siteName: 'Stegmoji',
    locale: 'en_US',
    images: [
      {
        url: 'https://chinmay29hub-stegmoji.vercel.app/og-image.png',
        width: 2400,
        height: 1262,
        alt: 'Stegmoji - Unicode Steganography Tool',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chinmay29hub',
    creator: '@chinmay29hub',
    title: 'Stegmoji - Unicode Steganography Tool | Hide Messages in Plain Text',
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
                  }
                } catch (e) {
                  // Ignore localStorage errors
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