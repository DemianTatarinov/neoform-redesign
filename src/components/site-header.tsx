import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowUpRight, Instagram, Mail, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import shortLogo from '@/assets/neo-logo-wordmark.png';
import { contactActions, contactInstagram } from '@/lib/contact-content';
import { navigateToHomeHash } from '@/lib/navigate-to-home-hash';
import { CONTACT_HASH, scrollToHashTarget } from '@/lib/scroll-to-section';

const sections = [['CREDO', 'credo'], ['NEO STANDARD', 'zespol'], ['BESPOKE', 'bespoke'], ['REALIZACJE', 'realizacje']] as const;
const MOBILE_MENU_CLOSE_MS = 300;

const mobileNavLinkClass =
  'group flex w-full items-center justify-between border-b border-white/10 py-2.5 text-base font-medium uppercase tracking-wider text-white transition-colors duration-200 sm:py-3 sm:text-[17px]';

const mobileNavIconClass =
  'size-4 shrink-0 text-white/40 transition-colors duration-200 group-hover:text-white';

const mobileQuickIconClass =
  'flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-[color:var(--brand)] hover:text-[color:var(--brand)]';

const mobileQuickContacts = [
  {
    href: `mailto:${contactActions.email}`,
    ariaLabel: 'Napisz email',
    icon: Mail,
    external: false,
  },
  {
    href: `tel:${contactActions.phone}`,
    ariaLabel: 'Zadzwoń',
    icon: Phone,
    external: false,
  },
  {
    href: `https://wa.me/${contactActions.whatsapp}`,
    ariaLabel: 'Napisz na WhatsApp',
    icon: MessageCircle,
    external: true,
  },
  {
    href: contactInstagram.url,
    ariaLabel: 'Instagram',
    icon: Instagram,
    external: true,
  },
] as const;

type MobileNavItem =
  | { label: string; kind: 'home-hash'; hash: string }
  | { label: string; kind: 'route'; to: '/neo-lab' | '/ewolucja-marki' }
  | { label: string; kind: 'contact' };

const mobileNavItems: MobileNavItem[] = [
  ...sections.map(([label, hash]) => ({ label, kind: 'home-hash' as const, hash })),
  { label: 'NEO LAB', kind: 'route', to: '/neo-lab' },
  { label: 'EWOLUCJA MARKI', kind: 'route', to: '/ewolucja-marki' },
  { label: 'KONTAKT', kind: 'contact' },
];

const homeHashActiveOptions = {
  exact: true,
  includeHash: true,
  includeSearch: false,
} as const;

const routeActiveOptions = {
  exact: true,
  includeSearch: false,
} as const;

function hashHref(hash: string) {
  return `/#${hash}`;
}

