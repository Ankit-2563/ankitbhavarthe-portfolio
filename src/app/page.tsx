import { ContactSection, SiteFooter } from "@/components/ContactSection";
import { OpenToWorkBadge, StickyNote } from "@/components/DecorativeCards";
import { Hero } from "@/components/Hero";
import { LatestCommitWidget } from "@/components/LatestCommitWidget";
import { RecentProjectsCard } from "@/components/RecentProjectsCard";
import { TechStackCard } from "@/components/TechStackCard";
import { getFallbackCommit, getLatestCommit } from "@/lib/github";

export default async function Home() {
  const commit = (await getLatestCommit()) ?? getFallbackCommit();

  return (
    <main>
      <section className="dotted-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
        <StickyNote />
        <OpenToWorkBadge />
        <LatestCommitWidget commit={commit} />
        <TechStackCard />
        <RecentProjectsCard />

        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
          <Hero />
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}
