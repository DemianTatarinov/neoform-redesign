import { Odometer } from "@/components/odometer";
import { createFileRoute, Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copy, categories } from '@/lib/neo-content';
import materials from '@/assets/neo-materials.jpg';
import materialDrewnoFornir from '@/assets/MATERIAL/Drewno-Fornir/Drewno-Fornir_web.webp';
import materialKamienSpiek from '@/assets/MATERIAL/Kamień-Spiek/Kamień-Spiek_web.webp';
import fenixArpaHplImg from '@/assets/MATERIAL/Fenix-ARPA-HPL/Fenix-ARPA-HPL_web.webp';
import materialStal from '@/assets/MATERIAL/Stał/Stał_web.webp';

const materialCardImages: Record<string, string> = {
  'Drewno / Fornir': materialDrewnoFornir,
  'Kamień / Spieki': materialKamienSpiek,
  'FENIX / ARPA / HPL': fenixArpaHplImg,
  Stal: materialStal,
};
const materialCardPhotoClass =
  '!relative !left-0 !w-full !max-w-full !h-full object-cover lg:object-center lg:transition-transform lg:duration-700 lg:ease-out lg:group-hover:scale-[1.03]';
const materialGalleryNames = ['Drewno / Fornir', 'Kamień / Spieki', 'FENIX / ARPA / HPL', 'Stal'] as const;
const materialGalleryPhotos = materialGalleryNames.map(name => materialCardImages[name]);

const realizacjeNeoLabTeasers = [
  {
    category: 'NEO KUCHNIE / NEO FORM',
    description: 'Rebranding marki i koncepcja kuchni NEO FORM',
    to: '/ewolucja-marki' as const,
    hash: undefined,
  },
  {
    category: 'NEO LAB',
    description: 'Spotkania, szkolenia i testy rozwiązań dla architektów',
    to: '/' as const,
    hash: 'neo-lab',
  },
  {
    category: 'JOURNAL / TRENDY',
    description: 'Inspiracje, reportaże z wyjazdów i przegląd trendów w architekturze',
    to: '/' as const,
    hash: 'inspiracje',
  },
  {
    category: 'NAJBLIŻSZE WYDARZENIA',
    description: 'Nadchodzące spotkania NEO LAB — daty, miejsca i zapisy',
    to: '/' as const,
    hash: 'wydarzenia',
  },
] as const;

const neoLabPageHashes = new Set(['neo-lab', 'inspiracje', 'wydarzenia']);
import blatWebImg from '@/assets/BLAT/Blat_web.webp';
import technologiaMainImg from '@/assets/TECHNOLOGIA/Главное фото/Главное фото.webp';
import {
  hardwareBrandIds,
  hardwareBrandLabels,
  hardwareGalleriesByBrand,
  type HardwareBrandId,
} from '@/lib/hardware-gallery';
import plans from '@/assets/neo-plans.jpg';
import architectsImg from '@/assets/neo-architects.webp';
import neoStandardImg from '@/assets/Neo STANDARD /Neo_STANDARD.webp';
import bespokeBgImg from '@/assets/BESPOKE /Фоновая главная/Фоновая главная.webp';
import wymiaryImg1 from '@/assets/BESPOKE /netypowe wymiary/netypowe wymiary1.webp';
import wymiaryImg2 from '@/assets/BESPOKE /netypowe wymiary/netypowe wymiary2.webp';
import ukryteDrzwiImg1 from '@/assets/BESPOKE /ukryte drzwi /ukryte drzwi 1.webp';
import ukryteDrzwiImg2 from '@/assets/BESPOKE /ukryte drzwi /ukryte drzwi 2.webp';
import zabudowyImg1 from '@/assets/BESPOKE /Zabudowy sięgające kilku metrów /Zabudowy sięgające kilku metrów  1.webp';
import zabudowyImg2 from '@/assets/BESPOKE /Zabudowy sięgające kilku metrów /Zabudowy sięgające kilku metrów  2.webp';

type BespokeCategoryId = 'wymiary' | 'drzwi' | 'metry' | 'fornir';

