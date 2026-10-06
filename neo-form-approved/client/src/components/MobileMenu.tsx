import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Facebook, Instagram, Send } from "lucide-react";
import { Link } from "wouter";
import { triggerHaptic } from "@/utils/haptics";

type ContactLinks = {
  phone: string;
  email: string;
  telegram: string;
  instagram: string;
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  contact: ContactLinks;
};

const menuLinks = [
  { label: "Credo", href: "/credo" },
  { label: "Zespół", href: "/zespol" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "Materiały", href: "/materialy" },
  { label: "Technologia", href: "/technologia" },
  { label: "Architekci", href: "/architekci" },
  { label: "Proces", href: "/proces" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Neo Lab", href: "/neo-lab" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

const facebookUrl = "https://www.facebook.com/neoform";

export default function MobileMenu({ open, onClose, contact }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu nawigacji"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#111111] px-6 pb-8 pt-24 text-white sm:px-12"
    >
      <nav className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto" aria-label="Główna nawigacja">
        {menuLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="py-2 text-3xl font-bold text-white transition-colors hover:text-[#F26522]"
            onClick={() => {
              triggerHaptic();
              onClose();
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <a
          href={contact.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="text-white transition-colors hover:text-[#F26522]"
          onClick={() => triggerHaptic()}
        >
          <Instagram size={22} strokeWidth={1.6} />
        </a>
        <a
          href={facebookUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="text-white transition-colors hover:text-[#F26522]"
          onClick={() => triggerHaptic()}
        >
          <Facebook size={22} strokeWidth={1.6} />
        </a>
        <a
          href={contact.telegram}
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
          className="text-white transition-colors hover:text-[#F26522]"
          onClick={() => triggerHaptic()}
        >
          <Send size={22} strokeWidth={1.6} />
        </a>
      </div>
    </div>,
    document.body,
  );
}
