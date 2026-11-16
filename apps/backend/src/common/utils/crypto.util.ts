// apps/backend/src/common/utils/crypto.util.ts
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits recommended for GCM
const AUTH_TAG_LENGTH = 16;

/**
 * Encrypts sensitive text using AES-256-GCM with a 32-byte secret key.
 * Formats output as: hex(iv):hex(authTag):hex(encryptedContent)
 */
export function encryptAesGcm(plainText: string, hexKey: string): string {
  if (!hexKey || hexKey.length < 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes).');
  }

  const keyBuffer = Buffer.from(hexKey, 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

/**
 * Decrypts a formatted cipher string (iv:authTag:encrypted) using AES-256-GCM.
 */
export function decryptAesGcm(cipherPayload: string, hexKey: string): string {
  if (!hexKey || hexKey.length < 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes).');
  }

  const parts = cipherPayload.split(':');
  if (parts.length !== 3) {
    throw new Error('Malformed encrypted payload. Expected iv:authTag:ciphertext');
  }

  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encryptedText = parts[2];
  const keyBuffer = Buffer.from(hexKey, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

/**
 * Mask account number for safe display (e.g., '••••••••1234')
 */
export function maskAccountNumber(accountNumber: string): string {
  if (!accountNumber || accountNumber.length < 4) return '••••';
  const lastFour = accountNumber.slice(-4);
  const maskedPrefix = '•'.repeat(Math.max(0, accountNumber.length - 4));
  return `${maskedPrefix}${lastFour}`;
}
