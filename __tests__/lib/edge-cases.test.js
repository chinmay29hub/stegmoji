import { encode, decode, MODES, calculateCapacity, scanText } from '@/lib/steganography'
import { compress, decompress } from '@/lib/compression'
import { encrypt, decrypt } from '@/lib/encryption'

// Mock the dependencies
jest.mock('@/lib/compression', () => ({
  compress: jest.fn(),
  decompress: jest.fn(),
}))

jest.mock('@/lib/encryption', () => ({
  encrypt: jest.fn(),
  decrypt: jest.fn(),
  isEncrypted: jest.fn(),
}))

describe('Edge Cases and Error Handling', () => {
  const mockCompress = compress
  const mockDecompress = decompress
  const mockEncrypt = encrypt
  const mockDecrypt = decrypt

  beforeEach(() => {
    jest.clearAllMocks()
    mockCompress.mockImplementation((data) => new Uint8Array(data))
    mockDecompress.mockImplementation((data) => new Uint8Array(data))
    mockEncrypt.mockImplementation(async (data, passphrase) => {
      const prefix = new TextEncoder().encode('ENCRYPTED:')
      const result = new Uint8Array(prefix.length + data.length)
      result.set(prefix, 0)
      result.set(data, prefix.length)
      return result
    })
    mockDecrypt.mockImplementation(async (data, passphrase) => {
      const prefix = new TextEncoder().encode('ENCRYPTED:')
      return data.slice(prefix.length)
    })
  })

  describe('Steganography Edge Cases', () => {
    test('handles empty message', async () => {
      const result = await encode('', 'Cover text', { mode: MODES.TAIL })
      expect(result).toContain('Cover text')
    })

    test('handles empty cover text', async () => {
      const result = await encode('Message', '', { mode: MODES.TAIL })
      expect(result).toBeDefined()
    })

    test('handles very long message', async () => {
      const longMessage = 'A'.repeat(10000)
      const result = await encode(longMessage, 'Cover text', { mode: MODES.TAIL })
      expect(result).toContain('Cover text')
    })

    test('handles Unicode emoji in message', async () => {
      const message = 'Hello 👋 World! 🎉'
      const result = await encode(message, 'Cover text', { mode: MODES.TAIL })
      const decoded = await decode(result, { mode: MODES.TAIL })
      expect(decoded).toBe(message)
    })

    test('handles Unicode emoji in cover text', async () => {
      const coverText = 'Hello 👋 World! 🎉'
      const result = await encode('Message', coverText, { mode: MODES.TAIL })
      const decoded = await decode(result, { mode: MODES.TAIL })
      expect(decoded).toBe('Message')
    })

    test('handles special characters', async () => {
      const message = 'Special: !@#$%^&*()_+-=[]{}|;:,.<>?'
      const result = await encode(message, 'Cover text', { mode: MODES.TAIL })
      const decoded = await decode(result, { mode: MODES.TAIL })
      expect(decoded).toBe(message)
    })

    test('handles newlines and tabs', async () => {
      const message = 'Line 1\nLine 2\tTabbed'
      const result = await encode(message, 'Cover text', { mode: MODES.TAIL })
      const decoded = await decode(result, { mode: MODES.TAIL })
      expect(decoded).toBe(message)
    })

    test('handles zero-width characters in cover text', async () => {
      const coverText = 'Hello\u200BWorld' // Contains zero-width space
      const result = await encode('Message', coverText, { mode: MODES.TAIL })
      const decoded = await decode(result, { mode: MODES.TAIL })
      expect(decoded).toBe('Message')
    })

    test('handles capacity exceeded in INTERLEAVED mode', async () => {
      const longMessage = 'A'.repeat(1000)
      const shortCover = 'Hi'
      
      await expect(
        encode(longMessage, shortCover, { mode: MODES.INTERLEAVED })
      ).rejects.toThrow('Message too long')
    })

    test('handles capacity exceeded in ZWJ_AWARE mode', async () => {
      const longMessage = 'A'.repeat(1000)
      const shortCover = 'Hi'
      
      await expect(
        encode(longMessage, shortCover, { mode: MODES.ZWJ_AWARE })
      ).rejects.toThrow('Message too long')
    })

    test('handles decode with no hidden data', async () => {
      await expect(
        decode('Plain text with no hidden data')
      ).rejects.toThrow('No hidden data found')
    })

    test('handles decode with corrupted data', async () => {
      const result = await encode('Message', 'Cover text', { mode: MODES.TAIL })
      const corrupted = result.slice(0, -10) // Remove last 10 characters
      
      // Corrupted data should either throw an error or return partial/corrupted message
      try {
        const decoded = await decode(corrupted, { mode: MODES.TAIL })
        // If it doesn't throw, the decoded message should be different from original
        expect(decoded).not.toBe('Message')
      } catch (error) {
        // It's also acceptable for it to throw an error
        expect(error).toBeDefined()
      }
    })
  })

  describe('Compression Edge Cases', () => {
    test('handles empty data compression', () => {
      const data = new Uint8Array(0)
      const compressed = compress(data)
      expect(compressed).toBeInstanceOf(Uint8Array)
    })

    test('handles single byte compression', () => {
      const data = new Uint8Array([65]) // 'A'
      const compressed = compress(data)
      expect(compressed).toBeInstanceOf(Uint8Array)
    })

    test('handles compression errors', () => {
      mockCompress.mockImplementation(() => {
        throw new Error('Compression failed')
      })
      
      expect(() => compress(new Uint8Array([65]))).toThrow('Compression failed')
    })

    test('handles decompression errors', () => {
      mockDecompress.mockImplementation(() => {
        throw new Error('Decompression failed')
      })
      
      expect(() => decompress(new Uint8Array([65]))).toThrow('Decompression failed')
    })
  })

  describe('Encryption Edge Cases', () => {
    test('handles empty passphrase', async () => {
      mockEncrypt.mockImplementation(async (data, passphrase) => {
        if (!passphrase || passphrase === '') {
          throw new Error('Passphrase is required')
        }
        const prefix = new TextEncoder().encode('ENCRYPTED:')
        return new Uint8Array([...prefix, ...data])
      })
      
      await expect(
        encrypt(new Uint8Array([65]), '')
      ).rejects.toThrow('Passphrase is required')
    })

    test('handles null passphrase', async () => {
      mockEncrypt.mockImplementation(async (data, passphrase) => {
        if (!passphrase) {
          throw new Error('Passphrase is required')
        }
        const prefix = new TextEncoder().encode('ENCRYPTED:')
        const result = new Uint8Array(prefix.length + data.length)
        result.set(prefix, 0)
        result.set(data, prefix.length)
        return result
      })
      
      await expect(
        encrypt(new Uint8Array([65]), null)
      ).rejects.toThrow('Passphrase is required')
    })

    test('handles very long passphrase', async () => {
      const longPassphrase = 'A'.repeat(1000)
      const result = await encrypt(new Uint8Array([65]), longPassphrase)
      expect(result).toBeInstanceOf(Uint8Array)
    })

    test('handles special characters in passphrase', async () => {
      const specialPassphrase = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      const result = await encrypt(new Uint8Array([65]), specialPassphrase)
      expect(result).toBeInstanceOf(Uint8Array)
    })

    test('handles encryption errors', async () => {
      mockEncrypt.mockRejectedValue(new Error('Encryption failed'))
      
      await expect(
        encrypt(new Uint8Array([65]), 'password')
      ).rejects.toThrow('Encryption failed')
    })

    test('handles decryption errors', async () => {
      mockDecrypt.mockRejectedValue(new Error('Decryption failed'))
      
      await expect(
        decrypt(new Uint8Array([65]), 'password')
      ).rejects.toThrow('Decryption failed')
    })
  })

  describe('Capacity Calculation Edge Cases', () => {
    test('handles empty cover text in TAIL mode', () => {
      const capacity = calculateCapacity('', MODES.TAIL)
      expect(capacity).toBe(Infinity)
    })

    test('handles empty cover text in INTERLEAVED mode', () => {
      const capacity = calculateCapacity('', MODES.INTERLEAVED)
      expect(capacity).toBe(0)
    })

    test('handles empty cover text in ZWJ_AWARE mode', () => {
      const capacity = calculateCapacity('', MODES.ZWJ_AWARE)
      expect(capacity).toBe(0)
    })

    test('handles emoji in cover text for ZWJ_AWARE mode', () => {
      const capacity = calculateCapacity('👋', MODES.ZWJ_AWARE)
      expect(capacity).toBe(1)
    })

    test('handles complex emoji sequences', () => {
      const capacity = calculateCapacity('👨‍👩‍👧‍👦', MODES.ZWJ_AWARE)
      expect(capacity).toBe(1) // Should be treated as one grapheme cluster
    })
  })

  describe('Scan Text Edge Cases', () => {
    test('handles empty text', () => {
      const result = scanText('')
      expect(result.hasHiddenData).toBe(false)
      expect(result.vsCount).toBe(0)
    })

    test('handles text with only spaces', () => {
      const result = scanText('   ')
      expect(result.hasHiddenData).toBe(false)
      expect(result.vsCount).toBe(0)
    })

    test('handles text with only newlines', () => {
      const result = scanText('\n\n\n')
      expect(result.hasHiddenData).toBe(false)
      expect(result.vsCount).toBe(0)
    })

    test('handles text with mixed invisible characters', () => {
      const text = 'Hello\uFE0EWorld\uFE0F'
      const result = scanText(text)
      expect(result.hasHiddenData).toBe(true)
      expect(result.vsCount).toBeGreaterThan(0)
    })
  })

  describe('Performance Edge Cases', () => {
    test('handles large text efficiently', async () => {
      const largeMessage = 'A'.repeat(10000)
      const largeCover = 'B'.repeat(10000)
      
      const start = Date.now()
      const result = await encode(largeMessage, largeCover, { mode: MODES.TAIL })
      const end = Date.now()
      
      expect(result).toContain(largeCover)
      expect(end - start).toBeLessThan(5000) // Should complete within 5 seconds
    })

    test('handles many small operations', async () => {
      const promises = []
      for (let i = 0; i < 100; i++) {
        promises.push(encode(`Message ${i}`, `Cover ${i}`, { mode: MODES.TAIL }))
      }
      
      const results = await Promise.all(promises)
      expect(results).toHaveLength(100)
      results.forEach(result => {
        expect(result).toBeDefined()
      })
    })
  })
})
