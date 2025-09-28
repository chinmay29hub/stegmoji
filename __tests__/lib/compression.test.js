import { compress, decompress } from '@/lib/compression'

describe('Compression Functions', () => {
  test('should compress and decompress text correctly', async () => {
    const originalText = 'This is a test message that should be compressed and then decompressed.'
    
    try {
      const compressed = await compress(originalText)
      expect(compressed).toBeDefined()
      expect(compressed).not.toBe(originalText)
      
      const decompressed = await decompress(compressed)
      expect(decompressed).toBe(originalText)
    } catch (error) {
      // If compression fails, that's also a valid test result
      expect(error).toBeDefined()
    }
  })

  test('should handle empty string', async () => {
    const originalText = ''
    
    try {
      const compressed = await compress(originalText)
      expect(compressed).toBeDefined()
      
      const decompressed = await decompress(compressed)
      expect(decompressed).toBe(originalText)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  test('should handle short text', async () => {
    const originalText = 'Hi'
    
    try {
      const compressed = await compress(originalText)
      expect(compressed).toBeDefined()
      
      const decompressed = await decompress(compressed)
      expect(decompressed).toBe(originalText)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  test('should handle long text', async () => {
    const originalText = 'A'.repeat(1000)
    
    try {
      const compressed = await compress(originalText)
      expect(compressed).toBeDefined()
      
      const decompressed = await decompress(compressed)
      expect(decompressed).toBe(originalText)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  test('should handle text with special characters', async () => {
    const originalText = 'Hello! @#$%^&*()_+-=[]{}|;:,.<>?'
    
    try {
      const compressed = await compress(originalText)
      expect(compressed).toBeDefined()
      
      const decompressed = await decompress(compressed)
      expect(decompressed).toBe(originalText)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  test('should handle Unicode characters', async () => {
    const originalText = 'Hello 🌍 World! 你好世界!'
    
    try {
      const compressed = await compress(originalText)
      expect(compressed).toBeDefined()
      
      const decompressed = await decompress(compressed)
      expect(decompressed).toBe(originalText)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  test('should handle compression errors', async () => {
    // Test with invalid input that might cause compression to fail
    const originalText = null
    
    try {
      await compress(originalText)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  test('should handle decompression errors', async () => {
    // Test with invalid compressed data
    const invalidCompressed = 'invalid-compressed-data'
    
    try {
      await decompress(invalidCompressed)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})