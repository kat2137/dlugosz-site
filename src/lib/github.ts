/**
 * Repo data for /lab, fetched at build time.
 *
 * Unauthenticated GitHub API, so the build must survive a rate limit or an
 * outage: on any failure the page falls back to MANUAL alone rather than
 * failing the build. A nightly rebuild keeps the list current — see
 * .github/workflows/deploy.yml.
 */

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  updated: string;
  /** Private or unlisted work, described by hand. */
  manual?: boolean;
}

const USER = 'kat2137';

/** Repos that carry the site itself, or forks — not work to show. */
const EXCLUDE = new Set(['dlugosz-site', 'kat2137']);

/**
 * Private or not-yet-public work. Anything listed here shows on /lab without
 * a link, so the record is complete even when the code is not public.
 */
export const MANUAL: Repo[] = [
  {
    name: 'tech-pack-generator',
    description:
      'Flat garment drawings in, structured tech packs out: a controlled taxonomy, a Pydantic schema with per-attribute source stamps, and a frequency-table layer for construction suggestions.',
    language: 'Python',
    url: '',
    updated: '',
    manual: true,
  },
];

export async function getRepos(): Promise<Repo[]> {
  let fetched: Repo[] = [];

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'dlugosz-site',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(
      `https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`,
      { headers },
    );
    if (response.ok) {
      const raw = (await response.json()) as Array<Record<string, any>>;
      fetched = raw
        .filter((r) => !r.fork && !r.archived && !EXCLUDE.has(r.name))
        .map((r) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          url: r.html_url,
          updated: r.pushed_at ?? r.updated_at,
        }));
    } else {
      console.warn(`[lab] GitHub returned ${response.status}; using manual entries only.`);
    }
  } catch (error) {
    console.warn('[lab] GitHub unreachable; using manual entries only.', error);
  }

  const names = new Set(fetched.map((r) => r.name));
  return [...fetched, ...MANUAL.filter((r) => !names.has(r.name))];
}

export function formatUpdated(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
