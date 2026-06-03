"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { City, Place, PlaceKind } from "@/lib/types";
import { cities, places } from "@/data/places";
import { BoardFrame } from "@/components/board-frame";

// Build the city-by-id map once at module scope rather than on every render.
const CITY_BY_ID: Record<string, City> = (() => {
  const out: Record<string, City> = {};
  for (const c of cities) out[c.id] = c;
  return out;
})();

// Pre-compute lowercase searchable haystacks per place so the filter doesn't
// have to lowercase the same strings on every keystroke.
const HAYSTACKS = new Map<string, string>();
for (const p of places) {
  const c = CITY_BY_ID[p.cityId];
  HAYSTACKS.set(
    p.id,
    [
      p.name.toLowerCase(),
      p.kind.toLowerCase(),
      c?.name.toLowerCase() ?? "",
      c?.iata.toLowerCase() ?? "",
    ].join(" ")
  );
}

const KINDS: PlaceKind[] = [
  "Startup",
  "VC",
  "Accelerator",
  "Founder House",
  "Big Tech",
  "Entrepreneurship Society",
  "Alumni",
  "Event",
];

type Sort = "name" | "date" | "city";

type Row = {
  place: Place;
  cityName: string;
  cityIata: string;
  flight: string; // generated stable code per place
  gate: string;
  remark: "ON TIME" | "BOARDING" | "ARCHIVED";
};

// All entries from the AaltoES 2026 February SF board trip share a fixed
// "flight" code and gate label so the board reads as a single delegation.
const AES26_PREFIX = "2026-02";

function flightCode(p: Place, idx: number) {
  if (p.firstVisited.startsWith(AES26_PREFIX)) return "AES01";
  const letter = p.kind[0].toUpperCase();
  const num = (1000 + ((idx * 37) % 8999)).toString().padStart(4, "0");
  return `${letter}${num}`;
}

function gateCode(p: Place, idx: number) {
  if (p.firstVisited.startsWith(AES26_PREFIX)) return "B26";
  const letter = "ABCDEFGH"[idx % 8];
  const num = (1 + ((idx * 7) % 24)).toString().padStart(2, "0");
  return `${letter}${num}`;
}

function remarkFor(p: Place): Row["remark"] {
  // Anything whose firstVisited is strictly in the future reads as
  // "BOARDING" (a trip about to take off). Past visits within recent
  // delegations are "ON TIME"; older ones are "ARCHIVED".
  const visited = new Date(`${p.firstVisited}T00:00:00Z`).getTime();
  if (Number.isFinite(visited) && visited > Date.now()) return "BOARDING";
  const year = parseInt(p.firstVisited.slice(0, 4), 10);
  if (year >= 2018) return "ON TIME";
  return "ARCHIVED";
}

