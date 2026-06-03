"use client";

import { useState } from "react";

type Props = {
  /** Full URL to a logo image (overrides website-derived favicon). */
  logoUrl?: string;
  /** Place website; used to derive a favicon URL via Google's S2 API. */
  website?: string;
  /** 2–4 letter fallback shown when no logo is available or load fails. */
  monogram: string;
  /** Accessible name. */
  alt: string;
};

function domainFor(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function faviconFor(website?: string): string | null {
  if (!website) return null;
  const d = domainFor(website);
  return d ? `https://www.google.com/s2/favicons?domain=${d}&sz=128` : null;
}

/**
 * Renders a square logo tile for a Place. Tries the explicit logoUrl first,
 * then derives a favicon from the place's website domain (via Google's
 * stable favicons service), then falls back to a monogram box matching the
 * existing airport-board styling.
 */
export function PlaceLogo({ logoUrl, website, monogram, alt }: Props) {
  const [imgError, setImgError] = useState(false);
  const src = logoUrl ?? faviconFor(website);

  if (src && !imgError) {
    return (
      <span className="grid h-7 w-7 place-items-center overflow-hidden border border-rule bg-bone p-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={28}
          height={28}
          onError={() => setImgError(true)}
          className="h-full w-full object-contain"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </span>
    );
  }

  return (
    <span className="grid h-7 min-w-[28px] place-items-center border border-amber-board/60 px-1.5 board-text text-[10px] tracking-board text-amber-board">
      {monogram.toUpperCase()}
    </span>
  );
}