const bespokeCategories: {
  id: BespokeCategoryId;
  label: string;
  layout: 'half' | 'full';
  images: string[];
}[] = [
  { id: 'wymiary', label: 'Nietypowe wymiary', layout: 'half', images: [wymiaryImg1, wymiaryImg2] },
  { id: 'drzwi', label: 'Ukryte drzwi', layout: 'half', images: [ukryteDrzwiImg1, ukryteDrzwiImg2] },
  { id: 'metry', label: 'Zabudowy sięgające kilku metrów', layout: 'full', images: [zabudowyImg1, zabudowyImg2] },
  { id: 'fornir', label: 'Płynne przejścia forniru', layout: 'full', images: [materials] },
];
import credoThesis1 from '@/assets/CREDO/tezisy/tezis-1.webp';
import credoThesis2 from '@/assets/CREDO/tezisy/tezis-2.webp';
import credoThesis3 from '@/assets/CREDO/tezisy/tezis-3.webp';
import credoThesis4 from '@/assets/CREDO/tezisy/tezis-4.webp';
import credoMaterialWeb from '@/assets/CREDO/Material_web_web.webp';
import credoDetalWeb from '@/assets/CREDO/Detal_web_web.webp';
import credoJakoscWeb from '@/assets/CREDO/Jakość_web_web.webp';
import { BespokeGalleryLightbox } from '@/components/bespoke-gallery-lightbox';
import { portfolioCoverImages, realizacjeGalleriesByCategory } from '@/lib/realizacje-gallery';
import { CredoThesisLightbox, type CredoThesisImage } from '@/components/credo-thesis-lightbox';
import { HardwareDialog } from '@/components/hardware-dialog';
import { PhotoSwipeGalleryDialog } from '@/components/photo-swipe-gallery-dialog';

const credoThesisPhotos = [credoThesis1, credoThesis2, credoThesis3, credoThesis4];
const THESIS_TAP_MOVE_PX = 8;
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ContactMap } from '@/components/contact-map';
import { HeroVideo } from '@/components/hero-video';
import { ContactAddress } from '@/components/contact-address';
import { ContactForm } from '@/components/contact-form';
import { SectionLabel } from '@/components/section-label';
import {
  EditorialSectionTitle,
  editorialBodyCopyClassName,
  editorialBodyCopyDarkClassName,
  editorialH2DarkClassName,
  editorialH2LightClassName,
  copyAfterTitleClassName,
} from '@/components/editorial-section';
import { primaryBrandCtaArrowClassName, primaryBrandCtaMinimalClassName } from '@/lib/primary-brand-cta';
import { scrollToContactSection, scrollToHashTarget } from '@/lib/scroll-to-section';
import { useHomeHashScroll } from '@/lib/use-home-hash-scroll';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'NEO FORM — Meble i zabudowy dla całych wnętrz' },
      { name: 'title', content: 'NEO FORM — Meble i zabudowy dla całych wnętrz' },
      { name: 'description', content: 'Projekt, materiał, detal, jakość. Tworzymy autorskie kuchnie oraz meble i zabudowy dla całych wnętrz.' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'pl_PL' },
      { property: 'og:site_name', content: 'NEO FORM' },
      { property: 'og:url', content: 'https://neoform.com.pl/' },
      { property: 'og:title', content: 'NEO FORM — Meble i zabudowy dla całych wnętrz' },
      { property: 'og:description', content: 'Projekt, materiał, detal, jakość. Tworzymy autorskie kuchnie oraz meble i zabudowy dla całych wnętrz.' },
      { property: 'og:image', content: 'https://neoform.com.pl/og-image.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'NEO FORM — Meble i zabudowy dla całych wnętrz' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: 'https://neoform.com.pl/' },
      { name: 'twitter:title', content: 'NEO FORM — Meble i zabudowy dla całych wnętrz' },
      { name: 'twitter:description', content: 'Projekt, materiał, detal, jakość. Tworzymy autorskie kuchnie oraz meble i zabudowy dla całych wnętrz.' },
      { name: 'twitter:image', content: 'https://neoform.com.pl/og-image.jpg' },
    ],
    links: [
      { rel: 'canonical', href: 'https://neoform.com.pl/' },
    ],
  }),
  component: Index,
});

const principles = [
  { title: 'PROJEKT', image: plans, target: '#architekci' },
  { title: 'MATERIAŁ', image: credoMaterialWeb, target: '#material' },
  { title: 'DETAL', image: credoDetalWeb, target: '#technologia' },
  { title: 'JAKOŚĆ', image: credoJakoscWeb, target: '#realizacje' },
];

function Label({ children, number }: { children: React.ReactNode; number: string }) {
  return <SectionLabel number={number}>{children}</SectionLabel>;
}
function Paragraphs({
  texts,
  className = '',
  variant = 'light',
}: {
  texts: string[];
  className?: string;
  variant?: 'light' | 'dark';
}) {
  const base = variant === 'dark' ? editorialBodyCopyDarkClassName : editorialBodyCopyClassName;
  const paragraphColorClass = variant === 'dark' ? 'text-white' : 'text-black';
  return (
    <div
      className={`${base} lg:w-full lg:max-w-none lg:antialiased lg:[&>p]:w-full lg:[&>p]:max-w-none ${className}`.trim()}
    >
      {texts.map((text, i) => (
        <p
          key={text}
          className={`m-0 ${paragraphColorClass} lg:font-normal lg:w-full lg:max-w-none${i === texts.length - 1 ? ' last-paragraph' : ''}`}
        >
          {text}
        </p>
      ))}
    </div>
  );
}

