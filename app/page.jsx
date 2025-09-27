import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SEOHead from '@/components/seo/SEOHead'
import { getHowToStructuredData, getFAQStructuredData } from '@/lib/seo/structuredData'

export default function HomePage() {
  return (
    <>
      <SEOHead 
        title="Stegmoji - Free Unicode Steganography Tool | Hide Messages in Plain Text"
        description="Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with AES encryption, compression, and multiple embedding modes. Privacy-first design."
        keywords="unicode steganography, hide messages, invisible characters, text steganography, secret messages, encryption, privacy, security, free steganography tool"
        structuredData={[getHowToStructuredData(), getFAQStructuredData()]}
        canonical="https://chinmay29hub-stegmoji.vercel.app"
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Free Unicode Steganography Tool - Hide Messages in Plain Text
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Hide secret messages inside text using invisible Unicode characters. Secure, private, and completely free.
          </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/encode">
            <Button size="lg">Start Encoding</Button>
          </Link>
          <Link href="/decode">
            <Button variant="outline" size="lg">Decode Message</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>How Unicode Steganography Works</CardTitle>
            <CardDescription>
              Advanced invisible character embedding technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Stegmoji uses Unicode Variation Selectors (VS15 and VS16) to embed hidden messages 
              in plain text. These invisible characters don't change the visual appearance of text 
              but can carry secret data. Our tool supports multiple embedding modes including 
              Tail, Interleaved, and ZWJ-aware modes for maximum flexibility.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy-First Design</CardTitle>
            <CardDescription>
              Your secrets never leave your device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All processing happens locally in your browser using modern Web APIs. No data 
              is sent to external servers, ensuring complete privacy. Features include AES-GCM 
              encryption, DEFLATE compression, and real-time Unicode analysis.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Stegmoji?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔒</span> Secure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AES-GCM encryption with PBKDF2 key derivation ensures your messages are protected 
                with industry-standard cryptography.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚡</span> Fast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-time encoding and decoding with DEFLATE compression to maximize capacity 
                in shorter texts.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🌐</span> Compatible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Works across all modern platforms including social media, email, and messaging 
                applications that preserve Unicode characters.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Link href="/encode">
          <Card className="hover:bg-accent transition-colors cursor-pointer h-full flex flex-col">
            <CardHeader className="text-center">
              <div className="text-2xl mb-2">🔐</div>
              <CardTitle className="text-lg">Encode</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground text-center">
                Hide messages in cover text with optional compression and encryption
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/decode">
          <Card className="hover:bg-accent transition-colors cursor-pointer h-full flex flex-col">
            <CardHeader className="text-center">
              <div className="text-2xl mb-2">🔓</div>
              <CardTitle className="text-lg">Decode</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground text-center">
                Extract hidden messages from encoded text
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/scan">
          <Card className="hover:bg-accent transition-colors cursor-pointer h-full flex flex-col">
            <CardHeader className="text-center">
              <div className="text-2xl mb-2">🔍</div>
              <CardTitle className="text-lg">Scan</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground text-center">
                Analyze text for invisible characters and Unicode properties
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/about">
          <Card className="hover:bg-accent transition-colors cursor-pointer h-full flex flex-col">
            <CardHeader className="text-center">
              <div className="text-2xl mb-2">ℹ️</div>
              <CardTitle className="text-lg">About</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <p className="text-sm text-muted-foreground text-center">
                Learn about the technology and responsible usage
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
    </>
  )
}
