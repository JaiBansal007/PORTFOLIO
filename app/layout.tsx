import type { Metadata } from "next";
import "./globals.css";
import { getPortfolioData } from "@/lib/data";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
