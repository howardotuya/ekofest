"use client";

import { Fragment, useSyncExternalStore } from "react";
import { countdownUnits, OPENS_AT } from "@/content/site";
import { cn } from "@/lib/cn";

// Ticks once a second, on the second.
function subscribe(onTick: () => void) {
  let timer = window.setTimeout(function tick() {
    onTick();
    timer = window.setTimeout(tick, 1000 - (Date.now() % 1000));
  }, 1000 - (Date.now() % 1000));
  return () => window.clearTimeout(timer);
}

const nowInSeconds = () => Math.floor(Date.now() / 1000);

function remaining(seconds: number) {
  const left = Math.max(0, Math.floor(OPENS_AT / 1000) - seconds);
  return [Math.floor(left / 86400), Math.floor(left / 3600) % 24, Math.floor(left / 60) % 60, left % 60];
}

/**
 * Days, hours, minutes and seconds until the gates open. The static HTML holds
 * the build-time value (`builtAt`); hydration renders that same value, then
 * switches to the visitor's clock. Fixed-width boxes and tabular figures mean
 * the numbers can change without moving anything.
 */
export function Countdown({ builtAt, className }: { builtAt: number; className?: string }) {
  const seconds = useSyncExternalStore(subscribe, nowInSeconds, () => builtAt);
  const values = remaining(seconds);

  return (
    <div
      role="timer"
      aria-label="Time until the gates open on 12 December 2026, 4pm"
      className={cn(
        "grid grid-cols-4 gap-2 md:flex md:justify-center md:gap-0 md:text-count",
        className,
      )}
    >
      {countdownUnits.map((unit, i) => (
        <Fragment key={unit}>
          {i > 0 && (
            <span
              aria-hidden="true"
              className="w-[1em] text-center font-display text-[0.667em] leading-[1.5] font-black text-muted max-md:hidden"
            >
              :
            </span>
          )}
          <div className="flex flex-col items-center rounded-[14px] border border-grid bg-panel py-3 md:w-[2.5em] md:rounded-none md:border-0 md:bg-transparent md:p-0">
            <span className="font-display text-[1.875rem] leading-none font-black tracking-[-0.02em] tabular-nums md:text-[1em]">
              {String(values[i]).padStart(2, "0")}
            </span>
            <span
              aria-hidden="true"
              className="mt-[0.4em] h-[2px] w-[0.667em] bg-muted max-md:hidden"
            />
            <span className="mt-3.5 text-xs leading-normal font-medium text-muted md:mt-2.5 md:text-[clamp(0.8125rem,0.25em,0.9375rem)]">
              {unit}
            </span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
