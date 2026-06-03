"use client";

import { cities, places } from "@/data/places";
import type { City } from "@/lib/types";
import { FlipText } from "@/components/flip-text";

// Pre-compute the place count per city at module scope so each card render
// doesn't re-walk the full places list. With ~50 places and 14 cards in the
// reel that's 700 array filters skipped on every paint.
const PLACE_COUNTS: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  for (const p of places) out[p.cityId] = (out[p.cityId] ?? 0) + 1;
  return out;
})();

// The reel is two copies of the cities array so translateX(-50% → 0) loops
// seamlessly. The list is static so build it once at module scope.
const REEL = [...cities, ...cities];

export function CitiesMarquee({
  onSelectCity,
}: {
  onSelectCity: (c: City) => void;
}) {
  const reel = REEL;
  const placeCount = (cityId: string) => PLACE_COUNTS[cityId] ?? 0;

  return (
    <section
      id="cities"
      className="roam-section relative border-t border-rule bg-ink"
      aria-label="Cities in the Roam log"
    >
      <div className="mx-auto max-w-6xl px-8 pt-24">
        <div className="flex items-end justify-between border-b border-rule pb-5">
          <div>
            <p className="board-text text-[11px] text-amber-board">
              DESTINATIONS
            </p>
            <h2 className="display-headline mt-2 text-4xl leading-tight text-bone md:text-5xl">
              <FlipText staggerMs={28} flipMs={65} cycles={12}>
                Cities we've been on the ground in.
              </FlipText>
            </h2>
          </div>
          <span className="board-text hidden text-[10px] text-muted md:inline">
            CLICK A CITY TO ENTER
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden py-10 marquee-mask">
        <ul className="flex w-max gap-6 marquee-track">
          {reel.map((city, i) => (
            <li key={`${city.id}-${i}`} className="flex-shrink-0">
              <button
                onClick={() => onSelectCity(city)}
                className="group block w-[320px] border border-rule bg-black/40 text-left transition-colors hover:border-amber-board hover:bg-amber-board/[0.04] focus-visible:border-amber-board focus-visible:outline-none"
                aria-label={`Enter ${city.name} delegation`}
              >
                {/* Header, city name on top */}
                <header className="flex items-start justify-between gap-3 border-b border-rule px-4 py-3">
                  <div className="min-w-0">
                    <h3 className="display-headline truncate text-2xl leading-tight text-bone transition-colors group-hover:text-amber-board">
                      {city.name}
                    </h3>
                    <p className="board-text mt-1 text-[10px] tracking-board text-muted">
                      {city.country.toUpperCase()}
                      <span className="diamond" />
                      {placeCount(city.id).toString().padStart(2, "0")} PLACES
                    </p>
                  </div>
                  <span className="grid h-8 min-w-[36px] place-items-center bg-amber-board px-1.5 board-text text-[12px] font-semibold tracking-board text-ink">
                    {city.iata}
                  </span>
                </header>

                {/* Image / placeholder area */}
                <div className="dot-grid relative flex aspect-[4/3] items-end justify-between overflow-hidden p-3">
                  {city.photos?.[0] ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={city.photos[0]}
                      alt={`${city.name} cover`}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                    />
                  ) : (
                    <>
                      <CropMark className="absolute left-2 top-2" />
                      <CropMark className="absolute right-2 top-2 rotate-90" />
                      <CropMark className="absolute right-2 bottom-2 rotate-180" />
                      <CropMark className="absolute left-2 bottom-2 -rotate-90" />
                      <span className="board-text text-[9px] text-muted">
                        NO IMAGE
                      </span>
                    </>
                  )}
                  <span className="relative board-text text-[9px] text-muted">
                    {formatShort(city.firstVisited)}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CropMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none block h-3 w-3 ${className}`}
      style={{
        borderTop: "1px solid rgba(244,196,48,0.35)",
        borderLeft: "1px solid rgba(244,196,48,0.35)",
      }}
    />
  );
}

function formatShort(iso: string) {
  const d = new Date(iso);
  const m = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return `${m.toUpperCase()} ${d.getUTCFullYear()}`;
}
