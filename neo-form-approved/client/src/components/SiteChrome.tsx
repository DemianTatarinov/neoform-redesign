import { useEffect, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import BackToTop from "@/components/BackToTop";
import HeroVideo from "@/components/HeroVideo";
import SiteHeader from "@/components/SiteHeader";

type SiteChromeProps = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  cta?: ReactNode;
  children: ReactNode;
};

export default function SiteChrome({ eyebrow, title, lead, cta, children }: SiteChromeProps) {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!revealItems.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
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
    <div className="site">
      <section className="hero pointer-events-none" id="start">
        <HeroVideo />
        <SiteHeader />
        <div className="hero__content shell relative z-10 pointer-events-none">
          <p className="eyebrow eyebrow--light">
            <span className="hero__reveal hero__reveal--1">{eyebrow}</span>
          </p>
          <h1 className="hero__reveal hero__reveal--2">{title}</h1>
          <p className="hero__lead hero__reveal hero__reveal--3">{lead}</p>
          {cta ? <span className="hero__reveal hero__reveal--4">{cta}</span> : null}
        </div>
        <div className="hero__footer shell">
          <span>SCROLL TO EXPLORE</span>
          <span className="hero__line" />
          <ArrowDown size={14} />
        </div>
      </section>
      {children}
      <BackToTop />
    </div>
  );
}
