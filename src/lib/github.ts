export interface Repo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  updatedAt: string;
}

// Set GITHUB_USER and (optionally) GITHUB_TOKEN in the build environment.
// Runs at build time only — no client-side requests, no runtime cost.
export async function getPinnedRepos(): Promise<Repo[]> {
  const user = import.meta.env.GITHUB_USER;
  if (!user) return [];

  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (import.meta.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?sort=updated&per_page=8`,
      { headers },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data
      .filter((r: any) => !r.fork && !r.archived)
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        updatedAt: r.updated_at,
      }));
  } catch {
    return [];
  }
}
