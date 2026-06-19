import { BenefitCard } from "@/components/cards/benefit-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { benefits } from "@/content/benefits";

export function BenefitSection() {
  return (
    <section className="section-padding section-surface">
      <div className="container">
        <SectionHeading
          eyebrow="Manfaat Bisnis"
          title="Lebih tertib untuk operasional, lebih kuat untuk akuntansi dan audit"
          description="PDAMCore membantu hublang, meter, kasir, keuangan, SPI, IT, dan manajemen bekerja di atas data yang lebih konsisten dan tertelusur."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}
