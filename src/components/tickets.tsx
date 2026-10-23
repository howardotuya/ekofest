import type { CSSProperties } from "react";
import { formatNaira, tickets, type Ticket } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowRight, SmileySticker, StarGlyph } from "./icons";
import { Rings, ticketFill } from "./ticket-parts";
import { Eyebrow, Price, pressable } from "./ui";

function TicketCard({ ticket, index }: { ticket: Ticket; index: number }) {
  const light = ticket.tone === "violet";
  return (
    <li
      className={cn(
        "reveal @container",
        // Mobile shows VIP first, as in the mobile frame.
        ticket.id === "vip" && "max-lg:order-first",
      )}
      style={{ "--reveal-i": index } as CSSProperties}
    >
      <article
        aria-labelledby={`ticket-${ticket.id}`}
        className={cn(
          "surface-light relative flex h-full flex-col overflow-hidden rounded-[28px] p-6",
          "transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-[0_24px_48px_rgb(0_0_0/0.45)] focus-within:-translate-y-2",
          // Desktop cards are Figma's 356 × 540 card, scaled to the column.
          "lg:min-h-[calc(100cqi*540/356)] lg:rounded-[calc(100cqi*32/356)] lg:p-[calc(100cqi*30/356)] lg:pb-[calc(100cqi*32/356)] lg:[--spacing:calc(100cqi/356)]",
          ticketFill[ticket.tone],
        )}
      >
        <Rings light={light} className="size-[245px] lg:size-245" />
        <h3
          id={`ticket-${ticket.id}`}
          className="relative mt-0.5 font-display text-[26px] leading-[normal] font-black uppercase lg:mt-1 lg:text-u-30"
        >
          {ticket.name}
        </h3>
        <p className="relative mt-2 text-sm leading-[normal] font-medium lg:mt-11 lg:text-[max(0.875rem,calc(var(--spacing)*15))]">
          {ticket.note}
        </p>
        <p className="relative mt-4 lg:mt-29">
          <Price className="text-[40px] leading-[normal] tracking-[-0.04em] lg:text-u-48">
            {formatNaira(ticket.price)}
          </Price>
        </p>
        {/* Figma's dashed rule: 7.8px dashes and gaps, half a dash at each end. */}
        <hr
          aria-hidden="true"
          className="relative mt-24 h-[2px] shrink-0 border-0 bg-[repeating-linear-gradient(to_right,currentColor_0_7.79px,transparent_7.79px_15.58px)] max-lg:hidden"
          style={{ backgroundPosition: "-3.9px 0" }}
        />
        <ul className="relative mt-7 grid gap-[13px] text-[15px] leading-[normal] font-medium lg:mt-24 lg:gap-18 lg:text-[max(0.875rem,calc(var(--spacing)*16))]">
          {ticket.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-[0.6em]">
              <StarGlyph className="size-[0.95em] shrink-0" />
              {perk}
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-ticket={ticket.id}
          aria-haspopup="dialog"
          className={cn(
            pressable,
            "group/buy relative mt-auto h-[52px] w-full gap-1.5 rounded-pill lg:gap-2.5 bg-black text-sm font-bold text-white uppercase hover:bg-[#232327]",
            "max-lg:mt-[41px] lg:h-56 lg:text-[max(0.875rem,calc(var(--spacing)*15))]",
          )}
        >
          Buy {ticket.name}
          <ArrowRight className="size-[1em] transition-[translate] duration-300 ease-out-expo group-hover/buy:translate-x-1" />
        </button>
      </article>
    </li>
  );
}

export function Tickets() {
  return (
    <section id="tickets" aria-labelledby="tickets-title" className="container-narrow">
      <div className="reveal">
        <Eyebrow>{tickets.eyebrow}</Eyebrow>
        <h2
          id="tickets-title"
          className="mt-[5px] font-display text-h2 font-black uppercase lg:mt-2"
        >
          {tickets.title}
        </h2>
      </div>
      <div className="relative mt-[42px] lg:mt-[46px]">
        <ul className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {tickets.passes.map((ticket, i) => (
            <TicketCard key={ticket.id} ticket={ticket} index={i} />
          ))}
        </ul>
        <SmileySticker
          face="#F4F046"
          className="pointer-events-none absolute -top-10 -right-[38px] size-[90px] -rotate-12 max-lg:hidden"
        />
      </div>
    </section>
  );
}
