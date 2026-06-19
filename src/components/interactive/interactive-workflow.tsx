"use client";

import { useMemo, useState } from "react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { WorkflowStep } from "@/types/marketing";

interface InteractiveWorkflowProps {
  steps: WorkflowStep[];
}

export function InteractiveWorkflow({ steps }: InteractiveWorkflowProps) {
  const [activeStep, setActiveStep] = useState(steps[0]?.step ?? "");
  const active = useMemo(
    () => steps.find((step) => step.step === activeStep) ?? steps[0],
    [activeStep, steps],
  );

  if (!active) {
    return null;
  }

  return (
    <div
      className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-stretch"
      data-testid="interactive-workflow"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((item) => {
          const selected = item.step === active.step;

          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setActiveStep(item.step)}
              onMouseEnter={() => setActiveStep(item.step)}
              className={cn(
                "premium-card p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-soft",
                selected && "border-sky-400 bg-sky-50 shadow-soft",
              )}
              aria-pressed={selected}
              data-testid={`workflow-step-${item.step}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-sky-800">{item.step}</span>
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-sky-800",
                    selected ? "bg-white" : "bg-sky-50",
                  )}
                >
                  <MarketingIcon name={item.icon} className="h-5 w-5" />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-normal text-slate-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      <div
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-soft"
        data-testid="workflow-active-panel"
      >
        <div className="absolute inset-0 dashboard-grid-pattern opacity-40" />
        <div className="relative">
          <Badge variant="success">Step aktif {active.step}</Badge>
          <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 text-teal-200 motion-safe-float">
            <MarketingIcon name={active.icon} className="h-8 w-8" />
          </div>
          <h3 className="mt-6 text-2xl font-bold tracking-normal">{active.title}</h3>
          <p className="mt-4 text-sm leading-7 text-sky-50">{active.description}</p>
          <div className="mt-8 rounded-lg border border-white/15 bg-white/10 p-4">
            <p className="text-sm font-semibold text-teal-200">Output kontrol</p>
            <p className="mt-2 text-sm leading-6 text-white">
              Data dari tahap ini menjadi referensi untuk tahap berikutnya sehingga
              proses meter, tarif, DRD, kasir, piutang, GL, laporan, dan audit
              trail tetap saling terhubung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
