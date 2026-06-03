"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollCue() {
  const [hidden, setHidden] = useState(false);
  // Mirror state in a ref so the scroll handler can early-exit without
  // triggering a React render when nothing has changed.
  const hiddenRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      // Coalesce repeated scroll events into a single rAF tick, and only
      // flip React state when the boolean actually changes. This keeps
      // scrolling smooth on devices where wheel events fire faster than
      // the frame rate.
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const next = window.scrollY > 100;
        if (next !== hiddenRef.current) {
          hiddenRef.current = next;
          setHidden(next);
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      onClick={() =>
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
      }
      aria-label="Scroll to briefing"
      className={`group absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-6 border-t border-rule bg-ink/40 px-8 py-4 backdrop-blur-sm transition-all hover:bg-amber-board/10 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="board-text text-[10px] text-bone/55 transition group-hover:text-amber-board">
        SCROLL FOR BRIEFING
      </span>
      <span className="board-text hidden text-[10px] text-muted md:inline">
        SECTION  02 / 04
      </span>
      <span className="board-text flex items-center gap-3 text-[10px] text-bone/55 transition group-hover:text-amber-board">
        CONTINUE
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="transition-transform group-hover:translate-y-0.5"
        >
          <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="square" />
        </svg>
      </span>
    </button>
  );
}
