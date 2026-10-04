import { useState } from "react";
import { ArrowUpRight, Instagram, Mail, Menu, Phone, Send, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import BrandLogo from "@/components/BrandLogo";
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
    <header className={`site-header site-header--sticky shell ${menuOpen ? "site-header--menu-open" : ""}`}>
      {homePage ? (
        <a className="brand" href="#start" aria-label="Neo Form — strona główna" onClick={closeMenu}>
          <BrandLogo />
        </a>
      ) : (
        <Link className="brand" href="/" onClick={closeMenu}>
          <BrandLogo />
        </Link>
      )}
      <button
        className="mobile-menu-button"
        type="button"
        aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        {menuOpen ? <X size={21} strokeWidth={1.6} /> : <Menu size={21} strokeWidth={1.6} />}
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
