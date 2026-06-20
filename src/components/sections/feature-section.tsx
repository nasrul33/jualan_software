import Link from "next/link";

import { FeatureCard } from "@/components/cards/feature-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { features } from "@/content/features";

export function FeatureSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Modul Utama"
            title="Modul inti untuk menghubungkan revenue cycle ke akuntansi"
            description="Modul disusun mengikuti alur kerja PDAM agar data pelanggan, meter, tarif, DRD, pembayaran, piutang, kas/bank, jurnal, GL, dan laporan tetap saling terhubung."
          />
          <Link
            href="/fitur"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Lihat Semua Fitur
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.slice(0, 8).map((feature) => (
            <FeatureCard key={feature.id} feature={feature} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
