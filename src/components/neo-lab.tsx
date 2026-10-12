import { NeoLabArchiveGalleryDialog } from '@/components/neo-lab-archive-dialog';
import { NeoLabVideo } from '@/components/neo-lab-video';
import { getNeoLabArchiveGallery } from '@/lib/neo-lab-archive-gallery';
import { neoLab, neoLabArchive, pekaSchedule } from '@/lib/neo-lab-content';
import { CONTACT_HASH } from '@/lib/scroll-to-section';
import { navigateToHomeHash } from '@/lib/navigate-to-home-hash';
import { useNavigate } from '@tanstack/react-router';
import { ArrowUpRight, ChevronDown, Plus } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

const partnerBrands = ['Blum', 'Häfele', 'Viefe', 'PEKA', 'ARPA', 'FENIX'] as const;

const PARTNER_RETURN_SCROLL_KEY = 'neo-lab-partner-return-scroll';

const partnerBrandButtonClassName =
  'neo-lab-partner-brand inline-flex w-full items-center justify-center gap-2 rounded-[4px] border border-neutral-300/80 bg-white px-2.5 py-2 text-[18px] font-normal leading-[1.2] whitespace-nowrap text-[color:var(--foreground,#121315)] transition-all duration-300 ease-out hover:border-[color:var(--brand)] hover:shadow-sm';

function restorePartnerScrollPosition(scrollY: number) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, behavior: reduced ? 'auto' : 'smooth' });
  });
}

const educationPanels = [
  {
    id: 'architects',
    title: 'Wiedza dla architektów',
    text:
      'Pokazujemy nowe materiały, systemy, rozwiązania techniczne i sposoby łączenia materiałów w wymagających projektach',
  },
  {
    id: 'practice',
    title: 'Praktyka zamiast teorii',
    text:
      'Prawdziwe projekty, realne problemy, technologia w działaniu i inspiracja, która zaczyna się od rozmowy',
  },
] as const;

