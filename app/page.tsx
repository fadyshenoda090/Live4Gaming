import Footer from "@/components/UI/Footer";
import GamesGrid from "@/components/UI/GamesGrid";
import Hero from "@/components/UI/Hero";
import Navbar from "@/components/UI/Navbar";
import Tournaments from "./tournaments/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Games Grid */}
      <GamesGrid />

      {/* Tournaments */}
      <Tournaments />

      {/* Footer */}
      <Footer />
    </main>
  );
}
