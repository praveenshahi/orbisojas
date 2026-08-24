import type { MetadataRoute } from "next";
import { SITE } from "@/constants/nav";

/* Required by `output: "export"` — the file is generated once at build
   time rather than served by a route handler. */
export const dynamic = "force-static";

/**
 * AI crawlers are allowed deliberately. The Atlas exists to be cited by
 * them — blocking GPTBot or ClaudeBot would forfeit the entire AEO strategy.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
