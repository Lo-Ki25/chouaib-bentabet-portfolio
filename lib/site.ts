/** Canonical site URL — set NEXT_PUBLIC_SITE_URL when you have a custom domain. */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chouaibbentabet.dev";
  return url.replace(/\/$/, "");
}
