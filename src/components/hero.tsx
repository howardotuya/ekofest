import type { CSSProperties, ReactNode } from "react";
import { hero } from "@/content/site";
import { cn } from "@/lib/cn";
import { Countdown } from "./countdown";
import { BoltSticker, Cursor, SmileySticker, StarSticker } from "./icons";
import { yellowButton } from "./ui";

type Drift = { dx: string; dy: string; delay?: string };

/**
 * A multiplayer cursor with a name tag. It's absolutely positioned against one
 * headline line, outside that line's box, and only ever drifts further away
 * from it, so it can't overlap the headline at any width.
 */
function NameTag({
  name,
  flip,
  drift,
  className,
  tagClassName,
  cursorClassName,
}: {
  name: string;
  flip?: boolean;
  drift: Drift;
  className: string;
  tagClassName: string;
  cursorClassName: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute font-sans tracking-normal normal-case select-none",
        // Offsets are in em of the headline, so they scale with it.
        "motion-safe:animate-[drift_9s_ease-in-out_infinite]",
        className,
      )}
      style={{ "--dx": drift.dx, "--dy": drift.dy, animationDelay: drift.delay } as CSSProperties}
    >
      <Cursor flip={flip} className={cn("absolute", cursorClassName)} />
      <span
        className={cn(
          "absolute rounded-pill px-3 py-[5px] text-xs leading-[normal] font-bold whitespace-nowrap md:px-3.5 md:py-1.5 md:text-sm md:font-semibold",
          tagClassName,
        )}
      >
        {name}
      </span>
    </span>
  );
}

/** Headline line: the load-in rises line by line (the whole hero settles within 900ms). */
function Line({ i, className, children }: { i: number; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "relative block motion-safe:animate-[line-up_600ms_var(--ease-out-expo)_both] md:mx-auto md:w-fit",
        className,
      )}
      style={{ animationDelay: `${i * 70}ms` }}
    >
      {children}
    </span>
  );
}

/** Desktop stickers, positioned in Figma pixels relative to the headline's top. */
function Sticker({
  delay,
  className,
  children,
}: {
  delay: number;
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute motion-safe:animate-[pop_500ms_var(--ease-out-expo)_both]",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Hero({ builtAt }: { builtAt: number }) {
  const [[l1a, l1b] = [], [l2] = [], [l3a, l3b] = []] = hero.lines;
  return (
    <section aria-labelledby="hero-title" className="@container mx-auto max-w-[1440px]">
      <div className="relative container-page pt-[62.5px] md:w-full md:pt-[max(6.21cqi,72px)]">
        {/* Mobile sticker, top right above the headline. */}
        <SmileySticker className="absolute top-[15px] right-2 size-[70px] rotate-12 motion-safe:animate-[pop_500ms_var(--ease-out-expo)_300ms_both] md:hidden" />

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 [--spacing:calc(100cqi/1440)] max-md:hidden">
            <Sticker delay={250} className="top-50 left-81 size-145">
              <SmileySticker className="m-12.75 size-120 rotate-14 motion-safe:animate-[bob_6s_ease-in-out_infinite]" />
            </Sticker>
            <Sticker delay={300} className="top-76 left-1290 h-132 w-100">
              <BoltSticker className="mx-10 my-6 h-120 w-80 -rotate-10 motion-safe:animate-[bob_7s_ease-in-out_1s_infinite]" />
            </Sticker>
            <Sticker delay={350} className="top-237 left-1230 size-130">
              <StarSticker className="m-10 size-110 -rotate-12 motion-safe:animate-[bob_8s_ease-in-out_0.5s_infinite]" />
            </Sticker>
          </div>

          <h1
            id="hero-title"
            className={cn(
              "font-display font-black text-white uppercase",
              "text-[min(10.26vw,3.5rem)] leading-[0.98] tracking-[-0.03em]",
              "md:text-center md:text-[calc(100cqi*96/1440)] md:leading-[1.104] md:tracking-[-0.04em]",
            )}
          >
            <Line i={0}>
              {/* Desktop: Àdùnní hangs off the top-right corner of the first line. */}
              <NameTag
                name="Àdùnní"
                flip
                drift={{ dx: "10px", dy: "-7px" }}
                className="bottom-[calc(100%+0.01em)] left-[calc(100%+0.06em)] max-md:hidden"
                cursorClassName="bottom-[28px] left-[69px] size-[26px] text-yellow"
                tagClassName="bottom-0 left-0 bg-yellow text-black"
              />
              {l1a} <br className="md:hidden" />
              {l1b}
            </Line>
            <Line i={1} className="text-yellow">
              {l2}
            </Line>
            <Line i={2} className="text-violet">
              {/* Desktop: Bayo Kaze sits below-left of the third line. */}
              <NameTag
                name="Bayo Kaze"
                drift={{ dx: "-10px", dy: "8px", delay: "-4s" }}
                className="top-[calc(100%+0.18em)] left-[-1.2em] max-md:hidden"
                cursorClassName="top-0 left-0 size-[26px] text-violet"
                tagClassName="top-[22px] left-[20px] bg-violet-deep text-white"
              />
              {l3a} <br className="md:hidden" />
              <span className="relative inline-block align-top">
                {l3b}
                {/* Mobile: Bayo Kaze sits just right of "EARTH". */}
                <NameTag
                  name="Bayo Kaze"
                  drift={{ dx: "8px", dy: "-4px" }}
                  className="top-[-0.33em] left-[calc(100%+1em)] md:hidden"
                  cursorClassName="top-0 left-0 size-5 text-violet"
                  tagClassName="top-[18px] left-[20px] bg-violet-deep text-white"
                />
              </span>
            </Line>
          </h1>
        </div>

        <p
          className={cn(
            "mt-5 text-lead text-muted motion-safe:animate-[fade-up_600ms_var(--ease-out-expo)_200ms_both]",
            "md:mx-auto md:mt-[2.57cqi] md:w-[calc(100cqi*600/1440)] md:min-w-80 md:text-center",
          )}
        >
          {hero.description}
        </p>

        <Countdown
          builtAt={builtAt}
          className="mt-[42px] motion-safe:animate-[fade-up_600ms_var(--ease-out-expo)_260ms_both] md:mt-[max(2.99cqi,32px)]"
        />

        <div className="mt-[22px] motion-safe:animate-[fade-up_600ms_var(--ease-out-expo)_300ms_both] md:mt-[max(3.54cqi,40px)] md:text-center">
          <a
            href={hero.cta.href}
            className={cn(
              yellowButton,
              "h-14 w-full font-price text-[15px] uppercase max-md:shadow-none",
              "md:h-[51px] md:w-auto md:px-[30px] md:text-base",
            )}
          >
            {hero.cta.label}
            <span className="mx-[0.4em] md:mx-[0.6em]">·</span>
            {hero.cta.from}
          </a>
        </div>
      </div>
    </section>
  );
}
