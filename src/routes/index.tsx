import { Odometer } from "@/components/odometer";
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { copy, categories } from '@/lib/neo-content';
import materials from '@/assets/neo-materials.jpg';
import materialDrewnoFornir from '@/assets/MATERIAL /Drewno-Fornir/Drewno-Fornir.webp';
import materialKamienSpiek from '@/assets/MATERIAL /Kamień-Spiek/Kamień-Spiek.webp';
import fenixArpaHplImg from '@/assets/MATERIAL /Fenix-ARPA-HPL/Fenix-ARPA-HPL.webp';
import materialStal from '@/assets/MATERIAL /Stał/Stał.webp';

const materialCardImages: Record<string, string> = {
  'Drewno / Fornir': materialDrewnoFornir,
  'Kamień / Spieki': materialKamienSpiek,
  'FENIX / ARPA / HPL': fenixArpaHplImg,
  Stal: materialStal,
};
const materialCardPhotoClass = '!relative !left-0 !w-full !max-w-full !h-full object-cover';
const materialGalleryNames = ['Drewno / Fornir', 'Kamień / Spieki', 'FENIX / ARPA / HPL', 'Stal'] as const;
const materialGalleryPhotos = materialGalleryNames.map(name => materialCardImages[name]);
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
import credoThesis1 from '@/assets/CREDO/Для тезисов/Для тезисов1.webp';
import credoThesis2 from '@/assets/CREDO/Для тезисов/Для тезисов2.webp';
import credoThesis3 from '@/assets/CREDO/Для тезисов/Для тезисов3.webp';
import credoThesis4 from '@/assets/CREDO/Для тезисов/Для тезисов4.webp';
import credoMaterialWeb from '@/assets/CREDO/Material_web.webp';
import credoDetalWeb from '@/assets/CREDO/Detal_web.webp';
import credoJakoscWeb from '@/assets/CREDO/Jakość_web.webp';
import { BespokeGalleryLightbox } from '@/components/bespoke-gallery-lightbox';
import { portfolioCoverImages, realizacjeGalleriesByCategory } from '@/lib/realizacje-gallery';
import { CredoThesisLightbox, type CredoThesisImage } from '@/components/credo-thesis-lightbox';
import { HardwareDialog } from '@/components/hardware-dialog';
import {
  galleryBarClass,
  galleryImageClass,
  galleryPhotoWrapClass,
  gallerySlideClass,
  galleryTrackClass,
} from '@/lib/gallery-lightbox-layout';

const credoThesisPhotos = [credoThesis1, credoThesis2, credoThesis3, credoThesis4];
const THESIS_TAP_MOVE_PX = 8;
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ContactMap } from '@/components/contact-map';
import { HeroVideo } from '@/components/hero-video';
import { ContactAddress } from '@/components/contact-address';
import { ContactForm } from '@/components/contact-form';
import { SiteFooterSignature } from '@/components/site-footer-signature';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'NEO FORM — Nowa forma. Nieograniczone możliwości.' },
      { name: 'description', content: 'Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość. Poznaj NEO FORM.' },
      { property: 'og:title', content: 'NEO FORM — Nowa forma. Nieograniczone możliwości.' },
      { property: 'og:description', content: 'Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]
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
  return <div className="section-label"><span>{children}</span><span className="section-number">{number} / 10</span></div>;
}
function Paragraphs({ texts, className = '' }: { texts: string[]; className?: string }) {
  return <div className={`paragraphs ${className}`}>{texts.map((text, i) => <p key={text} className={i === texts.length - 1 ? 'last-paragraph' : ''}>{text}</p>)}</div>;
}
const contentPhotoImgClass =
  'w-full max-lg:aspect-[4/3] lg:h-auto object-cover max-lg:rounded-none lg:rounded-sm';

function ContentPhotoShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`w-full max-lg:px-0 lg:container lg:mx-auto ${className}`.trim()}>{children}</div>;
}

function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`editorial-photo ${className}`} loading="lazy" width={1536} height={1024} />;
}

