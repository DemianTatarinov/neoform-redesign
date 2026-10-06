import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { media } from "@/assets/media";
import { triggerHaptic } from "@/utils/haptics";
import { hideBrokenImage } from "@/utils/images";

const details = [
  {
    number: "01",
    title: "OKUCIA",
    caption: "Systemy szuflad i zawiasy dobrane do obciążenia, które znoszą codzienność przez lata.",
    image: media.materials.hardware,
  },
  {
    number: "02",
    title: "FREZOWANIE",
    caption: "Krawędzie i przejścia prowadzone z dokładnością do setnych części milimetra.",
    image: media.pages.process[2],
  },
  {
    number: "03",
    title: "UKRYTY STYK KAMIENIA",
    caption: "Łączenia spieku i kamienia, które znikają w jednej płaszczyźnie.",
    image: media.materials.blat,
  },
  {
    number: "04",
    title: "FORNIR",
    caption: "Ciągłość usłojenia przez kilka elementów zabudowy.",
    image: media.materials.fornir,
  },
] as const;

export default function CredoGallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: number) => {
    triggerHaptic();
    const node = trackRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-credo-card]");
    const step = (card?.offsetWidth ?? 320) + 24;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="mt-16">
      <div className="mb-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">[ DETAL / MAKRO ]</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Poprzedni detal"
            onClick={() => scrollByCard(-1)}
            className="grid h-10 w-10 place-items-center border border-white/20 text-white transition-colors hover:bg-white hover:text-[#0d0d0d]"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Następny detal"
            onClick={() => scrollByCard(1)}
            className="grid h-10 w-10 place-items-center border border-white/20 text-white transition-colors hover:bg-white hover:text-[#0d0d0d]"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto"
        aria-label="Galeria detali wykonania"
      >
        {details.map((item) => (
          <article
            key={item.number}
            data-credo-card
            className="group w-[78vw] max-w-[340px] shrink-0 snap-start border border-white/10 bg-[#0d0d0d] sm:w-[340px]"
          >
            <div className="relative h-[300px] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={hideBrokenImage}
                className="h-full w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-125"
              />
            </div>
            <div className="grid gap-2 p-5">
              <span className="font-mono text-xs tracking-[0.2em] text-neutral-500">{item.number}</span>
              <h3 className="text-base font-bold tracking-tight">{item.title}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
