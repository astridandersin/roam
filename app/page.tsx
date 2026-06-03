"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { City, Place } from "@/lib/types";
import { AboutSection } from "@/components/about-section";
import { CitiesMarquee } from "@/components/cities-marquee";
import { DeparturesSection } from "@/components/departures-section";
import { CityModal } from "@/components/city-modal";
import { PlaceModal } from "@/components/place-modal";
import { TopBar } from "@/components/top-bar";
import { ScrollCue } from "@/components/scroll-cue";

// Globe is window-bound; keep it client-only and outside SSR
const GlobeShell = dynamic(() => import("@/components/globe-shell"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

export default function Home() {
  const [activeCity, setActiveCity] = useState<City | null>(null);
  const [activePlace, setActivePlace] = useState<Place | null>(null);

  return (
    <main className="relative bg-ink">
      {/* SECTION 1, pure globe, no hero text */}
      <section
        id="globe"
        className="relative h-[100svh] w-full overflow-hidden bg-ink"
      >
        <TopBar />
        <GlobeShell onCitySelect={(c) => setActiveCity(c)} />
        <ScrollCue />
      </section>

      {/* SECTION 2, briefing */}
      <AboutSection />

      {/* SECTION 3, auto-scrolling city cards */}
      <CitiesMarquee onSelectCity={(c) => setActiveCity(c)} />

      {/* SECTION 4, departures board */}
      <DeparturesSection
        onSelectPlace={(p) => {
          setActivePlace(p);
        }}
      />

      <Footer />

      <CityModal
        city={activeCity}
        onClose={() => setActiveCity(null)}
        onSelectPlace={(p) => setActivePlace(p)}
      />
      <PlaceModal
        place={activePlace}
        onClose={() => setActivePlace(null)}
      />
    </main>
  );
}

function GlobeFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <span className="board-text text-[10px] text-amber-board animate-glow">
        LOADING WORLD ◇
      </span>
    </div>
  );
}

function Footer() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="border-t border-rule bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-8 py-10 md:flex-row md:items-center md:justify-between">
        <p className="board-text text-[10px] text-muted">
          ROAM · AALTOES · {year}
        </p>
        <p className="board-text text-[10px] text-muted">
          STARTUP SAUNA · OTAKAARI 5A · ESPOO · FI
        </p>
      </div>
    </footer>
  );
}
