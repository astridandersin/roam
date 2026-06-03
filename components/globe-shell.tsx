"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";
import * as topojson from "topojson-client";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  Polygon,
  Position,
} from "geojson";
import type { GlobeMethods } from "react-globe.gl";
import type { City } from "@/lib/types";
import { cities } from "@/data/places";
import { ErrorBoundary } from "@/components/error-boundary";

/**
 * Always try to mount the Globe. We keep this function around purely as a
 * safety check for SSR (so we never try to render Globe during server
 * rendering); in the browser it always returns true and the actual
 * resilience comes from the ErrorBoundary + console-error filter below.
 *
 * This means the Globe renders in any real browser tab; only on the
 * server do we skip it.
 */
function detectWebGL(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/**
 * Three's WebGLRenderer calls `console.error("THREE.WebGLRenderer: Error
 * creating WebGL context.")` synchronously before it throws, which means
 * a graceful React error boundary cannot prevent the message from showing
 * up in DevTools. Install a tiny filter that swallows just these specific
 * messages. Anything else continues to log normally.
 */
function installWebGLErrorFilter(): () => void {
  if (typeof window === "undefined") return () => {};
  const orig = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    const first = typeof args[0] === "string" ? args[0] : "";
    if (
      first.includes("WebGLRenderer") ||
      first.includes("WebGL context") ||
      first.includes("BindToCurrentSequence")
    ) {
      return;
    }
    orig(...args);
  };
  return () => {
    console.error = orig;
  };
}

// react-globe.gl uses h3-js to tile polygons into hex cells. h3's polyfill
// fails on Antarctica because its main polygon both wraps the antimeridian
// and touches the south pole, both edge cases the algorithm doesn't handle.
// Rebuild Antarctica from its actual coastline points: bin them by longitude
// sector, then emit one polygon per sector with the real coast as the
// northern edge and a clean lat=-88 floor that h3 can tile cleanly.
const ANTARCTICA_FLOOR = -88;
const ANTARCTICA_SECTOR_WIDTH = 30; // 12 sectors → each spans 30° of longitude

function rebuildAntarctica(
  feature: Feature<Geometry>
): Feature<Polygon>[] {
  const geom = feature.geometry;
  const coastPoints: [number, number][] = [];
  const visit = (ring: Position[]) => {
    for (const [lng, lat] of ring) {
      let l = lng;
      while (l < -180) l += 360;
      while (l > 180) l -= 360;
      // Skip the artificial pole-singularity vertices that Natural Earth
      // inserts at lat≈-89.999 to close polygons across the antimeridian.
      if (lat > ANTARCTICA_FLOOR + 1) coastPoints.push([l, lat]);
    }
  };
  if (geom.type === "MultiPolygon") {
    for (const poly of geom.coordinates) for (const ring of poly) visit(ring);
  } else if (geom.type === "Polygon") {
    for (const ring of geom.coordinates) visit(ring);
  }

  if (coastPoints.length === 0) return [];

  const sectors: Feature<Polygon>[] = [];
  for (let lng = -180; lng < 180; lng += ANTARCTICA_SECTOR_WIDTH) {
    const lng0 = lng;
    const lng1 = lng + ANTARCTICA_SECTOR_WIDTH;
    const inside = coastPoints
      .filter((p) => p[0] >= lng0 && p[0] <= lng1)
      .sort((a, b) => a[0] - b[0]);
    if (inside.length < 2) continue;
    // Northernmost coast latitude on each side, used to close the sector
    // walls so adjacent sectors butt up against one another instead of
    // leaving gaps where the coastline is highly variable.
    const leftLat = inside[0][1];
    const rightLat = inside[inside.length - 1][1];
    const ring: Position[] = [
      [lng0 + 0.001, leftLat],
      ...inside.map(([l, la]) => [l, la] as Position),
      [lng1 - 0.001, rightLat],
      [lng1 - 0.001, ANTARCTICA_FLOOR],
      [lng0 + 0.001, ANTARCTICA_FLOOR],
      [lng0 + 0.001, leftLat],
    ];
    sectors.push({
      type: "Feature",
      properties: { name: "Antarctica" },
      geometry: { type: "Polygon", coordinates: [ring] },
    });
  }
  return sectors;
}

function expandFeatures(features: Feature<Geometry>[]): Feature<Geometry>[] {
  const out: Feature<Geometry>[] = [];
  for (const f of features) {
    const name =
      typeof f.properties?.name === "string" ? f.properties.name : "";
    if (name === "Antarctica") {
      out.push(...rebuildAntarctica(f));
      continue;
    }
    out.push(f);
  }
  return out;
}


// react-globe.gl is window-bound; only load it on the client.
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type GlobeShellProps = {
  onCitySelect: (city: City) => void;
};

const AMBER = "#F4C430";

