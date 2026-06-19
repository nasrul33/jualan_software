import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { productScreenshots } from "@/content/product-screenshots";

describe("product screenshots", () => {
  it("uses selected real app screenshots with existing optimized assets", () => {
    expect(productScreenshots).toHaveLength(9);

    const ids = new Set(productScreenshots.map((item) => item.id));
    expect(ids.size).toBe(productScreenshots.length);

    for (const screenshot of productScreenshots) {
      expect(screenshot.src).toMatch(/^\/images\/product\/.+\.webp$/);
      expect(screenshot.alt.length).toBeGreaterThan(24);
      expect(
        existsSync(join(process.cwd(), "public", screenshot.src)),
      ).toBe(true);
    }
  });

  it("keeps public screenshot metadata anonymized and PDAMCore-branded", () => {
    const forbiddenTerms = [
      "sia-pdam",
      "tirta serambi",
      "muhammad",
      "ikhsan",
      "super admin",
    ];

    for (const screenshot of productScreenshots) {
      const publicText = [
        screenshot.title,
        screenshot.module,
        screenshot.description,
        screenshot.alt,
      ]
        .join(" ")
        .toLowerCase();

      for (const term of forbiddenTerms) {
        expect(publicText).not.toContain(term);
      }
    }
  });
});
