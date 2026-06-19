import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/content/features";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Fitur PDAMCore",
  description:
    "Daftar modul PDAMCore untuk pelanggan, sambungan, baca meter, tarif, billing, kasir, piutang, kas/bank, akuntansi, laporan SAK EP, portal, NRW, aset, RKAP, gudang, voucher, dan audit trail PDAM.",
  path: "/fitur",
  keywords: [
    "fitur aplikasi PDAM",
    "modul billing PDAM",
    "aplikasi kasir PDAM",
    "aplikasi akuntansi PDAM",
    "SAK EP PDAM",
    "DRD PDAM",
    "NRW PDAM",
  ],
});

export default function FiturPage() {
  return (
    <>
      <section className="section-padding bg-background">
        <div className="container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Fitur PDAMCore"
              title="Modul lengkap untuk operasional, revenue, keuangan, laporan, dan audit trail"
              description="Setiap modul dirancang mengikuti kebutuhan PDAM/Perumdam agar data pelanggan, sambungan, meter, tarif, DRD, pembayaran, piutang, kas/bank, jurnal, dan laporan tetap konsisten."
            />
            <Link
              href="/demo"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Jadwalkan Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.id} className="h-full transition-shadow hover:shadow-soft">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-800">
                      <MarketingIcon name={feature.icon} className="h-6 w-6" />
                    </div>
                    <Badge variant="neutral">{feature.shortTitle}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <p className="text-base leading-7 text-slate-700">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                    <span className="font-semibold">Masalah yang diselesaikan:</span>{" "}
                    {feature.problem}
                  </div>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-950">
                        Fungsi Utama
                      </h2>
                      <ul className="mt-3 space-y-2">
                        {feature.capabilities.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-6 text-slate-700"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-950">
                        Manfaat PDAM
                      </h2>
                      <ul className="mt-3 space-y-2">
                        {feature.benefits.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-6 text-slate-700"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-700" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <FinalCtaSection
        title="Ingin melihat modul PDAMCore sesuai alur kerja PDAM Anda?"
        description="Tim PDAMCore dapat menyiapkan sesi demo berdasarkan kebutuhan hublang, kasir, keuangan, SPI, dan manajemen."
      />
    </>
  );
}
