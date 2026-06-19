"use client";

import { MessageCircle } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsapp() {
  const href = createWhatsAppUrl(
    "Halo PDAMCore, saya ingin konsultasi tentang sistem billing dan akuntansi PDAM.",
  );

  return (
    <a
      id="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("cta_whatsapp_click", { placement: "floating" })}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-800 sm:w-auto sm:gap-2 sm:px-5"
      aria-label="Hubungi PDAMCore melalui WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
