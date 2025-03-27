import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GalaxyProvider } from "@/context/GalaxyContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: 'DarkVader - Galaxy Simulation',
  description: 'Interactive 3D galaxy simulation with dark matter visualization',
  keywords: ["dark matter", "galaxy simulation", "astronomy", "physics", "3D visualization"],
  authors: [{ name: "Your Name" }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
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
        <GalaxyProvider>
          <Navbar />
          {children}
        </GalaxyProvider>
      </body>
    </html>
  );
}