function Index() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollReveal(pageRef);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState(0);
  const [gallerySlideIndex, setGallerySlideIndex] = useState(0);
  const activeRealizacjePhotos = realizacjeGalleriesByCategory[galleryCategory] ?? [];
  const portfolioModalPhotos =
    activeRealizacjePhotos.length > 0
      ? activeRealizacjePhotos
      : [portfolioCoverImages[galleryCategory] ?? portfolioCoverImages[0]].filter(Boolean);
  const portfolioTrackRef = useRef<HTMLDivElement>(null);
  const portfolioScrollRaf = useRef<number | null>(null);

  const scrollPortfolioToSlide = useCallback((slideIndex: number, behavior: ScrollBehavior = 'smooth') => {
    const track = portfolioTrackRef.current;
    if (!track) return;
    const slide = track.children.item(slideIndex) as HTMLElement | null;
    slide?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
  }, []);

  useEffect(() => {
    if (!galleryOpen) return;
    requestAnimationFrame(() => scrollPortfolioToSlide(gallerySlideIndex, 'instant'));
  }, [galleryOpen, galleryCategory, scrollPortfolioToSlide]);

  const onPortfolioTrackScroll = () => {
    if (portfolioModalPhotos.length <= 1) return;
    if (portfolioScrollRaf.current !== null) cancelAnimationFrame(portfolioScrollRaf.current);
    portfolioScrollRaf.current = requestAnimationFrame(() => {
      const track = portfolioTrackRef.current;
      if (!track) return;
      const width = track.clientWidth;
      if (width <= 0) return;
      const nextIndex = Math.min(
        portfolioModalPhotos.length - 1,
        Math.max(0, Math.round(track.scrollLeft / width)),
      );
      if (nextIndex !== gallerySlideIndex) setGallerySlideIndex(nextIndex);
    });
  };

  const stepPortfolioSlide = (delta: number) => {
    if (portfolioModalPhotos.length <= 1) return;
    const next = (gallerySlideIndex + delta + portfolioModalPhotos.length) % portfolioModalPhotos.length;
    setGallerySlideIndex(next);
    scrollPortfolioToSlide(next, 'smooth');
  };
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

  return (
    <main ref={pageRef}>
      <section className="hero" id="top">
        <HeroVideo />
        <div className="hero-shade" />
        <div className="hero-foreground">
          <div className="hero-copy"><div className="hero-kicker">NEO FORM</div><h1>NOWA FORMA<br />NIEOGRANICZONE<br />MOŻLIWOŚCI</h1><p>{copy.hero}</p></div>
          <div className="hero-bottom"><span>PROJEKT · MATERIAŁ · DETAL · JAKOŚĆ</span><a href="#credo" aria-label="Przejdź do CREDO"><ArrowDown size={22} /></a><span>01 / 10</span></div>
        </div>
      </section>

      <section className="section credo" id="credo">
        <div className="container"><Label number="02">CREDO</Label>
          <div className="credo-intro"><div><h2>INDYWIDUALNOŚĆ<br />BEZ KOMROMISÓW</h2><span className="accent-line" aria-hidden="true" /></div><p className="lead">{copy.credo[0]}</p></div>
          <div className="credo-body"><Paragraphs texts={copy.credo.slice(1)} /></div>
          <ul className="individuality-slider" aria-label="Każde wnętrze jest inne">{copy.individuality.map((t, i) => (
            <li
              key={t}
              className="individuality-card relative isolate aspect-square cursor-pointer overflow-hidden"
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
          ))}</ul>
        </div>
        <div className="w-full max-lg:px-0 lg:container lg:mx-auto">
          <div className="principles-split">
            <div className="principles-tabs max-lg:px-[max(var(--page-gutter),env(safe-area-inset-left))] max-lg:pr-[max(var(--page-gutter),env(safe-area-inset-right))]">
              <p className="principles-title">Cztery elementy. Jedna forma</p>
              <div role="tablist" aria-label="Cztery zasady NEO FORM">{principles.map((p, i) => <button key={p.title} type="button" role="tab" id={`principle-tab-${i}`} aria-selected={principle === i} aria-controls="principle-panel" className={principle === i ? 'principle-tab active' : 'principle-tab'} onClick={() => setPrinciple(i)}><span>0{i + 1}</span>{p.title}</button>)}</div>
            </div>
            <div className="principles-photo aspect-[4/3] w-full max-lg:px-0" role="tabpanel" id="principle-panel" aria-labelledby={`principle-tab-${principle}`}>{principles.map((p, i) => (
              <img
                key={p.title}
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={1536}
                height={1024}
                className={`${contentPhotoImgClass} transition-opacity ${p.title === 'DETAL' ? '' : 'object-center'} ${principle === i ? 'active' : ''}`}
                style={p.title === 'DETAL' ? { objectPosition: '15% 50%' } : undefined}
                aria-hidden={principle !== i}
              />
            ))}</div>
          </div>
        </div>
      </section>

      <section className="section paper" id="zespol">
        <div className="container">
          <Label number="03">NEO STANDARD</Label>
          <div className="section-heading">
            <h2 className="text-[#121315]">FORMA TWORZONA<br />PRZEZ LUDZI</h2>
            <p className="lead normal-case text-neutral-700 leading-[1.7]">{copy.team[0]}</p>
          </div>
        </div>
        <ContentPhotoShell>
          <Photo
            src={neoStandardImg}
            alt="Zespół NEO FORM przy pracy"
            className={`team-photo my-8 grayscale contrast-105 ${contentPhotoImgClass}`}
          />
        </ContentPhotoShell>
        <div className="container">
          <div className="team-copy text-neutral-700 leading-[1.7]"><p>{copy.team[1]}</p><p>{copy.team[2]}</p></div>
        </div>
      </section>

      <section className="bespoke photo-section" id="bespoke">
        <img src={bespokeBgImg} alt="" className="photo-background editorial-photo size-full object-cover" loading="lazy" width={1920} height={1080} aria-hidden />
        <div className="photo-shade bg-black/65" aria-hidden />
        <div className="container">
          <Label number="04">BESPOKE</Label>
          <h2>FORMA W GOTOWEJ<br />PRZESTRZENI</h2>
          <div className="bespoke-copy">
            <p className="lead">
              Każda realizacja zaczyna się od ludzi – ich potrzeb, rytmu dnia i sposobu życia. Dopiero potem forma, materiały i detal nadają temu konkretny kształt
            </p>
            <p>
              Kiedy standardowe rozwiązania to za mało, tworzymy architekturę dopasowaną do wnętrza. Nasz standard to:
            </p>
            <div className="bespoke-chips-grid w-full">
              {bespokeCategories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                  className={`bespoke-chip w-full border backdrop-blur-sm text-center text-[18px] leading-[1.35] tracking-wide py-3 px-4 ${category.layout === 'half' ? 'bespoke-chip--half' : 'bespoke-chip--full'} ${
                    activeCategory === category.id
                      ? 'border-[var(--brand,#F48024)] bg-white/10 text-white'
                      : 'border-white/20 bg-white/5 text-neutral-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            {currentPhotos.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-4 my-6 sm:grid-cols-2">
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
            <p>
              Te elementy nie są dla nas komplikacją. Są naturalną częścią projektu, którego nie ograniczają żadne szablony.
            </p>
            <strong className="strong-statement">
              Najlepszy efekt pojawia się wtedy, gdy forma, funkcja i codzienność przestają ze sobą konkurować.
            </strong>
          </div>
        </div>
      </section>

      <section className="section graphite" id="material"><div className="container"><Label number="05">MATERIAŁ</Label><div className="section-heading"><h2>MATERIAŁ<br />MA ZNACZENIE</h2><Paragraphs
            texts={copy.materials}
            className="normal-case gap-4 font-[family-name:var(--font-editorial)] text-base font-normal leading-[1.7] tracking-normal sm:text-[17px] lg:text-[18px] [&_p]:font-[family-name:var(--font-editorial)] [&_p]:text-base [&_p]:font-normal [&_p]:leading-[1.7] [&_p]:tracking-normal [&_p]:text-[color:var(--subtle-ink)] [&_p]:sm:text-[17px] [&_p]:lg:text-[18px] [&_p.last-paragraph]:font-medium [&_p.last-paragraph]:text-[color:var(--on-ink)]"
          /></div><div className="material-grid">{materialGalleryNames.map((name, i) => (
        <figure key={name}>
          <div
            className={`material-crop material-${i} cursor-pointer`}
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
          <figcaption><span>{name}</span><span>0{i + 1}</span></figcaption>
        </figure>
      ))}</div></div></section>

      <section className="section steel" id="technologia">
        <div className="container">
          <Label number="06">TECHNOLOGIA</Label>
        </div>
        <ContentPhotoShell className="mb-[var(--heading-space)]">
          <Photo
            src={technologiaMainImg}
            alt="Precyzyjnie spasowane fronty i ukryty zawias"
            className={contentPhotoImgClass}
          />
        </ContentPhotoShell>
        <div className="container">
          <div className="image-text">
            <div>
              <h2>INŻYNIERIA<br />UKRYTA W FORMIE</h2>
              <Paragraphs texts={copy.technology} />
              <div className="system-names flex flex-nowrap w-full max-w-[100vw] overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth touch-pan-x gap-4 [&::-webkit-scrollbar]:hidden">
                {hardwareBrandIds.map(name => (
                  <button
                    key={name}
                    type="button"
                    className="system-name flex-none snap-start whitespace-nowrap"
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
          <Label number="07">BLAT</Label>
          <div className="image-text reversed">
            <div>
              <h2>OSTATNI ELEMENT<br />KTÓRY POTRAFI<br />ZMIENIĆ CAŁOŚĆ</h2>
              <Paragraphs texts={copy.countertop} />
            </div>
          </div>
        </div>
        <ContentPhotoShell className="mt-[var(--heading-space)]">
          <Photo
            src={blatWebImg}
            alt="Połączenie naturalnego kamienia z matowym frontem"
            className={`countertop-photo ${contentPhotoImgClass}`}
          />
        </ContentPhotoShell>
      </section>

      <section className="section paper" id="architekci">
        <div className="container">
          <Label number="08">WSPÓŁPRACA Z ARCHITEKTAMI</Label>
          <div className="image-text reversed">
            <div>
              <h2>DOBRY PROJEKT<br />POTRZEBUJE DOBREGO<br />WYKONAWCY</h2>
              <Paragraphs texts={copy.architects} />
              <a className="text-link architekci-contact-link group inline-flex cursor-pointer items-center gap-2" href="#kontakt">
                <span className="system-name-pulse" aria-hidden="true">
                  <span className="system-name-pulse-ring" />
                  <span className="system-name-pulse-core" />
                </span>
                <span className="system-name-label font-medium tracking-wider">KONTAKT</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
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

      <section className="section ink" id="proces"><div className="container"><Label number="09">PROCES</Label><h2>OD POMYSŁU<br />DO GOTOWEGO WNĘTRZA</h2><ol className="process-timeline">{copy.process.map(([title, text], i) => <li key={title} className="process-step"><Odometer className="process-watermark" value={`0${i + 1}`} /><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

      <section className="section paper text-neutral-900" id="realizacje">
        <div className="w-full px-[max(var(--page-gutter),env(safe-area-inset-left))] pr-[max(var(--page-gutter),env(safe-area-inset-right))] lg:container lg:mx-auto lg:max-w-[1440px] lg:px-8">
          <Label number="10">REALIZACJE</Label>
          <div className="section-heading">
            <h2 className="text-neutral-900">PRZESTRZENIE,<br />KTÓRE NABRAŁY FORMY</h2>
            <Paragraphs
              texts={copy.portfolio}
              className="normal-case gap-4 font-[family-name:var(--font-editorial)] text-base font-normal leading-relaxed tracking-normal text-neutral-900 md:text-lg [&_p]:font-[family-name:var(--font-editorial)] [&_p]:text-base [&_p]:font-normal [&_p]:leading-relaxed [&_p]:tracking-normal [&_p]:md:text-lg [&_p.last-paragraph]:font-medium"
            />
          </div>
        </div>
        <ul className="portfolio-grid portfolio-grid--realizacje w-full max-lg:mx-0 max-lg:gap-0 max-lg:px-0 lg:container lg:mx-auto lg:max-w-[1440px] lg:gap-[var(--space-inline)] lg:px-8">
          {categories.map((c, i) => (
            <li key={c} className="max-lg:w-full">
              <button
                type="button"
                className="portfolio-tile max-lg:w-full max-lg:rounded-none"
                onClick={() => {
                  setGalleryCategory(i);
                  setGallerySlideIndex(0);
                  setGalleryOpen(true);
                }}
                aria-label={`Powiększ zdjęcie: ${c}`}
              >
                <img src={portfolioCoverImages[i]} alt={c} loading="lazy" width={1536} height={1024} />
                <span className="portfolio-caption p-0 gap-0 text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <strong>{c}</strong>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <footer className="contact-footer" id="kontakt"><div className="container"><div className="footer-top"><h2>KONTAKT</h2><a href="#top" aria-label="Wróć na początek strony"><ArrowUpRight size={40} /></a></div><ContactForm /></div>
        <ContactMap />
        <ContactAddress />
        <SiteFooterSignature />
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
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent galleryCard className="portfolio-dialog shadow-none sm:rounded-2xl">
          <div className={`${galleryBarClass} flex items-center justify-between gap-3 pb-3`}>
            <DialogTitle className="text-base font-semibold uppercase tracking-wide">
              {categories[galleryCategory]}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0" aria-label="Zamknij galerię">
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DialogClose>
          </div>
          <div className={galleryPhotoWrapClass}>
            <div
              ref={portfolioTrackRef}
              className={galleryTrackClass}
              onScroll={onPortfolioTrackScroll}
            >
              {portfolioModalPhotos.map((src, i) => (
                <div
                  key={`${galleryCategory}-${i}-${src}`}
                  className={gallerySlideClass}
                >
                  <img
                    src={src}
                    alt={`${categories[galleryCategory] ?? 'Realizacje'} — ${i + 1}`}
                    className={galleryImageClass}
                    loading="eager"
                    decoding="async"
                    width={1536}
                    height={1024}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={`dialog-navigation ${galleryBarClass} pt-3`}>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Poprzednie zdjęcie"
              onClick={() => stepPortfolioSlide(-1)}
            >
              <ArrowLeft />
            </Button>
            <span>
              {String(gallerySlideIndex + 1).padStart(2, '0')} / {String(portfolioModalPhotos.length).padStart(2, '0')}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Następne zdjęcie"
              onClick={() => stepPortfolioSlide(1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
