import type { Metadata, Viewport } from "next";
import { Calistoga, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import MotionProvider from "@/components/MotionProvider";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import SmoothCursor from "@/components/SmoothCursor";
import GridSpotlight from "@/components/GridSpotlight";
import BrandIntro from "@/components/BrandIntro";
import VisibilityPause from "@/components/VisibilityPause";
import GrainOverlay from "@/components/ui/GrainOverlay";
import AmbientHalo from "@/components/ui/AmbientHalo";
import { getSiteUrl } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070d",
};

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Chouaib Bentabet — Full-Stack Developer",
  description:
    "Portfolio de Chouaib Bentabet, développeur full-stack (Next.js, TypeScript) et fondateur de Netnook. Plateformes web rapides, sécurisées et animées pour l'Afrique et au-delà.",
  keywords: [
    "Chouaib Bentabet",
    "Netnook",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Développeur web Maroc",
    "Portfolio développeur",
  ],
  authors: [{ name: "Chouaib Bentabet" }],
  openGraph: {
    title: "Chouaib Bentabet — Full-Stack Developer",
    description:
      "Développeur full-stack (Next.js, TypeScript) et fondateur de Netnook. Découvrez mes projets et cas d'étude.",
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chouaib Bentabet — Full-Stack Developer",
    description: "Développeur full-stack (Next.js, TypeScript) et fondateur de Netnook.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${calistoga.variable} ${workSans.variable} ${mono.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden">
        <MotionProvider>
          <LanguageProvider>
            <SmoothScrollProvider>
              <BrandIntro>
                <VisibilityPause />
                <GridSpotlight />
                <div className="pointer-events-none fixed inset-0 -z-20 bg-base-900" />
                <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-25" />
                <div className="pointer-events-none fixed inset-0 -z-10 bg-grid bg-grid-spotlight opacity-70" />
                <AmbientHalo />

                <SmoothCursor />
                <GrainOverlay />
                <div className="relative z-0">{children}</div>
              </BrandIntro>
            </SmoothScrollProvider>
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
