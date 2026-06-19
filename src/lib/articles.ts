import { readFile } from "node:fs/promises";
import path from "node:path";

import { articles } from "@/content/articles";
import type { Article, ArticleMeta } from "@/types/article";

function sortByNewest(left: ArticleMeta, right: ArticleMeta): number {
  return (
    new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  );
}

function articlePath(meta: ArticleMeta): string {
  return path.join(process.cwd(), meta.contentFile);
}

function stripFrontmatter(source: string): string {
  if (!source.startsWith("---")) {
    return source;
  }

  const closingIndex = source.indexOf("\n---", 3);

  if (closingIndex === -1) {
    return source;
  }

  return source.slice(closingIndex + 4);
}

export function getArticleMetas(): ArticleMeta[] {
  return [...articles].sort(sortByNewest);
}

export function getArticleMetaBySlug(slug: string): ArticleMeta | null {
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const meta = getArticleMetaBySlug(slug);

  if (!meta) {
    return null;
  }

  const raw = await readFile(articlePath(meta), "utf8");

  return {
    ...meta,
    content: stripFrontmatter(raw).trim(),
  };
}

export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const current = getArticleMetaBySlug(slug);

  if (!current) {
    return getArticleMetas().slice(0, limit);
  }

  return getArticleMetas()
    .filter((article) => article.slug !== slug)
    .sort((left, right) => {
      const leftScore = left.category === current.category ? 1 : 0;
      const rightScore = right.category === current.category ? 1 : 0;

      return rightScore - leftScore || sortByNewest(left, right);
    })
    .slice(0, limit);
}

export async function assertArticleContentFiles(): Promise<void> {
  await Promise.all(
    articles.map(async (article) => {
      await readFile(articlePath(article), "utf8");
    }),
  );
}
