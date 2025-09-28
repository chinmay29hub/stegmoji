'use client'

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { decode, MODES, scanText } from '@/lib/steganography'
import { copyToClipboard, useLocalStorageState } from '@/lib/utils'

export default function DecodePage() {
  const [encodedText, setEncodedText] = useState('')
  const [decodedMessage, setDecodedMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Preferences with localStorage persistence
  const [mode, setMode] = useLocalStorageState('decodeMode', 'auto')
  const [passphrase, setPassphrase] = useState('')
  const [showPassphrase, setShowPassphrase] = useState(false)

  // Scan for hidden data
  const scanResult = scanText(encodedText)
  const hasHiddenData = scanResult.hasHiddenData

  const handleDecode = useCallback(async () => {
    if (!encodedText.trim()) {
      setError('Please enter encoded text')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const decoded = await decode(encodedText, {
        mode: mode === 'auto' ? 'auto' : mode,
        passphrase
      })
      setDecodedMessage(decoded)
      setSuccess('Message decoded successfully!')
    } catch (err) {
      setError(err.message)
      setDecodedMessage('')
    } finally {
      setLoading(false)
    }
  }, [encodedText, mode, passphrase])

  const handleCopy = async () => {
    if (await copyToClipboard(decodedMessage)) {
      setSuccess('Copied to clipboard!')
      setTimeout(() => setSuccess(''), 2000)
    } else {
      setError('Failed to copy to clipboard')
    }
  }

  const handleClear = () => {
    setEncodedText('')
    setDecodedMessage('')
    setError('')
    setSuccess('')
  }

  return (
    <>
      {/* Decoding-themed animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating decoding symbols */}
        <motion.div
          className="absolute top-20 left-16 text-4xl opacity-10"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          🔍
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-3xl opacity-10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -20, 20, 0],
            opacity: [0.05, 0.18, 0.05]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          🔓
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-2xl opacity-10"
          animate={{
            y: [0, -30, 0],
            x: [0, 25, 0],
            rotate: [0, 25, -25, 0],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          🕵️
        </motion.div>
        
        {/* Floating decoding-related text */}
        <motion.div
          className="absolute top-32 left-1/3 text-xs font-mono text-cyan-400/20"
          animate={{
            y: [0, -25, 0],
            x: [0, 18, 0],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          DECODE
        </motion.div>
        <motion.div
          className="absolute top-60 right-1/3 text-xs font-mono text-orange-400/20"
          animate={{
            y: [0, 22, 0],
            x: [0, -15, 0],
            opacity: [0.1, 0.35, 0.1],
            rotate: [0, -12, 12, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          EXTRACT
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-16 text-xs font-mono text-pink-400/20"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          REVEAL
        </motion.div>
        
        {/* Floating geometric shapes for decoding theme */}
        <motion.div
          className="absolute top-24 left-12 w-10 h-10 bg-gradient-to-br from-cyan-400/15 to-blue-500/15 rounded-full blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 120, 240, 360]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-48 right-12 w-7 h-7 bg-gradient-to-br from-orange-400/15 to-red-500/15 rounded-full blur-sm"
          animate={{
            y: [0, 25, 0],
            x: [0, -18, 0],
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, -120, -240, -360]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-48 left-16 w-9 h-9 bg-gradient-to-br from-pink-400/15 to-rose-500/15 rounded-full blur-sm"
          animate={{
            y: [0, -35, 0],
            x: [0, 30, 0],
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating magnifying glass effects */}
        <motion.div
          className="absolute top-36 left-8 w-6 h-6 border-2 border-cyan-400/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-36 right-8 w-4 h-4 border-2 border-orange-400/20 rounded-full"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated connection lines */}
        <motion.div
          className="absolute top-28 left-1/2 w-1 h-20 bg-gradient-to-b from-cyan-400/20 to-transparent"
          animate={{
            scaleY: [1, 1.4, 1],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-28 right-1/2 w-24 h-1 bg-gradient-to-r from-orange-400/20 to-transparent"
          animate={{
            scaleX: [1, 1.3, 1],
            opacity: [0.1, 0.5, 0.1],
            rotate: [0, -6, 6, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating dots pattern */}
        <motion.div
          className="absolute top-16 left-1/4 w-2 h-2 bg-cyan-400/10 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, 18, 0],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-orange-400/10 rounded-full"
          animate={{
            y: [0, 22, 0],
            x: [0, -12, 0],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 left-1/3 w-2.5 h-2.5 bg-pink-400/10 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 25, 0],
            opacity: [0.1, 0.6, 0.1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">Decode Message</h1>
          <p className="text-muted-foreground">
            Extract hidden messages from encoded text
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
              <CardTitle>Encoded Text</CardTitle>
              <CardDescription>
                Paste the text containing the hidden message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste encoded text here..."
                value={encodedText}
                onChange={(e) => setEncodedText(e.target.value)}
                className="min-h-[200px]"
              />
              {hasHiddenData && (
                <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                  ✅ Hidden data detected: {scanResult.vsCount} variation selectors found
                </div>
              )}
              {encodedText && !hasHiddenData && (
                <div className="mt-2 text-sm text-muted-foreground">
                  ℹ️ No hidden data detected in this text
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Decode Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mode">Detection Mode</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect (recommended)</SelectItem>
                    <SelectItem value={MODES.TAIL}>Tail mode</SelectItem>
                    <SelectItem value={MODES.INTERLEAVED}>Interleaved mode</SelectItem>
                    <SelectItem value={MODES.ZWJ_AWARE}>ZWJ-aware mode</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-muted-foreground">
                  Auto-detect will try to determine the embedding method used
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passphrase">Passphrase (if encrypted)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="passphrase"
                    type={showPassphrase ? 'text' : 'password'}
                    placeholder="Enter decryption passphrase if needed"
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
                <div className="text-xs text-muted-foreground">
                  Only needed if the message was encrypted during encoding
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-2">
            <Button
              onClick={handleDecode}
              disabled={loading || !encodedText.trim()}
              className="flex-1"
            >
              {loading ? 'Decoding...' : 'Decode Message'}
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              disabled={loading}
            >
              Clear
            </Button>
          </div>
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
              <CardTitle>Decoded Message</CardTitle>
              <CardDescription>
                The hidden message extracted from the encoded text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Decoded message will appear here..."
                value={decodedMessage}
                readOnly
                className="min-h-[200px]"
              />
              {decodedMessage && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {decodedMessage.length} characters
                </div>
              )}
            </CardContent>
          </Card>

          {decodedMessage && (
            <Button onClick={handleCopy} variant="outline" className="w-full">
              Copy Decoded Message
            </Button>
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

          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Common Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <strong>No hidden data found:</strong> The text may not contain embedded data, or the invisible characters were removed during copy/paste.
              </div>
              <div>
                <strong>Encrypted message:</strong> If the message was encrypted, you'll need the correct passphrase.
              </div>
              <div>
                <strong>Wrong mode:</strong> Try different detection modes if auto-detect fails.
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  )
}
