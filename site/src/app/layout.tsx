import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/lib/site";
import "./globals.css";

/*
  Greycliff CF — the licensed brand typeface (per BRAND.md). One family powers
  both body and headlines; display headings just use the Heavy (800) weight.
  Files live in src/fonts/ (sourced from brand-assets/).
*/
const greycliff = localFont({
  src: [
    { path: "../fonts/greycliffcf-regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/greycliffcf-medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/greycliffcf-bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/greycliffcf-heavy.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-greycliff",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  keywords: [
    "Frank & Louie's",
    "Italian Specialties",
    "Rehoboth Beach",
    "Lewes Delaware",
    "Buttercake",
    "Butter cake",
    "Italian bakery",
    "Italian deli",
    "pasta sauce",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  alternates: { canonical: "/" },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.legalName} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#009cb7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${greycliff.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-turquoise focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
