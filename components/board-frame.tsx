/**
 * The "airport sign" frame used at the top of the departures section
 * and re-used for modal headers. Yellow plane glyph + DEPARTURES label.
 */
export function BoardFrame({
  label = "DEPARTURES",
  right,
}: {
  label?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-rule pb-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-7 w-7 place-items-center bg-amber-board"
        >
          <PlaneGlyph />
        </span>
        <span className="board-text text-bone text-[20px] font-semibold tracking-board">
          {label}
        </span>
      </div>
      {right}
    </div>
  );
}

function PlaneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="#050505"
      strokeWidth="2.2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M2 13l9-3-2-7 2 0 4 6 7-2 0 3-7 2-4 6-2 0 2-7-9-3z" />
    </svg>
  );
}
