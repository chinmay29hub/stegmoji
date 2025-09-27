import pako from 'pako'

/**
 * Compression utilities using DEFLATE algorithm
 */

/**
 * Compress data using DEFLATE
 * @param {Uint8Array} data - Data to compress
 * @returns {Uint8Array} Compressed data
 */
export function compress(data) {
  try {
    return pako.deflate(data, { level: 9 })
  } catch (error) {
    throw new Error(`Compression failed: ${error.message}`)
  }
}

/**
 * Decompress data using DEFLATE
 * @param {Uint8Array} data - Compressed data
 * @returns {Uint8Array} Decompressed data
 */
export function decompress(data) {
  try {
    return pako.inflate(data)
  } catch (error) {
    throw new Error(`Decompression failed: ${error.message}`)
  }
}

/**
 * Estimate compression ratio for given data
 * @param {Uint8Array} data - Data to estimate
 * @returns {number} Estimated compression ratio (0-1, where 1 = no compression)
 */
export function estimateCompressionRatio(data) {
  if (data.length === 0) return 1
  
  try {
    const compressed = compress(data)
    return compressed.length / data.length
  } catch (error) {
    // If compression fails, assume no compression benefit
    return 1
  }
}

/**
 * Check if data would benefit from compression
 * @param {Uint8Array} data - Data to check
 * @returns {boolean} True if compression would be beneficial
 */
export function wouldBenefitFromCompression(data) {
  return estimateCompressionRatio(data) < 0.9 // 10% or more savings
}
