import type { CSSProperties } from "react";
import { route, type Night } from "@/content/site";
import { cn } from "@/lib/cn";
import { StarSticker } from "./icons";
import { Eyebrow } from "./ui";

/*
 * Desktop artwork, in Figma px (1440 × 820, origin 2500px down the frame).
 * The road snakes right, U-turns, runs left, U-turns and runs right again.
 */
const ROAD =
  "M240 100H1200C1243.76 100 1285.73 117.38 1316.67 148.33C1347.62 179.27 1365 221.24 1365 265C1365 308.76 1347.62 350.73 1316.67 381.67C1285.73 412.62 1243.76 430 1200 430H240C196.24 430 154.27 447.38 123.33 478.33C92.38 509.27 75 551.24 75 595C75 638.76 92.38 680.73 123.33 711.67C154.27 742.62 196.24 760 240 760H1200";
const LANES =
  "M240 100H241M1200 760H1199M359 100H361M479 100H481M599 100H601M719 100H721M839 100H841M959 100H961M1079 100H1081M1199 100H1200C1200.36 100 1200.72 100 1201.08 100M1315.91 147.57C1316.16 147.82 1316.42 148.07 1316.67 148.33C1316.93 148.58 1317.18 148.84 1317.43 149.09M1365 263.92C1365 264.28 1365 264.64 1365 265C1365 265.36 1365 265.72 1365 266.08M1317.43 380.91C1317.18 381.16 1316.93 381.42 1316.67 381.67C1316.42 381.93 1316.16 382.18 1315.91 382.43M1201.08 430C1200.72 430 1200.36 430 1200 430H1199M1081 430H1079M961 430H959M841 430H839M721 430H719M601 430H599M481 430H479M361 430H359M241 430H240C239.64 430 239.28 430 238.92 430M124.09 477.57C123.84 477.82 123.58 478.07 123.33 478.33C123.07 478.58 122.82 478.84 122.57 479.09M75 593.92C75 594.28 75 594.64 75 595C75 595.36 75 595.72 75 596.08M122.57 710.91C122.82 711.16 123.07 711.42 123.33 711.67C123.58 711.93 123.84 712.18 124.09 712.43M238.92 760C239.28 760 239.64 760 240 760H241M359 760H361M479 760H481M599 760H601M719 760H721M839 760H841M959 760H961M1079 760H1081";

const ROW_Y = [100, 430, 760];
const STOP_X = [240, 1200, 240];
const SET_X = [405, 615, 825, 1035];
// Straight runs are 960px and each U-turn is a 165px-radius half circle.
const LEG = 960 + Math.PI * 165;
const LENGTH = 3 * 960 + 2 * Math.PI * 165;

/** How far along the road (0–1) a point on night `n`'s straight run is. */
function along(n: number, x: number) {
  return (n * LEG + (n % 2 ? STOP_X[1]! - x : x - STOP_X[0]!)) / LENGTH;
}

const toneFill: Record<Night["tone"], string> = {
  yellow: "bg-yellow text-black",
  violet: "bg-violet-deep text-white",
  pink: "bg-pink text-black",
};

/** Figma px custom properties for desktop placement. */
const at = (x: number, y: number) => ({ "--x": x, "--y": y }) as CSSProperties;
const placed =
  "lg:absolute lg:top-[calc(var(--y)*var(--spacing))] lg:left-[calc(var(--x)*var(--spacing))] lg:-translate-1/2";

