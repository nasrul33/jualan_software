import { MarketingIcon } from "@/components/icons/icon-map";
import { SectionHeading } from "@/components/sections/section-heading";
import { homepageAudiences } from "@/content/home";

export function AudienceSection() {
  return (
    <section className="section-padding section-surface">
      <div className="container">
        <SectionHeading
          eyebrow="Untuk Pengambil Keputusan"
          title="Pesan produk disesuaikan dengan peran utama di PDAM"
          description="PDAMCore membantu setiap bagian membaca data yang sama dari sudut tanggung jawab yang berbeda."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homepageAudiences.map((audience) => (
            <div
              key={audience.role}
              className="premium-card premium-card-hover p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-800">
                <MarketingIcon name={audience.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-normal text-slate-950">
                {audience.role}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-sky-800">
                {audience.need}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {audience.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
