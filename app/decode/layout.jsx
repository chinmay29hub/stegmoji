export const metadata = {
  title: 'Decode Messages - Extract Hidden Text',
  description: 'Extract hidden messages from encoded text using our free Unicode steganography decoder. Supports multiple embedding modes and encrypted messages.',
  keywords: ['decode messages', 'extract hidden text', 'unicode steganography decoder', 'hidden messages', 'invisible characters', 'text steganography'],
  alternates: {
    canonical: 'https://chinmay29hub-stegmoji.vercel.app/decode',
  },
  openGraph: {
    title: 'Decode Messages - Extract Hidden Text',
    description: 'Extract hidden messages from encoded text using our free Unicode steganography decoder. Supports multiple embedding modes and encrypted messages.',
    url: 'https://chinmay29hub-stegmoji.vercel.app/decode',
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
    title: 'Decode Messages - Extract Hidden Text',
    description: 'Extract hidden messages from encoded text using our free Unicode steganography decoder. Supports multiple embedding modes and encrypted messages.',
    images: ['https://chinmay29hub-stegmoji.vercel.app/og-image.png'],
  },
}

export default function DecodeLayout({ children }) {
  return children
}
