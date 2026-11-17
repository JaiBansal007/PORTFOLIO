import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getPortfolioData } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = getPortfolioData();
  return {
    title: `${data.personal.name} — ${data.personal.title}`,
    description: data.about.bio,
    keywords: ["portfolio", data.personal.name, data.personal.title, ...data.skills.flatMap(s => s.items)],
    authors: [{ name: data.personal.name }],
    openGraph: {
      title: `${data.personal.name} — ${data.personal.title}`,
      description: data.about.bio,
      type: "website",
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
