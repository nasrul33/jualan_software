import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateId } from "@/lib/utils";
import type { ArticleMeta } from "@/types/article";

interface ArticleCardProps {
  article: ArticleMeta;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-soft">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">{article.category}</Badge>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTime}
          </span>
        </div>
        <CardTitle>
          <Link href={`/edukasi/${article.slug}`} className="hover:text-sky-800">
            {article.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-slate-600">{formatDateId(article.publishedAt)}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p className="text-sm leading-6 text-slate-700">{article.summary}</p>
        <Link
          href={`/edukasi/${article.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-800 hover:text-sky-950"
        >
          Baca artikel
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
