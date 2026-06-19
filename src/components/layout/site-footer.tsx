import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Server, ShieldCheck } from "lucide-react";

import {
  AnalyticsAnchor,
  AnalyticsLink,
} from "@/components/analytics/analytics-link";
import { SiteLogo } from "@/components/layout/site-logo";
import { buttonVariants } from "@/components/ui/button";
import { footerNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { CONTACT_EMAIL } from "@/lib/constants";
import { createWhatsAppUrl, formatIndonesianWhatsappNumber } from "@/lib/whatsapp";

export function SiteFooter() {
  const whatsappUrl = createWhatsAppUrl(
    "Halo PDAMCore, saya ingin meminta proposal website PDAMCore.",
  );

  return (
    <footer className="border-t border-border bg-white">
      <div className="container py-12">
        <div className="rounded-lg bg-slate-950 p-6 text-white shadow-soft sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-200">
                Diskusi implementasi
              </p>
              <h2 className="mt-3 max-w-3xl text-2xl font-bold tracking-normal sm:text-3xl">
                Siapkan demo PDAMCore untuk revenue cycle, kasir, akuntansi,
                laporan SAK EP, dan audit trail.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-50">
                Gunakan website ini sebagai kanal publik. Aplikasi operasional tetap
                berjalan terpisah melalui domain app.pdamcore.id.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AnalyticsLink
                href="/demo"
                eventName="cta_demo_click"
                eventProps={{ placement: "footer_cta" }}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                Jadwalkan Demo
                <ArrowRight className="h-4 w-4" />
              </AnalyticsLink>
              <AnalyticsAnchor
                href={whatsappUrl}
                eventName="cta_proposal_click"
                eventProps={{ placement: "footer_cta" }}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Minta Proposal
              </AnalyticsAnchor>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-md">
            <SiteLogo />
            <p className="mt-4 text-sm leading-6 text-slate-700">
              {siteConfig.description}
            </p>
            <div className="mt-5 grid gap-3 text-sm text-slate-700">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 font-semibold text-sky-800 hover:text-sky-950"
              >
                <Mail className="h-4 w-4" />
                {CONTACT_EMAIL}
              </a>
              <AnalyticsAnchor
                href={whatsappUrl}
                eventName="cta_whatsapp_click"
                eventProps={{ placement: "footer_contact" }}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-sky-800 hover:text-sky-950"
              >
                <MessageCircle className="h-4 w-4" />
                {formatIndonesianWhatsappNumber()}
              </AnalyticsAnchor>
              <div className="inline-flex items-center gap-2 font-semibold text-slate-800">
                <Server className="h-4 w-4 text-sky-700" />
                Marketing: pdamcore.id
              </div>
              <div className="inline-flex items-center gap-2 font-semibold text-slate-800">
                <ShieldCheck className="h-4 w-4 text-teal-700" />
                Operasional: app.pdamcore.id
              </div>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {Object.entries(footerNavigation).map(([group, items]) => (
              <div key={group}>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-950">
                  {group}
                </h2>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-slate-700 hover:text-sky-800"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <div className="container flex flex-col gap-2 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} PDAMCore. Seluruh hak cipta dilindungi.</p>
          <p>Marketing website terpisah dari aplikasi operasional PDAMCore.</p>
        </div>
      </div>
    </footer>
  );
}
