import type { CSSProperties } from "react";
import { partners } from "@/content/site";
import { cn } from "@/lib/cn";

// Sticker colour, tilt and centre (Figma px, from the top of the cluster) per
// partner, in content order.
const stickers = [
  { fill: "bg-yellow text-black", tilt: 8, x: 409.5, y: 79.5 },
  { fill: "bg-white text-black", tilt: -6, x: 687.7, y: 38.9 },
  // White on Figma violet passes AA only as large text (≥18.7px bold, 1222px+).
  { fill: "bg-violet-deep text-white min-[1222px]:bg-violet", tilt: 5, x: 978.6, y: 85 },
  { fill: "bg-mint text-black", tilt: -8, x: 319.1, y: 330 },
  { fill: "bg-pink text-black", tilt: 6, x: 635.9, y: 376.1 },
  { fill: "bg-orange text-black", tilt: -5, x: 916.9, y: 343.1 },
  { fill: "bg-white text-black", tilt: 10, x: 1177.5, y: 262.1 },
  { fill: "bg-cream text-black", tilt: -7, x: 220.9, y: 185.9 },
];

/**
 * "Made possible by": partner stickers scattered around the title on desktop,
 * a loose cluster under it on smaller screens. Hover wobbles a sticker and
 * lights it with the yellow glow.
 */
export function Partners() {
  return (
    <section
      aria-labelledby="partners-title"
      className="@container relative mx-auto max-w-[1440px] px-(--gutter) lg:px-0"
    >
      <div className="relative lg:h-[calc(100cqi*414/1440)] lg:[--spacing:calc(100cqi/1440)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-[min(560px,120%)] -translate-1/2 bg-[radial-gradient(closest-side,rgb(244_240_70/0.28),rgb(244_240_70/0))] lg:top-218 lg:h-320 lg:w-700"
        />
        <h2
          id="partners-title"
          className="reveal relative text-center font-display text-partners font-black uppercase lg:absolute lg:inset-x-0 lg:top-188 lg:text-u-40"
        >
          {partners.title}
        </h2>
        <ul className="relative mt-8 flex flex-wrap justify-center gap-x-2.5 gap-y-4 lg:static lg:mt-0">
          {partners.names.map((name, i) => {
            const s = stickers[i]!;
            return (
              <li
                key={name}
                className="lg:absolute lg:top-[calc(var(--y)*var(--spacing))] lg:left-[calc(var(--x)*var(--spacing))] lg:-translate-1/2"
                style={{ "--x": s.x, "--y": s.y } as CSSProperties}
              >
                <span
                  className={cn(
                    "block rounded-[8px] px-[18px] py-[11px] text-base leading-[normal] font-bold whitespace-nowrap",
                    "lg:rounded-u-10 lg:px-28 lg:py-16 lg:text-u-22",
                    "rotate-(--tilt) transition-shadow duration-300 hover:shadow-[0_0_36px_rgb(244_240_70/0.55)]",
                    "motion-safe:hover:animate-[wobble_650ms_var(--ease-out-expo)]",
                    s.fill,
                  )}
                  style={{ "--tilt": `${s.tilt}deg` } as CSSProperties}
                >
                  {name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
