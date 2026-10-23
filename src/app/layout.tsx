import type { Metadata, Viewport } from "next";
import { Onest, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { RevealScript } from "@/components/reveal-script";
import { RouteScript } from "@/components/route-script";
import "./globals.css";

// Both are used above the fold, so their `latin` files are preloaded. The other
// subsets' @font-face rules still ship and load on demand (Ẹ/Ọ live in
// "vietnamese"). Both are variable: one file covers every weight.
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});
const onest = Onest({ subsets: ["latin"], variable: "--font-onest", display: "swap" });

// next/font only knows the merged "Big Shoulders" family, whose optical-size
// axis would have to be pinned to match Figma's "Big Shoulders Display". This
// is the Display cut at 900 from Google Fonts: Latin-1 plus Ẹ Ọ Ṣ and ₦ (17 KB).
const bigShoulders = localFont({
  src: "../fonts/big-shoulders-display-900.woff2",
  weight: "900",
  variable: "--font-big-shoulders",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${unbounded.variable} ${bigShoulders.variable} ${onest.variable} ${interCaps.variable} ${naira.variable}`}
    >
      <head>
        <RevealScript />
        <RouteScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