export default function GlobeShell({ onCitySelect }: GlobeShellProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [countries, setCountries] = useState<Feature<Geometry>[]>([]);
  const [ready, setReady] = useState(false);
  // Tri-state: undefined while we haven't probed yet (SSR + first paint),
  // true if WebGL is available, false if not. Avoids hydration mismatch.
  const [webglOk, setWebglOk] = useState<boolean | undefined>(undefined);
  const [globeFailed, setGlobeFailed] = useState(false);

  useEffect(() => {
    setWebglOk(detectWebGL());
    const restore = installWebGLErrorFilter();
    return restore;
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Seed size from layout in case the ResizeObserver's first callback
    // never lands (we've seen this happen in iframed previews where the
    // outer viewport boots at 0×0 and the inner element gets its size
    // before the observer is connected).
    const seed = el.getBoundingClientRect();
    if (seed.width > 0 && seed.height > 0) {
      setSize({ w: seed.width, h: seed.height });
    }
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        setSize({ w: width, h: height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/countries-50m.json")
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return;
        const fc = topojson.feature(
          topo,
          topo.objects.countries
        ) as unknown as FeatureCollection<Geometry> | Feature<Geometry>;
        const features =
          "features" in fc ? fc.features : [fc as Feature<Geometry>];
        setCountries(expandFeatures(features));
      })
      .catch(() => setCountries([]));
    return () => {
      cancelled = true;
    };
  }, []);

  const globeMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color("#0A0A0A"),
      emissive: new THREE.Color("#0E0E10"),
      shininess: 4,
      specular: new THREE.Color("#1A1410"),
    });
  }, []);

  function handleReady() {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = true;
    controls.minDistance = 180;
    controls.maxDistance = 600;

    g.pointOfView({ lat: 30, lng: 10, altitude: 2.4 }, 0);
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __globe?: GlobeMethods }).__globe = g;
    }
    setReady(true);
  }

  function handlePointClick(point: object) {
    const city = point as City;
    const g = globeRef.current;
    if (g) {
      g.controls().autoRotate = false;
      g.pointOfView(
        { lat: city.lat, lng: city.lng, altitude: 0.9 },
        1400
      );
    }
    setTimeout(() => onCitySelect(city), 300);
  }

  useEffect(() => {
    if (!ready) return;
    const el = wrapRef.current;
    if (!el) return;
    const stop = () => {
      const g = globeRef.current;
      if (g) g.controls().autoRotate = false;
    };
    el.addEventListener("pointerdown", stop, { passive: true });
    return () => el.removeEventListener("pointerdown", stop);
  }, [ready]);

  // Pause the WebGL render loop when the globe scrolls out of view, and
  // resume it on the way back in. react-globe.gl renders continuously even
  // when off-screen, which burns ~10% CPU and prevents the OS from
  // throttling the page. Skipping that work when the user has scrolled
  // past makes the rest of the page noticeably smoother on lower-end
  // devices.
  useEffect(() => {
    if (!ready) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const g = globeRef.current;
        if (!g) return;
        if (entry.isIntersecting) {
          g.resumeAnimation?.();
        } else {
          g.pauseAnimation?.();
        }
      },
      { threshold: 0 }
    );
    io.observe(el);
    // Also pause when the page is hidden (tab switch / lock screen) so the
    // animation doesn't keep spinning in the background.
    const onVisibility = () => {
      const g = globeRef.current;
      if (!g) return;
      if (document.hidden) g.pauseAnimation?.();
      else g.resumeAnimation?.();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ready]);

  return (
    <div
      ref={wrapRef}
      className="globe-shell relative h-full w-full select-none overflow-hidden"
    >
      {size.w > 0 && size.h > 0 && webglOk === true && !globeFailed && (
        <ErrorBoundary
          fallback={<GlobeFallback />}
          onError={() => setGlobeFailed(true)}
        >
          <Globe
            ref={globeRef}
            width={size.w}
            height={size.h}
            backgroundColor="rgba(0,0,0,0)"
            globeMaterial={globeMaterial}
            showAtmosphere={true}
            atmosphereColor={AMBER}
            atmosphereAltitude={0.18}
            hexPolygonsData={countries}
            hexPolygonResolution={3}
            hexPolygonMargin={0.55}
            hexPolygonUseDots={true}
            hexPolygonColor={() => "rgba(242, 239, 232, 0.55)"}
            pointsData={cities}
            pointLat={(d: object) => (d as City).lat}
            pointLng={(d: object) => (d as City).lng}
            pointAltitude={0.012}
            pointRadius={0.42}
            pointColor={() => AMBER}
            pointResolution={6}
            pointLabel={(d: object) => {
              const c = d as City;
              return `
                <div style="
                  font-family: ui-monospace, monospace;
                  background: #050505;
                  border: 1px solid rgba(244,196,48,0.6);
                  color: #F4C430;
                  padding: 6px 10px;
                  font-size: 11px;
                  letter-spacing: 0.18em;
                  text-transform: uppercase;
                ">
                  <div>${c.iata} · ${c.name}</div>
                  <div style="color:#F2EFE8;opacity:0.55;margin-top:2px;letter-spacing:0.1em;">
                    Click to enter
                  </div>
                </div>
              `;
            }}
            onPointClick={handlePointClick}
            onGlobeReady={handleReady}
            enablePointerInteraction={true}
            animateIn={false}
          />
        </ErrorBoundary>
      )}

      {(webglOk === false || globeFailed) && <GlobeFallback />}

      <div className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 board-text text-[10px] text-amber-board/70">
        DRAG · ZOOM · SELECT
      </div>
    </div>
  );
}

/**
 * Rendered when WebGL is unavailable or the live Globe crashes. Keeps the
 * page's atmosphere and visual rhythm without the 3D canvas: an amber-glow
 * disc, a hairline orbit, and a "TRACKING" label that matches the
 * departures-board language. Pins on the city list section still work, so
 * the user is never locked out of the content.
 */
function GlobeFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <div
        className="relative aspect-square w-[min(82vmin,720px)] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(244,196,48,0.07) 0%, rgba(244,196,48,0.02) 55%, transparent 70%)",
          boxShadow:
            "inset 0 0 120px rgba(244,196,48,0.06), 0 0 80px rgba(244,196,48,0.06)",
        }}
      >
        <div
          className="absolute inset-[6%] rounded-full border border-amber-board/15"
          style={{ borderStyle: "dashed" }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="board-text text-[11px] text-amber-board animate-glow">
              ◇ TRACKING
            </p>
            <p className="board-text mt-2 text-[10px] text-bone/55">
              GLOBE OFFLINE · BROWSE BELOW
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
