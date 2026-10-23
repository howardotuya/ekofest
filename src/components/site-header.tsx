import Link from "next/link";
import { hero, marquee, nav } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./mobile-menu";
import { underline, yellowButton } from "./ui";

/** The mint strip above the header. Decorative: the same facts are in the hero. */
function TopMarquee() {
  const item = marquee.join("  —  ") + "  —";
  return (
    <div className="marquee flex h-8 items-center overflow-hidden bg-mint text-black lg:h-10">
      <div aria-hidden="true" className="marquee-track [--marquee-duration:60s]">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={i}
                className="pr-[1.33em] text-marquee font-bold whitespace-pre uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <>
      <TopMarquee />
      {/* 15.5px + the 40px menu button centres the row where Figma's 31px row sits. */}
      <header className="container-page flex items-center pt-[15.5px] lg:pt-8">
        <Link
          href="/"
          prefetch={false}
          className="font-condensed text-logo leading-[0.92] font-black uppercase lg:leading-none lg:tracking-[-0.03em]"
        >
          Èkó Fest
        </Link>

        <nav aria-label="Main" className="ml-auto max-lg:hidden">
          <ul className="flex gap-9 leading-normal font-medium">
            {nav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={underline}>
                  {link.label}.
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={hero.cta.href}
          className={cn(
            yellowButton,
            // Figma's gap between the nav and the button: 191px at 1440, 60px at 1024.
            "ml-[clamp(60px,31.49vw-262.5px,191px)] px-6 py-3 text-[15px] leading-[normal] uppercase max-lg:hidden",
          )}
        >
          Get tickets
        </a>

        <a
          href={hero.cta.href}
          className={cn(yellowButton, "ml-auto px-3.5 py-2 text-xs leading-[normal] uppercase shadow-none lg:hidden")}
        >
          Tickets
        </a>
        <MobileMenu />
      </header>
    </>
  );
}
