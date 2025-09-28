export const metadata = {
  title: 'Encode Messages - Hide Secret Text with Unicode Steganography',
  description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with AES encryption, compression, and multiple embedding modes.',
  keywords: ['encode messages', 'hide text', 'unicode steganography', 'secret messages', 'invisible characters', 'text steganography', 'encryption'],
  alternates: {
    canonical: 'https://chinmay29hub-stegmoji.vercel.app/encode',
  },
  openGraph: {
    title: 'Encode Messages - Hide Secret Text with Unicode Steganography',
    description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with AES encryption, compression, and multiple embedding modes.',
    url: 'https://chinmay29hub-stegmoji.vercel.app/encode',
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
    title: 'Encode Messages - Hide Secret Text with Unicode Steganography',
    description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with AES encryption, compression, and multiple embedding modes.',
    images: ['https://chinmay29hub-stegmoji.vercel.app/og-image.png'],
  },
}

export default function EncodeLayout({ children }) {
  return children
}
