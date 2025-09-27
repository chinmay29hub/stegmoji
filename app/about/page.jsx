import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SEOHead from '@/components/seo/SEOHead'

export default function AboutPage() {
  return (
    <>
      <SEOHead 
        title="About Stegmoji - Unicode Steganography Technology and Features"
        description="Learn about Unicode steganography technology, how Stegmoji works, security features, and responsible usage. Comprehensive guide to invisible character steganography."
        keywords="about stegmoji, unicode steganography technology, invisible characters, text steganography, security features, steganography guide"
        canonical="https://chinmay29hub-stegmoji.vercel.app/about"
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">About Stegmoji</h1>
          <p className="text-muted-foreground">
            Learn about Unicode steganography and how Stegmoji works
          </p>
        </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>What is Stegmoji?</CardTitle>
            <CardDescription>
              A tool for hiding messages in plain sight using Unicode steganography
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Stegmoji is a web application that uses Unicode Variation Selectors to hide secret messages 
              inside regular text. The hidden data is completely invisible to the human eye but can be 
              extracted by anyone who knows how to look for it.
            </p>
            <p>
              Unlike traditional steganography that hides data in images or audio files, Stegmoji works 
              with plain text, making it perfect for scenarios where you need to transmit hidden information 
              through text-based channels like social media, messaging apps, or email.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>
              The technical details behind Unicode steganography
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Variation Selectors</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Stegmoji uses two invisible Unicode characters:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <code className="bg-muted px-1 rounded">U+FE0E</code> (VS15) - represents bit 0</li>
                <li>• <code className="bg-muted px-1 rounded">U+FE0F</code> (VS16) - represents bit 1</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Embedding Modes</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Tail Mode:</strong> Appends all hidden data at the end of the cover text. 
                  Unlimited capacity but detectable by scanning the end of text.
                </div>
                <div>
                  <strong>Interleaved Mode:</strong> Inserts one bit after each Unicode codepoint. 
                  Limited by the number of characters in cover text.
                </div>
                <div>
                  <strong>ZWJ-Aware Mode:</strong> Inserts one bit after each grapheme cluster. 
                  Preserves emoji sequences and complex Unicode characters.
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Security Features</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Compression:</strong> Uses DEFLATE algorithm to reduce payload size, 
                  allowing longer messages to fit in shorter cover texts.
                </div>
                <div>
                  <strong>Encryption:</strong> AES-GCM encryption with PBKDF2 key derivation 
                  (100,000 iterations) for secure message protection.
                </div>
                <div>
                  <strong>Header:</strong> Each message includes metadata about compression 
                  and encryption status.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
            <CardDescription>
              Practical applications for Unicode steganography
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Educational Use</h4>
              <p className="text-sm text-muted-foreground">
                Perfect for learning about steganography, Unicode, and data hiding techniques. 
                Great for computer science courses and cybersecurity education.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Creative Applications</h4>
              <p className="text-sm text-muted-foreground">
                Hide Easter eggs in blog posts, add metadata to social media posts, 
                or create interactive puzzles and games with hidden messages.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-purple-600">Privacy Testing</h4>
              <p className="text-sm text-muted-foreground">
                Test how different platforms handle invisible characters, 
                understand text normalization, and explore Unicode behavior.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitations & Considerations</CardTitle>
            <CardDescription>
              Important things to know about Unicode steganography
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Platform Compatibility</h4>
              <p className="text-sm text-muted-foreground">
                Some platforms may strip or normalize invisible Unicode characters:
              </p>
              <ul className="text-sm space-y-1 ml-4 mt-2">
                <li>• Social media platforms often normalize text</li>
                <li>• Some messaging apps remove "invisible" characters</li>
                <li>• Copy-paste operations may lose formatting</li>
                <li>• Search engines may index normalized versions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Detection</h4>
              <p className="text-sm text-muted-foreground">
                Steganography can be detected by:
              </p>
              <ul className="text-sm space-y-1 ml-4 mt-2">
                <li>• Scanning for invisible Unicode characters</li>
                <li>• Analyzing character frequency patterns</li>
                <li>• Looking for unusual Unicode sequences</li>
                <li>• Using tools like our built-in scanner</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-orange-600">Security Notes</h4>
              <p className="text-sm text-muted-foreground">
                This tool is for educational and legitimate purposes only:
              </p>
              <ul className="text-sm space-y-1 ml-4 mt-2">
                <li>• Use strong, unique passphrases for encryption</li>
                <li>• Be aware that hidden data can be detected</li>
                <li>• Don't rely on this for high-security communications</li>
                <li>• Consider the legal implications in your jurisdiction</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>
              How Stegmoji protects your data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Client-Side Processing</h4>
              <p className="text-sm text-muted-foreground">
                All encoding, decoding, and analysis happens entirely in your browser. 
                No data is sent to external servers, ensuring complete privacy.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-green-600">No Data Storage</h4>
              <p className="text-sm text-muted-foreground">
                Stegmoji doesn't store your messages, passphrases, or any sensitive data. 
                Only your preferences (like theme and default settings) are saved locally.
              </p>
            </div>

            {/* <div>
              <h4 className="font-semibold mb-2 text-green-600">Open Source</h4>
              <p className="text-sm text-muted-foreground">
                The source code is available for inspection, allowing you to verify 
                that no malicious code is present.
              </p>
            </div> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance & Compatibility</CardTitle>
            <CardDescription>
              Optimized for speed and broad browser support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Fast Performance</h4>
              <p className="text-sm text-muted-foreground">
                Clean, optimized code without obfuscation overhead ensures fast encoding, 
                decoding, and analysis operations. Built for speed and efficiency.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Browser Support</h4>
              <p className="text-sm text-muted-foreground">
                Works on all modern browsers including Chrome, Firefox, Safari, and Edge. 
                Requires Web Crypto API support for encryption features.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Mobile Friendly</h4>
              <p className="text-sm text-muted-foreground">
                Responsive design works perfectly on desktop, tablet, and mobile devices. 
                Touch-friendly interface for all screen sizes.
              </p>
            </div>
          </CardContent>
        </Card>


        <div className="flex justify-center space-x-4">
          <Link href="/encode">
            <Button>Try Encoding</Button>
          </Link>
          <Link href="/scan">
            <Button variant="outline">Analyze Text</Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}
