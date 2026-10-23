"use client";

import { useEffect, useId, useRef, useState } from "react";
import { formatNaira, tickets, type Ticket } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowRight, CloseIcon, MinusIcon, PlusIcon } from "./icons";
import { pressable, yellowButton } from "./ui";
import { Rings, ticketFill } from "./ticket-parts";

// Not in Figma: agreed as a side sheet on desktop and a bottom sheet on mobile
// (the Bùkà pattern). No payments: "Pay" shows where Paystack would take over.

const MAX = 10;

const stepper =
  `${pressable} size-12 rounded-full border-[1.5px] border-white/25 text-white ` +
  "hover:border-white hover:bg-white/8 disabled:pointer-events-none disabled:opacity-30";

export function TicketSheet() {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const uid = useId();
  const [ticket, setTicket] = useState<Ticket>(tickets.passes[0]!);
  const [quantity, setQuantity] = useState(1);
  const [paid, setPaid] = useState(false);

  // Every "Buy …" button carries data-ticket; one listener opens the sheet.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const button = (event.target as Element).closest?.<HTMLElement>("[data-ticket]");
      const pass = tickets.passes.find((p) => p.id === button?.dataset.ticket);
      if (!button || !pass) return;
      returnFocus.current = button;
      setTicket(pass);
      setQuantity(1);
      setPaid(false);
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => dialog.current?.close();
  const total = formatNaira(ticket.price * quantity);

  return (
    // A click on the backdrop closes; keyboard users have Esc and the close button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialog}
      aria-labelledby={`${uid}-title`}
      onClose={() => returnFocus.current?.focus({ preventScroll: true })}
      onClick={(event) => event.target === dialog.current && close()}
      className={cn(
        "fixed inset-x-0 top-auto bottom-0 m-0 max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-[28px] border-t border-grid bg-black p-0 text-white backdrop:bg-black/70",
        "lg:inset-y-0 lg:right-0 lg:left-auto lg:h-dvh lg:max-h-none lg:w-[440px] lg:rounded-none lg:border-t-0 lg:border-l",
        // Slides up on small screens, in from the right on desktop.
        "transition-[translate,display,overlay] transition-discrete duration-500 ease-out-expo motion-reduce:transition-none",
        "translate-y-full open:translate-y-0 starting:open:translate-y-full",
        "lg:translate-x-full lg:translate-y-0 lg:open:translate-x-0 lg:starting:open:translate-x-full",
        "backdrop:transition-opacity backdrop:duration-500 starting:open:backdrop:opacity-0",
      )}
    >
      <div className="flex min-h-full flex-col gap-6 grid-bg px-5 pt-5 pb-8 lg:px-8 lg:pt-8">
        <div className="flex items-center justify-between">
          <p id={`${uid}-title`} className="text-eyebrow font-bold text-muted uppercase">
            Your tickets
          </p>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className={cn(pressable, "-mr-2 size-10 rounded-full hover:bg-white/8")}
          >
            <CloseIcon className="size-[22px]" />
          </button>
        </div>

        <div
          className={cn(
            "relative overflow-hidden rounded-[22px] p-6 surface-light",
            ticketFill[ticket.tone],
          )}
        >
          <Rings light={ticket.tone === "violet"} className="size-[245px]" />
          <h2 className="relative font-display text-[26px] leading-[normal] font-black uppercase">
            {ticket.name}
          </h2>
          <p className="relative mt-1 text-sm font-medium">{ticket.note}</p>
          <p className="relative mt-5 font-price text-[28px] leading-none font-bold tracking-[-0.03em]">
            {formatNaira(ticket.price)}
            <span className="ml-1.5 font-sans text-sm font-medium tracking-normal">each</span>
          </p>
        </div>

        <div
          role="group"
          aria-labelledby={`${uid}-qty`}
          className="flex items-center justify-between"
        >
          <p id={`${uid}-qty`} className="text-question font-bold">
            How many?
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="One fewer ticket"
              disabled={quantity <= 1 || paid}
              onClick={() => setQuantity((q) => q - 1)}
              className={stepper}
            >
              <MinusIcon className="size-4" />
            </button>
            <output
              aria-live="off"
              className="w-[2ch] text-center font-display text-[32px] leading-none font-black tabular-nums"
            >
              {quantity}
            </output>
            <button
              type="button"
              aria-label="One more ticket"
              disabled={quantity >= MAX || paid}
              onClick={() => setQuantity((q) => q + 1)}
              className={stepper}
            >
              <PlusIcon className="size-4" />
            </button>
          </div>
        </div>

        <dl className="grid grid-cols-[1fr_auto] items-baseline gap-y-2 border-t border-grid pt-5 text-answer text-muted">
          <dt>
            {quantity} × {ticket.name}
          </dt>
          <dd className="text-right font-price font-bold">{total}</dd>
          <dt className="text-question font-bold text-white">Total</dt>
          <dd
            aria-live="polite"
            aria-atomic="true"
            className="text-right font-price text-[32px] leading-none font-bold tracking-[-0.03em] text-white"
          >
            {total}
          </dd>
        </dl>

        <div className="mt-auto grid gap-3">
          {paid ? (
            <div
              role="status"
              className="rounded-[18px] border-[1.5px] border-dashed border-yellow/60 p-5 motion-safe:animate-[sheet-in_400ms_var(--ease-out-expo)_both]"
            >
              <p className="text-question font-bold text-yellow">
                Paystack checkout would open here.
              </p>
              <p className="mt-1 text-sm text-muted">
                Èkó Fest is a concept, so nothing is charged. {quantity} × {ticket.name}, {total}.
              </p>
            </div>
          ) : null}
          <button
            type="button"
            onClick={paid ? close : () => setPaid(true)}
            className={cn(yellowButton, "h-14 w-full gap-2.5 font-price text-[15px] uppercase")}
          >
            {paid ? "Done" : `Pay ${total}`}
            {!paid && <ArrowRight className="size-4" />}
          </button>
        </div>
      </div>
    </dialog>
  );
}
