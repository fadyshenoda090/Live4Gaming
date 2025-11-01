import GamesGrid from "@/components/UI/GamesGrid";
import Hero from "@/components/UI/Hero";
import Tournaments from "./tournaments/page";

export default function Home() {
  return (
    <main className="">

      {/* Hero */}
      <Hero />

      {/* Games Grid */}
      <GamesGrid />

      {/* Tournaments */}
      <Tournaments />
    </main>
  );
}
