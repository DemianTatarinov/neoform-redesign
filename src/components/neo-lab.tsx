import { EditorialKicker } from '@/components/editorial-kicker';
import { NeoLabVideo } from '@/components/neo-lab-video';
import { neoLabArchive, pekaSchedule } from '@/lib/neo-lab-content';
import { CONTACT_HASH } from '@/lib/scroll-to-section';
import { navigateToHomeHash } from '@/lib/navigate-to-home-hash';
import { useNavigate } from '@tanstack/react-router';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

const partnerBrands = ['Blum', 'Häfele', 'Viefe', 'PEKA', 'ARPA', 'FENIX'] as const;

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

const archiveGalleryPhotos = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
] as const;

export function NeoLab() {
  const navigate = useNavigate();
  const [openPanel, setOpenPanel] = useState<string | null>(educationPanels[0].id);
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null);
  const archiveTriggerRef = useRef<HTMLButtonElement | null>(null);

  const scrollToTechnologia = useCallback(() => {
    const section = document.getElementById('technologia');
    if (section) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    void navigateToHomeHash(navigate, 'technologia');
  }, [navigate]);

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

  const closeArchive = useCallback(() => {
    setSelectedGallery(null);
    window.setTimeout(() => archiveTriggerRef.current?.focus({ preventScroll: true }), 0);
  }, []);

  useEffect(() => {
    if (selectedGallery === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeArchive();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedGallery, closeArchive]);

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

          {/* Element 3: partners */}
          <div className="-mx-[max(1rem,env(safe-area-inset-left))] mt-16 border-y border-neutral-800/60 bg-neutral-900/30 px-[max(1rem,env(safe-area-inset-left))] py-12 sm:-mx-8 sm:mt-24 sm:px-8 sm:py-16">
          <div className="flex flex-col gap-10 md:gap-12">
            <p className="m-0 max-w-3xl font-[family-name:var(--font-editorial)] text-base font-light leading-relaxed text-neutral-300 sm:text-lg">
              Nie chcemy być jedynym źródłem wiedzy. Neo LAB tworzymy wspólnie z markami, które wyznaczają standardy:{' '}
              <span className="font-normal text-white">Blum, Häfele, Viefe, PEKA, ARPA, FENIX</span>. To spotkania,
              podczas których produkt można dotknąć, przetestować i w pełni zrozumieć
            </p>
            <div className="grid grid-cols-2 gap-px border border-neutral-800/80 bg-neutral-800/80 sm:grid-cols-3 lg:grid-cols-6">
              {partnerBrands.map(brand => (
                <button
                  key={brand}
                  type="button"
                  onClick={scrollToTechnologia}
                  className="bg-neutral-950 px-4 py-6 text-center font-mono text-[16px] uppercase tracking-[0.25em] text-[color:var(--brand)] transition-colors hover:bg-neutral-900/50"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
          </div>

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
            <div className="flex flex-col gap-8 sm:gap-10">
              <EditorialKicker aside="01 / 03">NAJBLIŻSZE WYDARZENIE</EditorialKicker>
              <div className="flex flex-col gap-3 sm:gap-4">
                <h3 className="m-0 font-[family-name:var(--font-editorial)] text-4xl font-light uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
                  NEO LAB × PEKA
                </h3>
                <p className="m-0 font-mono text-xs uppercase tracking-[0.15em] text-neutral-500 sm:text-sm">
                  KAŻDY CENTYMETR MA ZNACZENIE
                </p>
              </div>
              <p className="m-0 max-w-3xl font-[family-name:var(--font-editorial)] text-lg font-light leading-relaxed text-neutral-300 sm:text-xl">
                To nie jest klasyczne szkolenie produktowe. To zmiana sposobu myślenia o przestrzeni: funkcja →
                ergonomia → organizacja → technologia → estetyka. PEKA dostarcza narzędzi, a NEO FORM pokazuje, jak
                wykorzystać je w rzeczywistych, wymagających projektach. Uczysz się projektować wnętrze mebla pod realne
                potrzeby użytkownika, eliminując błędy i reklamacje
              </p>
            </div>
            <ul className="mt-12 flex flex-col divide-y divide-neutral-700/50 border-y border-neutral-700/50">
              {pekaSchedule.map(entry => (
                <li
                  key={entry.time}
                  className="group -mx-6 flex flex-col gap-2 px-6 py-5 transition-colors hover:bg-neutral-800/40 sm:mx-0 sm:flex-row sm:gap-8 sm:px-4 sm:py-6"
                >
                  <span className="shrink-0 pt-0.5 font-mono text-sm tracking-widest text-[color:var(--brand)] sm:w-20">
                    {entry.time}
                  </span>
                  <span className="flex-1 text-sm leading-relaxed text-neutral-400 sm:text-base">
                    <span className="font-medium text-white transition-colors group-hover:text-[color:var(--brand)]">
                      {entry.module}
                    </span>
                    {' — '}
                    {entry.description}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-2xl border-l-2 border-neutral-800 pl-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
              Dla architektów i projektantów wnętrz, którzy chcą łączyć bezkompromisowy design z idealną inżynierią
            </p>
            <a
              href="/#kontakt"
              onClick={scrollToContact}
              className="mt-8 inline-flex items-center gap-3 border border-[color:var(--brand)] px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--brand)] transition-colors hover:bg-[color:var(--brand)] hover:text-black"
            >
              ZAPISZ SIĘ NA WYDARZENIE ↗
            </a>
          </article>

          {/* Element 6: archive */}
          <div className="mt-14 md:mt-20">
            <EditorialKicker className="mb-[var(--heading-space)]" aside="02 / 03">
              POPRZEDNIE SPOTKANIA
            </EditorialKicker>
            <p className="max-w-3xl font-[family-name:var(--font-editorial)] text-xl font-light leading-relaxed text-neutral-300 sm:text-2xl">
              Te spotkania już się odbyły, ale energia i wiedza, które nam dały, wciąż pracują w kolejnych projektach.
              Zobacz, jak wyglądają nasze warsztaty od środka
            </p>
            <div className="mt-8 grid grid-cols-1 gap-px border border-neutral-800/80 bg-neutral-800/80 sm:grid-cols-2 lg:grid-cols-4">
              {neoLabArchive.map(item => (
                <button
                  key={item.title}
                  type="button"
                  className="group flex min-h-full flex-col bg-gradient-to-br from-neutral-900/50 to-neutral-950 p-6 text-left transition-all duration-300 hover:from-neutral-800/60 hover:to-neutral-900/80 hover:shadow-xl sm:p-8"
                  onClick={event => {
                    archiveTriggerRef.current = event.currentTarget;
                    setSelectedGallery(item.title);
                  }}
                >
                  <time
                    className="font-mono text-xs tracking-widest text-[color:var(--brand)] sm:text-sm"
                    dateTime={item.dateTime}
                  >
                    {item.date}
                  </time>
                  <span className="mt-4 font-[family-name:var(--font-editorial)] text-2xl font-light text-white transition-colors group-hover:text-[color:var(--brand)] sm:text-3xl">
                    {item.title}
                  </span>
                  <span className="mt-auto flex items-center gap-2 pt-10 font-mono text-[10px] uppercase tracking-widest text-neutral-500 transition-colors group-hover:text-white sm:text-[11px]">
                    ZOBACZ GALERIĘ
                    <span className="text-sm text-[color:var(--brand)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedGallery !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="neo-lab-archive-title"
          onClick={closeArchive}
        >
          <button
            type="button"
            className="absolute right-6 top-6 z-50 cursor-pointer p-2 text-white transition-colors hover:text-[color:var(--brand)] sm:right-10 sm:top-10"
            aria-label="Zamknij galerię"
            onClick={closeArchive}
          >
            <X className="size-6" aria-hidden="true" />
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto"
            onClick={event => event.stopPropagation()}
          >
            <h4
              id="neo-lab-archive-title"
              className="mb-8 font-[family-name:var(--font-editorial)] text-3xl font-light uppercase text-white sm:text-5xl"
            >
              {selectedGallery}
            </h4>
            <div className="grid grid-cols-1 gap-px border border-neutral-800/50 bg-neutral-800/50 sm:grid-cols-2 lg:grid-cols-3">
              {archiveGalleryPhotos.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`${selectedGallery} — zdjęcie poglądowe ${index + 1}`}
                  className="aspect-[4/3] w-full object-cover bg-neutral-900"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
