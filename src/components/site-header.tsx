import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import shortLogo from '@/assets/neo-logo-wordmark.png';
import { navigateToHomeHash } from '@/lib/navigate-to-home-hash';
import { CONTACT_HASH, scrollToHashTarget } from '@/lib/scroll-to-section';

const sections = [['CREDO', 'credo'], ['NEO STANDARD', 'zespol'], ['BESPOKE', 'bespoke'], ['REALIZACJE', 'realizacje']] as const;
const MOBILE_MENU_CLOSE_MS = 300;

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
  const menuToggle = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const locationHref = useRouterState({ select: state => state.location.href });
  const pathname = useRouterState({ select: state => state.location.pathname });
  useEffect(() => { setMenuOpen(false); }, [locationHref]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const wasMenuOpen = menuOpen;
    setMenuOpen(false);

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
      <Button ref={menuToggle} variant="ghost" size="icon" className="menu-toggle shrink-0" aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</Button>
      {menuOpen && (
        <nav className="mobile-nav" id="mobile-menu" aria-label="Menu mobilne">
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
              <ArrowUpRight size={20} />
            </Link>
          ))}
          <Link
            to="/neo-lab"
            className={`lab-menu-button ${labLinkClass}`}
            preload="intent"
            activeOptions={routeActiveOptions}
            onClick={event => handleNavClick(event, '/neo-lab')}
          >
            NEO LAB
            <ArrowUpRight size={20} />
          </Link>
          <Link
            to="/ewolucja-marki"
            className={`lab-menu-button ${evolutionLinkClass}`}
            preload="intent"
            activeOptions={routeActiveOptions}
            onClick={event => handleNavClick(event, '/ewolucja-marki')}
          >
            EWOLUCJA MARKI
            <ArrowUpRight size={20} />
          </Link>
          <Link
            to="/"
            hash={CONTACT_HASH}
            preload="intent"
            activeOptions={homeHashActiveOptions}
            onClick={event => handleNavClick(event, hashHref(CONTACT_HASH))}
          >
            KONTAKT
            <ArrowUpRight size={20} />
          </Link>
        </nav>
      )}
    </header>
  </>;
}