export function DeparturesSection({
  onSelectPlace,
}: {
  onSelectPlace: (p: Place) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeKinds, setActiveKinds] = useState<Set<PlaceKind>>(new Set());
  const [sort, setSort] = useState<Sort>("name");

  // useDeferredValue keeps the search input snappy by letting React paint
  // the keystroke before re-running the filter+sort pipeline below. On
  // older devices this is the difference between "smooth" and "stuttery".
  const deferredQuery = useDeferredValue(query);

  const rows: Row[] = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const filtered = places
      .filter((p) => {
        if (activeKinds.size > 0 && !activeKinds.has(p.kind)) return false;
        if (!q) return true;
        return HAYSTACKS.get(p.id)?.includes(q) ?? false;
      })
      .map((p, i) => {
        const c = CITY_BY_ID[p.cityId];
        return {
          place: p,
          cityName: c?.name ?? "···",
          cityIata: c?.iata ?? "···",
          flight: flightCode(p, i),
          gate: gateCode(p, i),
          remark: remarkFor(p),
        };
      });

    filtered.sort((a, b) => {
      if (sort === "name") return a.place.name.localeCompare(b.place.name);
      if (sort === "date")
        return a.place.firstVisited.localeCompare(b.place.firstVisited);
      return a.cityName.localeCompare(b.cityName);
    });

    return filtered;
  }, [deferredQuery, activeKinds, sort]);

  function toggleKind(k: PlaceKind) {
    setActiveKinds((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  return (
    <section
      id="departures"
      className="roam-section relative border-t border-rule board-surface"
    >
      <div className="mx-auto max-w-6xl px-8 py-24">
        <BoardFrame
          right={
            <div className="hidden items-center gap-3 md:flex">
              <span className="board-text text-[10px] text-muted">
                {rows.length.toString().padStart(3, "0")} ENTRIES
              </span>
              <span className="board-text text-[10px] text-amber-board animate-glow">
                ● LIVE
              </span>
            </div>
          }
        />

        {/* Filters bar */}
        <div className="flex flex-col gap-4 border-b border-rule py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3 border border-rule bg-black/40 px-3 py-2 md:max-w-md">
            <SearchGlyph />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PLACE, CITY, OR IATA"
              className="board-text w-full bg-transparent text-[12px] text-bone placeholder:text-bone/30 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="board-text text-[10px] text-muted hover:text-amber-board"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {KINDS.map((k) => {
              const on = activeKinds.has(k);
              return (
                <button
                  key={k}
                  onClick={() => toggleKind(k)}
                  className={`board-text px-3 py-1.5 text-[10px] tracking-board transition ${
                    on
                      ? "bg-amber-board text-ink"
                      : "border border-rule text-bone/70 hover:text-amber-board"
                  }`}
                >
                  {k.toUpperCase()}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border border-rule px-2 py-1.5">
            <span className="board-text text-[10px] text-muted">SORT</span>
            {(["name", "date", "city"] as Sort[]).map((s) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={`board-text text-[10px] tracking-board transition ${
                  sort === s ? "text-amber-board" : "text-bone/50 hover:text-bone"
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Header row */}
        <div className="mt-6 grid grid-cols-12 gap-4 border-b border-rule pb-3">
          <HeaderCell className="col-span-2">DATE</HeaderCell>
          <HeaderCell className="col-span-4">DESTINATION</HeaderCell>
          <HeaderCell className="col-span-2">FLIGHT</HeaderCell>
          <HeaderCell className="col-span-1">GATE</HeaderCell>
          <HeaderCell className="col-span-3">REMARK</HeaderCell>
        </div>

        {/* Rows */}
        <ul className="divide-y divide-rule">
          {rows.length === 0 ? (
            <li className="board-text py-10 text-center text-[12px] text-muted">
              NO RESULTS FOR "{query.toUpperCase()}"
            </li>
          ) : (
            rows.map((r) => (
              <li key={r.place.id}>
                <button
                  onClick={() => onSelectPlace(r.place)}
                  className="group grid w-full grid-cols-12 items-center gap-4 py-3 text-left transition hover:bg-amber-board/5"
                >
                  <Cell className="col-span-2 text-bone/85">
                    {formatDate(r.place.firstVisited)}
                  </Cell>
                  <Cell className="col-span-4">
                    <span className="text-amber-board">
                      {r.place.name.toUpperCase()}
                    </span>
                    <span className="ml-3 text-bone/40">
                      {r.cityIata} · {r.cityName.toUpperCase()}
                    </span>
                  </Cell>
                  <Cell className="col-span-2 text-bone/70">{r.flight}</Cell>
                  <Cell className="col-span-1 text-bone/70">{r.gate}</Cell>
                  <Cell className="col-span-3">
                    <RemarkPill kind={r.place.kind} remark={r.remark} />
                  </Cell>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="mt-10 flex items-center justify-between border-t border-rule pt-5">
          <span className="board-text text-[10px] text-muted">
            HEL, DEPARTURES BOARD · ROAM LOG
          </span>
          <span className="board-text text-[10px] text-muted">
            UPDATED LIVE FROM COHORT NOTES
          </span>
        </div>
      </div>
    </section>
  );
}

function HeaderCell({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`board-text text-[10px] text-muted tracking-board ${className}`}
    >
      {children}
    </span>
  );
}

function Cell({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`board-text text-[13px] leading-tight ${className}`}>
      {children}
    </span>
  );
}

function RemarkPill({
  kind,
  remark,
}: {
  kind: PlaceKind;
  remark: Row["remark"];
}) {
  return (
    <span className="flex items-center gap-3">
      <span className="text-bone/55">{kind.toUpperCase()}</span>
      <span className="diamond" />
      <span
        className={
          remark === "BOARDING"
            ? "text-amber-board animate-glow"
            : remark === "ON TIME"
              ? "text-bone/70"
              : "text-muted"
        }
      >
        {remark}
      </span>
    </span>
  );
}

function SearchGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-bone/50"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" strokeLinecap="square" />
    </svg>
  );
}

function formatDate(iso: string) {
  // Render as YYYY · MMM (board feel), e.g. 2024 · MAR
  const d = new Date(iso);
  const year = d.getUTCFullYear();
  const m = d.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return `${year} · ${m.toUpperCase()}`;
}
