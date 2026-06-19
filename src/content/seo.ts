export type SeoChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SeoRoute {
  path: string;
  priority: number;
  changeFrequency: SeoChangeFrequency;
  lastModified: string;
}

export const SEO_LAST_MODIFIED = "2026-06-19";

export const staticSeoRoutes: SeoRoute[] = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly",
    lastModified: SEO_LAST_MODIFIED,
  },
  {
    path: "/fitur",
    priority: 0.92,
    changeFrequency: "monthly",
    lastModified: SEO_LAST_MODIFIED,
  },
  {
    path: "/solusi",
    priority: 0.9,
    changeFrequency: "monthly",
    lastModified: SEO_LAST_MODIFIED,
  },
  {
    path: "/edukasi",
    priority: 0.82,
    changeFrequency: "weekly",
    lastModified: SEO_LAST_MODIFIED,
  },
  {
    path: "/demo",
    priority: 0.86,
    changeFrequency: "monthly",
    lastModified: SEO_LAST_MODIFIED,
  },
  {
    path: "/kontak",
    priority: 0.78,
    changeFrequency: "monthly",
    lastModified: SEO_LAST_MODIFIED,
  },
  {
    path: "/privacy",
    priority: 0.32,
    changeFrequency: "yearly",
    lastModified: SEO_LAST_MODIFIED,
  },
];
