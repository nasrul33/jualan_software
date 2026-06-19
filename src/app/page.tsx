import type { Metadata } from "next";

import { ScrollReveal } from "@/components/interactive/scroll-reveal";
import { AudienceSection } from "@/components/sections/audience-section";
import { BenefitSection } from "@/components/sections/benefit-section";
import { DashboardPreviewSection } from "@/components/sections/dashboard-preview-section";
import { EducationHighlightSection } from "@/components/sections/education-highlight-section";
import { FeatureSection } from "@/components/sections/feature-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { TrustSection } from "@/components/sections/trust-section";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sistem Informasi Operasional, Billing & Akuntansi PDAM",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScrollReveal>
        <ProblemSection />
      </ScrollReveal>
      <ScrollReveal delayMs={80}>
        <AudienceSection />
      </ScrollReveal>
      <ScrollReveal delayMs={120}>
        <WorkflowSection />
      </ScrollReveal>
      <ScrollReveal delayMs={120}>
        <FeatureSection />
      </ScrollReveal>
      <ScrollReveal delayMs={120}>
        <BenefitSection />
      </ScrollReveal>
      <ScrollReveal delayMs={120}>
        <DashboardPreviewSection />
      </ScrollReveal>
      <ScrollReveal delayMs={120}>
        <TrustSection />
      </ScrollReveal>
      <ScrollReveal delayMs={120}>
        <EducationHighlightSection />
      </ScrollReveal>
      <FinalCtaSection />
    </>
  );
}
