/**
 * Encryption utilities using Web Crypto API
 * Uses PBKDF2 for key derivation and AES-GCM for encryption
 */

const PBKDF2_ITERATIONS = 100000
const SALT_LENGTH = 16
const IV_LENGTH = 12
const KEY_LENGTH = 256

/**
 * Derive encryption key from passphrase using PBKDF2
 * @param {string} passphrase - User passphrase
 * @param {Uint8Array} salt - Random salt
 * @returns {Promise<CryptoKey>} Derived encryption key
 */
async function deriveKey(passphrase, salt) {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  )
  
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypt data using AES-GCM
 * @param {Uint8Array} data - Data to encrypt
 * @param {string} passphrase - Encryption passphrase
 * @returns {Promise<Uint8Array>} Encrypted data with salt and IV prepended
 */
export async function encrypt(data, passphrase) {
  if (!passphrase || passphrase.length === 0) {
    throw new Error('Passphrase is required for encryption')
  }
  
  try {
    // Generate random salt and IV
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))
    
    // Derive key from passphrase
    const key = await deriveKey(passphrase, salt)
    
    // Encrypt data
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    )
    
    // Combine salt + iv + encrypted data
    const result = new Uint8Array(SALT_LENGTH + IV_LENGTH + encrypted.byteLength)
    result.set(salt, 0)
    result.set(iv, SALT_LENGTH)
    result.set(new Uint8Array(encrypted), SALT_LENGTH + IV_LENGTH)
    
    return result
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`)
  }
}

/**
 * Decrypt data using AES-GCM
 * @param {Uint8Array} encryptedData - Encrypted data with salt and IV
 * @param {string} passphrase - Decryption passphrase
 * @returns {Promise<Uint8Array>} Decrypted data
 */
export async function decrypt(encryptedData, passphrase) {
  if (!passphrase || passphrase.length === 0) {
    throw new Error('Passphrase is required for decryption')
  }
  
  if (encryptedData.length < SALT_LENGTH + IV_LENGTH) {
    throw new Error('Invalid encrypted data format')
  }
  
  try {
    // Extract salt, IV, and ciphertext
    const salt = encryptedData.slice(0, SALT_LENGTH)
    const iv = encryptedData.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH)
    const ciphertext = encryptedData.slice(SALT_LENGTH + IV_LENGTH)
    
    // Derive key from passphrase
    const key = await deriveKey(passphrase, salt)
    
    // Decrypt data
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      ciphertext
    )
    
    return new Uint8Array(decrypted)
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`)
  }
}

/**
 * Check if data appears to be encrypted (has salt + IV header)
 * @param {Uint8Array} data - Data to check
 * @returns {boolean} True if data appears encrypted
 */
export function isEncrypted(data) {
  return data.length >= SALT_LENGTH + IV_LENGTH
}
