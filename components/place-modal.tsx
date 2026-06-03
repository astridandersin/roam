"use client";

import { useEffect, useMemo } from "react";
import type { Place } from "@/lib/types";
import { cities } from "@/data/places";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";

export function PlaceModal({
  place,
  onClose,
}: {
  place: Place | null;
  onClose: () => void;
}) {
  const city = useMemo(
    () => (place ? cities.find((c) => c.id === place.cityId) : null),
    [place]
  );

  useBodyScrollLock(!!place);

  useEffect(() => {
    if (!place) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [place, onClose]);

  if (!place) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={place.name}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        /* Flat fill instead of backdrop-blur: blurring a full-screen
           backdrop on every frame is wildly expensive when the page
           below is animating. */
        className="absolute inset-0 bg-black/80"
      />

      <div className="modal-shell relative flex max-h-full w-full max-w-2xl flex-col border border-rule bg-ink board-surface">
        {/* Boarding-pass top */}
        <div className="grid grid-cols-[1fr,auto] items-stretch border-b border-rule">
          <div className="px-7 py-6">
            <p className="board-text text-[10px] text-amber-board">
              {place.kind.toUpperCase()}{" "}
              <span className="diamond" />{" "}
              {city ? `${city.iata} · ${city.name.toUpperCase()}` : ""}
            </p>
            <h2 className="display-headline mt-2 text-3xl text-bone">{place.name}</h2>
            <p className="board-text mt-2 text-[10px] text-muted">
              FIRST VISITED · {formatLong(place.firstVisited)}
            </p>
          </div>
          <div className="flex flex-col items-stretch justify-between border-l border-rule px-6 py-6 text-right">
            <span className="board-text text-[9px] text-muted">PASS</span>
            <span className="board-text text-2xl text-amber-board">
              {place.monogram ?? place.name.slice(0, 3).toUpperCase()}
            </span>
            <button
              onClick={onClose}
              className="board-text mt-3 self-end border border-rule px-2 py-1 text-[9px] text-bone/70 transition hover:border-amber-board hover:text-amber-board"
            >
              CLOSE  ✕
            </button>
          </div>
        </div>

        {/* Everything below the boarding-pass header scrolls together,
            so the header stays pinned while users move through the
            photos, description, and learnings. */}
        <div className="min-h-0 flex-1 overflow-y-auto">

        {/* Photos strip, placeholder grid until real photos are added.
            Each photo is an <img> rather than a background-image so the
            browser can defer it via loading="lazy" and decode it off the
            main thread via decoding="async". */}
        <div className="grid grid-cols-3 gap-px border-b border-rule bg-rule">
          {(place.photos && place.photos.length > 0
            ? place.photos.slice(0, 3)
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
                  alt={`${place.name} photo ${i + 1}`}
                  // First photo loads eagerly so it's there the instant the
                  // modal mounts; the other two defer until visible.
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  referrerPolicy="no-referrer"
                  width={600}
                  height={450}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="dot-grid flex h-full items-end justify-end p-2">
                  <span className="board-text text-[9px] text-muted">
                    NO IMAGE · {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-7 py-6">
          {place.website && (
            <a
              href={place.website}
              target="_blank"
              rel="noreferrer"
              className="board-text mb-4 inline-block text-[10px] text-amber-board hover:underline"
            >
              {prettyUrl(place.website)} ↗
            </a>
          )}

          <p className="text-[15px] leading-relaxed text-bone/85">
            {place.description}
          </p>

          {place.notes.length > 0 && (
            <div className="mt-7 border-t border-rule pt-6">
              <h3 className="board-text mb-5 text-[10px] text-amber-board">
                LEARNINGS
              </h3>
              <div className="space-y-5">
                {place.notes.map((n, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-[1.75] text-bone/85"
                  >
                    {n}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

function formatLong(iso: string) {
  const d = new Date(iso);
  const m = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  return `${m.toUpperCase()} ${d.getUTCFullYear()}`;
}

function prettyUrl(u: string) {
  try {
    return new URL(u).host.replace(/^www\./, "");
  } catch {
    return u;
  }
}
