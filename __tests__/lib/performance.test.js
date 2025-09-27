import { encode, decode, MODES } from '@/lib/steganography'
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

describe('Performance Tests', () => {
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

  describe('Encoding Performance', () => {
    test('encodes small message quickly', async () => {
      const message = 'Hello, World!'
      const coverText = 'This is a test message.'
      
      const start = Date.now()
      const result = await encode(message, coverText, { mode: MODES.TAIL })
      const end = Date.now()
      
      expect(result).toContain(coverText)
      expect(end - start).toBeLessThan(100) // Should complete within 100ms
    })

    test('encodes medium message efficiently', async () => {
      const message = 'A'.repeat(1000)
      const coverText = 'B'.repeat(1000)
      
      const start = Date.now()
      const result = await encode(message, coverText, { mode: MODES.TAIL })
      const end = Date.now()
      
      expect(result).toContain(coverText)
      expect(end - start).toBeLessThan(1000) // Should complete within 1 second
    })

    test('encodes large message within reasonable time', async () => {
      const message = 'A'.repeat(10000)
      const coverText = 'B'.repeat(10000)
      
      const start = Date.now()
      const result = await encode(message, coverText, { mode: MODES.TAIL })
      const end = Date.now()
      
      expect(result).toContain(coverText)
      expect(end - start).toBeLessThan(5000) // Should complete within 5 seconds
    })

    test('handles concurrent encoding operations', async () => {
      const operations = []
      for (let i = 0; i < 10; i++) {
        operations.push(
          encode(`Message ${i}`, `Cover ${i}`, { mode: MODES.TAIL })
        )
      }
      
      const start = Date.now()
      const results = await Promise.all(operations)
      const end = Date.now()
      
      expect(results).toHaveLength(10)
      expect(end - start).toBeLessThan(2000) // Should complete within 2 seconds
    })
  })

  describe('Decoding Performance', () => {
    test('decodes small message quickly', async () => {
      const message = 'Hello, World!'
      const coverText = 'This is a test message.'
      const encoded = await encode(message, coverText, { mode: MODES.TAIL })
      
      const start = Date.now()
      const decoded = await decode(encoded, { mode: MODES.TAIL })
      const end = Date.now()
      
      expect(decoded).toBe(message)
      expect(end - start).toBeLessThan(100) // Should complete within 100ms
    })

    test('decodes medium message efficiently', async () => {
      const message = 'A'.repeat(1000)
      const coverText = 'B'.repeat(1000)
      const encoded = await encode(message, coverText, { mode: MODES.TAIL })
      
      const start = Date.now()
      const decoded = await decode(encoded, { mode: MODES.TAIL })
      const end = Date.now()
      
      expect(decoded).toBe(message)
      expect(end - start).toBeLessThan(1000) // Should complete within 1 second
    })

    test('decodes large message within reasonable time', async () => {
      const message = 'A'.repeat(10000)
      const coverText = 'B'.repeat(10000)
      const encoded = await encode(message, coverText, { mode: MODES.TAIL })
      
      const start = Date.now()
      const decoded = await decode(encoded, { mode: MODES.TAIL })
      const end = Date.now()
      
      expect(decoded).toBe(message)
      expect(end - start).toBeLessThan(5000) // Should complete within 5 seconds
    })
  })

  describe('Compression Performance', () => {
    test('compresses repetitive data efficiently', () => {
      const data = new TextEncoder().encode('A'.repeat(1000))
      
      const start = Date.now()
      const compressed = compress(data)
      const end = Date.now()
      
      expect(compressed).toBeInstanceOf(Uint8Array)
      expect(end - start).toBeLessThan(100) // Should complete within 100ms
    })

    test('decompresses data quickly', () => {
      const data = new TextEncoder().encode('A'.repeat(1000))
      const compressed = compress(data)
      
      const start = Date.now()
      const decompressed = decompress(compressed)
      const end = Date.now()
      
      expect(decompressed).toBeInstanceOf(Uint8Array)
      expect(end - start).toBeLessThan(100) // Should complete within 100ms
    })
  })

  describe('Encryption Performance', () => {
    test('encrypts data within reasonable time', async () => {
      const data = new TextEncoder().encode('Secret message')
      const passphrase = 'password123'
      
      const start = Date.now()
      const encrypted = await encrypt(data, passphrase)
      const end = Date.now()
      
      expect(encrypted).toBeInstanceOf(Uint8Array)
      expect(end - start).toBeLessThan(1000) // Should complete within 1 second
    })

    test('decrypts data quickly', async () => {
      const data = new TextEncoder().encode('Secret message')
      const passphrase = 'password123'
      const encrypted = await encrypt(data, passphrase)
      
      const start = Date.now()
      const decrypted = await decrypt(encrypted, passphrase)
      const end = Date.now()
      
      expect(decrypted).toBeInstanceOf(Uint8Array)
      expect(end - start).toBeLessThan(1000) // Should complete within 1 second
    })
  })

  describe('Memory Usage', () => {
    test('handles large data without memory issues', async () => {
      const message = 'A'.repeat(50000) // 50KB message
      const coverText = 'B'.repeat(50000) // 50KB cover
      
      const start = Date.now()
      const result = await encode(message, coverText, { mode: MODES.TAIL })
      const end = Date.now()
      
      expect(result).toContain(coverText)
      expect(end - start).toBeLessThan(10000) // Should complete within 10 seconds
    })

    test('handles many small operations without memory leaks', async () => {
      const operations = []
      for (let i = 0; i < 1000; i++) {
        operations.push(
          encode(`Message ${i}`, `Cover ${i}`, { mode: MODES.TAIL })
        )
      }
      
      const start = Date.now()
      const results = await Promise.all(operations)
      const end = Date.now()
      
      expect(results).toHaveLength(1000)
      expect(end - start).toBeLessThan(30000) // Should complete within 30 seconds
    })
  })

  describe('Stress Tests', () => {
    test('handles rapid successive operations', async () => {
      const operations = []
      for (let i = 0; i < 100; i++) {
        operations.push(
          encode(`Message ${i}`, `Cover ${i}`, { mode: MODES.TAIL })
        )
      }
      
      const start = Date.now()
      const results = await Promise.all(operations)
      const end = Date.now()
      
      expect(results).toHaveLength(100)
      expect(end - start).toBeLessThan(5000) // Should complete within 5 seconds
    })

    test('handles mixed operation types', async () => {
      const operations = []
      for (let i = 0; i < 50; i++) {
        operations.push(
          encode(`Message ${i}`, `Cover ${i}`, { mode: MODES.TAIL })
        )
        // Use longer cover text for INTERLEAVED mode to avoid capacity issues
        operations.push(
          encode(`Hi`, `Cover text ${i} with more characters to provide capacity`, { mode: MODES.INTERLEAVED })
        )
      }
      
      const start = Date.now()
      const results = await Promise.all(operations)
      const end = Date.now()
      
      expect(results).toHaveLength(100)
      expect(end - start).toBeLessThan(10000) // Should complete within 10 seconds
    })

    test('handles operations with different data sizes', async () => {
      const operations = []
      for (let i = 1; i <= 100; i++) {
        const message = 'A'.repeat(i)
        const coverText = 'B'.repeat(i)
        operations.push(
          encode(message, coverText, { mode: MODES.TAIL })
        )
      }
      
      const start = Date.now()
      const results = await Promise.all(operations)
      const end = Date.now()
      
      expect(results).toHaveLength(100)
      expect(end - start).toBeLessThan(15000) // Should complete within 15 seconds
    })
  })
})
