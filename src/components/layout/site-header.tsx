"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";

import {
  AnalyticsAnchor,
  AnalyticsLink,
} from "@/components/analytics/analytics-link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { buttonVariants } from "@/components/ui/button";
import { mainNavigation } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function SiteHeader() {
  const pathname = usePathname();
  const whatsappUrl = createWhatsAppUrl(
    "Halo PDAMCore, saya ingin konsultasi tentang demo sistem PDAMCore.",
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm shadow-slate-200/60">
      <div className="hidden border-b border-slate-800 bg-slate-950 text-white lg:block">
        <div className="container flex h-9 items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2 text-sky-50">
            <ShieldCheck className="h-4 w-4 text-teal-300" />
            Marketing website resmi PDAMCore. Login aplikasi diarahkan ke app.pdamcore.id.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/solusi/audit-trail-pdam" className="hover:text-teal-200">
              Audit-ready
            </Link>
            <Link href="/demo?intent=proposal" className="hover:text-teal-200">
              Minta Proposal
            </Link>
          </div>
        </div>
      </div>
      <div className="container flex min-h-16 items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-8">
          <SiteLogo />
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Navigasi utama"
          >
            {mainNavigation.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950",
                    active && "bg-sky-50 text-sky-900",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-sky-700" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <AnalyticsAnchor
            href={whatsappUrl}
            eventName="cta_whatsapp_click"
            eventProps={{ placement: "header" }}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            WhatsApp <MessageCircle className="h-4 w-4" />
          </AnalyticsAnchor>
          <AnalyticsLink
            href="/login"
            eventName="cta_login_click"
            eventProps={{ placement: "header" }}
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Login <ArrowUpRight className="h-4 w-4" />
          </AnalyticsLink>
          <AnalyticsLink
            href="/demo"
            eventName="cta_demo_click"
            eventProps={{ placement: "header" }}
            className={buttonVariants({ variant: "primary", size: "sm" })}
          >
            Jadwalkan Demo
          </AnalyticsLink>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
