'use client'

import React, { useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { encode, MODES, calculateCapacity } from '@/lib/steganography'
import { copyToClipboard, downloadText, formatBytes, useLocalStorageState } from '@/lib/utils'

export const metadata = {
  title: 'Encode Messages - Hide Secret Text with Unicode Steganography',
  description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with AES encryption, compression, and multiple embedding modes.',
  keywords: ['encode messages', 'hide text', 'unicode steganography', 'secret messages', 'invisible characters', 'text steganography', 'encryption'],
  openGraph: {
    title: 'Encode Messages - Hide Secret Text with Unicode Steganography',
    description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with AES encryption, compression, and multiple embedding modes.',
    url: 'https://chinmay29hub-stegmoji.vercel.app/encode',
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
    title: 'Encode Messages - Hide Secret Text with Unicode Steganography',
    description: 'Hide secret messages in plain text using invisible Unicode characters. Free online steganography tool with AES encryption, compression, and multiple embedding modes.',
    images: ['https://chinmay29hub-stegmoji.vercel.app/og-image.png'],
  },
}

export default function EncodePage() {
  const [message, setMessage] = useState('')
  const [coverText, setCoverText] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Preferences with localStorage persistence
  const [mode, setMode] = useLocalStorageState('encodeMode', MODES.TAIL)
  const [compression, setCompression] = useLocalStorageState('encodeCompression', false)
  const [encryption, setEncryption] = useLocalStorageState('encodeEncryption', false)
  const [passphrase, setPassphrase] = useState('')
  const [showPassphrase, setShowPassphrase] = useState(false)

  // Calculate capacity and estimated size
  const capacity = calculateCapacity(coverText, mode)
  const messageBytes = new TextEncoder().encode(message).length
  
  // Estimate compressed size if compression is enabled
  let estimatedBytes = messageBytes
  if (compression && messageBytes > 0) {
    // Rough estimate: compression typically reduces size by 30-70% for text
    // We'll use a conservative 50% reduction estimate
    estimatedBytes = Math.ceil(messageBytes * 0.7) // 30% reduction for short messages
  }
  
  const estimatedBits = Math.ceil(estimatedBytes * 8) + 8 // +8 for header
  // For non-TAIL modes, capacity is in characters, but we can only embed 1 bit per character
  // So the actual bit capacity is just the character count (not * 8)
  const exceedsCapacity = capacity !== Infinity && estimatedBits > capacity

  const handleEncode = useCallback(async () => {
    if (!message.trim()) {
      setError('Please enter a message to hide')
      return
    }
    if (!coverText.trim()) {
      setError('Please enter cover text')
      return
    }
    if (encryption && !passphrase.trim()) {
      setError('Please enter a passphrase for encryption')
      return
    }
    if (exceedsCapacity) {
      setError(`Message too long for ${mode} mode. Maximum ${capacity} bits (${capacity} characters), need ${estimatedBits} bits.`)
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    setOutput('')

    try {
      const encoded = await encode(message, coverText, {
        mode,
        compress: compression,
        encrypt: encryption,
        passphrase
      })
      setOutput(encoded)
      setSuccess('Message encoded successfully!')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [message, coverText, mode, compression, encryption, passphrase, exceedsCapacity, capacity, estimatedBits])

  const handleCopy = async () => {
    if (await copyToClipboard(output)) {
      setSuccess('Copied to clipboard!')
      setTimeout(() => setSuccess(''), 2000)
    } else {
      setError('Failed to copy to clipboard')
    }
  }

  const handleDownload = () => {
    downloadText(output, 'stegmoji-encoded.txt')
    setSuccess('Downloaded as stegmoji-encoded.txt')
    setTimeout(() => setSuccess(''), 2000)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Encode Message</h1>
          <p className="text-muted-foreground">
            Hide a secret message inside cover text using invisible Unicode characters
          </p>
        </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hidden Message</CardTitle>
              <CardDescription>
                The secret message you want to hide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your secret message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="mt-2 text-sm text-muted-foreground">
                {messageBytes} bytes ({formatBytes(messageBytes)})
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cover Text</CardTitle>
              <CardDescription>
                The visible text that will contain your hidden message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter cover text here..."
                value={coverText}
                onChange={(e) => setCoverText(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="mt-2 text-sm text-muted-foreground">
                {!coverText.trim() ? (
                  <span className="text-muted-foreground">Enter cover text to see capacity</span>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span>Capacity: {capacity === Infinity ? 'Unlimited' : `${capacity} characters (${capacity * 8} bits)`}</span>
                      {message.trim() && <span>Needed: {estimatedBits} bits</span>}
                    </div>
                    {exceedsCapacity && (
                      <div className="mt-1 p-2 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded text-sm">
                        <div className="text-orange-600 font-medium">⚠️ Message too long for this mode</div>
                        <div className="text-orange-600 text-xs mt-1">
                          {mode === MODES.TAIL ? (
                            'This should not happen with Tail mode'
                          ) : (
                            <>
                              You need at least {estimatedBits} characters in cover text.
                              {capacity !== Infinity && (
                                <> Current: {capacity} characters. Add {estimatedBits - capacity} more characters.</>
                              )}
                            </>
                          )}
                        </div>
                        <div className="text-orange-600 text-xs mt-1">
                          💡 Try: Longer cover text, shorter message, or use Tail mode
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mode">Embedding Mode</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={MODES.TAIL}>Tail - Append at end</SelectItem>
                    <SelectItem value={MODES.INTERLEAVED}>Interleaved - Between codepoints</SelectItem>
                    <SelectItem value={MODES.ZWJ_AWARE}>ZWJ-aware - Between grapheme clusters</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground">
                  {mode === MODES.TAIL && '✅ Unlimited capacity - works with any message length'}
                  {mode === MODES.INTERLEAVED && (
                    message.trim() 
                      ? `⚠️ Limited capacity - needs ${Math.ceil(estimatedBits / 8)} characters for your message`
                      : '⚠️ Limited capacity - depends on cover text length'
                  )}
                  {mode === MODES.ZWJ_AWARE && (
                    message.trim() 
                      ? `⚠️ Limited capacity - needs ${Math.ceil(estimatedBits / 8)} characters for your message`
                      : '⚠️ Limited capacity - depends on cover text length'
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="compression"
                  checked={compression}
                  onCheckedChange={setCompression}
                />
                <Label htmlFor="compression">Enable Compression</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="encryption"
                  checked={encryption}
                  onCheckedChange={setEncryption}
                />
                <Label htmlFor="encryption">Enable Encryption</Label>
              </div>

              {encryption && (
                <div className="space-y-2">
                  <Label htmlFor="passphrase">Passphrase</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="passphrase"
                      type={showPassphrase ? 'text' : 'password'}
                      placeholder="Enter encryption passphrase"
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPassphrase(!showPassphrase)}
                    >
                      {showPassphrase ? '🙈' : '👁️'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={handleEncode}
            disabled={loading || !message.trim() || !coverText.trim() || exceedsCapacity}
            className="w-full"
          >
            {loading ? 'Encoding...' : 'Encode Message'}
          </Button>
          
          {/* Debug info for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-muted-foreground">
              Debug: message={message.trim() ? '✓' : '✗'}, cover={coverText.trim() ? '✓' : '✗'}, 
              capacity={capacity}, bits={estimatedBits}, exceeds={exceedsCapacity ? '✗' : '✓'}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Encoded Output</CardTitle>
              <CardDescription>
                Your cover text with the hidden message embedded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Encoded text will appear here..."
                value={output}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
              {output && (
                <div className="mt-2 text-sm text-muted-foreground">
                  ⚠️ Contains invisible characters - copy/paste carefully
                </div>
              )}
            </CardContent>
          </Card>

          {output && (
            <div className="flex space-x-2">
              <Button onClick={handleCopy} variant="outline" className="flex-1">
                Copy Output
              </Button>
              <Button onClick={handleDownload} variant="outline" className="flex-1">
                Download
              </Button>
            </div>
          )}

          {/* Capacity Help */}
          {exceedsCapacity && mode !== MODES.TAIL && message.trim() && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <div className="text-sm text-blue-600 dark:text-blue-400">
                <div className="font-medium mb-2">💡 How to fix capacity issues:</div>
                <div className="space-y-1 text-xs">
                  <div>• <strong>Use Tail mode:</strong> Unlimited capacity for any message</div>
                  <div>• <strong>Longer cover text:</strong> Add {estimatedBits - capacity} more characters</div>
                  <div>• <strong>Shorter message:</strong> Reduce message to {capacity} characters or less</div>
                  <div>• <strong>Enable compression:</strong> May reduce message size</div>
                </div>
              </div>
            </div>
          )}

          {/* Status Messages */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-md">
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
