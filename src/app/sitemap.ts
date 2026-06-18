import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { navigationLinks } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");

  return navigationLinks.map((link) => {
    // Ensure absolute URL
    const url = link.url.startsWith("http")
      ? link.url
      : `${baseUrl}${link.url.startsWith("/") ? "" : "/"}${link.url}`;

    return {
      url,
      lastModified: new Date(),
      changeFrequency: link.changeFrequency ?? "monthly",
      priority: link.priority ?? 0.7,
    };
  });
}
