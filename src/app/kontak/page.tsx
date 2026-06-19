import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  LockKeyhole,
  Mail,
  MessageCircle,
} from "lucide-react";

import {
  AnalyticsAnchor,
  AnalyticsLink,
} from "@/components/analytics/analytics-link";
import { ContactRequestForm } from "@/components/forms/contact-request-form";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  contactAssurances,
  contactReasons,
  contactSteps,
  type ContactMethod,
} from "@/content/contact";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  createWhatsAppUrl,
  formatIndonesianWhatsappNumber,
} from "@/lib/whatsapp";
import type { AnalyticsEventName } from "@/lib/analytics";

export const metadata: Metadata = createPageMetadata({
  title: "Kontak PDAMCore",
  description:
    "Hubungi PDAMCore untuk demo, proposal, dan konsultasi sistem informasi billing, kasir, akuntansi, laporan SAK EP, dan audit trail PDAM.",
  path: "/kontak",
  keywords: [
    "kontak PDAMCore",
    "demo software PDAM",
    "proposal aplikasi PDAM",
    "kontak billing PDAM",
  ],
});

function isExternalHref(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function contactMethodEventName(title: string): AnalyticsEventName {
  if (title === "WhatsApp") {
    return "cta_whatsapp_click";
  }

  if (title === "Jadwalkan Demo") {
    return "cta_demo_click";
  }

  if (title === "Login Aplikasi") {
    return "cta_login_click";
  }

  return "cta_contact_click";
}

export default function KontakPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Halo PDAMCore, saya ingin berkonsultasi tentang PDAMCore.",
  );
  const contactMethods: ContactMethod[] = [
    {
      title: "WhatsApp",
      description: "Kanal tercepat untuk demo, proposal, dan klarifikasi awal.",
      label: formatIndonesianWhatsappNumber(),
      href: whatsappUrl,
      icon: MessageCircle,
      external: true,
    },
    {
      title: "Email",
      description: "Gunakan untuk pengiriman dokumen kebutuhan atau proposal.",
      label: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      icon: Mail,
    },
    {
      title: "Jadwalkan Demo",
      description: "Isi form demo bila ingin sesi pembahasan yang lebih terarah.",
      label: "Buka halaman demo",
      href: "/demo",
      icon: CalendarCheck,
    },
    {
      title: "Login Aplikasi",
      description: "Aplikasi operasional tetap berada pada domain terpisah.",
      label: "app.pdamcore.id",
      href: "/login",
      icon: LockKeyhole,
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Kontak PDAMCore"
              level="h1"
              title="Diskusikan kebutuhan billing, kasir, akuntansi, laporan, dan audit trail PDAM"
              description="Gunakan halaman ini untuk menghubungi PDAMCore secara resmi. Website ini hanya untuk marketing dan edukasi; aplikasi operasional tetap terpisah di app.pdamcore.id."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky-50 text-sky-800">
                        <Icon className="h-5 w-5" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-400" />
                    </div>
                    <h2 className="mt-5 text-lg font-bold tracking-normal text-slate-950">
                      {method.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {method.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-sky-800">
                      {method.label}
                    </p>
                  </>
                );

                return (
                  <Card
                    key={method.title}
                    className="h-full transition-shadow hover:shadow-soft"
                  >
                    {isExternalHref(method.href) ? (
                      <AnalyticsAnchor
                        href={method.href}
                        eventName={contactMethodEventName(method.title)}
                        eventProps={{
                          placement: "contact_method",
                          method: method.title,
                        }}
                        target={method.external ? "_blank" : undefined}
                        rel={method.external ? "noreferrer" : undefined}
                        className="block h-full p-5"
                      >
                        {content}
                      </AnalyticsAnchor>
                    ) : (
                      <AnalyticsLink
                        href={method.href}
                        eventName={contactMethodEventName(method.title)}
                        eventProps={{
                          placement: "contact_method",
                          method: method.title,
                        }}
                        className="block h-full p-5"
                      >
                        {content}
                      </AnalyticsLink>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
              <Badge variant="neutral">Konteks yang bisa dibahas</Badge>
              <div className="mt-5 grid gap-4">
                {contactReasons.map((reason) => (
                  <div key={reason.title} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-700" />
                    <div>
                      <h2 className="text-sm font-bold text-slate-950">
                        {reason.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="border-slate-200 shadow-soft">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="success">Form Kontak</Badge>
                <span className="text-xs font-semibold text-slate-600">
                  Respons via WhatsApp
                </span>
              </div>
              <CardTitle className="text-2xl">
                Kirim pesan ke tim PDAMCore
              </CardTitle>
              <p className="text-sm leading-6 text-slate-700">
                Isi data singkat agar tim dapat menindaklanjuti pesan sesuai
                konteks PDAM/Perumdam Anda.
              </p>
            </CardHeader>
            <CardContent>
              <ContactRequestForm />
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {contactSteps.map((step) => (
            <Card key={step.title} className="h-full">
              <CardHeader>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
                  <step.icon className="h-5 w-5" />
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-700">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-sky-200 bg-sky-50 p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Badge variant="default">Keamanan kanal publik</Badge>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {contactAssurances.map((item) => (
                  <div key={item.title}>
                    <h2 className="text-sm font-bold text-sky-950">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/privacy"
              className={cn(
                buttonVariants({ variant: "outline", size: "md" }),
                "shrink-0",
              )}
            >
              Baca Privacy
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
