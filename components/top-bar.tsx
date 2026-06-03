"use client";

import { useEffect, useState } from "react";

/**
 * A barely-there strip that respects the "no hero text" rule,
 * just the wordmark, a live clock, and a thin scroll cue.
 */
export function TopBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function tick() {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm} UTC`);
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-8 py-6">
      <div className="pointer-events-auto flex items-center gap-2 board-text text-[12px]">
        <span className="grid h-5 w-5 place-items-center bg-amber-board">
          <PlaneGlyph />
        </span>
        <span className="text-bone tracking-board">ROAM</span>
        <span className="diamond" />
        <span className="text-muted">AALTOES</span>
      </div>

      <div className="board-text hidden items-center gap-4 text-[10px] text-muted md:flex">
        <span>{time || "··:·· UTC"}</span>
        <span className="diamond" />
        <span>OPS · DELEGATIONS</span>
      </div>
    </div>
  );
}

function PlaneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="#050505"
      strokeWidth="2.4"
      strokeLinecap="square"
    >
      <path d="M2 13l9-3-2-7 2 0 4 6 7-2 0 3-7 2-4 6-2 0 2-7-9-3z" />
    </svg>
  );
}
