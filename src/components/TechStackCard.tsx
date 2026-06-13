import { siteConfig } from "@/lib/config";

export function TechStackCard() {
  return (
    <div className="float-card-4 pointer-events-none absolute bottom-16 left-4 z-0 hidden w-fit md:left-10 md:block">
      <div className="floating-card w-52 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {siteConfig.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg px-2 py-1 text-xs font-medium"
              style={{ background: "#eff6ff", color: "#3b82f6" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
