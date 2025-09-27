import { VS15, VS16, getGraphemeClusters, getCodepoints } from './unicode.js'
import { compress, decompress } from './compression.js'
import { encrypt, decrypt } from './encryption.js'

/**
 * Steganography modes
 */
export const MODES = {
  TAIL: 'tail',
  INTERLEAVED: 'interleaved', 
  ZWJ_AWARE: 'zwj-aware'
}

/**
 * Convert bytes to bit string
 * @param {Uint8Array} bytes - Bytes to convert
 * @returns {string} Bit string (0s and 1s)
 */
function bytesToBits(bytes) {
  return Array.from(bytes)
    .map(byte => byte.toString(2).padStart(8, '0'))
    .join('')
}

/**
 * Convert bit string to bytes
 * @param {string} bits - Bit string (0s and 1s)
 * @returns {Uint8Array} Bytes
 */
function bitsToBytes(bits) {
  const bytes = []
  for (let i = 0; i < bits.length; i += 8) {
    const byteBits = bits.slice(i, i + 8).padEnd(8, '0')
    bytes.push(parseInt(byteBits, 2))
  }
  return new Uint8Array(bytes)
}

/**
 * Convert bits to variation selectors
 * @param {string} bits - Bit string
 * @returns {string} String of variation selectors
 */
function bitsToVariationSelectors(bits) {
  return bits
    .split('')
    .map(bit => bit === '0' ? VS15 : VS16)
    .join('')
}

/**
 * Convert variation selectors to bits
 * @param {string} text - Text containing variation selectors
 * @returns {string} Bit string
 */
function variationSelectorsToBits(text) {
  return text
    .split('')
    .map(char => {
      if (char === VS15) return '0'
      if (char === VS16) return '1'
      return null
    })
    .filter(bit => bit !== null)
    .join('')
}

/**
 * Create payload header
 * @param {boolean} compressed - Whether data is compressed
 * @param {boolean} encrypted - Whether data is encrypted
 * @returns {Uint8Array} Header bytes
 */
function createHeader(compressed, encrypted) {
  let flags = 0
  if (compressed) flags |= 0x01
  if (encrypted) flags |= 0x02
  
  return new Uint8Array([flags])
}

/**
 * Parse payload header
 * @param {Uint8Array} data - Data starting with header
 * @returns {Object} Parsed header info
 */
function parseHeader(data) {
  if (data.length < 1) {
    throw new Error('Invalid payload: missing header')
  }
  
  const flags = data[0]
  const compressed = (flags & 0x01) !== 0
  const encrypted = (flags & 0x02) !== 0
  
  return {
    compressed,
    encrypted,
    headerLength: 1
  }
}

/**
 * Calculate embedding capacity for different modes
 * @param {string} coverText - Cover text
 * @param {string} mode - Embedding mode
 * @returns {number} Maximum number of bits that can be embedded
 */
export function calculateCapacity(coverText, mode) {
  switch (mode) {
    case MODES.TAIL:
      return Infinity // Effectively unlimited, even with empty cover text
    case MODES.INTERLEAVED:
      return getCodepoints(coverText).length
    case MODES.ZWJ_AWARE:
      return getGraphemeClusters(coverText).length
    default:
      throw new Error(`Unknown mode: ${mode}`)
  }
}

/**
 * Encode message into cover text
 * @param {string} message - Message to hide
 * @param {string} coverText - Cover text
 * @param {Object} options - Encoding options
 * @returns {Promise<string>} Encoded text
 */
