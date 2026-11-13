// Último commit de cada repositório, buscado na hora de montar o site (nunca no navegador de quem visita).
// Sem rede, limite da API ou repositório fora do ar: devolve null e a página mostra só o link.
export interface LastCommit {
  sha: string;
  date: string;
  url: string;
}

const cache = new Map<string, Promise<LastCommit | null>>();

export function getLastCommit(repoUrl: string): Promise<LastCommit | null> {
  let hit = cache.get(repoUrl);
  if (!hit) {
    hit = fetchLastCommit(repoUrl);
    cache.set(repoUrl, hit);
  }
  return hit;
}

async function fetchLastCommit(repoUrl: string): Promise<LastCommit | null> {
  try {
    const path = new URL(repoUrl).pathname.replace(/^\/|\/$/g, '');
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    // Com GITHUB_TOKEN o limite da API sobe; sem ele, funciona para poucos repositórios.
    const token = import.meta.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`https://api.github.com/repos/${path}/commits?per_page=1`, {
      headers,
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const [commit] = await response.json();
    if (!commit?.sha) return null;
    return {
      sha: String(commit.sha).slice(0, 7),
      date: commit.commit?.committer?.date ?? commit.commit?.author?.date,
      url: commit.html_url,
    };
  } catch {
    return null;
  }
}
