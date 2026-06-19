import type { Metadata } from "next";

import { SolutionDetailSection } from "@/components/sections/solution-detail-section";
import { getSolutionBySlug } from "@/content/solutions";
import { createPageMetadata } from "@/lib/seo";

const solution = getSolutionBySlug("laporan-keuangan-pdam");

export const metadata: Metadata = createPageMetadata({
  title: solution.title,
  description: solution.description,
  path: `/solusi/${solution.slug}`,
  keywords: solution.keywords,
});

export default function LaporanKeuanganPdamPage() {
  return <SolutionDetailSection solution={solution} />;
}
