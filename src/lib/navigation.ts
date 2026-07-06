import { siteConfig } from "./config";

export interface NavigationLink {
  name: string;
  url: string; // Absolute or relative URL path
  description: string;
  priority?: number;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

/**
 * Navigation links used for sitemap generation and Google SiteLinks (JSON-LD)
 * Add any future pages to this array to automatically configure their SEO/Sitemap settings.
 */
export const navigationLinks: NavigationLink[] = [
  {
    name: "Home",
    url: "/",
    description: "Ankit Bhavarthe — Co-Founder & Full Stack Developer at Kairos. Portfolio showcasing full stack engineering, system design, and AI integrations.",
    priority: 1.0,
    changeFrequency: "monthly",
  },
  {
    name: "LinkedIn",
    url: siteConfig.linkedin,
    description: "Connect with me professionally, view my resume, and see my work history.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    name: "Twitter",
    url: siteConfig.twitter,
    description: "Follow my thoughts, tech updates, and building in public progress.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    name: "Building",
    url: "https://enclave.ankitbhavarthe.xyz",
    description: "Check out enclave.ankitbhavarthe.xyz — what I'm currently designing and coding.",
    priority: 0.8,
    changeFrequency: "weekly",
  },
];
