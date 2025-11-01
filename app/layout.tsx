import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import MouseTrail from "@/components/mouseTrail/MouseTrail";
import Navbar from "@/components/UI/Navbar";
import Footer from "@/components/UI/Footer";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Live4Gaming",
  description: "The  best gaming community platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${inter.variable} min-h-screen antialiased`}
      >
        <MouseTrail /> {/* Navbar */}
        <Navbar />

        {children}

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
