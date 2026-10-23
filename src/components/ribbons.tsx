import { ribbons } from "@/content/site";
import { cn } from "@/lib/cn";

function Ribbon({ text, className }: { text: string; className: string }) {
  return (
    <div
      className={cn(
        "marquee absolute left-1/2 flex h-[clamp(2.75rem,2.379rem+1.524vw,3.75rem)] w-[150vw] -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden",
        className,
      )}
    >
      <div className="marquee-track [--marquee-duration:50s]">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className="font-display text-ribbon leading-[normal] font-bold whitespace-pre uppercase"
              >
                {text}
                {"  —  "}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Two crossed ribbons under the hero, moving in opposite directions. Pure
 * decoration (the artists are listed right below), so hidden from assistive
 * tech. Hovering one pauses it; reduced motion stops both.
 */
export function Ribbons() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[clamp(214px,175px+10vw,319px)] overflow-x-clip select-none"
    >
      <Ribbon
        text={ribbons.tagline}
        className="top-[88px] -rotate-5 bg-white text-black lg:-rotate-4"
      />
      <Ribbon
        text={ribbons.artists.join(" · ")}
        className="top-[clamp(131px,110.6px+5.238vw,186px)] rotate-4 bg-violet-deep text-white [--marquee-direction:reverse] lg:rotate-3 lg:bg-violet"
      />
    </div>
  );
}
