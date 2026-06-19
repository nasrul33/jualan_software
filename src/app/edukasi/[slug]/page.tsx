import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Users } from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { MarkdownContent } from "@/components/content/markdown-content";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getArticleBySlug,
  getArticleMetaBySlug,
  getArticleMetas,
  getRelatedArticles,
} from "@/lib/articles";
import { articleJsonLd, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { formatDateId } from "@/lib/utils";

interface EdukasiArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getArticleMetas().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: EdukasiArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleMetaBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "Artikel Tidak Ditemukan",
      description: "Artikel edukasi PDAMCore tidak ditemukan.",
      path: `/edukasi/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/edukasi/${article.slug}`,
    keywords: article.keywords,
  });
}

export default async function EdukasiArticlePage({
  params,
}: EdukasiArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Beranda", path: "/" },
              { name: "Edukasi", path: "/edukasi" },
              { name: article.title, path: `/edukasi/${article.slug}` },
            ]),
          ),
        }}
      />
      <article className="section-padding bg-background">
        <div className="container">
          <Link
            href="/edukasi"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className: "mb-8",
            })}
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Edukasi
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="success">{article.category}</Badge>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readingTime}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
                {article.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
                  <CalendarDays className="h-4 w-4 text-sky-700" />
                  {formatDateId(article.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
                  <Users className="h-4 w-4 text-teal-700" />
                  {article.audience}
                </span>
              </div>

              <div className="mt-10 rounded-lg border border-border bg-white p-6 shadow-sm shadow-slate-200/60">
                <div className="prose-pdamcore">
                  <MarkdownContent source={article.content} />
                </div>
              </div>
            </div>

            <aside className="grid gap-5 lg:sticky lg:top-28">
              <Card>
                <CardHeader>
                  <CardTitle>Ringkasan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-700">
                    {article.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.keywords.map((keyword) => (
                      <Badge key={keyword} variant="neutral">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Diskusi lanjutan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-700">
                    Bahas penerapan topik ini untuk kondisi billing, kasir,
                    akuntansi, laporan, dan audit trail di PDAM Anda.
                  </p>
                  <Link
                    href="/demo"
                    className={buttonVariants({
                      variant: "primary",
                      size: "md",
                      className: "mt-5 w-full",
                    })}
                  >
                    Jadwalkan Demo
                  </Link>
                </CardContent>
              </Card>
            </aside>
          </div>

          <section className="mt-16">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge variant="default">Baca Berikutnya</Badge>
                <h2 className="mt-4 text-2xl font-bold tracking-normal text-slate-950">
                  Artikel terkait untuk memperdalam konteks
                </h2>
              </div>
              <Link
                href="/edukasi"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Semua Artikel
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
              ))}
            </div>
          </section>
        </div>
      </article>

      <FinalCtaSection
        title="Butuh demo berdasarkan masalah yang dibahas artikel ini?"
        description="Tim PDAMCore dapat menyesuaikan demo dengan alur pelanggan, meter, billing, kasir, piutang, akuntansi, laporan, dan audit trail PDAM Anda."
      />
    </>
  );
}
