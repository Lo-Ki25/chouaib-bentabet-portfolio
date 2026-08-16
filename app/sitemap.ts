import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const slugs = await getProjectSlugs();

  const projectEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
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
