// apps/backend/src/modules/uploads/utils/image-hash.util.ts
import sharp from 'sharp';
import * as crypto from 'crypto';

/**
 * Computes SHA-256 hash of a buffer.
 */
export function computeSha256(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

/**
 * Computes a 64-bit perceptual difference hash (dHash) using Sharp.
 * 1. Resize image to 9x8 grayscale.
 * 2. Compare adjacent horizontal pixel brightness (P[x] > P[x+1]).
 * 3. 8 rows * 8 comparisons = 64 bits.
 * 4. Encode as 16 hex characters.
 */
export async function computePerceptualHash(buffer: Buffer): Promise<string> {
  const { data } = await sharp(buffer)
    .resize(9, 8, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let hashBinary = '';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const leftPixel = data[row * 9 + col];
      const rightPixel = data[row * 9 + col + 1];
      hashBinary += (leftPixel ?? 0) > (rightPixel ?? 0) ? '1' : '0';
    }
  }

  // Convert 64-bit binary string to 16 hex characters
  let hexString = '';
  for (let i = 0; i < 64; i += 4) {
    const chunk = hashBinary.substring(i, i + 4);
    hexString += parseInt(chunk, 2).toString(16);
  }

  return hexString;
}

/**
 * Computes Hamming distance between two 16-hex-character perceptual hashes.
 * Returns the number of differing bits (0 to 64).
 */
export function computeHammingDistance(hashA: string, hashB: string): number {
  if (!hashA || !hashB || hashA.length !== 16 || hashB.length !== 16) {
    return 64; // Maximum distance if invalid
  }

  let distance = 0;
  for (let i = 0; i < 16; i++) {
    const valA = parseInt(hashA[i] || '0', 16);
    const valB = parseInt(hashB[i] || '0', 16);
    let xor = valA ^ valB;
    while (xor > 0) {
      distance += xor & 1;
      xor >>= 1;
    }
  }

  return distance;
}
