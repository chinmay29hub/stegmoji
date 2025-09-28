'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { encode, MODES, calculateCapacity } from '@/lib/steganography'
import { copyToClipboard, downloadText, formatBytes, useLocalStorageState } from '@/lib/utils'

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
      {/* Encoding-themed animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating encryption symbols */}
        <motion.div
          className="absolute top-20 left-16 text-4xl opacity-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          🔐
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-3xl opacity-10"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 15, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          🔒
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-2xl opacity-10"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            rotate: [0, 20, -20, 0],
            opacity: [0.05, 0.18, 0.05]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          🛡️
        </motion.div>
        
        {/* Floating binary code particles */}
        <motion.div
          className="absolute top-32 left-1/3 text-xs font-mono text-green-400/20"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          01001000
        </motion.div>
        <motion.div
          className="absolute top-60 right-1/3 text-xs font-mono text-blue-400/20"
          animate={{
            y: [0, 20, 0],
            x: [0, -12, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          01101001
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-16 text-xs font-mono text-purple-400/20"
          animate={{
            y: [0, -18, 0],
            x: [0, 22, 0],
            opacity: [0.1, 0.35, 0.1],
            rotate: [0, 12, -12, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          01100100
        </motion.div>
        
        {/* Floating geometric shapes for encoding theme */}
        <motion.div
          className="absolute top-24 left-12 w-8 h-8 bg-gradient-to-br from-green-400/15 to-emerald-500/15 rounded-full blur-sm"
          animate={{
            y: [0, -25, 0],
            x: [0, 18, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-48 right-12 w-6 h-6 bg-gradient-to-br from-blue-400/15 to-cyan-500/15 rounded-full blur-sm"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, -90, -180, -270, -360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-48 left-16 w-10 h-10 bg-gradient-to-br from-purple-400/15 to-violet-500/15 rounded-full blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 25, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 60, 120, 180, 240, 300, 360]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating encoding-related text */}
        <motion.div
          className="absolute top-36 left-8 text-xs font-mono text-orange-400/15"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ENCODE
        </motion.div>
        <motion.div
          className="absolute bottom-36 right-8 text-xs font-mono text-pink-400/15"
          animate={{
            y: [0, 12, 0],
            x: [0, -8, 0],
            opacity: [0.1, 0.25, 0.1],
            rotate: [0, -8, 8, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          HIDE
        </motion.div>
        <motion.div
          className="absolute top-52 right-1/4 text-xs font-mono text-yellow-400/15"
          animate={{
            y: [0, -10, 0],
            x: [0, 18, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          SECRET
        </motion.div>
        
        {/* Animated connection lines */}
        <motion.div
          className="absolute top-28 left-1/2 w-1 h-16 bg-gradient-to-b from-green-400/20 to-transparent"
          animate={{
            scaleY: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-28 right-1/2 w-20 h-1 bg-gradient-to-r from-blue-400/20 to-transparent"
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, -3, 3, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating dots pattern */}
        <motion.div
          className="absolute top-16 left-1/4 w-2 h-2 bg-green-400/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-blue-400/10 rounded-full"
          animate={{
            y: [0, 18, 0],
            x: [0, -10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 left-1/3 w-2.5 h-2.5 bg-purple-400/10 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">Encode Message</h1>
          <p className="text-muted-foreground">
            Hide a secret message inside cover text using invisible Unicode characters
          </p>
        </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
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
        </motion.div>

        {/* Output Section */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </div>
    </>
  )
}
