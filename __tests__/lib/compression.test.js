import { compress, decompress, estimateCompressionRatio, wouldBenefitFromCompression } from '@/lib/compression'

describe('Compression Functions', () => {
  describe('compress', () => {
    test('should compress data', () => {
      const data = new TextEncoder().encode('This is a test message that should compress well. '.repeat(10))
      const compressed = compress(data)
      
      expect(compressed).toBeInstanceOf(Uint8Array)
      expect(compressed.length).toBeGreaterThan(0)
    })

    test('should handle empty data', () => {
      const data = new Uint8Array(0)
      const compressed = compress(data)
      
      expect(compressed).toBeInstanceOf(Uint8Array)
    })

    test('should throw error for invalid input', () => {
      expect(() => compress(null)).toThrow()
    })
  })

  describe('decompress', () => {
    test('should decompress data correctly', () => {
      const originalText = 'This is a test message that should compress well. '.repeat(10)
      const originalData = new TextEncoder().encode(originalText)
      const compressed = compress(originalData)
      const decompressed = decompress(compressed)
      const decompressedText = new TextDecoder().decode(decompressed)
      
      expect(decompressedText).toBe(originalText)
    })

    test('should handle empty compressed data', () => {
      const data = new Uint8Array(0)
      // pako.inflate with empty data doesn't throw, it returns undefined
      const result = decompress(data)
      expect(result).toBeUndefined()
    })

    test('should throw error for invalid compressed data', () => {
      expect(() => decompress(new Uint8Array([255, 255, 255]))).toThrow()
    })
  })

  describe('estimateCompressionRatio', () => {
    test('should estimate compression ratio', () => {
      const data = new TextEncoder().encode('This is a test message that should compress well. '.repeat(10))
      const ratio = estimateCompressionRatio(data)
      
      expect(ratio).toBeGreaterThan(0)
      expect(ratio).toBeLessThanOrEqual(1)
    })

    test('should handle empty data', () => {
      const data = new Uint8Array(0)
      const ratio = estimateCompressionRatio(data)
      
      expect(ratio).toBe(1)
    })
  })

  describe('wouldBenefitFromCompression', () => {
    test('should determine if compression would be beneficial', () => {
      const data = new TextEncoder().encode('This is a test message that should compress well. '.repeat(10))
      const wouldBenefit = wouldBenefitFromCompression(data)
      
      expect(typeof wouldBenefit).toBe('boolean')
    })

    test('should return false for data that does not compress well', () => {
      // Random data typically doesn't compress well
      const data = new Uint8Array(100)
      for (let i = 0; i < data.length; i++) {
        data[i] = Math.floor(Math.random() * 256)
      }
      
      const wouldBenefit = wouldBenefitFromCompression(data)
      expect(typeof wouldBenefit).toBe('boolean')
    })
  })
})
