import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { canela } from "./fonts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alzaatar.ro"),
  title: "Al' Zaátar - Bucătărie Libaneză Autentică în Craiova",
  description: "Restaurant cu specific libanez - Craiova. Povești cu iz oriental, din inima Craiovei.",
  keywords: "restaurant libanez, Craiova, bucătărie orientala, mezze, kebab, manakish",
  authors: [{ name: "Al' Zaátar Craiova" }],
  openGraph: {
    title: "Al' Zaátar - Bucătărie Libaneză Autentică",
    description: "Restaurant cu specific libanez - Craiova. Povești cu iz oriental, din inima Craiovei.",
    url: "https://alzaatar.ro",
    siteName: "Al' Zaátar Craiova",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Al' Zaátar - Restaurant cu specific libanez în Craiova",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al' Zaátar - Bucătărie Libaneză Autentică",
    description: "Restaurant cu specific libanez - Craiova. Povești cu iz oriental, din inima Craiovei.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#C99A3F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#C99A3F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Al' Zaátar" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${canela.variable} ${manrope.variable} antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          SARI LA CONȚINUT
        </a>
        <Navigation />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
