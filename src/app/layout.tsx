import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/componants/Navbar";             // @ refers to global directory
import LocatorSetup from "@/componants/LocatorSetup";
import Footer from "@/componants/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "DevDharma Events | Event Management Company",
  description: "DevDharma Events — crafting extraordinary experiences. Wedding planning, corporate events, birthday parties, cultural shows, exhibitions & destination events in Dehradun, India.",
  icons: {
    icon: "/logo/devdharma-logo-transparent.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${playfair.variable} ${cormorant.variable} antialiased`}
        style={{ background: "#080808", minHeight: "100vh" }}
      >
        <LocatorSetup />
        <div className="relative w-full flex items-center justify-center">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
