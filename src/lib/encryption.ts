import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const AUTH_TAG_LENGTH = 16

if (!ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY mora biti postavljen u .env datoteci')
}

// Ensure key is 32 bytes for AES-256
const KEY = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest()

/**
 * Enkriptira tekst koristeći AES-256-GCM
 * @param text Tekst za enkriptiranje
 * @returns Enkriptirani string u formatu: iv:authTag:encryptedData (hex)
 */
export function encrypt(text: string): string {
  try {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const authTag = cipher.getAuthTag()

    // Combine iv, authTag, and encrypted data
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
  } catch (error) {
    console.error('Greška pri enkriptiranju:', error)
    throw new Error('Neuspješno enkriptiranje podataka')
  }
}

/**
 * Dekriptira enkriptirani tekst
 * @param encryptedData Enkriptirani string u formatu: iv:authTag:encryptedData
 * @returns Dekriptirani tekst
 */
export function decrypt(encryptedData: string): string {
  try {
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':')

    if (!ivHex || !authTagHex || !encrypted) {
      throw new Error('Neispravan format enkriptiranih podataka')
    }

    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    console.error('Greška pri dekriptiranju:', error)
    throw new Error('Neuspješno dekriptiranje podataka')
  }
}
