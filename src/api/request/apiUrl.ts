const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export function buildApiAssetUrl(path?: string | null) {
  if (!path) return '';
  if (ABSOLUTE_URL_PATTERN.test(path)) return path;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || '';
  if (!baseUrl) return path;

  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
