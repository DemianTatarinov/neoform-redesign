import { Link } from "wouter";
import PageFrame, { PageIntro, pageCopy } from "@/components/PageFrame";
import { media } from "@/assets/media";
import { hideBrokenImage } from "@/utils/images";
import { triggerHaptic } from "@/utils/haptics";

const points = [
  ["01", "Fornir prowadzony przez kilka elementów", "Zachowujemy ciągłość usłojenia. Estetyka bez kompromisów."],
  ["02", "Zabudowa sięgająca kilku metrów", "Projektujemy dla przestrzeni, w których standardowe wymiary nie istnieją."],
  ["03", "Ukryte drzwi i skomplikowane mechanizmy", "Funkcjonalność, która staje się niewidzialna."],
  ["04", "Połączenie różnych materiałów", "Precyzyjne łączenie kamienia, stali, drewna i spieków."],
] as const;

export default function BespokePage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Bespoke" title="FORMA BEZ OGRANICZEŃ.">
        <p>Kiedy standardowe rozwiązanie nie wystarcza. Nie zaczynamy od katalogu. Zaczynamy od projektu.</p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-12" data-reveal>
        <p className={`text-neutral-600 ${pageCopy}`}>
          Pracujemy na projekcie architekta albo tworzymy rozwiązanie wspólnie z klientem. Nietypowy wymiar?
          Niestandardowy kąt? Ukryte drzwi? Zabudowa sięgająca kilku metrów? Fornir prowadzony przez kilka elementów?
          Połączenie różnych materiałów? Skomplikowany mechanizm? Takie projekty znamy najlepiej. Dobry projekt nie
          powinien być ograniczany możliwościami standardowego mebla.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {points.map(([index, title, text], i) => (
            <article key={index} className="overflow-hidden bg-white">
              <img
                src={media.pages.bespoke[i]}
                alt={title}
                className="h-56 w-full object-cover"
                loading="lazy"
                onError={hideBrokenImage}
              />
              <div className="p-6">
                <span className="font-mono text-xs tracking-[0.2em] text-[#F26522]">{index}</span>
                <h2 className="mt-3 text-xl font-bold tracking-tight">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text}</p>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/realizacje"
          onClick={() => triggerHaptic()}
          className="mt-12 inline-flex border border-neutral-950 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-neutral-950 hover:text-white"
        >
          Zobacz realizacje ↗
        </Link>
      </section>
    </PageFrame>
  );
}
