import type { MetadataRoute } from "next";

import { articles } from "@/content/articles";
import { SEO_LAST_MODIFIED, staticSeoRoutes } from "@/content/seo";
import { solutions } from "@/content/solutions";
import { absoluteUrl } from "@/lib/seo";

function toDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const staticEntries = staticSeoRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: toDate(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const solutionEntries = solutions.map((solution) => ({
    url: absoluteUrl(`/solusi/${solution.slug}`),
    lastModified: toDate(SEO_LAST_MODIFIED),
    changeFrequency: "monthly" as const,
    priority: 0.88,
  }));

  const articleEntries = articles.map((article) => ({
    url: absoluteUrl(`/edukasi/${article.slug}`),
    lastModified: toDate(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.76 : 0.7,
  }));

  return [...staticEntries, ...solutionEntries, ...articleEntries];
}
