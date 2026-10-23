import type { CSSProperties } from "react";
import { lineup, type Tone } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "./icons";
import { Eyebrow } from "./ui";

export const toneBg: Record<Tone, string> = {
  yellow: "bg-yellow",
  violet: "bg-violet",
  pink: "bg-pink",
  mint: "bg-mint",
  muted: "bg-muted",
};

export function Lineup() {
  return (
    <section id="line-up" aria-labelledby="lineup-title" className="container-narrow">
      <div className="reveal">
        <Eyebrow>{lineup.eyebrow}</Eyebrow>
        <h2
          id="lineup-title"
          className="mt-[5px] font-display text-h2 font-black uppercase lg:mt-2"
        >
          {lineup.title}
        </h2>
      </div>

      <ul className="mt-[26px] border-t-2 border-white lg:mt-9">
        {lineup.artists.map((artist, i) => {
          const guests = artist.set === null;
          const body = (
            <>
              <span className="lg:flex lg:items-baseline lg:gap-5">
                <span
                  className={cn(
                    "block font-condensed text-artist leading-[0.92] font-black uppercase transition-[translate] duration-500 ease-out-expo lg:leading-none",
                    guests ? "text-muted" : "group-hover:translate-x-2",
                  )}
                >
                  {artist.name}
                </span>
                <span className="mt-[5px] block text-meta font-medium text-muted lg:mt-0">
                  <span aria-hidden="true" className="max-lg:hidden">
                    /{" "}
                  </span>
                  {artist.genre && (
                    <>
                      {artist.genre}
                      <span aria-hidden="true"> · </span>
                      <span className="sr-only">, </span>
                    </>
                  )}
                  {artist.note}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="ml-auto flex items-center gap-2 self-start pt-[14px] lg:gap-4 lg:self-center lg:pt-0"
              >
                <span
                  className={cn(
                    "size-3 rounded-full transition-[scale] duration-500 ease-out-expo group-hover:scale-150 lg:size-3.5",
                    toneBg[artist.tone],
                  )}
                />
                <ArrowUpRight
                  className={cn(
                    "mr-0.5 size-[15px] transition-[translate] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 lg:mr-[11px] lg:size-5",
                    guests && "opacity-40",
                  )}
                />
              </span>
            </>
          );
          const row = "group flex pt-2.5 pb-2 lg:pt-2.5 lg:pb-6";
          return (
            <li
              key={artist.name}
              className="reveal border-b border-grid"
              style={{ "--reveal-i": i } as CSSProperties}
            >
              {artist.set ? (
                <a href={`#set-${artist.set}`} className={row}>
                  {body}
                </a>
              ) : (
                <div className={row}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