export function NeoLab() {
  const navigate = useNavigate();
  const [openPanel, setOpenPanel] = useState<string | null>(educationPanels[0].id);
  const [archiveGalleryOpen, setArchiveGalleryOpen] = useState(false);
  const [activeArchiveTitle, setActiveArchiveTitle] = useState<string | null>(null);
  const archiveTriggerRef = useRef<HTMLButtonElement | null>(null);

  const activeArchiveGallery = activeArchiveTitle ? getNeoLabArchiveGallery(activeArchiveTitle) : undefined;

  const onPartnerBrandClick = useCallback(() => {
    const currentScrollY = window.scrollY;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.history.pushState(
      { prevScrollY: currentScrollY, fromNeoLab: true },
      '',
      `${window.location.pathname}${window.location.search}#technologia`,
    );

    try {
      sessionStorage.setItem(PARTNER_RETURN_SCROLL_KEY, String(currentScrollY));
    } catch {
      // ignore
    }

    const target = document.getElementById('technologia');
    if (target) {
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      return;
    }

    void navigateToHomeHash(navigate, 'technologia');
  }, [navigate]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && typeof event.state.prevScrollY === 'number') {
        restorePartnerScrollPosition(event.state.prevScrollY);
      }
    };

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      if (history.state && typeof history.state.prevScrollY === 'number') {
        restorePartnerScrollPosition(history.state.prevScrollY);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pageshow', onPageShow);

    const stateScrollY = history.state?.prevScrollY;
    const isNeoLabTechnologiaReturn =
      window.location.pathname.includes('neo-lab') && window.location.hash === '#technologia';

    if (history.state?.fromNeoLab && typeof stateScrollY === 'number') {
      restorePartnerScrollPosition(stateScrollY);
    } else if (isNeoLabTechnologiaReturn) {
      try {
        const stored = sessionStorage.getItem(PARTNER_RETURN_SCROLL_KEY);
        if (stored !== null) {
          const parsed = Number(stored);
          sessionStorage.removeItem(PARTNER_RETURN_SCROLL_KEY);
          if (!Number.isNaN(parsed)) restorePartnerScrollPosition(parsed);
        }
      } catch {
        // ignore
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  const scrollToContact = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const contact = document.querySelector<HTMLElement>('.contact-footer');
      if (contact) {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        contact.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      void navigateToHomeHash(navigate, CONTACT_HASH);
    },
    [navigate],
  );

  return (
    <section className="neo-lab scroll-mt-32" id="neo-lab" aria-labelledby="neo-lab-title">
      <div className="lab-hero">
        <NeoLabVideo />
      </div>

      <div className="bg-[#0A0A0A] text-white">
        <div className="container mx-auto max-w-6xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-12 sm:px-8 sm:py-16 md:py-20">
          {/* Element 2: manifest */}
          <p className="max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Doświadczenie ma wartość dopiero wtedy, kiedy można się nim podzielić. Neo Lab to przestrzeń wiedzy,
            spotkań i wymiany doświadczeń dla projektantów, architektów, producentów i montażystów. Nie chcemy
            zatrzymywać wiedzy wewnątrz firmy — chcemy ją przekazywać dalej
          </p>

          <div className="relative my-12 border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-[#050505] p-8 pl-10 shadow-2xl sm:my-16 sm:p-12 sm:pl-14">
            <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-[color:var(--brand)]" aria-hidden="true" />
            <p className="max-w-4xl font-[family-name:var(--font-editorial)] text-2xl font-light leading-tight text-white sm:text-3xl md:text-4xl">
              NEO LAB to nie szkoła. To laboratorium. Miejsce, w którym można eksperymentować, sprawdzać, testować i
              szukać nowych rozwiązań
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[16px] uppercase tracking-[0.25em] text-[color:var(--brand)] sm:gap-4">
              <span>LEARN</span>
              <span className="font-light text-neutral-700">/</span>
              <span>TEST</span>
              <span className="font-light text-neutral-700">/</span>
              <span>CREATE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Element 3: partners */}
      <div className="bg-[var(--bg-paper,#f9f9f9)] px-4 py-12 text-[#121315] sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="section-heading mb-6 sm:mb-8">
            <div className="section-label">
              <span className="section-label-title">NEO LAB · PARTNERZY</span>
            </div>
            <div className="section-heading-title">
              <h2
                className="editorial-section-title font-[family-name:var(--font-editorial)] text-[28px] font-normal uppercase leading-[1.15] text-[#121315] sm:text-[36px]"
              >
                EKOSYSTEM
                <br />
                MAREK
              </h2>
              <span className="accent-line" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-8 sm:mt-8 sm:gap-10">
            <p
              className="max-w-2xl text-left font-[family-name:var(--font-editorial)] text-[19px] leading-[1.6] text-neutral-700"
            >
              {neoLab.partnerIntro}
            </p>
            <div
              id="neo-lab-partners"
              className="neo-lab-partners grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
            >
            {partnerBrands.map(brand => (
              <button key={brand} type="button" onClick={onPartnerBrandClick} className={partnerBrandButtonClassName}>
                <span className="system-name-pulse" aria-hidden="true">
                  <span className="system-name-pulse-ring" />
                  <span className="system-name-pulse-core" />
                </span>
                <span className="system-name-label min-w-0 truncate uppercase tracking-wide">{brand}</span>
                <ArrowUpRight
                  className="system-name-arrow shrink-0 opacity-55"
                  size={14}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0A0A0A] text-white">
        <div className="container mx-auto max-w-6xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] py-12 sm:px-8 sm:py-16 md:py-20">
          {/* Element 4: accordion */}
          <div className="mt-14 border-t border-neutral-800/70 md:mt-20">
            {educationPanels.map((panel, index) => {
              const isOpen = openPanel === panel.id;
              const number = String(index + 1).padStart(2, '0');
              return (
                <div key={panel.id} className="border-b border-neutral-800/70">
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors sm:py-8"
                    aria-expanded={isOpen}
                    onClick={() => setOpenPanel(isOpen ? null : panel.id)}
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="font-mono text-xs text-neutral-600 transition-colors group-hover:text-[color:var(--brand)] sm:text-sm">
                        {number}
                      </span>
                      <span className="font-[family-name:var(--font-editorial)] text-xl font-light text-white transition-colors group-hover:text-[color:var(--brand)] sm:text-2xl">
                        {panel.title}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronDown
                        className="size-5 shrink-0 text-[color:var(--brand)] transition-transform duration-300"
                        aria-hidden="true"
                      />
                    ) : (
                      <Plus
                        className="size-5 shrink-0 text-neutral-400 transition-transform duration-300 group-hover:rotate-45"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-8 pl-8 pt-2 font-[family-name:var(--font-editorial)] text-base font-light leading-relaxed text-neutral-400 sm:pl-11 sm:text-lg">
                        {panel.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Element 5: upcoming event */}
          <article
            id="wydarzenia"
            className="relative mt-16 scroll-mt-32 border border-neutral-800/80 bg-gradient-to-b from-neutral-900/40 to-neutral-950 p-6 shadow-2xl sm:mt-24 sm:p-12 lg:p-16"
          >
            <div className="section-heading mb-0">
              <p className="m-0 section-label-title">NAJBLIŻSZE WYDARZENIE</p>
              <p
                className="m-0 font-[family-name:var(--font-editorial)] text-[16px] font-medium uppercase leading-[1.6] tracking-[0.1em] text-[color:var(--brand)]"
              >
                15.10.2026 · WARSZTATY
              </p>
              <div className="section-heading-title">
                <h3
                  className="m-0 font-[family-name:var(--font-editorial)] text-[32px] font-normal uppercase leading-[1.15] tracking-tight text-white sm:text-[42px] lg:text-[48px]"
                >
                  NEO LAB × PEKA
                </h3>
                <span className="accent-line" aria-hidden="true" />
                <p className="!mt-2 font-mono text-xs uppercase tracking-[0.15em] text-neutral-400 sm:text-sm">
                  KAŻDY CENTYMETR MA ZNACZENIE
                </p>
              </div>
            </div>
            <p
              className="m-0 mt-6 max-w-3xl text-left font-[family-name:var(--font-editorial)] text-[19px] leading-[1.6] text-neutral-300 sm:mt-8"
            >
              To nie jest klasyczne szkolenie produktowe. To zmiana sposobu myślenia o przestrzeni: funkcja →
              ergonomia → organizacja → technologia → estetyka. PEKA dostarcza narzędzi, a NEO FORM pokazuje, jak
              wykorzystać je w rzeczywistych, wymagających projektach. Uczysz się projektować wnętrze mebla pod realne
              potrzeby użytkownika, eliminując błędy i reklamacje
            </p>
            <ul className="mt-12 flex flex-col divide-y divide-neutral-800 border-y border-neutral-800">
              {pekaSchedule.map(entry => (
                <li
                  key={entry.time}
                  className="group -mx-6 flex flex-col gap-2 px-6 py-5 transition-colors hover:bg-neutral-800/40 sm:mx-0 sm:flex-row sm:gap-8 sm:px-4 sm:py-6"
                >
                  <span
                    className="shrink-0 font-mono text-[16px] font-semibold tracking-wider text-[color:var(--brand)] sm:w-20"
                  >
                    {entry.time}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="font-medium text-white">{entry.module}</span>
                    <p className="m-0 text-[15px] leading-[1.5] text-neutral-400 sm:text-[16px]">{entry.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 max-w-2xl border-l-2 border-[color:var(--brand)] py-1 pl-5">
              <p className="m-0 font-[family-name:var(--font-editorial)] text-[17px] leading-[1.5] text-neutral-300 sm:text-[18px]">
                Dla architektów i projektantów wnętrz, którzy chcą łączyć bezkompromisowy design z idealną inżynierią
              </p>
            </div>
            <a
              href="/#kontakt"
              onClick={scrollToContact}
              className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-[4px] border border-[color:var(--brand)] px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-[color:var(--brand)] transition-all duration-300 hover:bg-[color:var(--brand)] hover:text-black active:scale-[0.98]"
            >
              ZAPISZ SIĘ NA WYDARZENIE ↗
            </a>
          </article>
        </div>
      </div>

      {/* Element 6: archive */}
      <div
        className="border-t border-neutral-200/80 bg-[var(--bg-paper,#F4F3EF)] px-4 pt-8 pb-10 text-[#121315] sm:px-8 sm:pt-10 sm:pb-12"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8">
          <div className="max-w-2xl">
            <div className="section-label">
              <span className="section-label-title">POPRZEDNIE SPOTKANIA</span>
              <span className="section-number">02 / 03</span>
            </div>
            <p
              className="m-0 text-left font-[family-name:var(--font-editorial)] text-[19px] leading-[1.6] text-neutral-700"
            >
              Te spotkania już się odbyły, ale energia i wiedza, które nam dały, wciąż pracują w kolejnych
              projektach. Zobacz, jak wyglądają nasze warsztaty od środka
            </p>
          </div>
          <div
            className="mt-4 flex min-w-0 max-w-4xl flex-col divide-y divide-neutral-200 border-y border-neutral-200 sm:mt-6"
          >
            {neoLabArchive.map(item => (
              <button
                key={item.title}
                type="button"
                className="group flex w-full min-w-0 items-center justify-between gap-3 rounded-sm px-3 py-4.5 text-left transition-all duration-200 hover:bg-neutral-100/70 active:scale-[0.99] sm:gap-5 sm:px-4 sm:py-5"
                onClick={event => {
                  if (!getNeoLabArchiveGallery(item.title)) return;
                  archiveTriggerRef.current = event.currentTarget;
                  setActiveArchiveTitle(item.title);
                  setArchiveGalleryOpen(true);
                }}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-6">
                  <time
                    className="shrink-0 font-mono text-sm font-semibold tracking-wider text-[color:var(--brand)] sm:text-base"
                    dateTime={item.dateTime}
                  >
                    {item.date}
                  </time>
                  <span
                    className="truncate font-[family-name:var(--font-editorial)] text-[18px] font-normal uppercase leading-[1.2] tracking-tight text-[#121315] transition-colors group-hover:text-[color:var(--brand)] sm:text-xl"
                  >
                    {item.title}
                  </span>
                </div>
                <span
                  className="flex shrink-0 items-center gap-1 whitespace-nowrap font-mono text-sm uppercase tracking-wider text-neutral-400 transition-colors group-hover:text-[#121315] sm:text-base"
                >
                  <span className="hidden sm:inline">ZOBACZ</span>
                  ↗
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <NeoLabArchiveGalleryDialog
        open={archiveGalleryOpen}
        onOpenChange={open => {
          setArchiveGalleryOpen(open);
          if (!open) setActiveArchiveTitle(null);
        }}
        title={activeArchiveGallery?.dialogTitle ?? activeArchiveTitle ?? ''}
        images={activeArchiveGallery?.photos ?? []}
        returnFocusRef={archiveTriggerRef}
      />
    </section>
  );
}
