import { siteConfig } from "@/lib/config";

export function RecentProjectsCard() {
  return (
    <div className="float-card-5 pointer-events-none absolute right-4 bottom-16 z-0 hidden w-fit md:right-10 md:block">
      <div className="floating-card pointer-events-auto w-56 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Recent Projects
        </p>
        <div className="space-y-3">
          {siteConfig.projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between gap-2 transition-opacity hover:opacity-80"
            >
              <div>
                <p className="text-xs font-semibold text-gray-800">{project.name}</p>
                <p className="mt-0.5 text-xs text-gray-400">{project.description}</p>
              </div>
              {project.starred && (
                <span className="shrink-0 text-xs text-yellow-500">★</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
