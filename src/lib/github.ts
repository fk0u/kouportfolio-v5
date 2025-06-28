export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  homepage?: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string;
  blog: string;
  company: string;
}

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Website-KOU',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  return headers;
};

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch GitHub repos:', response.statusText);
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter and sort repositories - now includes repos without description
    const filteredRepos = data
      .filter((repo: GitHubRepo) => {
        // Only filter out private repos and keep everything else
        return !repo.private;
      })
      .sort((a: GitHubRepo, b: GitHubRepo) => {
        // Sort by last updated (newest first)
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

    return filteredRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    throw error;
  }
}

export async function getGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      console.error('Failed to fetch GitHub user:', response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

export async function getGitHubStats(username: string) {
  try {
    const [user, repos] = await Promise.all([
      getGitHubUser(username),
      getGitHubRepos(username)
    ]);

    if (!user || !repos) {
      return null;
    }

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages = new Set(repos.map(repo => repo.language).filter(Boolean));
    
    // Get top repos (non-fork, with stars, and good description)
    const topRepos = repos
      .filter(repo => !repo.fork && !repo.archived && repo.description)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    return {
      user,
      totalRepos: repos.length,
      totalStars,
      totalForks,
      languagesCount: languages.size,
      topLanguages: Array.from(languages),
      topRepos,
      allRepos: repos
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}