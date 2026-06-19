import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { AnalyticsAnchor } from "@/components/analytics/analytics-link";
import { DemoRequestForm } from "@/components/forms/demo-request-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = createPageMetadata({
  title: "Jadwalkan Demo PDAMCore",
  description:
    "Jadwalkan demo PDAMCore untuk membahas pelanggan, sambungan, baca meter, tarif, DRD, kasir, piutang, kas/bank, akuntansi, laporan SAK EP, dan audit trail PDAM.",
  path: "/demo",
  keywords: [
    "demo aplikasi PDAM",
    "demo billing PDAM",
    "proposal software PDAM",
    "demo akuntansi PDAM",
  ],
});

interface DemoPageProps {
  searchParams: Promise<{
    intent?: string;
  }>;
}

const demoTopics = [
  "Pelanggan, sambungan, dan baca meter",
  "Tarif progresif, billing, DRD, dan piutang",
  "Kasir, settlement, QRIS/VA, dan setoran",
  "Kas/bank, jurnal, GL, laporan SAK EP",
  "Audit trail, SoD, period lock, dan reversal",
  "Portal pelanggan, NRW, aset, RKAP, gudang, dan voucher",
];

const followUpSteps = [
  {
    title: "Isi kebutuhan",
    description:
      "Tentukan area yang ingin dilihat: billing, kasir, akuntansi, laporan, audit, atau end-to-end.",
    icon: ClipboardList,
  },
  {
    title: "Validasi jadwal",
    description:
      "Tim PDAMCore menghubungi Anda melalui WhatsApp atau email untuk menyesuaikan sesi demo.",
    icon: CalendarCheck,
  },
  {
    title: "Demo terarah",
    description:
      "Sesi demo difokuskan pada alur PDAM Anda, bukan presentasi generik.",
    icon: ShieldCheck,
  },
];

function defaultKebutuhanForIntent(intent?: string): string {
  return intent === "proposal"
    ? "Minta proposal implementasi PDAMCore"
    : "Demo end-to-end PDAMCore";
}

export default async function DemoPage({ searchParams }: DemoPageProps) {
  const params = await searchParams;
  const intent = params.intent === "proposal" ? "proposal" : "demo";
  const whatsappUrl = createWhatsAppUrl(
    intent === "proposal"
      ? "Halo PDAMCore, saya ingin meminta proposal implementasi PDAMCore."
      : "Halo PDAMCore, saya ingin menjadwalkan demo PDAMCore.",
  );

  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Jadwalkan Demo"
              level="h1"
              title="Lihat PDAMCore berdasarkan alur kerja PDAM Anda"
              description="Demo dapat difokuskan pada revenue cycle PDAM: pelanggan, sambungan, meter, tarif, DRD, kasir, piutang, kas/bank, jurnal, laporan SAK EP, dan audit trail."
            />

            <div className="mt-8 grid gap-3">
              {demoTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
                  <p className="text-sm font-semibold leading-6 text-slate-800">
                    {topic}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {followUpSteps.map((step) => (
                <Card key={step.title} className="h-full">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-800">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-slate-700">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-sky-200 bg-sky-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge variant="default">Respons cepat</Badge>
                  <p className="mt-3 text-sm font-semibold leading-6 text-sky-950">
                    Ingin langsung mengirim ringkasan kebutuhan melalui WhatsApp?
                  </p>
                </div>
                <AnalyticsAnchor
                  href={whatsappUrl}
                  eventName={
                    intent === "proposal"
                      ? "cta_proposal_click"
                      : "cta_whatsapp_click"
                  }
                  eventProps={{ placement: "demo_quick_cta", intent }}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "md" }),
                    "shrink-0",
                  )}
                >
                  Hubungi WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </AnalyticsAnchor>
              </div>
            </div>
          </div>

          <Card className="border-slate-200 shadow-soft">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="success">
                  {intent === "proposal" ? "Minta Proposal" : "Demo Request"}
                </Badge>
                <span className="text-xs font-semibold text-slate-600">
                  Waktu isi 2-3 menit
                </span>
              </div>
              <CardTitle className="text-2xl">
                Form permintaan demo PDAMCore
              </CardTitle>
              <p className="text-sm leading-6 text-slate-700">
                Isi data kontak dan area kebutuhan agar sesi demo dapat disiapkan
                sesuai prioritas PDAM/Perumdam Anda.
              </p>
            </CardHeader>
            <CardContent>
              <DemoRequestForm
                intent={intent}
                defaultKebutuhan={defaultKebutuhanForIntent(intent)}
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-normal text-slate-950">
                Butuh bahan sebelum demo?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Baca artikel edukasi tentang billing terintegrasi, audit trail,
                hubungan kasir-akuntansi, dan pengurangan selisih tagihan.
              </p>
            </div>
            <Link
              href="/edukasi"
              className={buttonVariants({ variant: "outline", size: "md" })}
            >
              Lihat Edukasi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
