'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <>
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-violet-500/20 rounded-full blur-sm"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-6 h-6 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-sm"
          animate={{
            y: [0, -35, 0],
            x: [0, 25, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-60 left-1/3 w-10 h-10 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-sm"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 0.7, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, -90, -180, -270, -360]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Unicode symbols */}
        <motion.div
          className="absolute top-24 right-16 text-3xl opacity-15"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          🔒
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-16 text-2xl opacity-15"
          animate={{
            y: [0, 18, 0],
            rotate: [0, -20, 20, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          🔍
        </motion.div>
        <motion.div
          className="absolute top-40 left-1/2 text-xl opacity-15"
          animate={{
            y: [0, -12, 0],
            x: [0, 20, 0],
            rotate: [0, 25, -25, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ⚡
        </motion.div>
        
        {/* Floating text particles */}
        <motion.div
          className="absolute top-28 left-12 text-xs font-mono text-blue-400/15"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          U+FE0E
        </motion.div>
        <motion.div
          className="absolute bottom-28 right-12 text-xs font-mono text-green-400/15"
          animate={{
            y: [0, 15, 0],
            x: [0, -12, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          U+FE0F
        </motion.div>
        <motion.div
          className="absolute top-52 right-8 text-xs font-mono text-purple-400/15"
          animate={{
            y: [0, -10, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          VS15
        </motion.div>
        <motion.div
          className="absolute bottom-52 left-8 text-xs font-mono text-yellow-400/15"
          animate={{
            y: [0, 12, 0],
            x: [0, -10, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -12, 12, 0]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          VS16
        </motion.div>
        
        {/* Floating lines/connections */}
        <motion.div
          className="absolute top-24 left-1/2 w-1 h-20 bg-gradient-to-b from-blue-400/15 to-transparent"
          animate={{
            scaleY: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 right-1/2 w-24 h-1 bg-gradient-to-r from-purple-400/15 to-transparent"
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated background patterns */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Floating dots pattern */}
          <motion.div
            className="absolute top-16 left-1/4 w-2 h-2 bg-blue-400/10 rounded-full"
            animate={{
              y: [0, -25, 0],
              x: [0, 18, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-32 right-1/3 w-1.5 h-1.5 bg-green-400/10 rounded-full"
            animate={{
              y: [0, 20, 0],
              x: [0, -12, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-2.5 h-2.5 bg-purple-400/10 rounded-full"
            animate={{
              y: [0, -30, 0],
              x: [0, 25, 0],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Animated grid pattern */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-5"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-80 right-1/4 w-6 h-6 bg-gradient-to-br from-pink-400/20 to-rose-500/20 rounded-full blur-sm"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 120, 240, 360]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-60 right-10 w-7 h-7 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-sm"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, -120, -240, -360]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 right-1/3 w-5 h-5 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 22, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 60, 120, 180, 240, 300, 360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">About Stegmoji</h1>
          <p className="text-muted-foreground">
            Learn about Unicode steganography and how Stegmoji works
          </p>
        </motion.div>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
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

              <div>
                <h4 className="font-semibold mb-2 text-green-600">Open Source</h4>
                <p className="text-sm text-muted-foreground">
                  The source code is available for inspection, allowing you to verify 
                  that no malicious code is present.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
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
                  Clean, optimized code ensures fast encoding, decoding, and analysis operations. 
                  Built for speed and efficiency with modern web technologies.
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
                <h4 className="font-semibold mb-2 text-blue-600">Modern Web Standards</h4>
                <p className="text-sm text-muted-foreground">
                  Built with Next.js 14, React 18, and modern web APIs. 
                  Optimized for performance with efficient algorithms and clean architecture.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>


        <motion.div 
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link href="/encode">
            <Button>Try Encoding</Button>
          </Link>
          <Link href="/scan">
            <Button variant="outline">Analyze Text</Button>
          </Link>
        </motion.div>
      </div>
    </div>
    </>
  )
}
