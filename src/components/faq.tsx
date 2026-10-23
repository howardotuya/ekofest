import { faq } from "@/content/site";

/**
 * "Good to know": native <details>, so it opens with keyboard and without JS.
 * Closed by default. On desktop an open answer sits in the middle column next
 * to its question, as drawn in Figma; on mobile it drops below. The + turns ×.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-narrow">
      <h2 id="faq-title" className="reveal font-display text-faq-title font-black uppercase">
        {faq.title}
      </h2>
      <div className="mt-[30px] border-t border-grid lg:mt-[54px]">
        {faq.items.map((item) => (
          <details key={item.id} id={item.id} className="faq-item group border-b border-grid">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 pt-[22px] pb-[23px] [&::-webkit-details-marker]:hidden lg:min-h-[109px] lg:pt-7 lg:pb-12">
              <h3 className="text-question font-bold lg:w-[400px]">{item.q}</h3>
              <span
                aria-hidden="true"
                className="-mt-1 mr-1.5 font-display text-[22px] leading-none font-black text-yellow transition-[rotate] duration-300 ease-out-expo group-open:rotate-45 lg:mr-[13px] lg:text-[26px]"
              >
                +
              </span>
            </summary>
            <p className="pr-10 pb-6 text-answer text-muted group-open:motion-safe:animate-[fade-up_500ms_var(--ease-out-expo)_both] lg:-mt-[79px] lg:mr-[100px] lg:ml-[460px] lg:pr-0 lg:pb-7">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
