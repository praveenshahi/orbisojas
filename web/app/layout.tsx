import type { Metadata, Viewport } from "next";
import { Caveat, Instrument_Sans, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/ui/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE } from "@/constants/nav";
import "./globals.css";

/* Both variable, both self-hosted by next/font — no third-party request,
   no layout shift, `swap` so text is never invisible. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

/* The field-note device needs a hand. Scoped to that component only — a
   deliberate third family, noted in docs/03_DESIGN_SYSTEM.md. */
const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Orbis Ojas — See the pattern behind your repeating questions",
    template: "%s · Orbis Ojas",
  },
  description:
    "Soul Mirror reveals the inner architecture behind your repeating patterns — across relationships, emotions, purpose and identity.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${instrument.variable} ${caveat.variable}`}>
      <head>
        {/* Marks the document as scripted before first paint, which is what
            arms the scroll-reveal styles. Without it nothing hides, so a
            failed bundle degrades to a fully visible page rather than a
            blank one. Inline and tiny so it costs no request. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-[3px] focus:bg-gold focus:px-5 focus:py-3 focus:text-void"
        >
          Skip to content
        </a>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Navbar />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
