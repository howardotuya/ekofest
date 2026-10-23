import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared press/hover behaviour for every button-like element. */
export const pressable =
  "inline-flex items-center justify-center whitespace-nowrap select-none " +
  "transition-[background-color,color,box-shadow,scale,translate] duration-300 ease-out-expo active:scale-[0.98]";

/** Yellow pill with the soft yellow glow from Figma ("Get tickets"). */
export const yellowButton =
  `${pressable} surface-light rounded-pill bg-yellow font-bold text-black ` +
  "shadow-[0_6px_24px_rgb(244_240_70/0.35)] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgb(244_240_70/0.5)]";

/** Animated underline for text links. */
export const underline =
  "bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1.5px] bg-[position:0_100%] " +
  "transition-[background-size] duration-300 ease-out-expo hover:bg-[length:100%_1.5px]";

/** Small uppercase label above section titles ("TRUE TALENT"). */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-eyebrow font-bold text-muted uppercase">{children}</p>;
}

type MaybeLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string | null;
  children: ReactNode;
};

/** A link, or plain text when there's no destination (Instagram). */
export function MaybeLink({ href, className, children, ...rest }: MaybeLinkProps) {
  if (href === null) return <span className={className}>{children}</span>;
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

/** "₦25,000" set in the Inter capitals subset, like every price in Figma. */
export function Price({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cn("font-price font-bold", className)}>{children}</span>;
}
