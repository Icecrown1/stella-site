import { MetadataRoute } from "next";
import { ZONES } from "@/lib/zones";

const SITE_URL = "https://laserstella.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const zonePages: MetadataRoute.Sitemap = ZONES.map((zone) => ({
    url: `${SITE_URL}/uslugi/${zone.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/uslugi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...zonePages,
    {
      url: `${SITE_URL}/uslugi/kompleksy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/oferta`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
