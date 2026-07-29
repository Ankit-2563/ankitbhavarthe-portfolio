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


export async function getLatestCommit(): Promise<LatestCommit | null> {
  const { githubUsername, githubRepo } = siteConfig;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${githubUsername}/${githubRepo}/commits?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        next: { revalidate: 300 },
      },
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
