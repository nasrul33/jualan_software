import { describe, expect, it } from "vitest";

import { articles } from "@/content/articles";
import { solutions } from "@/content/solutions";
import { getSitemapEntries } from "@/lib/sitemap";

describe("sitemap entries", () => {
  it("includes core marketing routes, solutions, and education articles", () => {
    const urls = getSitemapEntries().map((entry) => entry.url);

    expect(urls).toContain("https://pdamcore.id/");
    expect(urls).toContain("https://pdamcore.id/fitur");
    expect(urls).toContain("https://pdamcore.id/demo");
    expect(urls).toContain("https://pdamcore.id/kontak");

    for (const solution of solutions) {
      expect(urls).toContain(`https://pdamcore.id/solusi/${solution.slug}`);
    }

    for (const article of articles) {
      expect(urls).toContain(`https://pdamcore.id/edukasi/${article.slug}`);
    }
  });

  it("keeps login redirect and duplicate URLs out of sitemap", () => {
    const urls = getSitemapEntries().map((entry) => entry.url);
    const uniqueUrls = new Set(urls);

    expect(urls).not.toContain("https://pdamcore.id/login");
    expect(uniqueUrls.size).toBe(urls.length);
  });
});
