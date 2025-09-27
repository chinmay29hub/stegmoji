import { encrypt, decrypt, isEncrypted } from '@/lib/encryption'

// Mock crypto.subtle for testing
const mockCrypto = {
  getRandomValues: jest.fn((arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256)
    }
    return arr
  }),
  subtle: {
    importKey: jest.fn().mockResolvedValue({}),
    deriveKey: jest.fn().mockResolvedValue({}),
    encrypt: jest.fn().mockResolvedValue(new ArrayBuffer(16)),
    decrypt: jest.fn().mockResolvedValue(new ArrayBuffer(16)),
  }
}

Object.defineProperty(global, 'crypto', {
  value: mockCrypto,
  writable: true,
})

describe('Encryption Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('encrypt', () => {
    test('should encrypt data with passphrase', async () => {
      const data = new TextEncoder().encode('Hello, World!')
      const passphrase = 'test123'
      
      const encrypted = await encrypt(data, passphrase)
      
      expect(encrypted).toBeInstanceOf(Uint8Array)
      expect(encrypted.length).toBeGreaterThan(data.length)
      expect(mockCrypto.subtle.importKey).toHaveBeenCalled()
      expect(mockCrypto.subtle.deriveKey).toHaveBeenCalled()
      expect(mockCrypto.subtle.encrypt).toHaveBeenCalled()
    })

    test('should throw error for empty passphrase', async () => {
      const data = new TextEncoder().encode('Hello, World!')
      
      await expect(encrypt(data, '')).rejects.toThrow('Passphrase is required')
    })

    test('should throw error for null passphrase', async () => {
      const data = new TextEncoder().encode('Hello, World!')
      
      await expect(encrypt(data, null)).rejects.toThrow('Passphrase is required')
    })

    test('should handle encryption errors', async () => {
      mockCrypto.subtle.encrypt.mockRejectedValueOnce(new Error('Encryption failed'))
      
      const data = new TextEncoder().encode('Hello, World!')
      const passphrase = 'test123'
      
      await expect(encrypt(data, passphrase)).rejects.toThrow('Encryption failed')
    })
  })

  describe('decrypt', () => {
    test('should decrypt data with correct passphrase', async () => {
      const originalData = new TextEncoder().encode('Hello, World!')
      const passphrase = 'test123'
      
      // Mock the encrypted data structure (salt + iv + ciphertext)
      const salt = new Uint8Array(16)
      const iv = new Uint8Array(12)
      const ciphertext = new Uint8Array(16)
      const encryptedData = new Uint8Array(salt.length + iv.length + ciphertext.length)
      encryptedData.set(salt, 0)
      encryptedData.set(iv, salt.length)
      encryptedData.set(ciphertext, salt.length + iv.length)
      
      const decrypted = await decrypt(encryptedData, passphrase)
      
      expect(decrypted).toBeInstanceOf(Uint8Array)
      expect(mockCrypto.subtle.importKey).toHaveBeenCalled()
      expect(mockCrypto.subtle.deriveKey).toHaveBeenCalled()
      expect(mockCrypto.subtle.decrypt).toHaveBeenCalled()
    })

    test('should throw error for empty passphrase', async () => {
      const encryptedData = new Uint8Array(32) // Minimum size for salt + iv
      
      await expect(decrypt(encryptedData, '')).rejects.toThrow('Passphrase is required')
    })

    test('should throw error for invalid data format', async () => {
      const encryptedData = new Uint8Array(10) // Too small
      const passphrase = 'test123'
      
      await expect(decrypt(encryptedData, passphrase)).rejects.toThrow('Invalid encrypted data format')
    })

    test('should handle decryption errors', async () => {
      mockCrypto.subtle.decrypt.mockRejectedValueOnce(new Error('Decryption failed'))
      
      const encryptedData = new Uint8Array(32) // Minimum size
      const passphrase = 'test123'
      
      await expect(decrypt(encryptedData, passphrase)).rejects.toThrow('Decryption failed')
    })
  })

  describe('isEncrypted', () => {
    test('should identify encrypted data', () => {
      const encryptedData = new Uint8Array(32) // Salt (16) + IV (12) + some data (4)
      expect(isEncrypted(encryptedData)).toBe(true)
    })

    test('should identify non-encrypted data', () => {
      const data = new Uint8Array(10) // Too small for encrypted format
      expect(isEncrypted(data)).toBe(false)
    })

    test('should handle empty data', () => {
      const data = new Uint8Array(0)
      expect(isEncrypted(data)).toBe(false)
    })
  })
})
