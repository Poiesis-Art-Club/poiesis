const SAFE_PROTOCOLS = new Set(["http:", "https:"]);

/** Returns a normalized HTTP(S) URL, or null when the value is missing or unsafe. */
export function toSafeExternalUrl(value: string | null | undefined): string | null {
  const candidate = value?.trim();
  if (!candidate) return null;

  try {
    const url = new URL(candidate);
    return SAFE_PROTOCOLS.has(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}
