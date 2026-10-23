import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Lineup } from "@/components/lineup";
import { Partners } from "@/components/partners";
import { Ribbons } from "@/components/ribbons";
import { Route } from "@/components/route";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { TicketSheet } from "@/components/ticket-sheet";
import { Tickets } from "@/components/tickets";

// Evaluated once at build time: the countdown's first frame before hydration.
const BUILT_AT = Math.floor(Date.now() / 1000);

export default function Home() {
  return (
    <div className="overflow-x-clip grid-bg">
      <SiteHeader />
      <main>
        <Hero builtAt={BUILT_AT} />
        <Ribbons />
        <Lineup />
        <div className="mt-16 lg:mt-[87px]">
          <Partners />
        </div>
        <div className="mt-16 lg:mt-[94px]">
          <Route />
        </div>
        <div className="mt-[42px] lg:mt-[140px]">
          <Tickets />
        </div>
        <div className="mt-14 lg:mt-[90px]">
          <Faq />
        </div>
      </main>
      <SiteFooter />
      <TicketSheet />
      <SmoothScroll />
    </div>
  );
}
