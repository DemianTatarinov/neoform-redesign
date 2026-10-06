import { Link } from "wouter";
import PageFrame, { PageIntro, pageCopy, pageHeading } from "@/components/PageFrame";
import { credoCards } from "@/assets/media";
import { hideBrokenImage } from "@/utils/images";
import { triggerHaptic } from "@/utils/haptics";

export default function CredoPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Credo" title="FORMA PONAD CZASEM">
        <p>
          Neo Form to nowy rozdział marki Neo Kuchnie. Przez lata tworzyliśmy kuchnie dla wymagających klientów i
          architektów. Dziś tworzymy meble i zabudowy dla całych wnętrz.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-12" data-reveal>
        <div className="max-w-3xl border-l border-[#F26522] pl-6">
          <p className="text-2xl font-bold tracking-tight md:text-4xl">PROJEKT. MATERIAŁ. DETAL. JAKOŚĆ.</p>
          <p className="mt-3 text-lg font-bold md:text-xl">Cztery elementy. Jedna forma.</p>
        </div>
        <p className={`mt-10 text-neutral-600 ${pageCopy}`}>
          Projekt wyznacza kierunek, materiały budują charakter, technologia zapewnia precyzję i trwałość. Każde
          rozwiązanie powstaje dla konkretnego wnętrza. Dobry mebel nie dominuje nad wnętrzem. Jest jego naturalną
          częścią. Dlatego liczą się proporcje, podziały, światło, sposób otwierania i dotyk, czyli wszystko, co
          zdecyduje o tym, jak mebel będzie odbierany po latach. Najwyższa jakość nie jest dodatkiem do projektu. Jest
          jego częścią.
        </p>
      </section>

      <section className="bg-[#111111] px-6 py-20 text-white sm:px-12" data-reveal>
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
          {credoCards.map((card) => (
            <article key={card.number} className="overflow-hidden bg-[#0d0d0d]">
              <img
                src={card.image}
                alt={card.title}
                className="h-64 w-full object-cover"
                loading="lazy"
                onError={hideBrokenImage}
              />
              <div className="p-6">
                <span className="font-mono text-xs tracking-[0.2em] text-[#F26522]">{card.number}</span>
                <h2 className="mt-3 text-xl font-bold tracking-tight">{card.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{card.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-12" data-reveal>
        <h2 className={pageHeading}>NOWY CZAS. NOWA FORMA.</h2>
        <p className={`mt-8 text-neutral-600 ${pageCopy}`}>
          Neo Kuchnie było początkiem. Tam zdobywaliśmy doświadczenie, poznawaliśmy materiały, technologie i potrzeby
          klientów. Neo Form jest jego naturalnym rozwinięciem. Zmienia się skala i możliwości. Rozwijamy współpracę z
          architektami, technologię i zakres realizacji. Nie zmienia się to, co najważniejsze: nasz charakter i
          najwyższe standardy jakości.
        </p>
        <Link
          href="/zespol"
          onClick={() => triggerHaptic()}
          className="mt-10 inline-flex border border-neutral-950 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-neutral-950 hover:text-white"
        >
          Poznaj zespół ↗
        </Link>
      </section>
    </PageFrame>
  );
}