const credoTextColumnClass =
  'credo-text-column paragraphs editorial-copy editorial-body-copy flex flex-col space-y-5 [&>p+p]:mt-5 text-left font-[family-name:var(--font-editorial)] text-[17px] leading-[1.6] lg:w-full lg:max-w-3xl lg:space-y-6 lg:[&>p+p]:mt-6 lg:text-[19px] lg:leading-[1.65] lg:antialiased lg:[&>p]:w-full lg:[&>p]:max-w-none lg:[&>p]:text-pretty [&>p]:!text-black lg:[&>p]:!text-neutral-900 xl:max-w-4xl';
const contentPhotoImgClass =
  'w-full max-lg:aspect-[4/3] lg:h-auto lg:aspect-[16/10] lg:max-h-[min(72vh,880px)] lg:w-full lg:object-cover lg:object-center object-cover max-lg:rounded-none lg:rounded-sm lg:overflow-hidden lg:ring-1 lg:ring-black/10 lg:transition-[box-shadow] lg:duration-300 lg:hover:ring-black/15';
const contentPhotoImgDarkClass =
  `${contentPhotoImgClass} lg:ring-white/10 lg:hover:ring-white/20`;

function ContentPhotoShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`w-full max-lg:px-0 lg:container lg:mx-auto ${className}`.trim()}>{children}</div>;
}

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`editorial-photo ${className}`}
      loading="lazy"
      decoding="async"
      width={1536}
      height={1024}
    />
  );
}

