import { encode, decode, MODES, calculateCapacity, scanText } from '@/lib/steganography'

// Mock the dependencies
jest.mock('@/lib/compression', () => ({
  compress: jest.fn((data) => {
    if (data.length === 0) return new Uint8Array(0)
    // Return the original data as "compressed" for testing
    return new Uint8Array(data)
  }),
  decompress: jest.fn((data) => {
    if (data.length === 0) return new Uint8Array(0)
    // Return the original data as "decompressed" for testing
    return new Uint8Array(data)
  }),
}))

jest.mock('@/lib/encryption', () => ({
  encrypt: jest.fn(async (data, passphrase) => {
    // Mock encryption - just add a prefix
    const prefix = new TextEncoder().encode('ENCRYPTED:')
    const result = new Uint8Array(prefix.length + data.length)
    result.set(prefix, 0)
    result.set(data, prefix.length)
    return result
  }),
  decrypt: jest.fn(async (data, passphrase) => {
    // Mock decryption - check passphrase and throw if wrong
    if (passphrase === 'wrong') {
      throw new Error('Decryption failed: Invalid passphrase')
    }
    const prefix = new TextEncoder().encode('ENCRYPTED:')
    return data.slice(prefix.length)
  }),
  isEncrypted: jest.fn((data) => data.length > 16), // Mock encrypted check
}))

describe('Steganography Core Functions', () => {
  const testMessage = 'Hello, World!'
  const testCoverText = 'This is a test message.'
  const shortMessage = 'Hi!'
  const longCoverText = 'This is a much longer cover text that can hold more data for testing purposes.'

  describe('calculateCapacity', () => {
    test('should return Infinity for TAIL mode', () => {
      const capacity = calculateCapacity(testCoverText, MODES.TAIL)
      expect(capacity).toBe(Infinity)
    })

    test('should return codepoint count for INTERLEAVED mode', () => {
      const capacity = calculateCapacity(testCoverText, MODES.INTERLEAVED)
      expect(capacity).toBe(testCoverText.length)
    })

    test('should return grapheme cluster count for ZWJ_AWARE mode', () => {
      const capacity = calculateCapacity('Hello 👋', MODES.ZWJ_AWARE)
      expect(capacity).toBeGreaterThan(0)
    })
  })

  describe('encode', () => {
    test('should encode message in TAIL mode', async () => {
      const encoded = await encode(testMessage, testCoverText, { mode: MODES.TAIL })
      expect(encoded).toContain(testCoverText)
      expect(encoded.length).toBeGreaterThan(testCoverText.length)
    })

    test('should encode message in INTERLEAVED mode', async () => {
      const encoded = await encode(shortMessage, longCoverText, { mode: MODES.INTERLEAVED })
      // For interleaved mode, the text will have variation selectors inserted
      expect(encoded.length).toBeGreaterThan(longCoverText.length)
      expect(encoded).toMatch(/[︎️]/) // Should contain variation selectors
    })

    test('should encode message in ZWJ_AWARE mode', async () => {
      const encoded = await encode(shortMessage, longCoverText, { mode: MODES.ZWJ_AWARE })
      // For ZWJ-aware mode, the text will have variation selectors inserted
      expect(encoded.length).toBeGreaterThan(longCoverText.length)
      expect(encoded).toMatch(/[︎️]/) // Should contain variation selectors
    })

    test('should throw error when message exceeds capacity', async () => {
      const longMessage = 'A'.repeat(1000)
      const shortCover = 'Hi'
      
      await expect(
        encode(longMessage, shortCover, { mode: MODES.INTERLEAVED })
      ).rejects.toThrow('Message too long')
    })

    test('should work with compression', async () => {
      const encoded = await encode(testMessage, testCoverText, { 
        mode: MODES.TAIL,
        compress: true 
      })
      expect(encoded).toContain(testCoverText)
    })

    test('should work with encryption', async () => {
      const encoded = await encode(testMessage, testCoverText, { 
        mode: MODES.TAIL,
        encrypt: true,
        passphrase: 'test123'
      })
      expect(encoded).toContain(testCoverText)
    })
  })

  describe('decode', () => {
    test('should decode message from TAIL mode', async () => {
      const encoded = await encode(testMessage, testCoverText, { mode: MODES.TAIL })
      const decoded = await decode(encoded, { mode: MODES.TAIL })
      expect(decoded).toBe(testMessage)
    })

    test('should decode message from INTERLEAVED mode', async () => {
      const encoded = await encode(shortMessage, longCoverText, { mode: MODES.INTERLEAVED })
      const decoded = await decode(encoded, { mode: MODES.INTERLEAVED })
      expect(decoded).toBe(shortMessage)
    })

    test('should decode message from ZWJ_AWARE mode', async () => {
      const encoded = await encode(shortMessage, longCoverText, { mode: MODES.ZWJ_AWARE })
      const decoded = await decode(encoded, { mode: MODES.ZWJ_AWARE })
      expect(decoded).toBe(shortMessage)
    })

    test('should auto-detect TAIL mode', async () => {
      const encoded = await encode(testMessage, testCoverText, { mode: MODES.TAIL })
      const decoded = await decode(encoded, { mode: 'auto' })
      expect(decoded).toBe(testMessage)
    })

    test('should auto-detect INTERLEAVED mode', async () => {
      const encoded = await encode(shortMessage, longCoverText, { mode: MODES.INTERLEAVED })
      const decoded = await decode(encoded, { mode: 'auto' })
      expect(decoded).toBe(shortMessage)
    })

    test('should throw error for text with no hidden data', async () => {
      await expect(decode(testCoverText)).rejects.toThrow('No hidden data found')
    })

    test('should work with compression', async () => {
      const encoded = await encode(testMessage, testCoverText, { 
        mode: MODES.TAIL,
        compress: true 
      })
      const decoded = await decode(encoded, { mode: MODES.TAIL })
      expect(decoded).toBe(testMessage)
    })

    test('should work with encryption', async () => {
      const encoded = await encode(testMessage, testCoverText, { 
        mode: MODES.TAIL,
        encrypt: true,
        passphrase: 'test123'
      })
      const decoded = await decode(encoded, { 
        mode: MODES.TAIL,
        passphrase: 'test123'
      })
      expect(decoded).toBe(testMessage)
    })

    test('should throw error for wrong passphrase', async () => {
      const encoded = await encode(testMessage, testCoverText, { 
        mode: MODES.TAIL,
        encrypt: true,
        passphrase: 'test123'
      })
      
      await expect(decode(encoded, { 
        mode: MODES.TAIL,
        passphrase: 'wrong'
      })).rejects.toThrow()
    })
  })

  describe('scanText', () => {
    test('should detect hidden data in encoded text', async () => {
      const encoded = await encode(testMessage, testCoverText, { mode: MODES.TAIL })
      const scanResult = scanText(encoded)
      
      expect(scanResult.hasHiddenData).toBe(true)
      expect(scanResult.vsCount).toBeGreaterThan(0)
      expect(scanResult.estimatedBits).toBeGreaterThan(0)
    })

    test('should not detect hidden data in plain text', () => {
      const scanResult = scanText(testCoverText)
      
      expect(scanResult.hasHiddenData).toBe(false)
      expect(scanResult.vsCount).toBe(0)
    })
  })
})
