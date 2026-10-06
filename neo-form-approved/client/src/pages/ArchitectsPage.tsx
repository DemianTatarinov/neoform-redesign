import { Link } from "wouter";
import PageFrame, { PageIntro, pageCopy } from "@/components/PageFrame";
import { media } from "@/assets/media";
import { hideBrokenImage } from "@/utils/images";
import { triggerHaptic } from "@/utils/haptics";

export default function ArchitectsPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Architekci" title="ARCHITEKT TWORZY WIZJĘ. MY NADAJEMY JEJ FORMĘ.">
        <p>
          Pracujemy z projektantami już na etapie koncepcji: konsultujemy materiały, konstrukcję, technologię i
          możliwości wykonawcze.
        </p>
      </PageIntro>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-8 sm:px-12 lg:grid-cols-2" data-reveal>
        <img
          src={media.architectCollaboration}
          alt="Współpraca projektanta i wykonawcy"
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
          onError={hideBrokenImage}
        />
        <div>
          <p className={`text-neutral-600 ${pageCopy}`}>
            Nie zmieniamy projektu dlatego, że jest trudny. Szukamy sposobu, żeby go wykonać. Jedną z naszych obecnych
            współprac jest Matsko Studio. To właśnie dialog pomiędzy projektantem i wykonawcą pozwala powstawać
            rozwiązaniom, których nie da się znaleźć w katalogu.
          </p>
          <Link
            href="/kontakt"
            onClick={() => triggerHaptic()}
            className="mt-10 inline-flex border border-neutral-950 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-neutral-950 hover:text-white"
          >
            Rozpocznij współpracę ↗
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
