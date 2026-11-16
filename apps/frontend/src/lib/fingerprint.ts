// apps/frontend/src/lib/fingerprint.ts

/**
 * Generates or retrieves a persistent browser device fingerprint for fraud prevention.
 */
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') {
    return 'server_environment';
  }

  const STORAGE_KEY = 'tp_device_fingerprint';
  let fingerprint = localStorage.getItem(STORAGE_KEY);

  if (!fingerprint) {
    const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const rawSeed = `${screenInfo}_${userAgent}_${language}_${timeZone}_${Date.now()}_${Math.random()}`;

    // Simple fast hash
    let hash = 0;
    for (let i = 0; i < rawSeed.length; i++) {
      const char = rawSeed.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }

    fingerprint = `fp_${Math.abs(hash).toString(16)}_${Math.random().toString(36).substring(2, 10)}`;
    localStorage.setItem(STORAGE_KEY, fingerprint);
  }

  return fingerprint;
}
