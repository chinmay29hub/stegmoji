import { encode, decode, MODES } from '@/lib/steganography'

// Mock the dependencies for integration tests
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
    if (passphrase === 'wrong' || passphrase === 'wrong-passphrase') {
      throw new Error('Decryption failed: Invalid passphrase')
    }
    const prefix = new TextEncoder().encode('ENCRYPTED:')
    return data.slice(prefix.length)
  }),
  isEncrypted: jest.fn((data) => data.length > 16), // Mock encrypted check
}))

// Integration tests that test the full workflow
describe('Steganography Integration Tests', () => {
  const testCases = [
    {
      name: 'Simple text message',
      message: 'Hello, World!',
      coverText: 'This is a test message.',
    },
    {
      name: 'Message with emoji',
      message: 'Hello 👋 World! 🎉',
      coverText: 'This is a test with emoji 🚀',
    },
    {
      name: 'Long message',
      message: 'This is a much longer message that contains more text and should test the system thoroughly.',
      coverText: 'Cover text for long message testing.',
    },
    {
      name: 'Message with special characters',
      message: 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
      coverText: 'Cover with special chars: áéíóú ñü',
    },
    {
      name: 'Unicode message',
      message: 'Unicode: 你好世界 🌍 مرحبا بالعالم',
      coverText: 'Cover: Привет мир',
    },
  ]

  const shortTestCases = [
    {
      name: 'Short message for limited modes',
      message: 'Hi!',
      coverText: 'This is a much longer cover text that can hold more data for testing purposes.',
    },
  ]

  describe('Basic Encoding/Decoding Workflow', () => {
    testCases.forEach(({ name, message, coverText }) => {
      test(`should encode and decode ${name} in TAIL mode`, async () => {
        const encoded = await encode(message, coverText, { mode: MODES.TAIL })
        const decoded = await decode(encoded, { mode: MODES.TAIL })
        expect(decoded).toBe(message)
      })
    })

    shortTestCases.forEach(({ name, message, coverText }) => {
      test(`should encode and decode ${name} in INTERLEAVED mode`, async () => {
        const encoded = await encode(message, coverText, { mode: MODES.INTERLEAVED })
        const decoded = await decode(encoded, { mode: MODES.INTERLEAVED })
        expect(decoded).toBe(message)
      })

      test(`should encode and decode ${name} in ZWJ_AWARE mode`, async () => {
        const encoded = await encode(message, coverText, { mode: MODES.ZWJ_AWARE })
        const decoded = await decode(encoded, { mode: MODES.ZWJ_AWARE })
        expect(decoded).toBe(message)
      })
    })
  })

  describe('Compression Workflow', () => {
    testCases.forEach(({ name, message, coverText }) => {
      test(`should encode and decode ${name} with compression`, async () => {
        const encoded = await encode(message, coverText, { 
          mode: MODES.TAIL,
          compress: true 
        })
        const decoded = await decode(encoded, { mode: MODES.TAIL })
        
        expect(decoded).toBe(message)
      })
    })
  })

  describe('Encryption Workflow', () => {
    const passphrase = 'test-passphrase-123'

    testCases.forEach(({ name, message, coverText }) => {
      test(`should encode and decode ${name} with encryption`, async () => {
        const encoded = await encode(message, coverText, { 
          mode: MODES.TAIL,
          encrypt: true,
          passphrase 
        })
        const decoded = await decode(encoded, { 
          mode: MODES.TAIL,
          passphrase 
        })
        
        expect(decoded).toBe(message)
      })
    })

    test('should fail with wrong passphrase', async () => {
      const message = 'Secret message'
      const coverText = 'Cover text'
      
      const encoded = await encode(message, coverText, { 
        mode: MODES.TAIL,
        encrypt: true,
        passphrase: 'correct-passphrase'
      })
      
      await expect(decode(encoded, { 
        mode: MODES.TAIL,
        passphrase: 'wrong-passphrase'
      })).rejects.toThrow()
    })
  })

  describe('Combined Features Workflow', () => {
    test('should work with both compression and encryption', async () => {
      const message = 'This is a long message that should benefit from compression and needs encryption.'
      const coverText = 'Cover text for combined features test.'
      const passphrase = 'combined-test-passphrase'
      
      const encoded = await encode(message, coverText, { 
        mode: MODES.TAIL,
        compress: true,
        encrypt: true,
        passphrase 
      })
      
      const decoded = await decode(encoded, { 
        mode: MODES.TAIL,
        passphrase 
      })
      
      expect(decoded).toBe(message)
    })
  })

  describe('Auto-detection Workflow', () => {
    test('should auto-detect TAIL mode', async () => {
      const message = 'Auto-detect test'
      const coverText = 'Cover for auto-detect'
      
      const encoded = await encode(message, coverText, { mode: MODES.TAIL })
      const decoded = await decode(encoded, { mode: 'auto' })
      
      expect(decoded).toBe(message)
    })

    test('should auto-detect INTERLEAVED mode', async () => {
      const message = 'Hi!'
      const coverText = 'This is a much longer cover text for auto-detect testing.'
      
      const encoded = await encode(message, coverText, { mode: MODES.INTERLEAVED })
      const decoded = await decode(encoded, { mode: 'auto' })
      
      expect(decoded).toBe(message)
    })
  })

  describe('Error Handling Workflow', () => {
    test('should handle capacity exceeded', async () => {
      const longMessage = 'A'.repeat(1000)
      const shortCover = 'Hi'
      
      await expect(
        encode(longMessage, shortCover, { mode: MODES.INTERLEAVED })
      ).rejects.toThrow('Message too long')
    })

    test('should handle empty message', async () => {
      const coverText = 'Cover text'
      
      await expect(
        encode('', coverText, { mode: MODES.TAIL })
      ).resolves.toBeDefined()
    })

    test('should handle empty cover text', async () => {
      const message = 'Test message'
      
      await expect(
        encode(message, '', { mode: MODES.TAIL })
      ).resolves.toBeDefined()
    })
  })

  describe('Real-world Scenarios', () => {
    test('should handle social media post scenario', async () => {
      const message = 'Meet at 3'
      const coverText = 'Just had a great lunch! The weather is beautiful today. 🌞 This is a longer post to provide more capacity for the hidden message. Hope you are doing well!'
      
      const encoded = await encode(message, coverText, { 
        mode: MODES.ZWJ_AWARE,
        compress: true 
      })
      const decoded = await decode(encoded, { mode: 'auto' })
      
      expect(decoded).toBe(message)
    })

    test('should handle email scenario', async () => {
      const message = 'The password is: secret123'
      const coverText = 'Hi John, thanks for the meeting yesterday. Let me know if you need anything else.'
      const passphrase = 'email-secret-key'
      
      const encoded = await encode(message, coverText, { 
        mode: MODES.TAIL,
        encrypt: true,
        passphrase 
      })
      const decoded = await decode(encoded, { 
        mode: MODES.TAIL,
        passphrase 
      })
      
      expect(decoded).toBe(message)
    })
  })
})
