import { HeroActions } from "@/components/client/HeroActions";
import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <>
      {siteConfig.openToWork && (
        <div className="hero-enter mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[13px] font-medium text-gray-500 shadow-sm">
          <span className="status-dot h-2 w-2 rounded-full bg-green-500" />
          Open to full-time &amp; freelance roles
        </div>
      )}

      <div className="hero-enter delay-1">
        <div className="hero-headline">{siteConfig.tagline}</div>
        <div className="hero-sub">{siteConfig.taglineAccent}</div>
      </div>

      <p className="hero-enter delay-2 mt-6 max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
        {siteConfig.bio}
      </p>

      <div className="hero-enter delay-3 mt-8 flex flex-wrap items-center justify-center gap-2">
        {siteConfig.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[13px] font-medium text-gray-700 transition-colors hover:border-blue-500 hover:text-blue-500"
          >
            {tech}
          </span>
        ))}
      </div>

      <HeroActions />
    </>
  );
}