function parseHashTargetId(href: string) {
  return href.replace(/^\/#/, '').replace(/^#/, '').split('#').pop() ?? '';
}

function runAfterMobileMenuClose(menuOpen: boolean, action: () => void) {
  if (!menuOpen) {
    action();
    return;
  }
  window.setTimeout(action, MOBILE_MENU_CLOSE_MS);
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerActive, setDrawerActive] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const locationHref = useRouterState({ select: state => state.location.href });
  const pathname = useRouterState({ select: state => state.location.pathname });

  const closeMenu = useCallback(() => {
    setDrawerActive(false);
    window.setTimeout(() => setMenuOpen(false), MOBILE_MENU_CLOSE_MS);
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDrawerActive(false);
  }, [locationHref]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setDrawerActive(true));
    });
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const wasMenuOpen = menuOpen;
    closeMenu();

    if (!href.includes('#')) {
      return;
    }

    event.preventDefault();
    const targetId = parseHashTargetId(href);
    if (!targetId) return;

    const isHomePage = pathname === '/' || pathname === '';

    runAfterMobileMenuClose(wasMenuOpen, () => {
      if (isHomePage) {
        scrollToHashTarget(targetId);
        window.history.pushState(null, '', `/#${targetId}`);
        return;
      }

      void navigateToHomeHash(navigate, targetId);
    });
  };

  const labLinkClass = `hover:opacity-70 transition-opacity${pathname === '/neo-lab' ? ' nav-active' : ''}`;
  const evolutionLinkClass = `hover:opacity-70 transition-opacity${pathname === '/ewolucja-marki' ? ' nav-active' : ''}`;

  const renderMobileNavItem = (item: MobileNavItem) => {
    const activeClass =
      item.kind === 'route' && pathname === item.to ? ' nav-active text-[color:var(--brand)]' : '';

    if (item.kind === 'home-hash') {
      return (
        <Link
          key={item.hash}
          to="/"
          hash={item.hash}
          preload="intent"
          activeOptions={homeHashActiveOptions}
          className={`${mobileNavLinkClass}${activeClass}`}
          onClick={event => handleNavClick(event, hashHref(item.hash))}
        >
          {item.label}
          <ArrowUpRight className={mobileNavIconClass} aria-hidden />
        </Link>
      );
    }

    if (item.kind === 'route') {
      return (
        <Link
          key={item.to}
          to={item.to}
          preload="intent"
          activeOptions={routeActiveOptions}
          className={`${mobileNavLinkClass}${activeClass}`}
          onClick={event => handleNavClick(event, item.to)}
        >
          {item.label}
          <ArrowUpRight className={mobileNavIconClass} aria-hidden />
        </Link>
      );
    }

    return (
      <Link
        key="kontakt"
        to="/"
        hash={CONTACT_HASH}
        preload="intent"
        activeOptions={homeHashActiveOptions}
        className={mobileNavLinkClass}
        onClick={event => handleNavClick(event, hashHref(CONTACT_HASH))}
      >
        {item.label}
        <ArrowUpRight className={mobileNavIconClass} aria-hidden />
      </Link>
    );
  };

  return <>
    <header className="site-header fixed top-0 left-0 right-0 z-50 w-full">
      <Link
        className="header-logo"
        to="/"
        hash="top"
        preload="intent"
        activeOptions={homeHashActiveOptions}
        aria-label="NEO FORM — strona główna"
        onClick={event => handleNavClick(event, hashHref('top'))}
      >
        <img src={shortLogo} alt="NEO FORM" width={893} height={472} />
      </Link>
      <nav className="desktop-nav" aria-label="Nawigacja">
        {sections.map(([text, hash]) => (
          <Link
            key={hash}
            to="/"
            hash={hash}
            preload="intent"
            activeOptions={homeHashActiveOptions}
            onClick={event => handleNavClick(event, hashHref(hash))}
          >
            {text}
          </Link>
        ))}
        <Link
          to="/neo-lab"
          className={labLinkClass}
          preload="intent"
          activeOptions={routeActiveOptions}
          onClick={event => handleNavClick(event, '/neo-lab')}
        >
          NEO LAB
        </Link>
      </nav>
      <Link
        className="contact-link"
        to="/"
        hash={CONTACT_HASH}
        preload="intent"
        activeOptions={homeHashActiveOptions}
        onClick={event => handleNavClick(event, hashHref(CONTACT_HASH))}
      >
        KONTAKT <ArrowUpRight size={15} />
      </Link>
      <Button
        ref={menuToggle}
        variant="ghost"
        size="icon"
        className={`menu-toggle shrink-0${menuOpen ? ' border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white' : ''}`}
        aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => (menuOpen ? closeMenu() : openMenu())}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>
    </header>
    {menuOpen && (
      <>
        <button
          type="button"
          className={`mobile-nav-backdrop fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out${drawerActive ? ' opacity-100' : ' opacity-0'}`}
          aria-label="Zamknij menu"
          onClick={closeMenu}
        />
        <nav
          className={`mobile-nav fixed right-3 top-[calc(var(--header-height)+8px)] z-[49] flex h-auto max-h-[calc(100dvh-var(--header-height)-8px)] w-[calc(100%-24px)] max-w-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1a1b1e]/95 via-[#121315]/98 to-[#0d0e10] shadow-2xl shadow-black/50 backdrop-blur-xl transition-transform duration-300 ease-out [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.06)]${drawerActive ? ' translate-x-0' : ' translate-x-full'}`}
          id="mobile-menu"
          aria-label="Menu mobilne"
          role="dialog"
          aria-modal="true"
        >
          <div className="min-h-0 overflow-y-auto px-6 pt-4">
            {mobileNavItems.map(renderMobileNavItem)}
          </div>
          <div
            className="mt-4 flex shrink-0 items-center justify-center gap-5 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            aria-label="Szybki kontakt"
          >
            {mobileQuickContacts.map(({ href, ariaLabel, icon: Icon, external }) => (
              <a
                key={ariaLabel}
                href={href}
                className={mobileQuickIconClass}
                aria-label={ariaLabel}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
          </div>
        </nav>
      </>
    )}
  </>;
}
