import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  privacyEffectiveDate,
  privacyHighlights,
  privacySections,
} from "@/content/privacy";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy PDAMCore",
  description:
    "Kebijakan privasi website marketing PDAMCore untuk form demo, form kontak, WhatsApp CTA, analytics, webhook opsional, dan pemisahan dari aplikasi operasional app.pdamcore.id.",
  path: "/privacy",
  keywords: [
    "privacy PDAMCore",
    "kebijakan privasi software PDAM",
    "data kontak demo PDAMCore",
  ],
});

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Privacy Policy"
              level="h1"
              title="Kebijakan privasi website marketing PDAMCore"
              description="Kebijakan ini menjelaskan bagaimana pdamcore.id memproses data kontak dari form demo, form kontak, CTA WhatsApp, analytics, dan integrasi webhook opsional."
            />

            <div className="mt-8 rounded-lg border border-sky-200 bg-sky-50 p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-sky-800" />
                <div>
                  <Badge variant="default">Tanggal efektif</Badge>
                  <p className="mt-3 text-lg font-bold text-sky-950">
                    {privacyEffectiveDate}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Website marketing PDAMCore dibuat untuk komunikasi publik.
                    Jangan mengirim password, token, data pelanggan, dump
                    database, atau dokumen rahasia melalui form publik.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {privacyHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <p className="text-sm font-semibold leading-6 text-slate-800">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-slate-200 shadow-soft">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-800">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">
                Ringkasan kebijakan data publik
              </CardTitle>
              <p className="text-sm leading-6 text-slate-700">
                Fokus kebijakan ini adalah data yang dikirim melalui website
                publik. Pengelolaan data operasional PDAM di aplikasi mengikuti
                konfigurasi dan kontrak layanan yang terpisah.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {privacySections.map((section, index) => (
                  <a
                    key={section.title}
                    href={`#privacy-section-${index + 1}`}
                    className="group rounded-md border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-sky-50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-slate-950">
                        {section.title}
                      </p>
                      <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-sky-700" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {section.summary}
                    </p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 grid gap-5">
          {privacySections.map((section, index) => (
            <Card key={section.title} id={`privacy-section-${index + 1}`}>
              <CardHeader>
                <Badge variant="neutral">Bagian {index + 1}</Badge>
                <CardTitle className="text-2xl">{section.title}</CardTitle>
                <p className="text-base leading-7 text-slate-700">
                  {section.summary}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-700" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-normal text-slate-950">
                Perlu koreksi atau penghapusan data kontak?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Gunakan halaman kontak untuk meminta koreksi, penghapusan, atau
                klarifikasi data yang pernah dikirim melalui website publik
                PDAMCore.
              </p>
            </div>
            <Link
              href="/kontak"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Hubungi PDAMCore
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
