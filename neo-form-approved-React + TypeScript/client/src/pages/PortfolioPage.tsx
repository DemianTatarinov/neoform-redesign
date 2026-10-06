import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { Link } from "wouter";
import SiteChrome from "@/components/SiteChrome";
import { media } from "@/assets/media";
import { triggerHaptic } from "@/utils/haptics";
import { hideBrokenImage } from "@/utils/images";

const projects = [
  { slug: "penthouse-mokotow", title: "PENTHOUSE MOKOTÓW", description: "Wyzwanie: zachować czystość formy przy maksymalnej funkcjonalności.", cover: media.projectPenthouse, gallery: media.gallery.penthouse },
  { slug: "apartament-wilanow", title: "APARTAMENT WILANÓW", description: "Dialog między kamieniem a drewnem. FENIX i orzech amerykański w idealnych proporcjach.", cover: media.projectWilanow, gallery: media.gallery.wilanow },
  { slug: "dom-konstancin", title: "DOM KONSTANCIN", description: "Zintegrowana zabudowa na wymiar sięgająca ponad trzech metrów.", cover: media.projectKonstancin, gallery: media.gallery.konstancin },
  { slug: "loft-powisle", title: "LOFT POWIŚLE", description: "Szczotkowana stal, głęboki mat i skomplikowane mechanizmy ukryte w ascetycznej formie.", cover: media.projectLoft, gallery: media.gallery.loft },
];

export default function PortfolioPage() {
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const open = (project: (typeof projects)[number]) => {
    triggerHaptic();
    setActive(project);
    setIndex(0);
  };
  const move = (delta: number) => setIndex((current) => (current + delta + (active?.gallery.length ?? 1)) % (active?.gallery.length ?? 1));

  return (
    <SiteChrome
      eyebrow="PORTFOLIO / REALIZACJE"
      title={<>PRZESTRZENIE,<br /><em>KTÓRE STWORZYLIŚMY.</em></>}
      lead="Nie tworzymy mebli do pustych pokoi. Tworzymy rozwiązania dla konkretnej architektury. Zobacz, jak nasze podejście do proporcji i materiału sprawdza się w praktyce."
      cta={
        <Link className="button button--orange" href="/contact" onClick={() => triggerHaptic()}>
          Porozmawiajmy o projekcie
          <ArrowUpRight size={15} strokeWidth={1.8} />
        </Link>
      }
    >
      <section className="portfolio section-light" data-reveal>
        <div className="shell">
          <p className="eyebrow">PORTFOLIO</p>
          <h2>PRZESTRZENIE,<br />KTÓRE STWORZYLIŚMY.</h2>
          <p className="portfolio__lead">Kuchnie, zabudowy i meble na wymiar w konkretnej architekturze Warszawy i okolic.</p>
          <div className="project-grid">
            {projects.map((project) => (
              <button
                type="button"
                className="project-tile group"
                key={project.slug}
                onClick={() => open(project)}
              >
                <img
                  src={project.cover}
                  alt={project.title}
                  className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={hideBrokenImage}
                />
                <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-tile__link">Otwórz projekt <ArrowUpRight size={15} /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="anatomy section-dark" data-reveal>
        <div className="shell">
          <p className="eyebrow">DETAL / MATERIAŁ</p>
          <h2>KUCHNIE I MEBLE<br />W GOTOWYM WNĘTRZU.</h2>
          <p className="anatomy__lead">Każda realizacja to dialog drewna, kamienia i światła. Galeria poniżej pokazuje skalę zabudowy i jakość styku materiałów.</p>
          <div className="page-photo-grid">
            {media.pages.portfolio.map((src, i) => (
              <div className="page-photo-grid__item" key={src} style={{ backgroundImage: `url(${src})` }} role="img" aria-label={`Realizacja ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="fullscreen-gallery"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria ${active.title}`}
          onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchStart === null) return;
            const distance = event.changedTouches[0].clientX - touchStart;
            if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
            setTouchStart(null);
          }}
        >
          <button className="fullscreen-gallery__close" aria-label="Zamknij galerię" onClick={() => setActive(null)}><X /></button>
          <button className="fullscreen-gallery__arrow fullscreen-gallery__arrow--left" aria-label="Poprzednie zdjęcie" onClick={() => move(-1)}><ArrowLeft /></button>
          <img src={active.gallery[index]} alt={`${active.title} — zdjęcie ${index + 1}`} loading="eager" onError={hideBrokenImage} />
          <button className="fullscreen-gallery__arrow fullscreen-gallery__arrow--right" aria-label="Następne zdjęcie" onClick={() => move(1)}><ArrowRight /></button>
          <div className="fullscreen-gallery__caption">
            <strong>{active.title}</strong>
            <span>{String(index + 1).padStart(2, "0")} / {active.gallery.length}</span>
          </div>
        </div>
      )}
    </SiteChrome>
  );
}