function Index() {
  const pageRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  useScrollReveal(pageRef);

  const onTeaserNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, hash: string | undefined) => {
      if (!hash) return;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      if (document.getElementById(hash)) {
        event.preventDefault();
        scrollToHashTarget(hash);
        return;
      }

      event.preventDefault();
      void navigate({ to: '/neo-lab', hash });
    },
    [navigate],
  );
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState(0);
  const activeRealizacjePhotos = realizacjeGalleriesByCategory[galleryCategory] ?? [];
  const portfolioModalPhotos =
    activeRealizacjePhotos.length > 0
      ? activeRealizacjePhotos
      : [portfolioCoverImages[galleryCategory] ?? portfolioCoverImages[0]].filter(Boolean);
  const [principle, setPrinciple] = useState(0);
  const [activeBrand, setActiveBrand] = useState<HardwareBrandId | null>(null);
  const [activeThesisImage, setActiveThesisImage] = useState<CredoThesisImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<BespokeCategoryId>('metry');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [materialLightboxOpen, setMaterialLightboxOpen] = useState(false);
  const [materialLightboxIndex, setMaterialLightboxIndex] = useState(0);
  const activeBespokeItem = bespokeCategories.find(category => category.id === activeCategory);
  const currentPhotos = activeBespokeItem?.images ?? [];
  const activeCategoryLabel = activeBespokeItem?.label ?? '';

  useEffect(() => {
    setLightboxOpen(false);
    setLightboxIndex(0);
  }, [activeCategory]);

  const locationHash = useRouterState({
    select: state => {
      const raw = state.location.hash ?? '';
      return raw.startsWith('#') ? raw.slice(1) : raw;
    },
  });

  useHomeHashScroll();

  useEffect(() => {
    if (!neoLabPageHashes.has(locationHash)) return;
    if (document.getElementById(locationHash)) return;
    void navigate({ to: '/neo-lab', hash: locationHash });
  }, [locationHash, navigate]);
  const thesisSliderRef = useRef<HTMLUListElement>(null);
  const scrollThesisSlide = useCallback((direction: -1 | 1) => {
    const track = thesisSliderRef.current;
    if (!track || track.children.length === 0) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let activeIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - trackCenter);
      if (distance < bestDistance) {
        bestDistance = distance;
        activeIndex = index;
      }
    });

    const nextIndex = Math.min(slides.length - 1, Math.max(0, activeIndex + direction));
    slides[nextIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, []);

  const thesisPointer = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const onThesisPointerDown = (event: PointerEvent<HTMLLIElement>) => {
    thesisPointer.current = { x: event.clientX, y: event.clientY, moved: false };
  };
  const onThesisPointerMove = (event: PointerEvent<HTMLLIElement>) => {
    const pointer = thesisPointer.current;
    if (!pointer || pointer.moved) return;
    if (
      Math.abs(event.clientX - pointer.x) > THESIS_TAP_MOVE_PX
      || Math.abs(event.clientY - pointer.y) > THESIS_TAP_MOVE_PX
    ) {
      pointer.moved = true;
    }
  };
  const clearThesisPointer = () => {
    thesisPointer.current = null;
  };
  const openThesisLightbox = (index: number, title: string) => {
    setActiveThesisImage({ src: credoThesisPhotos[index], title, index });
  };
  const onThesisPointerUp = (index: number, title: string) => {
    if (thesisPointer.current && !thesisPointer.current.moved) {
      openThesisLightbox(index, title);
    }
    clearThesisPointer();
  };
  const onScrollToKontakt = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToContactSection();
  };

  return (
    <main ref={pageRef}>
      <section className="hero" id="top">
        <HeroVideo />
        <div className="hero-shade" />
        <div className="hero-foreground">
          <div className="hero-copy"><div className="hero-kicker">NEO FORM</div><h1 className="lg:whitespace-normal lg:break-normal">
              NOWA FORMA
              <br className="lg:hidden" />
              {' '}
              NIEOGRANICZONE
              <br className="lg:hidden" />
              {' '}
              MOŻLIWOŚCI
            </h1><p>{copy.hero}</p></div>
          <div className="hero-bottom"><span>PROJEKT · MATERIAŁ · DETAL · JAKOŚĆ</span><a href="/" aria-label="Przejdź do kontaktu" onClick={onScrollToKontakt}><ArrowDown size={22} /></a></div>
        </div>
      </section>

      <section className="section credo" id="credo">
        <div className="container"><Label number="01">CREDO</Label>
          <div className="credo-intro text-left lg:items-start lg:gap-8 xl:gap-10">
            <div className="min-w-0 text-left lg:max-w-none">
              <EditorialSectionTitle
                titleClassName={`${editorialH2LightClassName} lg:whitespace-normal lg:break-normal`}
              >
                INDYWIDUALNOŚĆ
                <br className="lg:hidden" />
                {' '}
                BEZ KOMPROMISÓW
              </EditorialSectionTitle>
            </div>
            <div className={credoTextColumnClass}>
              {copy.credo.map(text => (
                <p key={text} className="m-0 text-black">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="relative max-lg:contents">
          <button
            type="button"
            className="thesis-slider-nav thesis-slider-nav--prev hidden lg:absolute lg:left-[max(0.5rem,env(safe-area-inset-left))] lg:top-1/2 lg:z-20 lg:flex lg:size-12 lg:-translate-y-1/2 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-neutral-300/80 lg:bg-[#F9F9F9]/95 lg:text-[#121315] lg:shadow-md lg:backdrop-blur-sm lg:transition-[background-color,border-color,box-shadow,transform] lg:duration-300 lg:ease-out lg:hover:border-[color:var(--brand)] lg:hover:bg-white lg:hover:shadow-lg lg:focus-visible:outline lg:focus-visible:outline-2 lg:focus-visible:outline-offset-2 lg:focus-visible:outline-[color:var(--brand)]"
            aria-label="Poprzedni slajd"
            onClick={() => scrollThesisSlide(-1)}
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <ul
            ref={thesisSliderRef}
            className="individuality-slider lg:flex lg:flex-row lg:flex-nowrap lg:overflow-x-auto lg:snap-x lg:snap-mandatory lg:scroll-smooth lg:gap-8 lg:pb-6 lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
            aria-label="Każde wnętrze jest inne"
          >
            {copy.individuality.map((t, i) => (
          <li
            key={t}
            className="individuality-card relative isolate aspect-square cursor-pointer overflow-hidden lg:aspect-[4/3] lg:h-auto lg:max-h-[min(56vh,540px)] lg:shrink-0 lg:snap-center lg:w-[75vw] lg:max-w-3xl lg:transition-all lg:duration-500 lg:ease-out xl:max-w-4xl xl:max-h-[min(60vh,600px)]"
            role="button"
            tabIndex={0}
            aria-label={`Powiększ zdjęcie: ${t}`}
            onPointerDown={onThesisPointerDown}
            onPointerMove={onThesisPointerMove}
            onPointerUp={() => onThesisPointerUp(i, t)}
            onPointerCancel={clearThesisPointer}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openThesisLightbox(i, t);
              }
            }}
          >
            <img src={credoThesisPhotos[i]} alt="" className="pointer-events-none absolute inset-0 size-full object-cover" loading="lazy" decoding="async" aria-hidden />
            <span className="pointer-events-none absolute inset-0 bg-black/50" aria-hidden />
            <span className="relative z-[1]">0{i + 1}</span>
            <p className="relative z-[1] text-white">{t}</p>
          </li>
            ))}
          </ul>
          <button
            type="button"
            className="thesis-slider-nav thesis-slider-nav--next hidden lg:absolute lg:right-[max(0.5rem,env(safe-area-inset-right))] lg:top-1/2 lg:z-20 lg:flex lg:size-12 lg:-translate-y-1/2 lg:items-center lg:justify-center lg:rounded-full lg:border lg:border-neutral-300/80 lg:bg-[#F9F9F9]/95 lg:text-[#121315] lg:shadow-md lg:backdrop-blur-sm lg:transition-[background-color,border-color,box-shadow,transform] lg:duration-300 lg:ease-out lg:hover:border-[color:var(--brand)] lg:hover:bg-white lg:hover:shadow-lg lg:focus-visible:outline lg:focus-visible:outline-2 lg:focus-visible:outline-offset-2 lg:focus-visible:outline-[color:var(--brand)]"
            aria-label="Następny slajd"
            onClick={() => scrollThesisSlide(1)}
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
        <div className="w-full max-lg:px-0 lg:container lg:mx-auto">
          <div className="principles-split">
            <div className="principles-tabs max-lg:px-[max(var(--page-gutter),env(safe-area-inset-left))] max-lg:pr-[max(var(--page-gutter),env(safe-area-inset-right))]">
              <p className="principles-title">Cztery elementy. Jedna forma</p>
              <div role="tablist" aria-label="Cztery zasady NEO FORM">{principles.map((p, i) => <button key={p.title} type="button" role="tab" id={`principle-tab-${i}`} aria-selected={principle === i} aria-controls="principle-panel" className={principle === i ? 'principle-tab active' : 'principle-tab'} onClick={() => setPrinciple(i)}><span>0{i + 1}</span>{p.title}</button>)}</div>
            </div>
            <div className="principles-photo aspect-[4/3] w-full max-lg:px-0 lg:overflow-hidden lg:ring-1 lg:ring-black/10" role="tabpanel" id="principle-panel" aria-labelledby={`principle-tab-${principle}`}>{principles.map((p, i) => (
              <img
                key={p.title}
                src={p.image}
                alt={p.title}
                loading="lazy"
                decoding="async"
                width={1536}
                height={1024}
                className={`${contentPhotoImgClass} transition-opacity lg:transition-[opacity,transform] lg:duration-700 lg:ease-out ${p.title === 'DETAL' ? '' : 'object-center'} ${principle === i ? 'active' : ''}`}
                style={p.title === 'DETAL' ? { objectPosition: '15% 50%' } : undefined}
                aria-hidden={principle !== i}
              />
            ))}</div>
          </div>
        </div>
      </section>

      <section className="section paper" id="zespol">
        <div className="container">
          <Label number="02">NEO STANDARD</Label>
          <div className="section-heading">
            <EditorialSectionTitle titleClassName={`${editorialH2LightClassName} lg:whitespace-normal lg:break-normal`}>
              FORMA TWORZONA
              <br className="lg:hidden" />
              {' '}
              PRZEZ LUDZI
            </EditorialSectionTitle>
            <p className="lead m-0 font-[family-name:var(--font-editorial)] text-[19px] leading-[1.6] lg:w-full lg:max-w-none lg:leading-[1.65] lg:text-pretty text-black">
              {copy.team[0]}
            </p>
          </div>
        </div>
        <ContentPhotoShell>
          <Photo
            src={neoStandardImg}
            alt="Zespół NEO FORM przy pracy"
            className={`team-photo grayscale contrast-105 ${contentPhotoImgClass}`}
          />
        </ContentPhotoShell>
        <div className="container">
          <div className={`team-copy ${editorialBodyCopyClassName}`}>
            <p className="m-0">{copy.team[1]}</p>
            <p className="m-0">{copy.team[2]}</p>
          </div>
        </div>
      </section>

      <section className="bespoke photo-section" id="bespoke">
        <img src={bespokeBgImg} alt="" className="photo-background editorial-photo size-full object-cover" loading="lazy" width={1920} height={1080} aria-hidden />
        <div className="photo-shade bg-black/65" aria-hidden="true" />
        <div className="container">
          <Label number="03">BESPOKE</Label>
          <EditorialSectionTitle titleClassName={`${editorialH2DarkClassName} lg:whitespace-normal lg:break-normal`}>
            FORMA W GOTOWEJ
            <br className="lg:hidden" />
            {' '}
            PRZESTRZENI
          </EditorialSectionTitle>
          <div className={`bespoke-copy ${editorialBodyCopyDarkClassName}`}>
            <p className="m-0 text-white">{copy.bespoke[0]}</p>
            <p className="m-0 text-white">
              Kiedy standardowe rozwiązania to za mało, tworzymy architekturę dopasowaną do wnętrza. Nasz standard to:
            </p>
            <div className="bespoke-chips-grid w-full">
              {bespokeCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                  className={`bespoke-chip cta-outline-beat cta-outline-beat--dark w-full border backdrop-blur-sm text-center text-[18px] leading-[1.35] tracking-wide py-3 px-4 ${category.layout === 'half' ? 'bespoke-chip--half' : 'bespoke-chip--full'} ${
                    activeCategory === category.id
                      ? 'border-[var(--brand,#EB7C20)] bg-white/10 text-white'
                      : 'border-white/20 bg-white/5 text-neutral-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            {currentPhotos.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                {currentPhotos.map((imgSrc, imgIndex) => (
                  <button
                    key={`${activeCategory}-${imgSrc}`}
                    type="button"
                    className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm border border-white/10 bg-neutral-900/40 p-0 transition-opacity hover:opacity-95"
                    aria-label={`Powiększ: ${activeCategoryLabel} — ${imgIndex + 1} z ${currentPhotos.length}`}
                    onClick={() => {
                      setLightboxIndex(imgIndex);
                      setLightboxOpen(true);
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={activeCategoryLabel}
                      className="pointer-events-none size-full object-cover"
                      loading="lazy"
                      width={1536}
                      height={1024}
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            )}
            <p className="m-0 text-white">
              Te elementy nie są dla nas komplikacją. Są naturalną częścią projektu, którego nie ograniczają żadne szablony
            </p>
            <strong className="strong-statement m-0 font-[family-name:var(--font-editorial)] text-[19px] font-normal leading-[1.6] text-white lg:text-[19px] lg:leading-[1.65] lg:text-white/95">
              {copy.bespoke[2]}
            </strong>
          </div>
        </div>
      </section>

      <section className="section" id="material"><div className="container"><Label number="04">MATERIAŁ</Label><div className="credo-intro text-left"><div className="min-w-0 text-left"><EditorialSectionTitle titleClassName={`${editorialH2LightClassName} lg:whitespace-normal lg:break-normal`}>
              MATERIAŁ
              <br className="lg:hidden" />
              {' '}
              MA ZNACZENIE
            </EditorialSectionTitle></div><Paragraphs
            texts={copy.materials}
            className="normal-case"
          /></div><div className="material-grid gap-4 sm:gap-6 lg:gap-8 lg:items-stretch">{materialGalleryNames.map((name, i) => (
        <figure key={name} className="lg:flex lg:h-full lg:min-w-0 lg:flex-col">
          <div
            className={`material-crop material-${i} group cursor-pointer overflow-hidden rounded-sm border border-neutral-800/15 transition-colors duration-300 hover:border-neutral-800/35 lg:ring-1 lg:ring-black/10 lg:transition-[border-color,box-shadow] lg:duration-300 lg:hover:ring-black/15`}
            role="button"
            tabIndex={0}
            aria-label={`Powiększ: ${name}`}
            onClick={() => {
              setMaterialLightboxIndex(i);
              setMaterialLightboxOpen(true);
            }}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setMaterialLightboxIndex(i);
                setMaterialLightboxOpen(true);
              }
            }}
          >
            <Photo src={materialCardImages[name]} alt={name} className={`${materialCardPhotoClass} pointer-events-none`} />
          </div>
          <figcaption className="mt-3 lg:mt-4 lg:flex lg:flex-1 lg:flex-col lg:justify-end"><span>{name}</span><span>0{i + 1}</span></figcaption>
        </figure>
      ))}</div></div></section>

      <section className="section steel" id="technologia">
        <div className="container">
          <Label number="05">TECHNOLOGIA</Label>
        </div>
        <ContentPhotoShell className="mb-[var(--layout-gap)]">
          <Photo
            src={technologiaMainImg}
            alt="Precyzyjnie spasowane fronty i ukryty zawias"
            className={contentPhotoImgDarkClass}
          />
        </ContentPhotoShell>
        <div className="container">
          <div className="image-text lg:grid-cols-1 lg:w-full">
            <div className="lg:w-full lg:min-w-0">
              <div className="credo-intro text-left lg:grid-cols-1 lg:w-full lg:max-w-none">
                <div className="min-w-0 text-left lg:w-full">
                  <EditorialSectionTitle
                    titleClassName={`${editorialH2DarkClassName} lg:whitespace-normal lg:break-normal`}
                  >
                    INŻYNIERIA
                    <br className="lg:hidden" />
                    {' '}
                    UKRYTA W FORMIE
                  </EditorialSectionTitle>
                </div>
                <Paragraphs texts={copy.technology} variant="dark" />
              </div>
              <div className="system-names flex w-fit max-w-full flex-wrap items-start gap-2 overflow-visible sm:gap-4">
                {hardwareBrandIds.map(name => (
                  <button
                    key={name}
                    type="button"
                    className="system-name cta-outline-beat cta-outline-beat--dark w-fit max-w-full shrink-0 whitespace-nowrap"
                    onClick={() => setActiveBrand(name)}
                  >
                    <span className="system-name-pulse" aria-hidden="true">
                      <span className="system-name-pulse-ring" />
                      <span className="system-name-pulse-core" />
                    </span>
                    <span className="system-name-label">{hardwareBrandLabels[name]}</span>
                    <ArrowUpRight className="system-name-arrow" size={14} strokeWidth={1.75} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section graphite" id="blat">
        <div className="container">
          <Label number="06">BLAT</Label>
          <div className="image-text reversed lg:grid-cols-1 lg:w-full">
            <div className="lg:w-full lg:min-w-0">
              <div className="credo-intro text-left lg:grid-cols-1 lg:w-full lg:max-w-none">
                <div className="min-w-0 text-left lg:w-full">
                  <EditorialSectionTitle
                    titleClassName={`${editorialH2DarkClassName} lg:whitespace-normal lg:break-normal`}
                  >
                    OSTATNI ELEMENT
                    <br className="lg:hidden" />
                    {' '}
                    KTÓRY POTRAFI
                    <br className="lg:hidden" />
                    {' '}
                    ZMIENIĆ CAŁOŚĆ
                  </EditorialSectionTitle>
                </div>
                <Paragraphs texts={copy.countertop} variant="dark" />
              </div>
            </div>
          </div>
        </div>
        <ContentPhotoShell className="mt-[var(--heading-space)]">
          <Photo
            src={blatWebImg}
            alt="Połączenie naturalnego kamienia z matowym frontem"
            className={`countertop-photo ${contentPhotoImgDarkClass}`}
          />
        </ContentPhotoShell>
      </section>

      <section className="section paper" id="architekci">
        <div className="container">
          <Label number="07">WSPÓŁPRACA Z ARCHITEKTAMI</Label>
          <div className="image-text reversed lg:grid-cols-1 lg:w-full">
            <div className="lg:w-full lg:min-w-0">
              <div className="credo-intro text-left lg:grid-cols-1 lg:w-full lg:max-w-none">
                <div className="min-w-0 text-left lg:w-full">
                  <EditorialSectionTitle
                    titleClassName={`${editorialH2LightClassName} lg:whitespace-normal lg:break-normal`}
                  >
                    DOBRY PROJEKT
                    <br className="lg:hidden" />
                    {' '}
                    POTRZEBUJE DOBREGO
                    <br className="lg:hidden" />
                    {' '}
                    WYKONAWCY
                  </EditorialSectionTitle>
                </div>
                <Paragraphs texts={copy.architects} />
              </div>
              <a
                href="/"
                onClick={onScrollToKontakt}
                className={`${primaryBrandCtaMinimalClassName} mt-6 sm:mt-8`}
              >
                ZAMÓW PROJEKT<span className={primaryBrandCtaArrowClassName} aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <ContentPhotoShell className="mt-[var(--heading-space)]">
          <Photo
            src={architectsImg}
            alt="Rysunki architektoniczne i próbki materiałów podczas współpracy projektowej"
            className={contentPhotoImgClass}
          />
        </ContentPhotoShell>
      </section>

      <section className="section ink" id="proces">
        <div className="container">
          <Label number="08">PROCES</Label>
          <EditorialSectionTitle titleClassName={`${editorialH2DarkClassName} lg:whitespace-normal lg:break-normal`}>
            OD POMYSŁU
            <br className="lg:hidden" />
            {' '}
            DO GOTOWEGO WNĘTRZA
          </EditorialSectionTitle>
          <ol className="process-timeline">
            {copy.process.map(([title, text], i) => (
              <li key={title} className="process-step">
                <Odometer className="process-watermark" value={`0${i + 1}`} />
                <h3>{title}</h3>
                <p className="m-0 font-[family-name:var(--font-editorial)] text-[19px] leading-[1.6] !text-white">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section paper text-neutral-900" id="realizacje">
        <div className="w-full px-[max(var(--page-gutter),env(safe-area-inset-left))] pr-[max(var(--page-gutter),env(safe-area-inset-right))] lg:container lg:mx-auto lg:max-w-[1440px] lg:px-8">
          <Label number="09">REALIZACJE</Label>
          <div className="section-heading">
            <EditorialSectionTitle titleClassName={`${editorialH2LightClassName} lg:whitespace-normal lg:break-normal`}>
              PRZESTRZENIE,
              <br className="lg:hidden" />
              {' '}
              KTÓRE NABRAŁY FORMY
            </EditorialSectionTitle>
            <Paragraphs
              texts={copy.portfolio}
              className="normal-case"
            />
          </div>
        </div>
        <ul className="portfolio-grid portfolio-grid--realizacje w-full max-lg:mx-0 max-lg:gap-0 max-lg:px-0 lg:container lg:mx-auto lg:max-w-[1440px] lg:gap-[var(--space-inline)] lg:items-stretch lg:px-8">
          {categories.map((c, i) => (
            <li key={c} className="max-lg:w-full lg:flex lg:h-full">
              <button
                type="button"
                className="portfolio-tile group max-lg:w-full max-lg:rounded-none lg:h-full lg:flex-1 lg:overflow-hidden lg:ring-1 lg:ring-black/10 lg:transition-[box-shadow] lg:duration-300 lg:hover:ring-black/15"
                onClick={() => {
                  setGalleryCategory(i);
                  setGalleryOpen(true);
                }}
                aria-label={`Powiększ zdjęcie: ${c}`}
              >
                <img
                  src={portfolioCoverImages[i]}
                  alt={c}
                  loading="lazy"
                  decoding="async"
                  width={1536}
                  height={1024}
                  className="lg:object-cover lg:object-center lg:transition-transform lg:duration-700 lg:ease-out lg:group-hover:scale-[1.03]"
                />
                <span className="portfolio-caption gap-0 text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <strong>{c}</strong>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="section graphite realizacje-neo-lab-teaser" aria-labelledby="realizacje-neo-lab-teaser-heading">
        <div className="container realizacje-neo-lab-teaser__inner">
          <Label number="10">NEO LAB</Label>
          <EditorialSectionTitle
            titleId="realizacje-neo-lab-teaser-heading"
            titleClassName={`realizacje-neo-lab-teaser__heading ${editorialH2DarkClassName} text-neutral-100`}
          >
            NEO FORM — WIĘCEJ
            <br className="lg:hidden" />
            {' '}
            NIŻ TYLKO MEBLE
          </EditorialSectionTitle>
          <div
            className="realizacje-neo-lab-teaser__names w-full overflow-hidden rounded-none border border-neutral-800 divide-y divide-neutral-700/60"
          >
            {realizacjeNeoLabTeasers.map(item => (
              <Link
                key={item.category}
                to={item.to}
                hash={item.hash}
                preload="intent"
                activeOptions={{ exact: true, includeHash: true, includeSearch: false }}
                inactiveProps={{ 'aria-current': undefined }}
                onClick={event => onTeaserNavClick(event, item.hash)}
                className="group flex cursor-pointer items-center justify-between gap-4 p-6 transition-colors duration-200 hover:bg-[#2e2e2e] sm:p-7"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <span className="realizacje-neo-lab-teaser__category block font-mono text-[18px] font-medium uppercase leading-[1.2] tracking-wider">
                    {item.category}
                  </span>
                  <p className="realizacje-neo-lab-teaser__description mt-2 text-[16px] font-normal leading-snug text-white">
                    {item.description}
                  </p>
                </div>
                <ChevronRight
                  className="realizacje-neo-lab-teaser__chevron ml-4 size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact-footer" id="kontakt">
        <div className="container">
          <div className="footer-top">
            <div className="footer-top-heading min-w-0 flex-1">
              <div className="footer-top-row flex items-center justify-between gap-4">
                <h2 className="editorial-section-title m-0 shrink min-w-0 text-left font-[family-name:var(--font-editorial)] text-black font-normal leading-[1.15] uppercase">
                  KONTAKT
                </h2>
                <a
                  href="#top"
                  aria-label="Wróć na początek strony"
                  className="footer-top-scroll shrink-0 text-black transition-opacity hover:opacity-85 focus-visible:opacity-85"
                >
                  <ArrowUpRight size={40} strokeWidth={2} className="text-black" aria-hidden="true" />
                </a>
              </div>
              <span className="accent-line" aria-hidden="true" />
            </div>
          </div>
          <ContactForm />
        </div>
        <ContactMap />
        <ContactAddress />
      </footer>
      <BespokeGalleryLightbox
        open={lightboxOpen}
        images={currentPhotos}
        index={lightboxIndex}
        categoryLabel={activeCategoryLabel}
        onOpenChange={setLightboxOpen}
      />
      <BespokeGalleryLightbox
        open={materialLightboxOpen}
        images={materialGalleryPhotos}
        index={materialLightboxIndex}
        categoryLabel="MATERIAŁ"
        imageLabels={[...materialGalleryNames]}
        onOpenChange={setMaterialLightboxOpen}
      />
      <CredoThesisLightbox
        active={activeThesisImage}
        onOpenChange={open => { if (!open) setActiveThesisImage(null); }}
      />
      <HardwareDialog
        brand={activeBrand ? hardwareBrandLabels[activeBrand] : null}
        images={activeBrand ? hardwareGalleriesByBrand[activeBrand] : []}
        onOpenChange={open => { if (!open) setActiveBrand(null); }}
      />
      <PhotoSwipeGalleryDialog
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        title={categories[galleryCategory] ?? 'Realizacje'}
        images={portfolioModalPhotos}
        imageAltLabel={categories[galleryCategory] ?? 'Realizacje'}
      />
    </main>
  );
}
