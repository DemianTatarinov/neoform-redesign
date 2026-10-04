import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Instagram, Mail, Phone, Send } from "lucide-react";
import { Link } from "wouter";
import { triggerHaptic } from "@/utils/haptics";

type NavLink = readonly [label: string, href: string];

type ContactLinks = {
  phone: string;
  email: string;
  telegram: string;
  instagram: string;
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  activePath: string;
  onNavClick: () => void;
  links: readonly NavLink[];
  contact: ContactLinks;
};

export default function MobileMenu({
  open,
  onClose,
  activePath,
  onNavClick,
  links,
  contact,
}: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleClose = () => {
    triggerHaptic();
    onClose();
  };

  return createPortal(
    <div
      className={`min-[921px]:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out ${open ? "opacity-100" : "opacity-0"}`}
        aria-label="Zamknij menu"
        tabIndex={open ? 0 : -1}
        onClick={handleClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacji"
        className={`mobile-menu-drawer fixed top-0 right-0 z-[1000] flex h-full w-[85vw] max-w-sm transform-gpu flex-col overflow-y-auto border-l border-white/10 bg-neutral-950/70 p-6 pt-[max(3.5rem,env(safe-area-inset-top))] text-white shadow-[-20px_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          type="button"
          className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] p-2 text-2xl text-white transition-colors hover:text-[#F26522]"
          aria-label="Zamknij menu"
          tabIndex={open ? 0 : -1}
          onClick={handleClose}
        >
          ✕
        </button>

        <nav className="mobile-menu-drawer__nav flex flex-1 flex-col pt-2" aria-label="Główna nawigacja mobilna">
          {links.map(([label, href]) => {
            const isActive = activePath === href;
            return (
              <Link
                className={`mobile-menu-drawer__link border-b border-white/10 py-3.5 text-lg font-medium uppercase tracking-widest !text-white transition-colors duration-300 hover:text-[#F26522] active:text-[#F26522] ${isActive ? "is-active !text-[#F26522]" : ""}`}
                href={href}
                key={href}
                onClick={onNavClick}
                tabIndex={open ? 0 : -1}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mobile-menu-drawer__contacts mt-auto grid grid-cols-2 gap-2 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <a
            className="mobile-menu-drawer__contact flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-2 py-3 text-xs !text-white transition-colors hover:border-[#F26522]/50 hover:text-[#F26522] active:text-[#F26522]"
            href={`tel:${contact.phone}`}
            tabIndex={open ? 0 : -1}
            onClick={() => triggerHaptic()}
          >
            <Phone size={15} className="text-current" />
            Zadzwoń
          </a>
          <a
            className="mobile-menu-drawer__contact flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-2 py-3 text-xs !text-white transition-colors hover:border-[#F26522]/50 hover:text-[#F26522] active:text-[#F26522]"
            href={`mailto:${contact.email}`}
            tabIndex={open ? 0 : -1}
            onClick={() => triggerHaptic()}
          >
            <Mail size={15} className="text-current" />
            Napisz
          </a>
          <a
            className="mobile-menu-drawer__contact flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-2 py-3 text-xs !text-white transition-colors hover:border-[#F26522]/50 hover:text-[#F26522] active:text-[#F26522]"
            href={contact.telegram}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={() => triggerHaptic()}
          >
            <Send size={15} className="text-current" />
            Telegram
          </a>
          <a
            className="mobile-menu-drawer__contact flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-2 py-3 text-xs !text-white transition-colors hover:border-[#F26522]/50 hover:text-[#F26522] active:text-[#F26522]"
            href={contact.instagram}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={() => triggerHaptic()}
          >
            <Instagram size={15} className="text-current" />
            Instagram
          </a>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
