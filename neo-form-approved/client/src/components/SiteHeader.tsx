import { useState } from "react";
import { ArrowUpRight, Instagram, Mail, Menu, Phone, Send, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/Logo";
import { triggerHaptic } from "@/utils/haptics";

const navLinks = [
  ["Bespoke", "/bespoke"],
  ["Portfolio", "/portfolio"],
  ["Credo", "/credo"],
  ["Architekci", "/architects"],
  ["Proces", "/process"],
  ["Neo Lab", "/neo-lab"],
  ["Kontakt", "/contact"],
] as const;

const contact = {
  phone: "+48000000000",
  email: "hello@neoform.pl",
  telegram: "https://t.me/neoform",
  instagram: "https://www.instagram.com/neoform/",
};

type SiteHeaderProps = {
  /** Home hero uses in-page anchor for logo; inner routes use `/`. */
  homePage?: boolean;
};

export default function SiteHeader({ homePage = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => {
    triggerHaptic();
    setMenuOpen((value) => !value);
  };

  const onNavClick = () => {
    triggerHaptic();
    closeMenu();
  };

  return (
    <header
      className={`site-header site-header--sticky pointer-events-auto fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 border-b border-white/10 bg-neutral-950/75 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl transition-all duration-300 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 px-4 sm:px-6 ${menuOpen ? "site-header--menu-open" : ""}`}
    >
      <Logo href={homePage ? "#start" : "/"} onClick={closeMenu} />
      <button
        className="mobile-menu-button pointer-events-auto flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white active:scale-95 transition-transform"
        type="button"
        aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        {menuOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
      </button>
      <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`} aria-label="Główna nawigacja">
        {navLinks.map(([label, href]) => (
          <Link className={location === href ? "is-active" : ""} href={href} key={href} onClick={onNavClick}>
            {label}
          </Link>
        ))}
        <div className="main-nav__actions">
          <a href={`tel:${contact.phone}`} onClick={() => triggerHaptic()}>
            <Phone size={17} />
            Zadzwoń
          </a>
          <a href={`mailto:${contact.email}`} onClick={() => triggerHaptic()}>
            <Mail size={17} />
            Napisz
          </a>
          <a href={contact.telegram} target="_blank" rel="noreferrer" onClick={() => triggerHaptic()}>
            <Send size={17} />
            Telegram
          </a>
          <a href={contact.instagram} target="_blank" rel="noreferrer" onClick={() => triggerHaptic()}>
            <Instagram size={17} />
            Instagram
          </a>
        </div>
      </nav>
      <div className="header-actions" aria-label="Szybki kontakt">
        <a href={`tel:${contact.phone}`} aria-label="Zadzwoń" onClick={() => triggerHaptic()}>
          <Phone size={15} />
        </a>
        <a href={`mailto:${contact.email}`} aria-label="Napisz e-mail" onClick={() => triggerHaptic()}>
          <Mail size={15} />
        </a>
        <a href={contact.telegram} target="_blank" rel="noreferrer" aria-label="Telegram" onClick={() => triggerHaptic()}>
          <Send size={15} />
        </a>
        <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" onClick={() => triggerHaptic()}>
          <Instagram size={15} />
        </a>
      </div>
      {homePage ? (
        <a className="header-cta" href="/contact" onClick={onNavClick}>
          Porozmawiajmy <ArrowUpRight size={15} />
        </a>
      ) : (
        <Link className="header-cta" href="/contact" onClick={onNavClick}>
          Porozmawiajmy <ArrowUpRight size={15} />
        </Link>
      )}
    </header>
  );
}
