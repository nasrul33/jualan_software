import { describe, expect, it } from "vitest";

import { articles } from "@/content/articles";
import { assertArticleContentFiles } from "@/lib/articles";

describe("education article registry", () => {
  it("contains the required initial PDAMCore education articles with unique slugs", () => {
    expect(articles).toHaveLength(5);

    const slugs = new Set(articles.map((article) => article.slug));
    expect(slugs.size).toBe(articles.length);

    expect(articles.map((article) => article.title)).toEqual([
      "Mengapa PDAM Membutuhkan Sistem Billing Terintegrasi",
      "Pentingnya Audit Trail pada Sistem Informasi PDAM",
      "Hubungan Billing, Kasir, dan Akuntansi pada PDAM",
      "Digitalisasi PDAM dari Baca Meter sampai Laporan Keuangan",
      "Cara Mengurangi Selisih Tagihan dan Pembayaran PDAM",
    ]);
  });

  it("has readable MDX content files for every registered article", async () => {
    await expect(assertArticleContentFiles()).resolves.toBeUndefined();
  });
});
