import { cities, places } from "@/data/places";
import { FlipText } from "@/components/flip-text";

const COPY = `Roam takes Aaltoes' most active students and volunteers into the world's leading startup ecosystems. Each delegation is a working trip, not a tour: outreach, scheduling, budgeting, pitching, and learning to operate under pressure are all done in the open, in the field, alongside the people who built these ecosystems.

Silicon Valley remains the original anchor, the trip that has shaped Aaltoes since 2009. We are now widening the orbit to Stockholm, London, and inland Europe, forging the connections that let Finnish founders move at world-class speed without leaving Europe behind.`;

export function AboutSection() {
  const countBy = (kind: string) =>
    places.filter((p) => p.kind === kind).length;
  const countryCount = new Set(cities.map((c) => c.countryCode)).size;
  const cityCount = cities.length;

  const stats = [
    { value: countBy("Startup"), label: "Startups" },
    { value: countBy("Founder House"), label: "Founder Houses" },
    { value: countBy("Big Tech"), label: "Big Tech" },
    { value: countBy("VC"), label: "VCs" },
    { value: countBy("Accelerator"), label: "Accelerators" },
    { value: countBy("Entrepreneurship Society"), label: "E. Societies" },
    { value: countBy("Alumni"), label: "Alumni" },
    { value: cityCount, label: "Cities" },
    { value: countryCount, label: "Countries" },
  ];

  return (
    <section
      id="about"
      className="roam-section relative w-full border-t border-rule bg-ink"
    >
      <div className="mx-auto max-w-6xl px-8 py-28">
        <div className="mb-16 flex items-end justify-between border-b border-rule pb-6">
          <div>
            <p className="board-text text-amber-board text-[11px]">
              ROAM <span className="diamond" /> AALTOES SERIES
            </p>
            <h2 className="display-headline mt-3 text-5xl text-bone md:text-[6rem]">
              <FlipText staggerMs={28} flipMs={65} cycles={12}>
                We send our <em>most</em> <strong>promising</strong> people{" "}
                <em>where the work is.</em>
              </FlipText>
            </h2>
          </div>
          <span className="board-text hidden text-[10px] text-muted md:inline">
            EST. 2009
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            {COPY.split("\n\n").map((p, i) => (
              <p
                key={i}
                className="mb-6 max-w-prose text-[17px] leading-[1.7] text-bone/85"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="md:col-span-5">
            <div className="border border-rule">
              <div className="flex items-center justify-between border-b border-rule px-5 py-3">
                <span className="board-text text-[10px] text-amber-board">
                  COHORT LOG
                </span>
                <span className="board-text text-[10px] text-muted">
                  ALL TIME
                </span>
              </div>
              <div className="grid grid-cols-3 divide-x divide-rule">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col gap-1 px-4 py-5 ${
                      i < stats.length - 3 ? "border-b border-rule" : ""
                    }`}
                  >
                    <span className="board-text text-amber-board text-[34px] leading-none">
                      {String(s.value).padStart(2, "0")}
                    </span>
                    <span className="board-text text-[9px] text-bone/60">
                      {s.label.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-muted">
              Numbers reflect places visited across all Roam delegations to date, Silicon Valley, Stockholm, London, and the European interrail with TRES & LUTES.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
