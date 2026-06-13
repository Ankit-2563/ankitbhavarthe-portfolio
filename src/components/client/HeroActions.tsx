"use client";

import { useLenis } from "@/components/client/LenisProvider";
import { siteConfig } from "@/lib/config";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function HeroActions() {
  const lenis = useLenis();

  const scrollToContact = () => {
    const target = document.getElementById("contact-email");
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="hero-enter delay-4 mt-10 flex flex-row flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={scrollToContact}
        className="inline-flex items-center justify-center rounded-full bg-blue-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-colors hover:bg-blue-600 hover:shadow-[0_8px_20px_rgba(59,130,246,0.45)] sm:px-9"
      >
        Get in Touch
      </button>
      <a
        href={siteConfig.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-700 hover:shadow-md sm:px-7"
      >
        <GitHubIcon />
        GitHub
      </a>
    </div>
  );
}
