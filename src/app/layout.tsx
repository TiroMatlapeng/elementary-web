// src/app/layout.tsx
import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elementary — Engineering from the Ground Up",
  description:
    "South African software engineering company. We build modern platforms, modernise legacy systems, and created Modiri — the handyman marketplace for South Africa.",
  openGraph: {
    title: "Elementary — Engineering from the Ground Up",
    description:
      "South African software engineering. Custom software, cloud migration, data warehousing, and Modiri — the trusted handyman marketplace.",
    url: "https://theelementary.co.za",
    siteName: "Elementary",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body style={{ fontFamily: "var(--font-body)" }}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
