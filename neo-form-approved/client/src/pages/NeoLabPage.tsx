import { Link } from "wouter";
import PageFrame, { PageIntro, pageCopy, pageHeading } from "@/components/PageFrame";
import { media } from "@/assets/media";
import { hideBrokenImage } from "@/utils/images";
import { triggerHaptic } from "@/utils/haptics";

const events = [
  ["Neo Lab / PEKA", "Organizacja przestrzeni w kuchni i najnowsze rozwiązania PEKA.", media.materials.hardware],
  ["Neo Lab / Materiały", "Fornir, HPL, FENIX, ARPA i możliwości ich zastosowania.", media.materials.fornir],
  ["Neo Lab / Technology", "Okucia, mechanizmy i rozwiązania Blum / Häfele.", media.materials.blum],
  ["Neo Lab / Architecture", "Spotkania i warsztaty dla architektów i projektantów.", media.architectCollaboration],
] as const;

export default function NeoLabPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Neo Lab" title="WIEDZA, KTÓRA POWSTAJE W PRAKTYCE.">
        <p>
          Neo Lab to przestrzeń wiedzy, spotkań i wymiany doświadczeń wokół projektowania, produkcji i realizacji mebli.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-12" data-reveal>
        <p className={`text-neutral-600 ${pageCopy}`}>
          Nie tylko produkujemy. Pokazujemy, jak to robimy. Dla projektantów, architektów, producentów mebli,
          montażystów i osób, które dopiero zaczynają w branży. Tworzymy go razem z markami, które wyznaczają standardy:
          Blum, Häfele, Viefe, PEKA, ARPA, FENIX. Tak powstają spotkania, na których produkt można dotknąć, przetestować
          i zrozumieć. Neo Lab to nie szkoła. To laboratorium. Wiedza, którą można wykorzystać następnego dnia.
        </p>
        <p className="mt-10 text-lg font-bold tracking-tight md:text-2xl">LEARN. TEST. CREATE.</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {events.map(([title, text, image]) => (
            <article key={title} className="overflow-hidden bg-[#111111] text-white">
              <img src={image} alt={title} className="h-52 w-full object-cover" loading="lazy" onError={hideBrokenImage} />
              <div className="p-6">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">{title}</h2>
                <p className="mt-3 text-base leading-relaxed">{text}</p>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/kontakt"
          onClick={() => triggerHaptic()}
          className="mt-12 inline-flex border border-neutral-950 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-neutral-950 hover:text-white"
        >
          Zapytaj o wydarzenie ↗
        </Link>
      </section>

      <section className="bg-[#0d0d0d] px-6 py-16 text-white sm:px-12">
        <p className={`mx-auto max-w-6xl text-neutral-400 ${pageHeading}`}>Poznaj. Sprawdź. Stwórz.</p>
      </section>
    </PageFrame>
  );
}
