/**
 * Returns only social URLs that look like real http(s) links.
 * Empty strings / "#" placeholders are omitted so the UI never renders dead anchors.
 */
export function getActiveSocials(
  socials: Record<string, string>
): [string, string][] {
  return Object.entries(socials).filter(([, url]) =>
    /^https?:\/\//i.test(url.trim())
  );
}
