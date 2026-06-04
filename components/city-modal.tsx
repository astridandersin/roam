"use client";

import { useEffect, useMemo } from "react";
import type { City, Place } from "@/lib/types";
import { places } from "@/data/places";
import { PlaceLogo } from "@/components/place-logo";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";

const KIND_ORDER = [
  "Startup",
  "VC",
  "Accelerator",
  "Founder House",
  "Big Tech",
  "Startup Ecosystem",
  "Alumni",
  "Event",
] as const;

export function CityModal({
  city,
  onClose,
  onSelectPlace,
}: {
  city: City | null;
  onClose: () => void;
  onSelectPlace: (p: Place) => void;
}) {
  const cityPlaces = useMemo(
    () => (city ? places.filter((p) => p.cityId === city.id) : []),
    [city]
  );

  // Precompute the grouped/filtered structure once per city open. This was
  // previously re-running on every render of the parent (e.g. while the
  // marquee animation ticked), even though the data is fully static for a
  // given city.
  const grouped = useMemo(() => {
    if (!city) return [];
    return KIND_ORDER.map((kind) => ({
      kind,
      items: cityPlaces.filter((p) => p.kind === kind),
    })).filter((g) => g.items.length > 0);
  }, [city, cityPlaces]);

  // Lock the underlying page while the panel is open. The ref-counted hook
  // tolerates stacked modals (city + place) and doesn't desync when the
  // parent re-renders with a fresh `onClose` callback.
  useBodyScrollLock(!!city);

  useEffect(() => {
    if (!city) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [city, onClose]);

  if (!city) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${city.name} delegation`}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        /* Dropped backdrop-blur: when the page below has animated content
           (marquee, flipping cells), blurring the entire backdrop on every
           frame is the #1 cause of modal lag. A flat dark fill reads
           almost the same visually and costs orders of magnitude less. */
        className="absolute inset-0 bg-black/80"
      />

      <aside className="modal-shell relative flex max-h-full w-full max-w-3xl flex-col overflow-y-auto border border-rule bg-ink board-surface">
        {/* Header strip, looks like a gate sign. The sticky header
            stays opaque to the eye without the expensive blur. */}
        <header className="sticky top-0 z-10 border-b border-rule bg-ink/95">
          <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center gap-4">
              <span className="grid h-9 w-12 place-items-center bg-amber-board board-text text-[14px] font-semibold text-ink">
                {city.iata}
              </span>
              <div>
                <p className="board-text text-[10px] text-amber-board">
                  ARRIVED · {formatLong(city.firstVisited)}
                </p>
                <h2 className="display-headline text-3xl text-bone">
                  {city.name}
                  <span className="ml-3 text-bone/40 text-xl">
                    {city.country}
                  </span>
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="board-text border border-rule px-3 py-1.5 text-[10px] text-bone/70 transition hover:border-amber-board hover:text-amber-board"
            >
              CLOSE  ✕
            </button>
          </div>
          <p className="border-t border-rule px-8 py-3 text-[14px] leading-relaxed text-bone/70">
            {city.blurb}
          </p>
        </header>

        {/* Photo strip, three tiles styled like a contact sheet, same
            treatment as the place modal so city pages have the same visual
            entry as company pages. Real photos use <img> with lazy + async
            decode so they don't block scroll / paint. */}
        <div className="grid grid-cols-3 gap-px border-b border-rule bg-rule">
          {(city.photos && city.photos.length > 0
            ? city.photos.slice(0, 3)
            : [null, null, null]
          ).map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden bg-ink"
            >
              {src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={src}
                  alt={`${city.name} photo ${i + 1}`}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  referrerPolicy="no-referrer"
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="dot-grid flex h-full items-end justify-between p-2">
                  <span className="board-text text-[9px] text-muted">
                    {city.iata} · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="board-text text-[9px] text-muted">
                    NO IMAGE
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex-1 px-8 py-8">
          {grouped.map((group) => (
            <div key={group.kind} className="mb-10">
              <div className="mb-4 flex items-baseline justify-between border-b border-rule pb-2">
                <h3 className="board-text text-[11px] tracking-board text-amber-board">
                  {pluralKind(group.kind)}
                  <span className="ml-3 text-muted">
                    {group.items.length.toString().padStart(2, "0")}
                  </span>
                </h3>
              </div>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {group.items.map((p) => (
                  <li key={p.id} className="place-tile">
                    <button
                      onClick={() => onSelectPlace(p)}
                      className="group flex h-28 w-full flex-col justify-between border border-rule bg-black/40 p-3 text-left transition-colors hover:border-amber-board hover:bg-amber-board/5"
                    >
                      <div className="flex items-center justify-between">
                        <PlaceLogo
                          website={p.website}
                          monogram={p.monogram ?? p.name.slice(0, 2)}
                          alt={`${p.name} logo`}
                        />
                        <span className="board-text text-[9px] text-muted">
                          {formatShort(p.firstVisited)}
                        </span>
                      </div>
                      <div>
                        <p className="text-[14px] leading-tight text-bone group-hover:text-amber-board">
                          {p.name}
                        </p>
                        <p className="board-text mt-1 text-[9px] text-muted">
                          {p.kind.toUpperCase()}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {grouped.length === 0 && (
            <p className="board-text py-12 text-center text-[12px] text-muted">
              NO PLACES LOGGED YET FOR THIS CITY.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function pluralKind(kind: (typeof KIND_ORDER)[number]): string {
  switch (kind) {
    case "Startup":
      return "STARTUPS";
    case "VC":
      return "VCS";
    case "Accelerator":
      return "ACCELERATORS";
    case "Founder House":
      return "FOUNDER HOUSES";
    case "Big Tech":
      return "BIG TECH";
    case "Startup Ecosystem":
      return "STARTUP ECOSYSTEMS";
    case "Alumni":
      return "ALUMNI";
    case "Event":
      return "EVENTS";
  }
}

function LogoMonogram({ text }: { text: string }) {
  return (
    <span className="grid h-7 min-w-[28px] place-items-center border border-amber-board/60 px-1.5 board-text text-[10px] tracking-board text-amber-board">
      {text.toUpperCase()}
    </span>
  );
}

function formatLong(iso: string) {
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  return `${month.toUpperCase()} ${d.getUTCFullYear()}`;
}

function formatShort(iso: string) {
  const d = new Date(iso);
  const m = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return `${m.toUpperCase()} ${d.getUTCFullYear()}`;
}
