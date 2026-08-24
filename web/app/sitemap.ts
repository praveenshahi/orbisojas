import type { MetadataRoute } from "next";
import { SITE } from "@/constants/nav";
import { atlasEntries } from "@/content/atlas";
import { insights } from "@/content/insights";

/**
 * Generated from the content layer, so publishing an Atlas entry adds it to
 * the sitemap automatically. Priorities reflect the conversion path: the
 * Soul Mirror page is the destination everything routes toward.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE.url}/soul-mirror`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/atlas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE.url}/insights`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...insights.map((i) => ({
      url: `${SITE.url}/insights/${i.slug}`,
      lastModified: new Date(i.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...atlasEntries.map((entry) => ({
      url: `${SITE.url}/atlas/${entry.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
