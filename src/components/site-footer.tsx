import { footer } from "@/content/site";
import { MaybeLink, underline } from "./ui";

// "EVENT OF THE YEAR • " twice round the ring, one glyph every 9° as in Figma.
const RING = Array.from(`${footer.badge} • `.repeat(2).toUpperCase());

/** The rotating "Event of the year" badge. Decorative. */
function Badge({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 220" className={className}>
      <circle cx="110" cy="110" r="106" fill="#0B0B0C" />
      <g
        className="origin-center fill-yellow font-sans text-[15px] font-bold motion-safe:animate-[spin_24s_linear_infinite]"
        textAnchor="middle"
      >
        {RING.map((char, i) => (
          <text key={i} x="110" y="35.5" transform={`rotate(${i * 9} 110 110)`}>
            {char}
          </text>
        ))}
      </g>
      <circle cx="110" cy="110" r="46" fill="#F4F046" />
      <path d="m110 70 8 32 32 8-32 8-8 32-8-32-32-8 32-8 8-32Z" fill="#0B0B0C" />
    </svg>
  );
}

export function SiteFooter() {
  const [first, second] = footer.title;
  return (
    <footer className="surface-light mt-10 bg-yellow text-black lg:mt-[60px]">
      <div className="relative container-page pt-[50px] pb-[54px] lg:pt-[90px] lg:pb-[50px]">
        <p className="font-display text-footer font-black tracking-[-0.03em] uppercase lg:tracking-[-0.05em]">
          {first}
          <br />
          {second}
        </p>
        <Badge className="absolute top-20 right-0 size-[clamp(160px,15.28vw,220px)] max-lg:hidden" />

        <p className="mt-[50px] text-info font-bold lg:mt-[70px]">
          <span className="max-lg:block">{footer.dates}</span>
          <span aria-hidden="true" className="mx-[0.6em] max-lg:hidden">
            ·
          </span>
          <span className="max-lg:block">{footer.place}</span>
        </p>
        <nav aria-label="Footer" className="mt-[25px] lg:mt-[13px]">
          <ul className="flex flex-wrap gap-x-[0.9em] gap-y-1 text-links font-medium">
            {footer.links.map((link) => (
              <li key={link.label}>
                <MaybeLink href={link.href} className={link.href ? underline : undefined}>
                  {link.label}.
                </MaybeLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-[39px] text-legal lg:mt-9">{footer.legal}</p>
      </div>
    </footer>
  );
}
