import Link from "next/link";

import { ArticleCard } from "@/components/cards/article-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { featuredArticles } from "@/content/articles";

export function EducationHighlightSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Edukasi PDAM"
            title="Artikel untuk memperkuat diskusi digitalisasi PDAM"
            description="Konten edukasi disiapkan untuk direktur, hublang, keuangan, SPI, IT, dan tim pengambil keputusan."
          />
          <Link
            href="/edukasi"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Lihat Edukasi
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
