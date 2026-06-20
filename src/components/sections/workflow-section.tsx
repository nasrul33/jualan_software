import { InteractiveWorkflow } from "@/components/interactive/interactive-workflow";
import { SectionHeading } from "@/components/sections/section-heading";
import { workflowSteps } from "@/content/home";

export function WorkflowSection() {
  return (
    <section className="section-padding section-surface">
      <div className="container">
        <SectionHeading
          eyebrow="Workflow Terintegrasi"
          title="Dari baca meter ke jurnal dan laporan, tanpa putus data"
          description="Setiap proses saling memberi konteks sehingga meter, tarif, DRD, pembayaran, piutang, jurnal, buku besar, laporan, dan audit trail tidak berdiri sendiri."
          align="center"
        />
        <InteractiveWorkflow steps={workflowSteps} />
      </div>
    </section>
  );
}
