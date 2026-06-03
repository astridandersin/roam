import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roam, Aaltoes",
  description:
    "Roam takes Aaltoes' most promising students and volunteers into the world's leading startup ecosystems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect so the first byte of Google Fonts comes back faster
            on cold loads (saves ~100ms on slow networks). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Trimmed to the fonts and weights actually used. Inter is body
            copy (weight 400 only), IBM Plex Mono is the .board-text label
            font (400/500/600 in case fallback kicks in when VT323 is still
            loading), and VT323 is the .display-headline dot-matrix font.
            `font-display=swap` lets text render in the fallback face
            immediately, so first paint isn't blocked on the font CSS. */}
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-bone antialiased">{children}</body>
    </html>
  );
}
