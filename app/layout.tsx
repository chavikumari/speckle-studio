import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Motion from "@/components/animations/Motion";
import { site } from "@/data/site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Speckle Studios — A studio for ideas taking shape",
    template: "%s — Speckle Studios",
  },
  description: site.description,
  openGraph: {
    title: "Speckle Studios",
    description: site.description,
    type: "website",
    images: [{ url: "/brand/og.png", width: 1200, height: 630 }],
  },
  icons: { icon: "/brand/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
