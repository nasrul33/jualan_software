import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Search } from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticleMetas } from "@/lib/articles";
import { createPageMetadata } from "@/lib/seo";
import type { ArticleMeta } from "@/types/article";

export const metadata: Metadata = createPageMetadata({
  title: "Edukasi PDAM",
  description:
    "Artikel edukasi PDAMCore tentang billing PDAM, audit trail, kasir, akuntansi, DRD, piutang, SAK EP, dan digitalisasi PDAM.",
  path: "/edukasi",
  keywords: [
    "edukasi PDAM",
    "artikel billing PDAM",
    "akuntansi PDAM",
    "audit trail PDAM",
    "DRD PDAM",
    "SAK EP PDAM",
  ],
});

function getCategorySummaries(articles: ArticleMeta[]) {
  const summaries = new Map<ArticleMeta["category"], number>();

  for (const article of articles) {
    summaries.set(article.category, (summaries.get(article.category) ?? 0) + 1);
  }

  return Array.from(summaries.entries()).map(([category, count]) => ({
    category,
    count,
  }));
}

export default function EdukasiPage() {
  const allArticles = getArticleMetas();
  const featuredArticles = allArticles.filter((article) => article.featured);
  const categorySummaries = getCategorySummaries(allArticles);

  return (
    <>
      <section className="section-padding bg-background">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Edukasi PDAMCore"
              title="Panduan praktis untuk billing, kasir, akuntansi, laporan, dan audit PDAM"
              description="Materi edukasi disusun untuk membantu PDAM/Perumdam memahami alur data dari pelanggan, baca meter, DRD, pembayaran, piutang, jurnal, laporan SAK EP, dan audit trail."
            />
            <Link
              href="/demo"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Diskusi Kebutuhan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {allArticles.length === 0 ? (
            <Card className="mt-12 border-dashed">
              <CardContent className="flex flex-col items-center px-6 py-12 text-center">
                <Search className="h-10 w-10 text-slate-500" />
                <h2 className="mt-4 text-xl font-semibold text-slate-950">
                  Artikel belum tersedia
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-700">
                  Konten edukasi sedang disiapkan. Hubungi tim PDAMCore untuk
                  berdiskusi langsung tentang kebutuhan billing dan akuntansi PDAM.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {categorySummaries.map((item) => (
                  <Card key={item.category} className="premium-card-hover">
                    <CardHeader>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-800">
                          <BookOpenCheck className="h-5 w-5" />
                        </div>
                        <Badge variant="neutral">{item.count} artikel</Badge>
                      </div>
                      <CardTitle>{item.category}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="mt-14">
                <SectionHeading
                  eyebrow="Artikel Pilihan"
                  title="Topik utama untuk pengambil keputusan PDAM"
                  description="Mulai dari billing terintegrasi, audit trail, hubungan kasir-akuntansi, sampai pengurangan selisih tagihan dan pembayaran."
                />
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {featuredArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>

              <div className="mt-14">
                <SectionHeading
                  eyebrow="Semua Artikel"
                  title="Baca sesuai area yang ingin diperbaiki"
                  description="Pilih artikel berdasarkan kebutuhan hublang, meter, kasir, keuangan, SPI, IT, atau manajemen."
                />
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {allArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
