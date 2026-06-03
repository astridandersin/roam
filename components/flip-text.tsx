"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type Props = {
  children: ReactNode;
  /** Stagger between adjacent characters starting their flip (ms). */
  staggerMs?: number;
  /** Duration of one random-character cycle (ms). */
  flipMs?: number;
  /** Number of random flips before settling on the final character. */
  cycles?: number;
  className?: string;
};

/**
 * Wraps any text (including nested <em>/<strong>) and renders each character
 * as a split-flap cell. When the wrapper scrolls into view, characters cycle
 * through random letters before settling on the real text, like a Solari
 * board at an airport.
 *
 * Performance: the old implementation spawned one `setInterval` per character
 * (≈50 timers for a single headline) and called `setState` on every tick,
 * which translated to thousands of React renders during a 1.5s animation
 * and visible jank during the wave. This rewrite builds the DOM tree once
 * via React, then runs a single `requestAnimationFrame` loop that mutates
 * each cell's textContent directly. No React state, no reconciliation, no
 * timers, and cells only re-render when their cycle index changes. Total
 * cost across the whole headline is now bounded by the framerate.
 */
export function FlipText({
  children,
  staggerMs = 22,
  flipMs = 55,
  cycles = 10,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  // The static tree is built once: each glyph becomes a `<span class="flip-cell"
  // data-target="X">X</span>`, words are wrapped in `.flip-word`, and
  // whitespace stays as raw text so lines wrap naturally. SSR-safe: the
  // initial HTML reads as the final text.
  const tree = useMemo(() => buildTree(children), [children]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const cells = Array.from(
      root.querySelectorAll<HTMLSpanElement>(".flip-cell")
    );
    if (cells.length === 0) return;

    // Capture targets once. We read from data-target (set at render time)
    // so the original character isn't lost when we start mutating textContent.
    const targets = cells.map((c) => c.dataset.target ?? c.textContent ?? "");

    // Per-cell scratch state lives in JS, not React.
    const state = cells.map(() => ({ done: false, lastCycle: -1 }));

    // Respect users who asked the system to reduce motion: settle every
    // cell immediately and skip the animation.
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    let rafId = 0;
    let startedAt = 0;
    let cancelled = false;

    function tick(now: number) {
      if (cancelled) return;
      if (!startedAt) startedAt = now;
      const elapsed = now - startedAt;
      let stillRunning = false;

      for (let i = 0; i < cells.length; i++) {
        const s = state[i];
        if (s.done) continue;
        const delay = i * staggerMs;
        const charElapsed = elapsed - delay;
        if (charElapsed < 0) {
          stillRunning = true;
          continue;
        }
        const cycle = Math.floor(charElapsed / flipMs);
        if (cycle >= cycles) {
          // Settle.
          if (cells[i].textContent !== targets[i]) {
            cells[i].textContent = targets[i];
          }
          cells[i].setAttribute("aria-hidden", "false");
          s.done = true;
          continue;
        }
        if (cycle !== s.lastCycle) {
          cells[i].textContent =
            CHARSET[(Math.random() * CHARSET.length) | 0];
          cells[i].setAttribute("aria-hidden", "true");
          s.lastCycle = cycle;
        }
        stillRunning = true;
      }

      if (stillRunning) {
        rafId = requestAnimationFrame(tick);
      }
    }

    // Only kick off the animation when the wrapper crosses into the viewport.
    // After it has fired once, the observer disconnects: the animation plays
    // exactly once per page load.
    let observer: IntersectionObserver | null = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer?.disconnect();
          observer = null;
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(root);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      observer = null;
    };
  }, [staggerMs, flipMs, cycles, tree]);

  return (
    <span ref={ref} className={className}>
      {tree}
    </span>
  );
}

function buildTree(children: ReactNode): ReactNode {
  const counter = { i: 0 };
  return walk(children, counter);
}

function walk(node: ReactNode, counter: { i: number }): ReactNode {
  return Children.map(node, (child) => {
    if (child == null || typeof child === "boolean") return child;
    if (typeof child === "string" || typeof child === "number") {
      const tokens = String(child).split(/(\s+)/).filter((t) => t.length > 0);
      return tokens.map((token, ti) => {
        if (/^\s+$/.test(token)) return token;
        const wordKey = `w-${counter.i}-${ti}`;
        return (
          <span key={wordKey} className="flip-word">
            {Array.from(token).map((ch) => {
              const idx = counter.i++;
              return (
                <span
                  key={`fc-${idx}`}
                  className="flip-cell"
                  data-target={ch}
                  style={{ display: "inline-block" }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      });
    }
    if (isValidElement(child)) {
      const el = child as ReactElement<{ children?: ReactNode }>;
      return cloneElement(el, el.props, walk(el.props.children, counter));
    }
    return child;
  });
}
