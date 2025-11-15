// src/utils/fingerprint.util.ts

import FingerprintJS from '@fingerprintjs/fingerprintjs';

let fingerprintPromise: Promise<string> | null = null;
let cachedFingerprint: string | null = null;

// Generate fingerprint
export const getFingerprint = async (): Promise<string> => {
  if (cachedFingerprint) {
    return cachedFingerprint;
  }

  if (!fingerprintPromise) {
    fingerprintPromise = (async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        cachedFingerprint = result.visitorId;
        return result.visitorId;
      } catch (error) {
        console.error('Failed to generate fingerprint:', error);
        const fallback = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        cachedFingerprint = fallback;
        return fallback;
      }
    })();
  }

  return fingerprintPromise;
};

// Clear cached fingerprint
export const clearFingerprint = (): void => {
  fingerprintPromise = null;
  cachedFingerprint = null;
};

// Check if fingerprint has already been generated
export const hasCachedFingerprint = (): boolean => {
  return cachedFingerprint !== null;
};