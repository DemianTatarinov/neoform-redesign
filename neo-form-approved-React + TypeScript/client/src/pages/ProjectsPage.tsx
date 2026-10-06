import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import PageFrame, { PageIntro, pageCopy } from "@/components/PageFrame";
import { kitchenProjects, media } from "@/assets/media";
import { hideBrokenImage } from "@/utils/images";
import { triggerHaptic } from "@/utils/haptics";

const galleries: Record<string, readonly string[]> = {
  "apartament-wilanow": media.gallery.wilanow,
  "penthouse-mokotow": media.gallery.penthouse,
  "dom-konstancin": media.gallery.konstancin,
  "loft-powisle": media.gallery.loft,
  "apartament-zoliborz": media.gallery.penthouse,
  "saska-kepa": media.gallery.wilanow,
};

export default function ProjectsPage() {
  const [active, setActive] = useState<(typeof kitchenProjects)[number] | null>(null);
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const gallery = active ? galleries[active.slug] ?? [active.image] : [];

  const open = (project: (typeof kitchenProjects)[number]) => {
    triggerHaptic();
    setActive(project);
    setIndex(0);
  };

  const move = (delta: number) => {
    setIndex((current) => (current + delta + gallery.length) % gallery.length);
  };

  return (
    <PageFrame>
      <PageIntro eyebrow="Realizacje" title="PRZESTRZENIE, KTÓRE NABRAŁY FORMY.">
        <p>
          Każda realizacja zaczyna się od ludzi: ich potrzeb, rytmu dnia i sposobu życia. Dopiero potem forma, materiały
          i detal nadają temu konkretny kształt.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-12" data-reveal>
        <p className={`text-neutral-600 ${pageCopy}`}>
          Kuchnie. Garderoby. Biblioteki. Zabudowy ścienne. Home office. Meble wolnostojące. Nietypowe konstrukcje.
          Pokazujemy projekty, nie produkty.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {kitchenProjects.map((project) => (
            <button
              key={project.slug}
              type="button"
              className="group relative aspect-[4/3] overflow-hidden text-left text-white"
              onClick={() => open(project)}
            >
              <img
                src={project.image}
                alt={project.caption}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                loading="lazy"
                onError={hideBrokenImage}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-6">
                <strong className="block text-lg font-bold tracking-tight">{project.caption}</strong>
                <span className="mt-2 block text-sm text-neutral-200">{project.description}</span>
              </span>
            </button>
          ))}
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
          <button className="fullscreen-gallery__close" aria-label="Zamknij galerię" onClick={() => setActive(null)}>
            <X />
          </button>
          <button className="fullscreen-gallery__arrow fullscreen-gallery__arrow--left" aria-label="Poprzednie zdjęcie" onClick={() => move(-1)}>
            <ArrowLeft />
          </button>
          <img src={gallery[index]} alt={`${active.title} — zdjęcie ${index + 1}`} onError={hideBrokenImage} />
          <button className="fullscreen-gallery__arrow fullscreen-gallery__arrow--right" aria-label="Następne zdjęcie" onClick={() => move(1)}>
            <ArrowRight />
          </button>
          <div className="fullscreen-gallery__caption">
            <strong>{active.caption}</strong>
            <span>
              {String(index + 1).padStart(2, "0")} / {gallery.length}
            </span>
          </div>
        </div>
      )}
    </PageFrame>
  );
}
