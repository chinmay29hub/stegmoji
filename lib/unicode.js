import GraphemeSplitter from 'grapheme-splitter'

const graphemeSplitter = new GraphemeSplitter()

/**
 * Unicode invisible character definitions and utilities
 */

// Variation Selectors (VS15 and VS16 for steganography)
export const VS15 = '\uFE0E' // U+FE0E - Variation Selector-15 (bit 0)
export const VS16 = '\uFE0F' // U+FE0F - Variation Selector-16 (bit 1)

// Invisible character ranges and individual characters
export const INVISIBLE_RANGES = [
  { start: 0xFE00, end: 0xFE0F, name: 'Variation Selectors' },
  { start: 0xE0100, end: 0xE01EF, name: 'Variation Selectors Supplement' },
]

export const INVISIBLE_CHARS = [
  { code: 0x200B, name: 'Zero Width Space' },
  { code: 0x200C, name: 'Zero Width Non-Joiner' },
  { code: 0x200D, name: 'Zero Width Joiner' },
  { code: 0xFEFF, name: 'Zero Width No-Break Space (BOM)' },
  { code: 0x2060, name: 'Word Joiner' },
  { code: 0x200E, name: 'Left-to-Right Mark' },
  { code: 0x200F, name: 'Right-to-Left Mark' },
]

/**
 * Get human-readable name for a Unicode codepoint
 */
export function getUnicodeName(codepoint) {
  // Check individual invisible characters
  for (const char of INVISIBLE_CHARS) {
    if (char.code === codepoint) {
      return char.name
    }
  }
  
  // Check ranges
  for (const range of INVISIBLE_RANGES) {
    if (codepoint >= range.start && codepoint <= range.end) {
      return `${range.name} (U+${codepoint.toString(16).toUpperCase().padStart(4, '0')})`
    }
  }
  
  return `U+${codepoint.toString(16).toUpperCase().padStart(4, '0')}`
}

/**
 * Check if a codepoint is invisible
 */
export function isInvisibleCodepoint(codepoint) {
  // Check individual invisible characters
  for (const char of INVISIBLE_CHARS) {
    if (char.code === codepoint) return true
  }
  
  // Check ranges
  for (const range of INVISIBLE_RANGES) {
    if (codepoint >= range.start && codepoint <= range.end) {
      return true
    }
  }
  
  return false
}

/**
 * Split text into grapheme clusters
 */
export function getGraphemeClusters(text) {
  return graphemeSplitter.splitGraphemes(text)
}

/**
 * Get codepoints from text
 */
export function getCodepoints(text) {
  return Array.from(text).map(char => char.codePointAt(0))
}

/**
 * Analyze invisible characters in text
 */
export function analyzeInvisibleChars(text) {
  const codepoints = getCodepoints(text)
  const invisibleChars = []
  const invisibleCount = codepoints.filter(cp => isInvisibleCodepoint(cp)).length
  
  // Count each type of invisible character
  const counts = new Map()
  
  for (const cp of codepoints) {
    if (isInvisibleCodepoint(cp)) {
      const name = getUnicodeName(cp)
      counts.set(name, (counts.get(name) || 0) + 1)
    }
  }
  
  // Convert to array and sort by count
  for (const [name, count] of counts) {
    invisibleChars.push({ name, count })
  }
  
  invisibleChars.sort((a, b) => b.count - a.count)
  
  return {
    invisibleChars,
    invisibleCount,
    totalChars: text.length,
    invisibleRatio: text.length > 0 ? invisibleCount / text.length : 0
  }
}

/**
 * Get codepoint breakdown string
 */
export function getCodepointBreakdown(text) {
  const codepoints = getCodepoints(text)
  return codepoints.map(cp => {
    const hex = cp.toString(16).toUpperCase().padStart(4, '0')
    const isInvisible = isInvisibleCodepoint(cp)
    return {
      codepoint: cp,
      hex: `U+${hex}`,
      isInvisible,
      name: getUnicodeName(cp)
    }
  })
}

/**
 * Check normalization effects
 */
export function checkNormalization(text) {
  const nfc = text.normalize('NFC')
  const nfkc = text.normalize('NFKC')
  
  return {
    original: text,
    nfc,
    nfkc,
    nfcChanged: nfc !== text,
    nfkcChanged: nfkc !== text,
    nfcLength: nfc.length,
    nfkcLength: nfkc.length,
    originalLength: text.length
  }
}
