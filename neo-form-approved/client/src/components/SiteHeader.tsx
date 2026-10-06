import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "wouter";
import MobileMenu from "@/components/MobileMenu";
import Logo from "@/components/Logo";
import { triggerHaptic } from "@/utils/haptics";

const contact = {
  phone: "+48000000000",
  email: "hello@neoform.pl",
  telegram: "https://t.me/neoform",
  instagram: "https://www.instagram.com/neoform/",
};

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [location] = useLocation();
  const homePage = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const band = 80;
    const nodes = document.querySelectorAll<HTMLElement>("[data-header-tone]");
    if (!nodes.length) {
      setOnLight(location !== "/");
      return;
    }

    const pick = () => {
      const top = band;
      let match: HTMLElement | null = null;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.top <= top && rect.bottom > top) match = node;
      });
      if (!match) return;
      setOnLight(match.dataset.headerTone === "light");
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [location]);

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => {
    triggerHaptic();
    setMenuOpen((value) => !value);
  };

  const lightInk = onLight && !menuOpen;
  const ink = lightInk ? "text-neutral-950" : "text-white";
  const line = lightInk ? "bg-neutral-950" : "bg-white";
  const bar = menuOpen
    ? "border-white/10 bg-transparent text-white"
    : lightInk
      ? "border-neutral-950/10 bg-[#f8f8f7]/80 text-neutral-950 backdrop-blur-md"
      : scrolled
        ? "border-white/10 bg-black/50 text-white backdrop-blur-md"
        : "border-white/10 bg-transparent text-white";

  return createPortal(
    <>
      <header
        className={`neo-site-header fixed top-0 left-0 right-0 z-[110] flex h-20 items-center justify-between px-6 transition-all duration-300 sm:px-12 ${bar}`}
      >
        <Logo
          href="/"
          tone={lightInk ? "dark" : "light"}
          className="h-8 w-auto object-contain md:h-10"
          onClick={() => {
            closeMenu();
            if (homePage) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        <button
          type="button"
          className={`relative z-50 flex h-10 w-8 cursor-pointer flex-col items-center justify-center gap-[5px] ${ink}`}
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <span className="text-2xl font-light leading-none">✕</span>
          ) : (
            <>
              <span className={`block h-px w-6 ${line}`} />
              <span className={`block h-px w-6 ${line}`} />
              <span className={`block h-px w-6 ${line}`} />
            </>
          )}
        </button>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} contact={contact} />
    </>,
    document.body,
  );
}
