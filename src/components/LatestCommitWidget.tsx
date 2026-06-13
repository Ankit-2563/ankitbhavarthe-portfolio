import type { LatestCommit } from "@/lib/github";
import { formatRelativeTime } from "@/lib/utils";

type LatestCommitWidgetProps = {
  commit: LatestCommit;
};

export function LatestCommitWidget({ commit }: LatestCommitWidgetProps) {
  return (
    <div className="float-card-3 absolute top-8 right-4 z-0 hidden w-fit md:right-16 md:block">
      <a
        href={commit.url}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-card block w-58 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg transition-shadow hover:shadow-xl"
      >
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400" />
          <p className="text-xs font-semibold text-gray-800">Latest Commit</p>
        </div>
        <div className="rounded-xl bg-gray-950 p-3 font-mono">
          <p className="text-xs text-green-400">$ git commit -m</p>
          <p className="mt-1 text-xs leading-snug text-yellow-300">
            &quot;{commit.message}&quot;
          </p>
          <p className="mt-2 text-xs text-gray-500">
            {commit.branch} · {formatRelativeTime(commit.date)}
          </p>
        </div>
      </a>
    </div>
  );
}
