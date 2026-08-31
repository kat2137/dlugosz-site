export interface Repo {
  name: string;
  description: string | null;
  url: string | null;
  language: string | null;
  updatedAt: string | null;
  private?: boolean;
}

// Repos never shown on the lab page — infrastructure, not work.
const EXCLUDE = new Set(['dlugosz-site', 'dotfiles', 'kat2137', '.github']);

// Work that can be described but not linked: private repos, client code,
// anything under NDA. Listed here by hand so the page reflects what she
// actually builds rather than only what happens to be public.
export const MANUAL: Repo[] = [
  // {
  //   name: 'hania-control',
  //   description: 'Pose retargeting and grasp policy training for the robotic hand.',
  //   language: 'Python',
  //   url: null,
  //   updatedAt: null,
  //   private: true,
  // },
];

export async function getRepos(): Promise<Repo[]> {
  const user = import.meta.env.GITHUB_USER;
  if (!user) return MANUAL;

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (import.meta.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?sort=updated&per_page=100`,
      { headers },
    );
    if (!res.ok) return MANUAL;
    const data = await res.json();

    const fetched: Repo[] = data
      .filter((r: any) => !r.fork && !r.archived && !EXCLUDE.has(r.name))
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        updatedAt: r.updated_at,
        private: r.private ?? false,
      }));

    const seen = new Set(fetched.map((r) => r.name));
    return [...fetched, ...MANUAL.filter((r) => !seen.has(r.name))];
  } catch {
    return MANUAL;
  }
}
