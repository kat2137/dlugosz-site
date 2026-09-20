const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Builds a site-absolute URL, honouring the GitHub Pages base path. */
export function url(path = ''): string {
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}
