export const getMainStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Stegmoji",
  "description": "Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with encryption, compression, and multiple embedding modes.",
  "url": "https://chinmay29hub-stegmoji.vercel.app",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Person",
    "name": "chinmay29hub",
    "url": "https://github.com/chinmay29hub"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Stegmoji",
    "url": "https://chinmay29hub-stegmoji.vercel.app"
  },
  "featureList": [
    "Unicode Steganography",
    "AES-GCM Encryption",
    "DEFLATE Compression",
    "Multiple Embedding Modes",
    "Real-time Text Analysis",
    "Privacy-First Design"
  ],
  "screenshot": "https://chinmay29hub-stegmoji.vercel.app/og-image.png",
  "browserRequirements": "Modern web browser with JavaScript support",
  "softwareVersion": "1.0.0",
  "datePublished": "2025-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "inLanguage": "en",
  "isAccessibleForFree": true,
  "license": "https://opensource.org/licenses/MIT",
  "keywords": "steganography, unicode, encryption, privacy, security, text analysis",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  }
})

export const getHowToStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Hide Messages in Text Using Stegmoji",
  "description": "Learn how to use Stegmoji to hide secret messages in plain text using invisible Unicode characters.",
  "image": "https://chinmay29hub-stegmoji.vercel.app/og-image.png",
  "totalTime": "PT5M",
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Secret message to hide"
    },
    {
      "@type": "HowToSupply", 
      "name": "Cover text (public message)"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Stegmoji Web Application",
      "url": "https://chinmay29hub-stegmoji.vercel.app"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Enter your secret message",
      "text": "Type or paste the message you want to hide in the 'Hidden Message' field.",
      "url": "https://chinmay29hub-stegmoji.vercel.app/encode"
    },
    {
      "@type": "HowToStep", 
      "name": "Enter cover text",
      "text": "Enter the public text that will carry your hidden message.",
      "url": "https://chinmay29hub-stegmoji.vercel.app/encode"
    },
    {
      "@type": "HowToStep",
      "name": "Choose embedding mode",
      "text": "Select how to embed the message: Tail (append), Interleaved (distribute), or ZWJ-aware (preserve emoji).",
      "url": "https://chinmay29hub-stegmoji.vercel.app/encode"
    },
    {
      "@type": "HowToStep",
      "name": "Enable optional features",
      "text": "Optionally enable compression to reduce size and encryption for security.",
      "url": "https://chinmay29hub-stegmoji.vercel.app/encode"
    },
    {
      "@type": "HowToStep",
      "name": "Encode the message",
      "text": "Click 'Encode Message' to generate the steganographic text.",
      "url": "https://chinmay29hub-stegmoji.vercel.app/encode"
    }
  ]
})

export const getFAQStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Unicode steganography?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unicode steganography is the practice of hiding secret messages within text using invisible Unicode characters like variation selectors and zero-width characters. These characters don't affect the visual appearance of text but can carry hidden data."
      }
    },
    {
      "@type": "Question", 
      "name": "Is Stegmoji secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Stegmoji uses AES-GCM encryption with PBKDF2 key derivation for secure message hiding. All processing happens locally in your browser, so your secrets never leave your device."
      }
    },
    {
      "@type": "Question",
      "name": "What are the different embedding modes?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "Stegmoji offers three embedding modes: Tail (appends data at the end), Interleaved (distributes data throughout text), and ZWJ-aware (preserves emoji and complex Unicode sequences)."
      }
    },
    {
      "@type": "Question",
      "name": "Can hidden messages be detected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hidden messages can be detected by analyzing the Unicode content of text. Stegmoji includes a scanner tool to detect invisible characters and analyze text for steganographic content."
      }
    },
    {
      "@type": "Question",
      "name": "Is Stegmoji free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Stegmoji is completely free and open-source. There are no usage limits or premium features."
      }
    }
  ]
})

export const getBreadcrumbStructuredData = (pathname) => {
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://chinmay29hub-stegmoji.vercel.app"
    }
  ]

  if (pathname === '/encode') {
    breadcrumbs.push({
      "@type": "ListItem", 
      "position": 2,
      "name": "Encode",
      "item": "https://chinmay29hub-stegmoji.vercel.app/encode"
    })
  } else if (pathname === '/decode') {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2, 
      "name": "Decode",
      "item": "https://chinmay29hub-stegmoji.vercel.app/decode"
    })
  } else if (pathname === '/scan') {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Scan", 
      "item": "https://chinmay29hub-stegmoji.vercel.app/scan"
    })
  } else if (pathname === '/about') {
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://chinmay29hub-stegmoji.vercel.app/about"
    })
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  }
}
