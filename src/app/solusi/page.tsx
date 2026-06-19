import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SolutionCard } from "@/components/cards/solution-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { solutions } from "@/content/solutions";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Solusi PDAMCore",
  description:
    "Solusi PDAMCore untuk akuntansi PDAM, billing PDAM, kasir PDAM, audit trail, laporan SAK EP, piutang, kas/bank, dan kontrol operasional PDAM.",
  path: "/solusi",
  keywords: [
    "solusi PDAM",
    "aplikasi akuntansi PDAM",
    "aplikasi billing PDAM",
    "audit trail PDAM",
    "SAK EP PDAM",
    "DRD PDAM",
  ],
});

export default function SolusiPage() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Solusi Berdasarkan Kebutuhan"
            title="Pilih area PDAM yang ingin dikontrol lebih dulu"
            description="PDAMCore dapat dibahas dari perspektif hublang, meter, kasir, keuangan, SPI, IT, direksi, atau dewan pengawas."
          />
          <Link
            href="/demo"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Jadwalkan Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </div>
    </section>
  );
}
