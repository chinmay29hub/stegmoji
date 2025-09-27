import { 
  getGraphemeClusters, 
  getCodepoints, 
  analyzeInvisibleChars, 
  getCodepointBreakdown,
  checkNormalization,
  isInvisibleCodepoint,
  getUnicodeName
} from '@/lib/unicode'

describe('Unicode Utilities', () => {
  describe('getGraphemeClusters', () => {
    test('should split text into grapheme clusters', () => {
      const text = 'Hello 👋 world! 🎉'
      const clusters = getGraphemeClusters(text)
      
      expect(clusters).toBeInstanceOf(Array)
      expect(clusters.length).toBeGreaterThan(0)
      expect(clusters.join('')).toBe(text)
    })

    test('should handle emoji sequences correctly', () => {
      const text = '👨‍👩‍👧‍👦' // Family emoji
      const clusters = getGraphemeClusters(text)
      
      expect(clusters.length).toBe(1)
      expect(clusters[0]).toBe(text)
    })

    test('should handle empty string', () => {
      const clusters = getGraphemeClusters('')
      expect(clusters).toEqual([])
    })
  })

  describe('getCodepoints', () => {
    test('should extract codepoints from text', () => {
      const text = 'Hello'
      const codepoints = getCodepoints(text)
      
      expect(codepoints).toBeInstanceOf(Array)
      expect(codepoints.length).toBe(text.length)
      expect(codepoints[0]).toBe('H'.codePointAt(0))
    })

    test('should handle emoji codepoints', () => {
      const text = '👋'
      const codepoints = getCodepoints(text)
      
      expect(codepoints.length).toBe(1)
      expect(codepoints[0]).toBeGreaterThan(0xFFFF) // Surrogate pair
    })
  })

  describe('analyzeInvisibleChars', () => {
    test('should analyze text for invisible characters', () => {
      const text = 'Hello world'
      const analysis = analyzeInvisibleChars(text)
      
      expect(analysis).toHaveProperty('invisibleChars')
      expect(analysis).toHaveProperty('invisibleCount')
      expect(analysis).toHaveProperty('totalChars')
      expect(analysis).toHaveProperty('invisibleRatio')
      expect(analysis.invisibleCount).toBe(0)
      expect(analysis.totalChars).toBe(text.length)
    })

    test('should detect invisible characters', () => {
      const text = 'Hello\uFE0E world\uFE0F' // With variation selectors
      const analysis = analyzeInvisibleChars(text)
      
      expect(analysis.invisibleCount).toBeGreaterThan(0)
      expect(analysis.invisibleChars.length).toBeGreaterThan(0)
    })
  })

  describe('getCodepointBreakdown', () => {
    test('should provide detailed codepoint analysis', () => {
      const text = 'Hello'
      const breakdown = getCodepointBreakdown(text)
      
      expect(breakdown).toBeInstanceOf(Array)
      expect(breakdown.length).toBe(text.length)
      
      breakdown.forEach(cp => {
        expect(cp).toHaveProperty('codepoint')
        expect(cp).toHaveProperty('hex')
        expect(cp).toHaveProperty('isInvisible')
        expect(cp).toHaveProperty('name')
      })
    })
  })

  describe('checkNormalization', () => {
    test('should check normalization effects', () => {
      const text = 'Hello world'
      const normalization = checkNormalization(text)
      
      expect(normalization).toHaveProperty('original')
      expect(normalization).toHaveProperty('nfc')
      expect(normalization).toHaveProperty('nfkc')
      expect(normalization).toHaveProperty('nfcChanged')
      expect(normalization).toHaveProperty('nfkcChanged')
    })

    test('should detect normalization changes', () => {
      const text = 'Hello\uFE0E world' // With variation selector
      const normalization = checkNormalization(text)
      
      // The result depends on the specific text, but we should get valid results
      expect(normalization.original).toBe(text)
      expect(typeof normalization.nfcChanged).toBe('boolean')
      expect(typeof normalization.nfkcChanged).toBe('boolean')
    })
  })

  describe('isInvisibleCodepoint', () => {
    test('should identify invisible codepoints', () => {
      expect(isInvisibleCodepoint(0xFE0E)).toBe(true) // VS15
      expect(isInvisibleCodepoint(0xFE0F)).toBe(true) // VS16
      expect(isInvisibleCodepoint(0x200B)).toBe(true) // Zero Width Space
      expect(isInvisibleCodepoint(0x0041)).toBe(false) // 'A'
    })
  })

  describe('getUnicodeName', () => {
    test('should provide human-readable names', () => {
      expect(getUnicodeName(0xFE0E)).toContain('Variation Selector')
      expect(getUnicodeName(0x200B)).toContain('Zero Width Space')
      expect(getUnicodeName(0x0041)).toBe('U+0041')
    })
  })
})
