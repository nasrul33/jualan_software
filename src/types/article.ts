export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: "Billing" | "Audit" | "Akuntansi" | "Digitalisasi" | "Kasir";
  audience: string;
  publishedAt: string;
  readingTime: string;
  keywords: string[];
  contentFile: string;
  featured: boolean;
}

export interface Article extends ArticleMeta {
  content: string;
}
