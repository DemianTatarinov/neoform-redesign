import PageFrame, { PageIntro, pageCopy, pageHeading } from "@/components/PageFrame";
import { materialCards } from "@/assets/media";
import { hideBrokenImage } from "@/utils/images";

export default function MaterialsPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Materiały" title="MATERIAŁ NADAJE FORMIE CHARAKTER.">
        <p>Fornir. HPL. FENIX. ARPA. Stal. Drewno. Lakier. Kamień. Spiek.</p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-12" data-reveal>
        <p className={`text-neutral-600 ${pageCopy}`}>
          Każdy z nich inaczej reaguje na światło, inaczej pracuje, inaczej się obrabia i inaczej się starzeje.
          Dlatego je poznajemy, pracujemy z nimi i łączymy. Fornir i HPL to dla nas codzienność. ARPA, FENIX i stal
          pozwalają budować rozwiązania, w których estetyka idzie w parze z funkcjonalnością.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {materialCards.map((card) => (
            <article key={card.title} className="overflow-hidden bg-white">
              <img
                src={card.image}
                alt={card.title}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                onError={hideBrokenImage}
              />
              <div className="p-5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#F26522]">{card.number}</span>
                <h2 className="mt-2 text-base font-bold tracking-tight">{card.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{card.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0d0d0d] px-6 py-20 text-white sm:px-12" data-reveal>
        <div className="mx-auto max-w-6xl">
          <h2 className={pageHeading}>OSTATNI ELEMENT FORMY.</h2>
          <p className={`mt-8 text-neutral-400 ${pageCopy}`}>
            Kamień i spieki naturalnie dopełniają nasze realizacje. Blat nie jest osobnym elementem. Jego kolor,
            grubość, struktura, sposób łączenia i wykończenie muszą współgrać z meblem, od pierwszej szafki po ostatnią
            krawędź.
          </p>
        </div>
      </section>
    </PageFrame>
  );
}
