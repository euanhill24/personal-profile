import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Euan Hill | AI & Automation Consultant",
  description:
    "T-shaped consultant with broad management consulting expertise and deep specialisation in automation and AI. Based in Brighton & London.",
  keywords: [
    "AI Consultant",
    "Automation",
    "Agentic AI",
    "Process Mining",
    "Management Consulting",
    "Digital Transformation",
  ],
  authors: [{ name: "Euan Hill" }],
  openGraph: {
    title: "Euan Hill | AI & Automation Consultant",
    description:
      "T-shaped consultant specialising in automation and AI.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
