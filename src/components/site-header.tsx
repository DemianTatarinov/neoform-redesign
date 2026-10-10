import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import shortLogo from '@/assets/neo-logo-wordmark.png';
import { NeoLabOverlay } from '@/components/neo-lab-overlay';

const sections = [['CREDO', 'credo'], ['NEO STANDARD', 'zespol'], ['BESPOKE', 'bespoke'], ['REALIZACJE', 'realizacje']] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useRouterState({ select: state => state.location.href });
  const pathname = useRouterState({ select: state => state.location.pathname });
  useEffect(() => { setMenuOpen(false); setLabOpen(false); }, [location]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  const scrollOptions = { behavior: reducedMotion ? 'auto' : 'smooth' } as const;
  const closeMenu = () => setMenuOpen(false);
  const selectSection = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    closeMenu();
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || pathname !== '/') return;
    const target = document.getElementById(hash);
    if (!target) return;
    event.preventDefault();
    void navigate({ to: '/', hash, resetScroll: false, hashScrollIntoView: false });
    target.scrollIntoView({ ...scrollOptions, block: 'start' });
  };
  const openLab = (event: MouseEvent<HTMLButtonElement>, mobile = false) => {
    returnFocus.current = mobile ? menuToggle.current : event.currentTarget;
    closeMenu();
    setLabOpen(true);
  };
  return <>
    <header className="site-header">
      <Link className="header-logo" to="/" hash="top" aria-label="NEO FORM — strona główna" onClick={closeMenu}><img src={shortLogo} alt="NEO FORM" width={893} height={472} /></Link>
      <nav className="desktop-nav" aria-label="Nawigacja">
        {sections.map(([text, hash]) => <Link key={hash} to="/" hash={hash} hashScrollIntoView={scrollOptions} onClick={event => selectSection(event, hash)}>{text}</Link>)}
        <Button type="button" variant="ghost" className={`lab-menu-button${pathname === '/neo-lab' ? ' nav-active' : ''}`} onClick={event => openLab(event)} aria-haspopup="dialog" aria-expanded={labOpen}>NEO LAB</Button>
      </nav>
      <Link className="contact-link" to="/" hash="kontakt" hashScrollIntoView={scrollOptions} onClick={event => selectSection(event, 'kontakt')}>KONTAKT <ArrowUpRight size={15} /></Link>
      <Button ref={menuToggle} variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </header>
    {menuOpen && <nav className="mobile-nav" id="mobile-menu" aria-label="Menu mobilne">
      {sections.map(([text, hash]) => <Link key={hash} to="/" hash={hash} hashScrollIntoView={scrollOptions} onClick={event => selectSection(event, hash)}>{text}<ArrowUpRight size={20} /></Link>)}
      <Button type="button" variant="ghost" className={`lab-menu-button${pathname === '/neo-lab' ? ' nav-active' : ''}`} onClick={event => openLab(event, true)} aria-haspopup="dialog" aria-expanded={labOpen}>NEO LAB<ArrowUpRight size={20} /></Button>
      <Link to="/" hash="kontakt" hashScrollIntoView={scrollOptions} onClick={event => selectSection(event, 'kontakt')}>KONTAKT<ArrowUpRight size={20} /></Link>
    </nav>}
    {labOpen && <NeoLabOverlay open={labOpen} onOpenChange={setLabOpen} returnFocus={returnFocus} />}
  </>;
}