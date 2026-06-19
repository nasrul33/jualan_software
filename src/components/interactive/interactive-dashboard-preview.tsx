"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { MarketingIcon } from "@/components/icons/icon-map";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DashboardPanel } from "@/types/marketing";

interface InteractiveDashboardPreviewProps {
  panels: DashboardPanel[];
}

export function InteractiveDashboardPreview({
  panels,
}: InteractiveDashboardPreviewProps) {
  const [activePanelId, setActivePanelId] = useState(panels[0]?.id ?? "");
  const activePanel =
    panels.find((panel) => panel.id === activePanelId) ?? panels[0];

  if (!activePanel) {
    return null;
  }

  return (
    <div
      className="rounded-lg border border-border bg-white p-3 shadow-soft"
      data-testid="interactive-dashboard-preview"
    >
      <div className="grid gap-3 md:grid-cols-4">
        {panels.map((panel) => {
          const selected = panel.id === activePanel.id;

          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => setActivePanelId(panel.id)}
              onMouseEnter={() => setActivePanelId(panel.id)}
              className={cn(
                "rounded-md border p-3 text-left transition duration-200",
                selected
                  ? "border-sky-300 bg-sky-50 text-sky-950"
                  : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:bg-slate-50",
              )}
              aria-pressed={selected}
              data-testid={`dashboard-panel-${panel.id}`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <MarketingIcon name={panel.icon} className="h-4 w-4" />
                {panel.title}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-white">
        <div className="grid min-h-[420px] gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative p-6">
            <div className="absolute inset-0 dashboard-grid-pattern opacity-30" />
            <div className="relative">
              <Badge variant="success">{activePanel.eyebrow}</Badge>
              <div
                className={cn(
                  "mt-6 flex h-14 w-14 items-center justify-center rounded-lg text-white shadow-soft motion-safe-pulse-ring",
                  activePanel.accentClassName,
                )}
              >
                <MarketingIcon name={activePanel.icon} className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-bold tracking-normal">
                {activePanel.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-sky-50">
                {activePanel.description}
              </p>
              <div className="mt-6 rounded-lg border border-white/15 bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-200">
                  {activePanel.metric.label}
                </p>
                <p className="mt-2 text-2xl font-bold">{activePanel.metric.value}</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white p-6 text-slate-950"
            data-testid="dashboard-active-panel"
          >
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-600">
                    Panel aktif
                  </p>
                  <h4 className="mt-1 text-xl font-bold tracking-normal">
                    {activePanel.title}
                  </h4>
                </div>
                <div
                  className={cn(
                    "h-3 w-16 rounded-full",
                    activePanel.accentClassName,
                  )}
                />
              </div>
              <div className="mt-5 grid gap-3">
                {activePanel.points.map((point) => (
                  <div
                    key={point}
                    className="flex gap-3 rounded-md border border-slate-200 bg-white p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
                    <span className="text-sm leading-6 text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Validasi
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">
                  Tertelusur
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Output
                </p>
                <p className="mt-2 text-lg font-bold text-slate-950">Siap audit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
