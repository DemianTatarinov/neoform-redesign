import { createFileRoute } from '@tanstack/react-router';
import { useRef } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import ewolucjaImg from '@/assets/EWOLUCJA/EWOLUCJA.webp';
import { copyAfterTitleClassName } from '@/components/editorial-section';
import { SiteFooterSignature } from '@/components/site-footer-signature';

const heroMobileBodyClassName =
  `ewolucja-hero-body font-[family-name:var(--font-editorial)] text-[19px] leading-[1.6] text-neutral-700 flex flex-col space-y-5 [&>p+p]:mt-5 ${copyAfterTitleClassName}`;

const heroDesktopBodyClassName =
  'font-[family-name:var(--font-editorial)] text-[18px] sm:text-[19px] leading-[1.6] text-neutral-800 flex flex-col space-y-5 [&>p+p]:mt-5';

const heroDesktopTaglineClassName =
  'hero-tagline m-0 block font-mono text-xs font-semibold uppercase tracking-wider text-[#B8860B] sm:text-sm';

const transformationPillars = [
  {
    title: 'FUNDAMENT: WIEDZA I WARSZTAT',
    body:
      'Doświadczenie zebrane przy setkach realizacji zabudów meblowych pozostaje naszym największym kapitałem',
  },
  {
    title: 'KIERUNEK: ARCHITEKTURA I DETAL',
    body:
      'Tworzymy spójne formy dla całych przestrzeni, łącząc zaawansowane materiały z bezkompromisową estetyką',
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
      <main ref={pageRef} className="min-h-dvh">
        <section
          className="bg-[#F4F3EF] text-[#121315] pb-16 pt-[calc(var(--header-height)+var(--space-copy))] sm:pb-24 md:pb-32 md:pt-[calc(var(--header-height)+var(--heading-space))]"
        >
          <div
            className="mx-auto max-w-4xl px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8 lg:max-w-6xl"
          >
            <article>
              <div className="relative flex flex-col lg:grid lg:grid-cols-12 lg:items-center lg:gap-0">
                <div
                  className="ewolucja-hero-copy flex flex-col lg:relative lg:z-20 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:-mr-44 lg:flex lg:flex-col lg:px-8"
                  data-reveal-enter
                  data-reveal-delay="80"
                  data-reveal-from="left"
                >
                  <p className="m-0 font-mono text-xs uppercase tracking-widest text-[#B8860B] lg:font-bold lg:tracking-[0.2em]">
                    EWOLUCJA MARKI
                  </p>
                  <div className="credo-intro mt-[var(--space-copy)] w-full min-w-0 text-left">
                    <div className="min-w-0">
                      <div className="section-heading-title">
                        <h2
                          className="editorial-section-title m-0 max-w-[14ch] text-balance text-[28px] sm:text-[34px] lg:max-w-none lg:text-[4rem] lg:leading-[0.95] lg:tracking-tight"
                        >
                          NOWY CZAS
                          <br />
                          NOWA FORMA
                        </h2>
                        <span
                          className="mt-[var(--accent-line-gap)] block h-[2px] w-12 bg-[#B8860B]"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <p
                      className="hero-tagline m-0 max-w-full font-mono text-[clamp(9px,2.85vw,12px)] uppercase leading-relaxed tracking-wider text-neutral-500 whitespace-nowrap lg:hidden"
                      aria-label="Hasła marki"
                    >
                      NEO KUCHNIE · NEO FORM · NOWY CZAS · NOWA FORMA
                    </p>
                  </div>
                  <div
                    className={`hidden max-w-[min(100%,52ch)] lg:flex ${copyAfterTitleClassName} ${heroDesktopBodyClassName}`}
                  >
                    <p className="m-0 text-left">
                      NEO KUCHNIE było początkiem. To tam zdobywaliśmy doświadczenie, poznawaliśmy materiały,
                      technologie i potrzeby klientów
                    </p>
                    <p className="m-0 text-left">
                      To tam powstały setki decyzji, które dziś pozwalają nam realizować jeszcze bardziej wymagające
                      projekty
                    </p>
                    <p className={`${heroDesktopTaglineClassName} m-0 text-left`} aria-label="Hasła marki">
                      NEO KUCHNIE · NEO FORM · NOWY CZAS · NOWA FORMA
                    </p>
                  </div>
                </div>

                <div
                  className="ewolucja-hero-media relative z-0 my-6 w-full max-lg:-mx-[max(1rem,env(safe-area-inset-left))] max-lg:w-[calc(100%+max(1rem,env(safe-area-inset-left))+max(1rem,env(safe-area-inset-right)))] lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:my-0 lg:flex lg:aspect-[4/3] lg:items-center lg:justify-center"
                  data-reveal-enter
                  data-reveal-delay="0"
                  data-reveal-from="right"
                >
                  <div className="relative w-full lg:h-full lg:max-w-none lg:overflow-visible lg:rounded-sm lg:shadow-2xl">
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-1/3 bg-gradient-to-r from-[#F4F3EF] via-[#121315]/70 to-transparent lg:block"
                      aria-hidden
                    />
                    <img
                      src={ewolucjaImg}
                      alt="Archiwalne ujęcie warsztatu i realizacji — kontekst transformacji marki NEO KUCHNIE w NEO FORM"
                      className="block h-auto w-full max-lg:rounded-none rounded-sm object-contain shadow-lg max-lg:shadow-none grayscale-[20%] contrast-[105%] lg:h-full lg:w-full lg:object-cover lg:object-center lg:shadow-2xl lg:brightness-[0.85]"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                </div>

                <div
                  className={`${heroMobileBodyClassName} max-w-[var(--copy-width)] lg:hidden`}
                  data-reveal-enter
                  data-reveal-delay="200"
                  data-reveal-from="left"
                >
                  <p className="m-0 text-left">
                    NEO KUCHNIE było początkiem. To tam zdobywaliśmy doświadczenie, poznawaliśmy materiały,
                    technologie i potrzeby klientów
                  </p>
                  <p className="m-0 text-left">
                    To tam powstały setki decyzji, które dziś pozwalają nam realizować jeszcze bardziej wymagające
                    projekty
                  </p>
                </div>
              </div>

              <blockquote
                className="mt-[var(--layout-gap)] max-w-2xl border-l-[3px] border-[#B8860B] bg-transparent py-2 pl-6"
              >
                <p className="m-0 font-[family-name:var(--font-editorial)] text-xl font-normal italic leading-relaxed text-[#121315] sm:text-2xl">
                  NEO FORM nie odcina się od NEO KUCHNIE. Jesteśmy jego naturalną, bezkompromisową ewolucją
                </p>
              </blockquote>

              <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                {transformationPillars.map(pillar => (
                  <div
                    key={pillar.title}
                    className="flex flex-col gap-4 rounded-sm border border-neutral-200/60 bg-white/70 p-6 shadow-sm sm:p-8"
                  >
                    <h3 className="m-0 font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#B8860B]">
                      {pillar.title}
                    </h3>
                    <p className="m-0 font-[family-name:var(--font-editorial)] text-[16px] leading-[1.5] text-neutral-700 sm:text-[17px]">
                      {pillar.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooterSignature />
    </>
  );
}
