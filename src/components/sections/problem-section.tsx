import { AlertTriangle } from "lucide-react";

import { homepageProblems } from "@/content/home";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProblemSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <SectionHeading
          eyebrow="Masalah yang Diselesaikan"
          title="Ketika data PDAM tersebar, DRD, piutang, dan GL ikut melemah"
          description="PDAMCore dirancang untuk menyatukan alur hublang, meter, tarif, billing, kasir, keuangan, SPI, dan manajemen yang selama ini sering terpisah antar bagian."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {homepageProblems.map((problem) => (
            <Card key={problem.title} className="h-full premium-card-hover">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-800">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <CardTitle>{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-700">{problem.description}</p>
                <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-950">
                  {problem.risk}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
