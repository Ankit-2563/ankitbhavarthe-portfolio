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
  // Example for future pages:
  /*
  {
    name: "Projects",
    url: "/projects",
    description: "A showcase of Ankit's full-stack and serverless software projects.",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    name: "Experience",
    url: "/experience",
    description: "Ankit Bhavarthe's professional journey, freelancing agency work, and interns.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    name: "Contact",
    url: "/contact",
    description: "Get in touch with Ankit Bhavarthe for business inquiries or software development services.",
    priority: 0.7,
    changeFrequency: "yearly",
  }
  */
];
