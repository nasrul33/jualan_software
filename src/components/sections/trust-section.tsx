import { MarketingIcon } from "@/components/icons/icon-map";
import { SectionHeading } from "@/components/sections/section-heading";
import { trustItems } from "@/content/home";

export function TrustSection() {
  return (
    <section className="section-padding bg-slate-950 text-white">
      <div className="container">
        <SectionHeading
          eyebrow="Trust & Kontrol"
          title="Dirancang untuk kebutuhan instansi, bukan sekadar aplikasi input data"
          description="Website marketing ini terpisah dari aplikasi operasional. Akses login tetap diarahkan ke app.pdamcore.id."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-white/15 bg-white/[0.08] p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-sky-100">
                <MarketingIcon name={item.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-normal text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-sky-50">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