function NightStops({ night, n }: { night: Night; n: number }) {
  const x = STOP_X[n]!;
  const y = ROW_Y[n]!;
  const f = along(n, x).toFixed(4);
  // Sets run right to left on the middle night.
  const xs = n % 2 ? [...SET_X].reverse() : SET_X;

  return (
    <li className="pb-14 last:pb-0 lg:p-0">
      <h3 className="flex items-center gap-6 pl-3.5 lg:block lg:p-0">
        <span
          aria-hidden="true"
          data-f={f}
          className={cn(
            "relative z-10 flex size-[72px] shrink-0 pop items-center justify-center rounded-full border-5 border-black bg-cream font-display text-[22px] leading-none font-black tracking-[-0.02em] text-black",
            "lg:size-96 lg:border-6 lg:text-u-30",
            placed,
          )}
          style={at(x, y)}
        >
          {night.stop}
        </span>
        <span
          data-f={f}
          className={cn(
            "pop rounded-pill px-3 py-[5px] text-xs leading-[normal] font-bold uppercase",
            "lg:px-14 lg:py-6 lg:text-u-14 lg:whitespace-nowrap",
            placed,
            toneFill[night.tone],
          )}
          style={at(x, y - 77)}
        >
          <span aria-hidden="true">
            {night.day} {night.date}
          </span>
          <span className="sr-only">{night.label}</span>
        </span>
      </h3>

      <ol className="mt-7 ml-[100px] grid gap-5 lg:m-0 lg:block">
        {night.sets.map((set, i) => {
          const headliner = i === night.sets.length - 1;
          const sx = xs[i]!;
          return (
            <li
              key={set.time + set.act}
              id={set.id ? `set-${set.id}` : undefined}
              className={cn(
                "flex h-[76px] scroll-mt-[30vh] flex-col justify-center rounded-[14px] pl-4 target:animate-[flash_1.6s_var(--ease-out-expo)] [&.is-target]:animate-[flash_1.6s_var(--ease-out-expo)]",
                headliner ? toneFill[night.tone] : "border border-grid bg-panel pl-[15px]",
                // Desktop: a label on the road, centred on it; headliners get a box.
                "lg:h-44 lg:flex-row lg:items-center lg:justify-center lg:rounded-none lg:bg-transparent lg:p-0 lg:text-black",
                headliner
                  ? "lg:w-202 lg:border-[calc(2.5*var(--spacing))] lg:border-black"
                  : "lg:w-210 lg:border-0",
                placed,
              )}
              style={at(sx, ROW_Y[n]!)}
            >
              <span
                className={cn(
                  "text-xs leading-[normal] font-bold",
                  !headliner && "text-muted",
                  "lg:mr-[0.45em] lg:font-condensed lg:text-u-26 lg:leading-none lg:font-black lg:text-black",
                )}
              >
                {set.time}
              </span>
              <span
                className={cn(
                  "mt-[3px] font-condensed text-[26px] leading-[normal] font-black uppercase",
                  !headliner && "text-white",
                  "lg:mt-0 lg:text-u-26 lg:leading-none lg:text-black",
                )}
              >
                {set.act}
              </span>
            </li>
          );
        })}
      </ol>
    </li>
  );
}

/**
 * The schedule as a road. Desktop draws Figma's snaking road; smaller screens a
 * vertical road with a card per set. As you scroll, a yellow progress line fills
 * the road's dark edge (a scroll-driven animation on --p, or route-script.tsx
 * where that's missing) and each day stop pops in as the line reaches it.
 */
export function Route() {
  return (
    <section id="schedule" aria-labelledby="route-title">
      <div className="container-narrow reveal">
        <Eyebrow>{route.eyebrow}</Eyebrow>
        <h2 id="route-title" className="mt-[5px] font-display text-h2 font-black uppercase lg:mt-2">
          {route.title}
        </h2>
        <p className="mt-3 text-intro text-muted lg:mt-[26px]">{route.intro}</p>
      </div>

      <div className="@container mx-auto mt-14 max-w-[1440px] lg:mt-[13px]">
        <div
          data-route=""
          className="relative route-progress max-lg:container-page lg:h-[calc(100cqi*820/1440)] lg:[--spacing:calc(100cqi/1440)]"
        >
          {/*
            Desktop road. The yellow stroke is the progress line: drawn from 0 to
            --p under the cream surface, so it shows as the road's two edges.
          */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1440 820"
            fill="none"
            className="absolute inset-0 size-full max-lg:hidden"
          >
            <path d={ROAD} stroke="#2C2C30" strokeWidth="104" />
            <path
              d={ROAD}
              pathLength={1}
              stroke="#F4F046"
              strokeWidth="104"
              className="[stroke-dasharray:1] [stroke-dashoffset:calc(1-var(--p))]"
            />
            <path d={ROAD} stroke="#F6EED8" strokeWidth="92" />
            <path d={LANES} stroke="#CFC5AB" strokeWidth="92" />
          </svg>

          {/* Mobile road: tarmac edge (yellow down to --p), cream surface, a lane mark every 74px. */}
          <div
            aria-hidden="true"
            className="absolute top-[-28px] bottom-[22px] left-[18px] w-16 rounded-full bg-tarmac p-1 lg:hidden"
          >
            <div className="absolute inset-0 rounded-full bg-yellow [clip-path:inset(0_0_calc((1-var(--p))*100%)_0_round_32px)]" />
            <div className="relative size-full rounded-full bg-cream bg-[repeating-linear-gradient(to_bottom,transparent_0_73px,var(--color-lane)_73px_75px)] bg-position-[0_29px]" />
          </div>

          <StarSticker className="absolute top-463 left-1305 size-70 -rotate-10 max-lg:hidden" />

          <ol aria-label="Three nights" className="relative lg:static">
            {route.nights.map((night, n) => (
              <NightStops key={night.stop} night={night} n={n} />
            ))}
          </ol>

          <p className="mt-4 pl-4 font-display text-lg leading-none font-black tracking-[-0.01em] text-yellow uppercase lg:absolute lg:top-746 lg:left-1270 lg:m-0 lg:p-0 lg:text-u-22">
            {route.finish}
          </p>
        </div>
      </div>
    </section>
  );
}
