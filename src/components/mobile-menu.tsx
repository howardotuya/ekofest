"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { hero, nav } from "@/content/site";
import { cn } from "@/lib/cn";
import { CloseIcon, MenuIcon } from "./icons";
import { pressable, yellowButton } from "./ui";

// Not in Figma: agreed as a full-screen black menu (the Kòbò pattern). A native
// modal <dialog> gives the focus trap, inert page and Esc-to-close; CSS locks
// page scroll while it's open.
export function MobileMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    dialog.current?.showModal();
    close.current?.focus();
    setOpen(true);
  };

  // Links close the menu first, then follow their #anchor as normal.
  const hide = () => dialog.current?.close();

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={show}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={cn(pressable, "-mr-[11px] ml-px size-10 rounded-full lg:hidden")}
      >
        <MenuIcon className="size-[22px]" />
      </button>

      <dialog
        ref={dialog}
        id="mobile-menu"
        aria-label="Menu"
        onClose={() => {
          setOpen(false);
          // `close` fires after a link's hash scroll; don't yank the page back up.
          trigger.current?.focus({ preventScroll: true });
        }}
        className={cn(
          "grid-bg fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-black p-0 text-white lg:hidden",
          "transition-[clip-path,display,overlay] transition-discrete duration-500 ease-out-expo motion-reduce:transition-none",
          "[clip-path:inset(0_0_100%_0)] open:[clip-path:inset(0)] starting:open:[clip-path:inset(0_0_100%_0)]",
          "backdrop:bg-transparent",
        )}
      >
        <div className="container-page flex h-full flex-col pt-[47.5px] pb-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              prefetch={false}
              onClick={hide}
              className="font-condensed text-logo leading-[0.92] font-black uppercase"
            >
              Èkó Fest
            </Link>
            <button
              ref={close}
              type="button"
              onClick={hide}
              aria-label="Close menu"
              className={cn(pressable, "-mr-[11px] size-10 rounded-full")}
            >
              <CloseIcon className="size-[22px]" />
            </button>
          </div>

          <nav aria-label="Menu" className="mt-12">
            <ul>
              {nav.map((link, i) => (
                <li
                  key={link.href}
                  className="border-b border-grid motion-safe:animate-[fade-up_500ms_var(--ease-out-expo)_both]"
                  style={{ animationDelay: `${120 + i * 50}ms` }}
                >
                  <a
                    href={link.href}
                    onClick={hide}
                    className="flex min-h-[4.5rem] items-center font-condensed text-[3.25rem] leading-none font-black uppercase transition-colors duration-200 hover:text-yellow"
                  >
                    {link.label}.
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={hero.cta.href}
            onClick={hide}
            className={cn(
              yellowButton,
              "mt-auto h-14 w-full font-price text-[15px] uppercase motion-safe:animate-[fade-up_500ms_var(--ease-out-expo)_both]",
            )}
            style={{ animationDelay: "380ms" }}
          >
            {hero.cta.label}
            <span className="mx-[0.4em]">·</span>
            {hero.cta.from}
          </a>
        </div>
      </dialog>
    </>
  );
}
