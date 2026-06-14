// Join an internal path onto the configured base (e.g. "/log/") so links never
// 404 when the site is served from a GitHub Pages subpath. Always route
// internal hrefs through this instead of writing absolute "/..." paths.
export function href(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}
