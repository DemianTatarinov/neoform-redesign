import PageFrame, { PageIntro } from "@/components/PageFrame";
import { media } from "@/assets/media";
import { hideBrokenImage } from "@/utils/images";

const steps = [
  ["01", "Koncepcja", "Poznajemy projekt, przestrzeń i ludzi.", media.pages.process[0]],
  ["02", "Technologia", "Szukamy najlepszego sposobu realizacji.", media.pages.process[1]],
  ["03", "Materiał", "Dobieramy materiały, wykończenia i detale.", media.materials.fornir],
  ["04", "Produkcja", "Projekt trafia do naszej produkcji.", media.pages.process[2]],
  ["05", "Montaż", "Każdy element trafia na swoje miejsce.", media.pages.process[3]],
  ["06", "Gotowa realizacja", "Forma staje się częścią wnętrza.", media.projectPenthouse],
] as const;

export default function ProcessPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Proces" title="OD POMYSŁU DO FORMY.">
        <p>Prowadzimy projekt od pierwszej rozmowy do ostatniego detalu. Każdy etap ma swoje tempo, decyzje i odpowiedzialność.</p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-12" data-reveal>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(([index, title, text, image]) => (
            <li key={index} className="overflow-hidden bg-white">
              <img src={image} alt={title} className="h-48 w-full object-cover" loading="lazy" onError={hideBrokenImage} />
              <div className="p-6">
                <span className="font-mono text-xs tracking-[0.2em] text-[#F26522]">{index}</span>
                <h2 className="mt-3 text-xl font-bold tracking-tight">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </PageFrame>
  );
}
