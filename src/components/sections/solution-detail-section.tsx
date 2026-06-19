import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SolutionItem } from "@/types/marketing";

interface SolutionDetailSectionProps {
  solution: SolutionItem;
}

export function SolutionDetailSection({ solution }: SolutionDetailSectionProps) {
  return (
    <>
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge variant="success">Solusi PDAMCore</Badge>
              <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-lg bg-sky-50 text-sky-800">
                <MarketingIcon name={solution.icon} className="h-7 w-7" />
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
                {solution.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                {solution.description}
              </p>
              <p className="mt-5 rounded-lg border border-border bg-white p-4 text-sm font-semibold leading-6 text-slate-800">
                Target utama: {solution.audience}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  Jadwalkan Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/fitur"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Lihat Modul
                </Link>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Konteks masalah</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-7 text-slate-700">
                  {solution.problemContext}
                </p>
                <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-950">
                    Dampak jika tidak dikontrol
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {solution.impact.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-amber-950">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding section-surface">
        <div className="container grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Bagaimana PDAMCore membantu</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-4 md:grid-cols-3">
                {solution.howItHelps.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-white p-4 text-sm leading-6 text-slate-700"
                  >
                    <CheckCircle2 className="mb-3 h-5 w-5 text-teal-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Modul terkait</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {solution.relatedModules.map((module) => (
                  <Badge key={module} variant="neutral">
                    {module}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Manfaat yang diharapkan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {solution.expectedBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-sm font-semibold leading-6 text-teal-950"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FinalCtaSection
        title={`Bahas kebutuhan ${solution.shortTitle} di PDAM Anda`}
        description="Demo dapat difokuskan pada alur data yang paling penting untuk tim Anda, mulai dari proses operasional sampai laporan dan audit trail."
      />
    </>
  );
}
