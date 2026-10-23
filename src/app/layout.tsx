import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { DetailsScript } from "@/components/details-script";
import { RevealScript } from "@/components/reveal-script";
import { RouteScript } from "@/components/route-script";
import "./globals.css";

// Every Unbounded and Big Shoulders line in the design is set in capitals, so
// above the fold they come from capitals-only cuts (Google Fonts `text=`
// subsets: A–Z, figures, punctuation, accented capitals): 13 KB and 9 KB
// instead of 51 KB and 17 KB. The full families follow in each font stack
// (see globals.css) for anything else, and only download if a page needs them.
// next/font needs literal options, so this range is repeated in each call:
// U+20-5B, U+5D, U+5F, U+B7, U+C0-DE, U+300-303, U+308, U+30A, U+327, U+2013-2014, U+2018-2019, U+201C-201D, U+2022, U+2026

const unboundedBlack = localFont({
  src: "../fonts/unbounded-900-caps.woff2",
  weight: "900",
  variable: "--font-unbounded-black",
  display: "swap",
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+20-5B, U+5D, U+5F, U+B7, U+C0-DE, U+300-303, U+308, U+30A, U+327, U+2013-2014, U+2018-2019, U+201C-201D, U+2022, U+2026",
    },
  ],
});
// Bold is only the ribbons, but they're in the first screen on mobile and a
// late swap would shift them.
const unboundedBold = localFont({
  src: "../fonts/unbounded-700-caps.woff2",
  weight: "700",
  variable: "--font-unbounded-bold",
  display: "swap",
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+20-5B, U+5D, U+5F, U+B7, U+C0-DE, U+300-303, U+308, U+30A, U+327, U+2013-2014, U+2018-2019, U+201C-201D, U+2022, U+2026",
    },
  ],
});
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  preload: false,
});

// next/font only knows the merged "Big Shoulders" family, whose optical-size
// axis would have to be pinned to match Figma's "Big Shoulders Display". These
// are the Display cut at 900 from Google Fonts: capitals, then Latin-1 plus
// Ẹ Ọ Ṣ and ₦ as the fallback.
const bigShoulders = localFont({
  src: "../fonts/big-shoulders-display-900-caps.woff2",
  weight: "900",
  variable: "--font-big-shoulders",
  display: "swap",
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+20-5B, U+5D, U+5F, U+B7, U+C0-DE, U+300-303, U+308, U+30A, U+327, U+2013-2014, U+2018-2019, U+201C-201D, U+2022, U+2026",
    },
  ],
});
const bigShouldersFull = localFont({
  src: "../fonts/big-shoulders-display-900.woff2",
  weight: "900",
  variable: "--font-big-shoulders-full",
  display: "swap",
  preload: false,
});

// Onest sets the body copy; it's variable, one file for every weight.
const onest = Onest({ subsets: ["latin"], variable: "--font-onest", display: "swap" });

// Figma sets prices and the hero button in Inter Bold. Every use is capitals,
// figures and ₦, so this is Inter Bold cut down to exactly those glyphs (7 KB)
// instead of Inter's latin + latin-ext files (60 KB).
const interCaps = localFont({
  src: "../fonts/inter-bold-caps.woff2",
  weight: "700",
  variable: "--font-inter-caps",
  display: "swap",
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value: "U+20, U+2B-3A, U+41-5A, U+B7, U+D7, U+2013, U+20A6",
    },
  ],
});

// Onest has no ₦ and Unbounded only has it in a 118 KB latin-ext file, so the
// same 7 KB file supplies ₦ first in every stack.
const naira = localFont({
  src: "../fonts/inter-bold-caps.woff2",
  weight: "100 900",
  variable: "--font-naira",
  display: "swap",
  // Same file as interCaps; preloading both gives them one URL (one download).
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20A6" }],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ekofest.howardotuya.com"),
  title: "Èkó Fest 2026 — Three nights in Lagos, 12–14 December",
  description:
    "Three nights of Afrobeats, Alté and Amapiano at Tafawa Balewa Square, Lagos. Àdùnní, Bayo Kaze, Ifé and Deji Wave. Tickets from ₦25,000.",
  openGraph: { type: "website", siteName: "Èkó Fest", locale: "en_NG" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // The inline route script adds a class to <html> before hydration.
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        unboundedBlack,
        unboundedBold,
        unbounded,
        bigShoulders,
        bigShouldersFull,
        onest,
        interCaps,
        naira,
      ]
        .map((f) => f.variable)
        .join(" ")}
    >
      <head>
        <RevealScript />
        <RouteScript />
        <DetailsScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
