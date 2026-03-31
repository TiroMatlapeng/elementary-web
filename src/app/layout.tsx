import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elementary — Engineering from the Ground Up",
  description:
    "South African software engineering and data company. We build modern platforms, modernise legacy systems, and created Dickson — the vetted handyman marketplace.",
  openGraph: {
    title: "Elementary — Engineering from the Ground Up",
    description:
      "South African software engineering and data company. Custom software, cloud migration, data warehousing, and Dickson — the trusted handyman marketplace.",
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
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
