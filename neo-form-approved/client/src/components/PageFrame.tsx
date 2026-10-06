import { useEffect, type ReactNode } from "react";
import BackToTop from "@/components/BackToTop";

export const pageHeading = "max-w-4xl text-3xl font-bold tracking-tight md:text-5xl";
export const pageCopy = "max-w-2xl text-base leading-relaxed md:text-lg";

export default function PageFrame({ children }: { children: ReactNode }) {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!revealItems.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main data-header-tone="light" className="relative z-0 min-h-screen overflow-x-hidden bg-[#f8f8f7] pt-24 font-sans text-neutral-950 antialiased sm:pt-28">
      {children}
      <BackToTop />
    </main>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-6xl px-6 pb-6 pt-6 sm:px-12" data-reveal>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F26522]">{eyebrow}</p>
      <h1 className={`mt-4 ${pageHeading}`}>{title}</h1>
      {children ? <div className={`mt-8 text-neutral-600 ${pageCopy}`}>{children}</div> : null}
    </header>
  );
}