export async function encode(message, coverText, options = {}) {
  const {
    mode = MODES.TAIL,
    compress: shouldCompress = false,
    encrypt: shouldEncrypt = false,
    passphrase = ''
  } = options
  
  // Convert message to bytes
  const messageBytes = new TextEncoder().encode(message)
  
  // Apply compression if requested
  let processedBytes = messageBytes
  if (shouldCompress) {
    processedBytes = compress(messageBytes)
  }
  
  // Apply encryption if requested
  if (shouldEncrypt) {
    if (!passphrase) {
      throw new Error('Passphrase is required for encryption')
    }
    processedBytes = await encrypt(processedBytes, passphrase)
  }
  
  // Create header
  const header = createHeader(shouldCompress, shouldEncrypt)
  
  // Combine header and payload
  const payload = new Uint8Array(header.length + processedBytes.length)
  payload.set(header, 0)
  payload.set(processedBytes, header.length)
  
  // Convert to bits
  const bits = bytesToBits(payload)
  
  // Check capacity
  const capacity = calculateCapacity(coverText, mode)
  if (capacity !== Infinity && bits.length > capacity * 8) {
    throw new Error(`Message too long for ${mode} mode. Maximum ${capacity} characters (${capacity * 8} bits), need ${bits.length} bits.`)
  }
  
  // Convert bits to variation selectors
  const variationSelectors = bitsToVariationSelectors(bits)
  
  // Embed based on mode
  switch (mode) {
    case MODES.TAIL:
      return coverText + variationSelectors
      
    case MODES.INTERLEAVED: {
      const codepoints = getCodepoints(coverText)
      const result = []
      let vsIndex = 0
      
      for (let i = 0; i < codepoints.length; i++) {
        result.push(String.fromCodePoint(codepoints[i]))
        if (vsIndex < variationSelectors.length) {
          result.push(variationSelectors[vsIndex])
          vsIndex++
        }
      }
      
      return result.join('')
    }
    
    case MODES.ZWJ_AWARE: {
      const clusters = getGraphemeClusters(coverText)
      const result = []
      let vsIndex = 0
      
      for (let i = 0; i < clusters.length; i++) {
        result.push(clusters[i])
        if (vsIndex < variationSelectors.length) {
          result.push(variationSelectors[vsIndex])
          vsIndex++
        }
      }
      
      return result.join('')
    }
    
    default:
      throw new Error(`Unknown mode: ${mode}`)
  }
}

/**
 * Decode message from encoded text
 * @param {string} encodedText - Text containing hidden message
 * @param {Object} options - Decoding options
 * @returns {Promise<string>} Decoded message
 */
export async function decode(encodedText, options = {}) {
  const {
    mode = 'auto',
    passphrase = ''
  } = options
  
  // Auto-detect mode if not specified
  let detectedMode = mode
  if (mode === 'auto') {
    // Check if variation selectors appear throughout the text (interleaved/ZWJ-aware)
    // or only at the end (tail)
    const vsPositions = []
    for (let i = 0; i < encodedText.length; i++) {
      const char = encodedText[i]
      if (char === VS15 || char === VS16) {
        vsPositions.push(i)
      }
    }
    
    if (vsPositions.length === 0) {
      throw new Error('No hidden data found')
    }
    
    // If all VS are at the end, it's tail mode
    const lastCharIndex = encodedText.length - 1
    const allAtEnd = vsPositions.every(pos => pos > lastCharIndex - vsPositions.length)
    
    detectedMode = allAtEnd ? MODES.TAIL : MODES.INTERLEAVED
  }
  
  // Extract variation selectors based on mode
  let variationSelectors = ''
  
  switch (detectedMode) {
    case MODES.TAIL: {
      // Find trailing variation selectors
      let endIndex = encodedText.length
      while (endIndex > 0) {
        const char = encodedText[endIndex - 1]
        if (char === VS15 || char === VS16) {
          endIndex--
        } else {
          break
        }
      }
      variationSelectors = encodedText.slice(endIndex)
      break
    }
    
    case MODES.INTERLEAVED:
    case MODES.ZWJ_AWARE: {
      // Extract all variation selectors in order
      variationSelectors = encodedText
        .split('')
        .filter(char => char === VS15 || char === VS16)
        .join('')
      break
    }
    
    default:
      throw new Error(`Unknown mode: ${detectedMode}`)
  }
  
  if (variationSelectors.length === 0) {
    throw new Error('No hidden data found')
  }
  
  // Convert variation selectors to bits
  const bits = variationSelectorsToBits(variationSelectors)
  if (bits.length === 0) {
    throw new Error('No valid hidden data found')
  }
  
  // Convert bits to bytes
  const payload = bitsToBytes(bits)
  
  // Parse header
  const { compressed, encrypted, headerLength } = parseHeader(payload)
  
  // Extract payload data
  const payloadData = payload.slice(headerLength)
  
  // Decrypt if needed
  let decryptedData = payloadData
  if (encrypted) {
    if (!passphrase) {
      throw new Error('This message is encrypted. Please provide a passphrase.')
    }
    decryptedData = await decrypt(payloadData, passphrase)
  }
  
  // Decompress if needed
  let decompressedData = decryptedData
  if (compressed) {
    decompressedData = decompress(decryptedData)
  }
  
  // Convert back to string
  return new TextDecoder().decode(decompressedData)
}

/**
 * Scan text for hidden data
 * @param {string} text - Text to scan
 * @returns {Object} Scan results
 */
export function scanText(text) {
  const vsCount = (text.match(new RegExp(`[${VS15}${VS16}]`, 'g')) || []).length
  const hasHiddenData = vsCount > 0
  
  return {
    hasHiddenData,
    vsCount,
    estimatedBits: vsCount,
    estimatedBytes: Math.ceil(vsCount / 8)
  }
}
