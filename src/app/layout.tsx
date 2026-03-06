import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Euan Hill | Technology Consultant",
  description:
    "T-shaped Technology Consultant with broad management consulting expertise and deep specialisation in automation and AI. Based in Brighton, UK.",
  keywords: [
    "Technology Consultant",
    "Automation",
    "AI",
    "Process Mining",
    "Management Consulting",
    "Digital Transformation",
  ],
  authors: [{ name: "Euan Hill" }],
  openGraph: {
    title: "Euan Hill | Technology Consultant",
    description:
      "T-shaped Technology Consultant specialising in automation and AI.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
