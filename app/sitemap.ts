import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const projectEntries: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
