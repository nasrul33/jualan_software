"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, MessageCircle, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

import {
  AnalyticsAnchor,
  AnalyticsLink,
} from "@/components/analytics/analytics-link";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const whatsappUrl = createWhatsAppUrl(
    "Halo PDAMCore, saya ingin konsultasi tentang website dan demo PDAMCore.",
  );

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="icon"
        aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
            <SiteLogo />
            <Button
              variant="outline"
              size="icon"
              aria-label="Tutup navigasi"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="px-4 py-5">
            <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-950">
                <ShieldCheck className="h-4 w-4 text-teal-700" />
                Website marketing PDAMCore
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Login operasional tetap melalui app.pdamcore.id.
              </p>
            </div>
            <nav className="mt-5 grid gap-2" aria-label="Navigasi mobile">
              {mainNavigation.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-md border border-transparent px-4 py-3 text-base font-semibold text-slate-800 hover:border-slate-200 hover:bg-slate-50",
                      active && "border-sky-200 bg-sky-50 text-sky-900",
                    )}
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4 text-slate-400" />
                  </Link>
                );
              })}
              <div className="mt-4 grid gap-3">
                <AnalyticsAnchor
                  href={whatsappUrl}
                  eventName="cta_whatsapp_click"
                  eventProps={{ placement: "mobile_nav" }}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-3 text-base font-semibold text-white hover:bg-teal-800"
                >
                  Hubungi WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </AnalyticsAnchor>
                <AnalyticsLink
                  href="/demo"
                  eventName="cta_demo_click"
                  eventProps={{ placement: "mobile_nav" }}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-base font-semibold text-white hover:bg-sky-800"
                >
                  Jadwalkan Demo
                </AnalyticsLink>
                <AnalyticsLink
                  href="/login"
                  eventName="cta_login_click"
                  eventProps={{ placement: "mobile_nav" }}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-100"
                >
                  Login Aplikasi
                  <ArrowUpRight className="h-4 w-4" />
                </AnalyticsLink>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
