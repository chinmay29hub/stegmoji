'use client'

import React, { useState, useCallback } from 'react'
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Decode Message</h1>
          <p className="text-muted-foreground">
            Extract hidden messages from encoded text
          </p>
        </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
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
        </div>

        {/* Output Section */}
        <div className="space-y-6">
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
        </div>
      </div>
    </div>
    </>
  )
}
