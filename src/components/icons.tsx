import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Stickers, cursors and the menu icon are the Figma exports. The glyph icons
// (★ → ↗ − ×) stand in for characters the brand fonts don't have.

/** Multiplayer-style cursor. `flip` points it up-right (Àdùnní) instead of up-left. */
export function Cursor({ flip, ...props }: IconProps & { flip?: boolean }) {
  return (
    <svg viewBox="0 0 26 26" aria-hidden="true" {...props}>
      <path
        d={
          flip
            ? "M23.833 2.167 2.167 10.833l9.75 3.25 3.25 9.75 8.666-21.666Z"
            : "M2.167 2.167 23.833 10.833l-9.75 3.25-3.25 9.75L2.167 2.167Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function StarSticker(props: IconProps) {
  return (
    <svg viewBox="0 0 110 110" aria-hidden="true" {...props}>
      <path d="M55 0 63.8 41.8 110 55 63.8 68.2 55 110 46.2 68.2 0 55 46.2 41.8 55 0Z" fill="#F4F046" />
    </svg>
  );
}

export function SmileySticker({ face = "#FF5FA2", ...props }: IconProps & { face?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" {...props}>
      <circle cx="60" cy="60" r="56" fill={face} stroke="#0B0B0C" strokeWidth="6" />
      <circle cx="42" cy="50" r="7" fill="#0B0B0C" />
      <circle cx="78" cy="50" r="7" fill="#0B0B0C" />
      <path
        d="M36 72c16 17.333 32 17.333 48 0"
        fill="none"
        stroke="#0B0B0C"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BoltSticker(props: IconProps) {
  return (
    <svg viewBox="0 0 80 120" aria-hidden="true" {...props}>
      <path
        d="M48 0 4 68h32l-10 52 50-76H44l4-44Z"
        fill="#8EF5AE"
        stroke="#0B0B0C"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.833"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.667 6.417h14.666M3.667 11h14.666M3.667 15.583h14.666" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.833"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m5.5 5.5 11 11m0-11-11 11" />
    </svg>
  );
}

/** The → after "Buy …" (Onest only has it in an extra font file). */
export function ArrowRight(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2.5 8h10.5M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}

/** The heavy ↗ on line-up rows (Unbounded has no arrows). */
export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M5.5 2.5h12v12h-4.2V9.7l-9.4 9.4-3-3 9.4-9.4H5.5V2.5Z" fill="currentColor" />
    </svg>
  );
}

/** The ★ before each ticket perk (not in Onest). */
export function StarGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m12 1.8 3.05 6.95 7.55.68-5.72 4.98 1.7 7.39L12 17.92l-6.58 3.88 1.7-7.39L1.4 9.43l7.55-.68L12 1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 8h10" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 8h10M8 3v10" />
    </svg>
  );
}
