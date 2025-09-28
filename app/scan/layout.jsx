export const metadata = {
  title: 'Unicode Scanner - Analyze Text for Hidden Steganography',
  description: 'Analyze text for hidden Unicode steganography. Detect invisible characters, variation selectors, and potential hidden messages in any text.',
  keywords: ['unicode scanner', 'text analysis', 'steganography detection', 'invisible characters', 'variation selectors', 'hidden messages'],
  alternates: {
    canonical: 'https://chinmay29hub-stegmoji.vercel.app/scan',
  },
  openGraph: {
    title: 'Unicode Scanner - Analyze Text for Hidden Steganography',
    description: 'Analyze text for hidden Unicode steganography. Detect invisible characters, variation selectors, and potential hidden messages in any text.',
    url: 'https://chinmay29hub-stegmoji.vercel.app/scan',
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
    title: 'Unicode Scanner - Analyze Text for Hidden Steganography',
    description: 'Analyze text for hidden Unicode steganography. Detect invisible characters, variation selectors, and potential hidden messages in any text.',
    images: ['https://chinmay29hub-stegmoji.vercel.app/og-image.png'],
  },
}

export default function ScanLayout({ children }) {
  return children
}
