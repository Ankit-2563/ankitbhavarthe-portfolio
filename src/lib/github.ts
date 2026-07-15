import { siteConfig } from "./config";
import { truncateMessage } from "./utils";

export type LatestCommit = {
  message: string;
  branch: string;
  date: string;
  url: string;
};

type GitHubCommitResponse = {
  commit: { message: string; author: { date: string } };
  html_url: string;
};


const GITHUB_API = "https://api.github.com";

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function getLatestCommit(): Promise<LatestCommit | null> {
  const { githubUsername, githubRepo } = siteConfig;

  try {
    // 1. If authenticated, find the most recently pushed repo (public or private)
    if (process.env.GITHUB_TOKEN) {
      const reposRes = await fetch(
        `${GITHUB_API}/user/repos?sort=pushed&per_page=1`,
        { headers: getHeaders(), next: { revalidate: 300 } },
      );

      if (reposRes.ok) {
        const repos = (await reposRes.json()) as { name: string; owner: { login: string }; default_branch: string }[];
        const repo = repos[0];

        if (repo) {
          const commitRes = await fetch(
            `${GITHUB_API}/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`,
            { headers: getHeaders(), next: { revalidate: 300 } },
          );

          if (commitRes.ok) {
            const [latest] = (await commitRes.json()) as GitHubCommitResponse[];
            if (latest) {
              return {
                message: truncateMessage(latest.commit.message),
                branch: `${repo.name} · ${repo.default_branch}`,
                date: latest.commit.author.date,
                url: latest.html_url,
              };
            }
          }
        }
      }
    }

    // 2. Public fallback: commits on the portfolio repo (no auth needed)
    const res = await fetch(
      `${GITHUB_API}/repos/${githubUsername}/${githubRepo}/commits?per_page=1`,
      { headers: getHeaders(), next: { revalidate: 300 } },
    );

    if (res.ok) {
      const [latest] = (await res.json()) as GitHubCommitResponse[];
      if (latest) {
        return {
          message: truncateMessage(latest.commit.message),
          branch: "main",
          date: latest.commit.author.date,
          url: latest.html_url,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function getFallbackCommit(): LatestCommit {
  return {
    message: "building something great",
    branch: "main",
    date: new Date().toISOString(),
    url: siteConfig.github,
  };
}
