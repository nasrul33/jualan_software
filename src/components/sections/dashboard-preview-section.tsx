import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { ProductScreenshotGallery } from "@/components/interactive/product-screenshot-gallery";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { dashboardInsights } from "@/content/home";
import { productScreenshots } from "@/content/product-screenshots";

export function DashboardPreviewSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Preview Aplikasi"
              title="Tampilan nyata modul billing, kasir, akuntansi, dan laporan"
              description="Galeri ini menampilkan layar demo yang sudah dianonimkan untuk calon pengguna: dashboard, baca meter, kasir, tarif, DRD, jurnal, neraca saldo, CoA, dan laporan keuangan."
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
              Minta Demo Aplikasi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ProductScreenshotGallery screenshots={productScreenshots} />
        </div>
      </div>
    </section>
  );
}
