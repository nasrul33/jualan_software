import { InteractiveWorkflow } from "@/components/interactive/interactive-workflow";
import { SectionHeading } from "@/components/sections/section-heading";
import { workflowSteps } from "@/content/home";

export function WorkflowSection() {
  return (
    <section className="section-padding section-surface">
      <div className="container">
        <SectionHeading
          eyebrow="Workflow Terintegrasi"
          title="Dari sambungan pelanggan sampai laporan SAK EP dalam satu alur data"
          description="Setiap proses saling memberi konteks sehingga meter, tarif, DRD, pembayaran, jurnal, buku besar, dan audit trail tidak berdiri sendiri."
          align="center"
        />
        <InteractiveWorkflow steps={workflowSteps} />
      </div>
    </section>
  );
}
