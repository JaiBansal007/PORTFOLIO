import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getPortfolioData } from "@/lib/data";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export function generateMetadata(): Metadata {
  const data = getPortfolioData();
  const title = "Jai Bansal | Full-Stack Developer & NSUT";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    alternates: {
      canonical: "/",
    },
    authors: [{ name: data.personal.name }],
    openGraph: {
      title,
      description: SITE_DESCRIPTION,
      type: "website",
      url: SITE_URL,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: SITE_DESCRIPTION,
      images: ["/opengraph-image"],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
