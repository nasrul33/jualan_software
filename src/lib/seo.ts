import type { Metadata } from "next";

import { SITE_URL } from "@/lib/constants";
import type { ArticleMeta } from "@/types/article";

interface MetadataInput {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

const defaultKeywords = [
  "aplikasi PDAM",
  "software PDAM",
  "aplikasi billing PDAM",
  "sistem informasi PDAM",
  "aplikasi akuntansi PDAM",
  "laporan SAK EP PDAM",
  "DRD PDAM",
  "tarif blok progresif PDAM",
  "kasir PDAM",
  "piutang PDAM",
  "audit trail PDAM",
];

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata(input: MetadataInput): Metadata {
  const path = input.path ?? "/";
  const image = input.image ?? "/images/og-image.svg";
  const title = `${input.title} | PDAMCore`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: input.description,
    applicationName: "PDAMCore",
    authors: [{ name: "PDAMCore" }],
    creator: "PDAMCore",
    publisher: "PDAMCore",
    category: "Business Software",
    keywords: [...defaultKeywords, ...(input.keywords ?? [])],
    alternates: {
      canonical: absoluteUrl(path),
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    openGraph: {
      title,
      description: input.description,
      url: absoluteUrl(path),
      siteName: "PDAMCore",
      type: "website",
      locale: "id_ID",
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: "PDAMCore sistem informasi akuntansi dan billing PDAM",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [absoluteUrl(image)],
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PDAMCore",
    url: SITE_URL,
    logo: absoluteUrl("/images/logo-pdamcore.svg"),
    sameAs: [SITE_URL],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "ID",
      availableLanguage: ["id-ID"],
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PDAMCore",
    url: SITE_URL,
    inLanguage: "id-ID",
    publisher: {
      "@type": "Organization",
      name: "PDAMCore",
      url: SITE_URL,
      logo: absoluteUrl("/images/logo-pdamcore.svg"),
    },
    description:
      "Website marketing dan edukasi PDAMCore untuk sistem informasi billing, kasir, akuntansi, laporan, dan audit trail PDAM.",
  };
}

export function softwareApplicationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDAMCore",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description:
      "Sistem informasi operasional, billing, kasir, piutang, kas-bank, akuntansi, laporan SAK EP, dan audit trail PDAM yang terintegrasi dan siap audit.",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "PDAM dan Perumdam",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      description: "Harga dan paket implementasi tersedia melalui permintaan proposal.",
    },
  };
}

export function articleJsonLd(article: ArticleMeta): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "id-ID",
    mainEntityOfPage: absoluteUrl(`/edukasi/${article.slug}`),
    keywords: article.keywords.join(", "),
    articleSection: article.category,
    audience: article.audience,
    author: {
      "@type": "Organization",
      name: "PDAMCore",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PDAMCore",
      url: SITE_URL,
      logo: absoluteUrl("/images/logo-pdamcore.svg"),
    },
    image: absoluteUrl("/images/og-image.svg"),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
