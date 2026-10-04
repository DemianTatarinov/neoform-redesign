import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { materialCards, type MaterialCard } from "@/assets/media";
import { triggerHaptic } from "@/utils/haptics";

type MaterialsCarouselProps = {
  eyebrow?: string;
  items?: MaterialCard[];
};

export default function MaterialsCarousel({
  eyebrow = "CZTERY ELEMENTY / MATERIAŁY",
  items = materialCards,
}: MaterialsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: number) => {
    triggerHaptic();
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>(".materials-card");
    const step = (card?.offsetWidth ?? 280) + 24;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="materials-carousel">
      <div className="materials-carousel__bar">
        <p className="eyebrow">{eyebrow}</p>
        <div className="materials-carousel__arrows">
          <button type="button" aria-label="Poprzedni materiał" onClick={() => scrollByCard(-1)}>
            <ArrowLeft size={16} />
          </button>
          <button type="button" aria-label="Następny materiał" onClick={() => scrollByCard(1)}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="materials-carousel__track gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        aria-label="Karuzela materiałów i systemów"
      >
        {items.map((item) => (
          <article
            className="materials-card snap-start bg-[#141414] border border-white/15 hover:border-[#F26522] transition-colors rounded-none"
            key={`${item.number}-${item.title}`}
          >
            <div className="materials-card__media relative h-[180px] md:h-[220px] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="materials-card__copy">
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
