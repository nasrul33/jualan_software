import { describe, expect, it } from "vitest";

import {
  dashboardPanels,
  dashboardInsights,
  homepageAudiences,
  homepageMetrics,
  homepageProblems,
  workflowSteps,
} from "@/content/home";

describe("homepage content contract", () => {
  it("covers the required PDAMCore homepage narrative blocks", () => {
    expect(homepageProblems).toHaveLength(3);
    expect(workflowSteps.map((step) => step.title)).toEqual([
      "Pelanggan & Sambungan",
      "Baca Meter",
      "Tarif",
      "Billing & DRD",
      "Kasir & Settlement",
      "Piutang & Kas/Bank",
      "Jurnal & GL",
      "Laporan & Audit",
    ]);
    expect(homepageMetrics.length).toBeGreaterThanOrEqual(4);
    expect(homepageAudiences.length).toBeGreaterThanOrEqual(4);
    expect(dashboardInsights.length).toBeGreaterThanOrEqual(3);
  });

  it("defines interactive dashboard panels with unique ids and measurable values", () => {
    expect(dashboardPanels.length).toBeGreaterThanOrEqual(4);

    const ids = new Set(dashboardPanels.map((panel) => panel.id));
    expect(ids.size).toBe(dashboardPanels.length);

    for (const panel of dashboardPanels) {
      expect(panel.metric.value.length).toBeGreaterThan(0);
      expect(panel.points.length).toBeGreaterThanOrEqual(3);
    }
  });
});
