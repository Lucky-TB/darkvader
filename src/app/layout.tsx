import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "DarkVader - Galaxy Simulation with Dark Matter",
  description: "Interactive 3D simulation of a galaxy showing the effects of dark matter on galactic rotation curves and structure.",
  keywords: ["dark matter", "galaxy simulation", "astronomy", "physics", "3D visualization"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "DarkVader - Galaxy Simulation with Dark Matter",
    description: "Interactive 3D simulation of a galaxy showing the effects of dark matter on galactic rotation curves and structure.",
    type: "website",
    locale: "en_US",
    siteName: "DarkVader",
  },
  twitter: {
    card: "summary_large_image",
    title: "DarkVader - Galaxy Simulation with Dark Matter",
    description: "Interactive 3D simulation of a galaxy showing the effects of dark matter on galactic rotation curves and structure.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-screen bg-black text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
