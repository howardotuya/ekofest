import type { Ticket } from "@/content/site";
import { cn } from "@/lib/cn";

export const ticketFill: Record<Ticket["tone"], string> = {
  mint: "bg-mint text-black",
  // White small text on the Figma violet fails AA; see --color-violet-deep.
  violet: "bg-violet-deep text-white",
  pink: "bg-pink text-black",
};

/** Concentric rings centred on a card's top-right corner. */
export function Rings({ light, className }: { light?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 245 245"
      fill="none"
      stroke={light ? "white" : "#0B0B0C"}
      strokeOpacity="0.12"
      className={cn("pointer-events-none absolute top-0 right-0", className)}
    >
      {/* Mobile draws three rings (50/100/150), desktop four (60–240). */}
      <g strokeWidth="8" className="lg:hidden">
        <circle cx="245" cy="0" r="50" />
        <circle cx="245" cy="0" r="100" />
        <circle cx="245" cy="0" r="150" />
      </g>
      <g strokeWidth="10" className="max-lg:hidden">
        <circle cx="245" cy="0" r="60" />
        <circle cx="245" cy="0" r="120" />
        <circle cx="245" cy="0" r="180" />
        <circle cx="245" cy="0" r="240" />
      </g>
    </svg>
  );
}
