// apps/backend/src/modules/transfers/utils/levenshtein.util.ts

/**
 * Calculates the Levenshtein distance between two strings.
 */
export function levenshteinDistance(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix: number[][] = [];
  for (let i = 0; i <= bn; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= an; j++) {
    matrix[0]![j] = j;
  }

  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i]![j] = matrix[i - 1]![j - 1]!;
      } else {
        matrix[i]![j] = Math.min(
          matrix[i - 1]![j - 1]! + 1, // substitution
          Math.min(
            matrix[i]![j - 1]! + 1, // insertion
            matrix[i - 1]![j]! + 1, // deletion
          ),
        );
      }
    }
  }

  return matrix[bn]![an]!;
}

/**
 * Computes fuzzy text similarity between 0.0 and 1.0.
 * Normalizes case and punctuation.
 */
export function computeFuzzyMatchScore(text: string, query: string): number {
  if (!text || !query) return 0.0;
  const cleanText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const cleanQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');

  if (cleanText.includes(cleanQuery)) {
    return 1.0;
  }

  const queryWords = cleanQuery.split(/\s+/).filter(Boolean);
  let matchedWords = 0;
  for (const word of queryWords) {
    if (word.length >= 3 && cleanText.includes(word)) {
      matchedWords++;
    }
  }

  const wordRatio = queryWords.length > 0 ? matchedWords / queryWords.length : 0;
  if (wordRatio >= 0.7) {
    return Math.max(0.75, wordRatio);
  }

  const maxLen = Math.max(cleanText.length, cleanQuery.length);
  if (maxLen === 0) return 1.0;

  const distance = levenshteinDistance(cleanText.slice(0, 200), cleanQuery.slice(0, 200));
  return Math.max(0, 1 - distance / Math.max(cleanText.slice(0, 200).length, cleanQuery.slice(0, 200).length));
}
