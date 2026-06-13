import { siteConfig } from "./config";
import { truncateMessage } from "./utils";

export type LatestCommit = {
  message: string;
  branch: string;
  date: string;
  url: string;
};

type GitHubCommitResponse = {
  commit: {
    message: string;
    author: { date: string };
  };
  html_url: string;
};

type GitHubRepoResponse = {
  name: string;
  pushed_at: string;
  private: boolean;
};

type GitHubPushEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    ref?: string;
    commits?: { message: string; url: string }[];
  };
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

function parseCommit(
  latest: GitHubCommitResponse,
  branch: string,
): LatestCommit {
  return {
    message: truncateMessage(latest.commit.message),
    branch,
    date: latest.commit.author.date,
    url: latest.html_url,
  };
}

async function fetchFromRepo(
  username: string,
  repo: string,
  branch = "main",
): Promise<LatestCommit | null> {
  const response = await fetch(
    `${GITHUB_API}/repos/${username}/${repo}/commits?per_page=1`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) return null;

  const commits = (await response.json()) as GitHubCommitResponse[];
  const latest = commits[0];
  if (!latest) return null;

  return parseCommit(latest, branch);
}

async function fetchFromRecentRepos(
  username: string,
): Promise<LatestCommit | null> {
  // Use /user/repos (authenticated) so private repos are included
  const response = await fetch(
    `${GITHUB_API}/user/repos?sort=pushed&per_page=10`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) return null;

  const repos = (await response.json()) as GitHubRepoResponse[];
  if (!Array.isArray(repos)) return null;

  for (const repo of repos) {
    const commit = await fetchFromRepo(username, repo.name, repo.name);
    if (commit) return commit;
  }

  return null;
}

async function fetchFromEvents(username: string): Promise<LatestCommit | null> {
  // Use the authenticated events endpoint (no /public suffix) so private
  // repo pushes are visible when a token is present
  const response = await fetch(
    `${GITHUB_API}/users/${username}/events?per_page=30`,
    {
      headers: getHeaders(),
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) return null;

  const events = (await response.json()) as GitHubPushEvent[];
  const pushEvent = events.find((event) => event.type === "PushEvent");
  if (!pushEvent) return null;

  const commits = pushEvent.payload.commits ?? [];
  if (commits.length > 0) {
    const latestCommit = commits[commits.length - 1];
    const branch =
      pushEvent.payload.ref?.replace("refs/heads/", "") ?? "main";
    const repoName = pushEvent.repo.name.split("/")[1] ?? pushEvent.repo.name;

    return {
      message: truncateMessage(latestCommit.message),
      branch: `${repoName} · ${branch}`,
      date: pushEvent.created_at,
      url: latestCommit.url,
    };
  }

  const repoName = pushEvent.repo.name.split("/")[1] ?? pushEvent.repo.name;
  const branch = pushEvent.payload.ref?.replace("refs/heads/", "") ?? "main";
  const commit = await fetchFromRepo(username, repoName, `${repoName} · ${branch}`);
  if (commit) {
    return { ...commit, date: pushEvent.created_at };
  }

  return null;
}

export async function getLatestCommit(): Promise<LatestCommit | null> {
  const { githubUsername, githubRepo } = siteConfig;

  try {
    // Scan repos sorted by most-recently-pushed — works for both public
    // and private repos when a token with `repo` scope is present.
    // (Private push events are NOT exposed via GitHub's events API.)
    const fromRecent = await fetchFromRecentRepos(githubUsername);
    if (fromRecent) return fromRecent;

    // Fall back to the public events feed
    const fromEvents = await fetchFromEvents(githubUsername);
    if (fromEvents) return fromEvents;

    // Last resort: check the configured portfolio repo directly
    return await fetchFromRepo(githubUsername, githubRepo);
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
