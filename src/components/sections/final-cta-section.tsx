import { ArrowRight, MessageCircle } from "lucide-react";

import {
  AnalyticsAnchor,
  AnalyticsLink,
} from "@/components/analytics/analytics-link";
import { buttonVariants } from "@/components/ui/button";
import { createWhatsAppUrl } from "@/lib/whatsapp";

interface FinalCtaSectionProps {
  title?: string;
  description?: string;
}

export function FinalCtaSection({
  title = "Siapkan alur operasional, billing, dan akuntansi PDAM yang lebih tertib",
  description = "Jadwalkan demo untuk membahas kebutuhan pelanggan, sambungan, baca meter, tarif, DRD, pembayaran, piutang, kas/bank, jurnal, laporan SAK EP, portal, dan audit trail di PDAM Anda.",
}: FinalCtaSectionProps) {
  const whatsappUrl = createWhatsAppUrl(
    "Halo PDAMCore, saya ingin meminta proposal dan jadwal demo.",
  );

  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className="container flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-normal sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-sky-50">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <AnalyticsLink
            href="/demo"
            eventName="cta_demo_click"
            eventProps={{ placement: "final_cta" }}
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Jadwalkan Demo
            <ArrowRight className="h-4 w-4" />
          </AnalyticsLink>
          <AnalyticsAnchor
            href={whatsappUrl}
            eventName="cta_proposal_click"
            eventProps={{ placement: "final_cta" }}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Minta Proposal
            <MessageCircle className="h-4 w-4" />
          </AnalyticsAnchor>
        </div>
      </div>
    </section>
  );
}
