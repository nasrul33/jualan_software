import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SolutionItem } from "@/types/marketing";

interface SolutionCardProps {
  solution: SolutionItem;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  return (
    <Card className="h-full transition-shadow hover:shadow-soft">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-800">
            <MarketingIcon name={solution.icon} className="h-5 w-5" />
          </div>
          <Badge variant="success">{solution.shortTitle}</Badge>
        </div>
        <CardTitle>
          <Link href={`/solusi/${solution.slug}`} className="hover:text-sky-800">
            {solution.title}
          </Link>
        </CardTitle>
        <CardDescription>{solution.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold text-slate-900">Target: {solution.audience}</p>
        <Link
          href={`/solusi/${solution.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-800 hover:text-sky-950"
        >
          Lihat solusi
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
