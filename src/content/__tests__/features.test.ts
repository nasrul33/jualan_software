import { describe, expect, it } from "vitest";

import { features } from "@/content/features";

describe("feature module registry", () => {
  it("covers the expanded PDAMCore operational domains with unique ids", () => {
    expect(features.length).toBeGreaterThanOrEqual(17);

    const ids = new Set(features.map((feature) => feature.id));
    expect(ids.size).toBe(features.length);

    expect(features.map((feature) => feature.id)).toEqual(
      expect.arrayContaining([
        "pelanggan-sambungan",
        "baca-meter",
        "tarif-pdam",
        "billing-drd",
        "kasir-settlement",
        "piutang-ecl-dunning",
        "akuntansi-jurnal",
        "laporan-sak-ep",
        "audit-trail",
        "portal-pelanggan",
        "nrw-dma",
        "aset-pdam",
        "rkap-anggaran",
        "gudang-inventaris",
        "voucher-pengeluaran",
        "iam-keamanan",
      ]),
    );

    for (const feature of features) {
      expect(feature.capabilities.length).toBeGreaterThanOrEqual(3);
      expect(feature.benefits.length).toBeGreaterThanOrEqual(3);
    }
  });
});
