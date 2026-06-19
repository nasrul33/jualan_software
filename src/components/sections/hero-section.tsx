import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

import {
  AnalyticsAnchor,
  AnalyticsLink,
} from "@/components/analytics/analytics-link";
import { AnimatedMetricCard } from "@/components/interactive/animated-metric-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { homepageAudiences, homepageMetrics } from "@/content/home";
import { primaryCtas, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function HeroSection() {
  const whatsappUrl = createWhatsAppUrl(
    "Halo PDAMCore, saya ingin menjadwalkan demo sistem operasional, billing, dan akuntansi PDAM.",
  );

  return (
    <section className="relative isolate min-h-[82svh] overflow-hidden bg-slate-950">
      <Image
        src="/images/dashboard-preview.svg"
        alt="Preview dashboard PDAMCore untuk operasional, billing, kasir, akuntansi, dan laporan PDAM"
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-slate-950/78" />
      <div className="container relative z-10 flex min-h-[82svh] flex-col justify-center py-16 sm:py-20">
        <div className="max-w-4xl">
          <Badge variant="success">PDAMCore untuk PDAM/Perumdam</Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-normal text-white sm:text-5xl lg:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-sky-50 sm:text-xl">
            PDAMCore membantu PDAM mengelola pelanggan, sambungan, baca meter,
            tarif, DRD, pembayaran, piutang, kas/bank, jurnal, laporan SAK EP,
            portal pelanggan, dan audit trail dalam satu sistem yang tertib,
            aman, dan mudah ditelusuri.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCtas.map((cta) => {
              const isWhatsAppCta = cta.eventName === "cta_whatsapp_click";
              const href = isWhatsAppCta ? whatsappUrl : cta.href;
              const icon = isWhatsAppCta ? (
                <MessageCircle className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              );

              return isWhatsAppCta ? (
                <AnalyticsAnchor
                  key={cta.label}
                  href={href}
                  eventName="cta_whatsapp_click"
                  eventProps={{ placement: "hero" }}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: cta.variant, size: "lg" }))}
                >
                  {cta.label}
                  {icon}
                </AnalyticsAnchor>
              ) : (
                <AnalyticsLink
                  key={cta.label}
                  href={href}
                  eventName={
                    cta.eventName === "cta_demo_click"
                      ? "cta_demo_click"
                      : "cta_features_click"
                  }
                  eventProps={{ placement: "hero" }}
                  className={cn(buttonVariants({ variant: cta.variant, size: "lg" }))}
                >
                  {cta.label}
                  {icon}
                </AnalyticsLink>
              );
            })}
          </div>
          <div
            className="mt-8 flex flex-wrap gap-2"
            aria-label="Target pengguna PDAMCore"
          >
            {homepageAudiences.map((audience) => (
              <span
                key={audience.role}
                className="rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-sky-50"
                title={audience.need}
              >
                {audience.role}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-12 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {homepageMetrics.map((metric) => (
            <AnimatedMetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
