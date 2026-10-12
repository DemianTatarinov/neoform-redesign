import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import ewolucjaImg from '@/assets/EWOLUCJA/EWOLUCJA.webp';
import { SiteFooterSignature } from '@/components/site-footer-signature';

const transformationPillars = [
  {
    title: 'FUNDAMENT: WIEDZA I WARSZTAT',
    body:
      'Doświadczenie zebrane przy setkach realizacji zabudów meblowych pozostaje naszym największym kapitałem.',
  },
  {
    title: 'KIERUNEK: ARCHITEKTURA I DETAL',
    body:
      'Tworzymy spójne formy dla całych przestrzeni, łącząc zaawansowane materiały z bezkompromisową estetyką.',
  },
] as const;

export const Route = createFileRoute('/ewolucja-marki')({
  head: () => ({
    meta: [
      { title: 'Ewolucja marki — NEO KUCHNIE → NEO FORM | NEO FORM' },
      {
        name: 'description',
        content:
          'NEO FORM jako naturalna ewolucja NEO KUCHNIE — doświadczenie, materiały i technologie w nowej formie.',
      },
      { property: 'og:title', content: 'Ewolucja marki — NEO KUCHNIE → NEO FORM' },
      {
        property: 'og:description',
        content: 'NOWY CZAS. NOWA FORMA. Historia rebrandingu NEO FORM.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: EwolucjaMarkiPage,
});

function EwolucjaMarkiPage() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollReveal(pageRef);

  return (
    <>
      <main
        ref={pageRef}
        className="min-h-dvh bg-neutral-950 text-white"
        style={{ backgroundColor: 'var(--ink)' }}
      >
        <div
          className="mx-auto max-w-4xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-16 pt-[calc(var(--header-height)+1rem)] sm:px-8 sm:pt-[calc(var(--header-height)+1.25rem)] md:pb-24 md:pt-[calc(var(--header-height)+3rem)] lg:max-w-6xl"
        >
          <article>
            <div className="relative grid grid-cols-12 items-start gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-0">
              <div
                className="ewolucja-hero-media relative z-0 order-1 col-span-9 col-start-4 row-start-1 flex min-h-0 items-start justify-end overflow-visible bg-transparent sm:col-span-8 sm:col-start-5 lg:order-2 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:aspect-[4/3] lg:w-full lg:items-center lg:justify-center lg:overflow-visible"
                data-reveal-enter
                data-reveal-delay="0"
                data-reveal-from="right"
              >
                <img
                  src={ewolucjaImg}
                  alt="Archiwalne ujęcie warsztatu i realizacji — kontekst transformacji marki NEO KUCHNIE w NEO FORM"
                  className="mr-[calc(-1*max(1rem,env(safe-area-inset-right)))] block h-auto max-h-[min(52vh,440px)] w-full max-w-none object-contain object-right grayscale-[20%] contrast-[105%] sm:mr-[calc(-1*2rem)] lg:mr-0 lg:h-full lg:max-h-none lg:w-full lg:rounded-sm lg:object-contain lg:shadow-2xl"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <span
                  className="pointer-events-none absolute bottom-3 right-3 z-20 hidden border border-neutral-800/80 bg-neutral-950/80 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-neutral-400/90 backdrop-blur-sm lg:inline-flex"
                >
                  [ ARCHIWUM / TRANSFORMATIO ]
                </span>
              </div>

              <div
                className="ewolucja-hero-copy relative z-20 order-2 col-span-10 col-start-1 row-start-1 flex max-lg:flex-col max-lg:gap-3.5 max-lg:mt-[min(14vh,118px)] max-lg:pt-0 sm:col-span-9 lg:order-1 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex lg:flex-col lg:-mr-32 lg:gap-[var(--space-copy)] lg:rounded-l-lg lg:border lg:border-neutral-900/40 lg:bg-gradient-to-r lg:from-neutral-950 lg:via-neutral-950/80 lg:to-transparent lg:p-8 lg:pt-8 lg:shadow-xl lg:backdrop-blur-[2px]"
                data-reveal-enter
                data-reveal-delay="80"
                data-reveal-from="left"
              >
                <span
                  className="pointer-events-none inline-flex w-fit border border-neutral-500/60 bg-neutral-300/95 px-2 py-0.5 font-mono text-[11px] uppercase leading-tight tracking-wider text-neutral-900 shadow-sm sm:text-xs lg:hidden"
                >
                  [ ARCHIWUM / TRANSFORMATIO ]
                </span>
                <p
                  className="relative z-20 m-0 font-mono text-sm uppercase text-[color:var(--brand)] lg:font-[family-name:var(--font-editorial)] lg:text-[length:var(--type-small)] lg:font-normal lg:leading-[1.6] lg:tracking-normal"
                >
                  EWOLUCJA MARKI
                </p>
                <h2
                  className="relative z-20 m-0 max-w-[14ch] text-balance font-[family-name:var(--font-editorial)] text-[1.75rem] font-light leading-[1.15] text-white sm:text-[2.125rem] lg:max-w-none lg:text-[length:var(--type-display)] lg:font-normal lg:leading-[1.27] lg:text-[color:var(--on-ink)]"
                >
                  NOWY CZAS.
                  <br />
                  NOWA FORMA.
                </h2>
                <p
                  className="hero-tagline m-0 mt-[var(--space-copy)] max-w-[var(--copy-width)] text-left text-[19px] leading-snug uppercase sm:text-[20px] lg:hidden"
                  aria-label="Hasła marki"
                >
                  NEO KUCHNIE · NEO FORM
                  <br />
                  NOWY CZAS · NOWA FORMA
                </p>
                <div
                  className="hidden max-w-[min(100%,52ch)] flex-col gap-[var(--space-copy)] lg:flex"
                >
                  <p
                    className="m-0 text-left font-[family-name:var(--font-editorial)] text-[length:var(--type-body)] font-normal leading-[1.6] tracking-normal text-[color:var(--on-ink)]"
                  >
                    NEO KUCHNIE było początkiem. To tam zdobywaliśmy doświadczenie, poznawaliśmy materiały,
                    technologie i potrzeby klientów.
                  </p>
                  <p
                    className="m-0 text-left font-[family-name:var(--font-editorial)] text-[length:var(--type-body)] font-normal leading-[1.6] tracking-normal text-[color:var(--on-ink)]"
                  >
                    To tam powstały setki decyzji, które dziś pozwalają nam realizować jeszcze bardziej wymagające
                    projekty.
                  </p>
                  <p
                    className="hero-tagline m-0 text-left uppercase"
                    aria-label="Hasła marki"
                  >
                    NEO KUCHNIE · NEO FORM
                    <br />
                    NOWY CZAS · NOWA FORMA
                  </p>
                </div>
              </div>

              <div
                className="ewolucja-hero-body relative z-10 col-span-12 row-start-2 flex max-w-[var(--copy-width)] flex-col gap-[var(--space-copy)] max-lg:pt-[var(--space-copy)] lg:hidden"
                data-reveal-enter
                data-reveal-delay="200"
                data-reveal-from="left"
              >
                <p
                  className="m-0 text-left font-[family-name:var(--font-editorial)] text-[length:var(--type-body)] font-normal leading-[1.6] tracking-normal text-[color:var(--on-ink)]"
                >
                  NEO KUCHNIE było początkiem. To tam zdobywaliśmy doświadczenie, poznawaliśmy materiały,
                  technologie i potrzeby klientów.
                </p>
                <p
                  className="m-0 text-left font-[family-name:var(--font-editorial)] text-[length:var(--type-body)] font-normal leading-[1.6] tracking-normal text-[color:var(--on-ink)]"
                >
                  To tam powstały setki decyzji, które dziś pozwalają nam realizować jeszcze bardziej wymagające
                  projekty.
                </p>
              </div>
            </div>

            <blockquote
              className="mt-[var(--layout-gap)] max-w-2xl border-l border-[color:var(--brand)] bg-neutral-900/40 p-4 sm:p-6"
            >
              <p className="text-lg font-semibold leading-relaxed text-white sm:text-xl md:text-2xl">
                NEO FORM nie odcina się od NEO KUCHNIE. Jesteśmy jego naturalną, bezkompromisową ewolucją.
              </p>
            </blockquote>

            <div
              className="my-10 grid grid-cols-1 gap-px border border-neutral-800/80 bg-neutral-800/80 md:grid-cols-2"
            >
              {transformationPillars.map(pillar => (
                <div key={pillar.title} className="bg-neutral-950 p-6 sm:p-8">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[color:var(--brand)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </main>
      <SiteFooterSignature />
    </>
  );
}
