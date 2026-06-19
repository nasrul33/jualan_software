import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { InteractiveDashboardPreview } from "@/components/interactive/interactive-dashboard-preview";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { dashboardInsights, dashboardPanels } from "@/content/home";

export function DashboardPreviewSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Preview Dashboard"
              title="Satu layar untuk melihat hubungan DRD, kasir, GL, dan audit"
              description="Dashboard disusun untuk membantu manajemen membaca status operasional, piutang, penerimaan, jurnal, dan kontrol audit tanpa kehilangan jejak transaksi sumber."
            />
            <div className="mt-6 grid gap-3">
              {dashboardInsights.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sky-50 text-sky-800">
                    <MarketingIcon name={item.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/demo"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "mt-8",
              })}
            >
              Minta Demo Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <InteractiveDashboardPreview panels={dashboardPanels} />
        </div>
      </div>
    </section>
  );
}
