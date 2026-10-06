import PageFrame, { PageIntro, pageCopy } from "@/components/PageFrame";
import { media } from "@/assets/media";
import { hideBrokenImage } from "@/utils/images";

const systems = [
  ["Blum", "Okucia, prowadnice i systemy szuflad dobierane do obciążenia codziennego użytkowania.", media.materials.blum],
  ["Häfele", "Technologia i precyzja w miejscu, którego później nie widać.", media.materials.hardware],
  ["Viefe", "Detal uchwytu, który domyka linię zabudowy. Standard, nie luksusowy dodatek.", media.materials.viefe],
] as const;

export default function TechnologyPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Technologia" title="FORMA, KTÓRA DZIAŁA.">
        <p>To, czego nie widać, ma równie duże znaczenie.</p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-12" data-reveal>
        <p className={`text-neutral-600 ${pageCopy}`}>
          Dobry mebel powinien być piękny, ale przede wszystkim powinien działać. Dlatego pracujemy na rozwiązaniach
          sprawdzonych producentów: Blum, Häfele, Viefe. Okucia, prowadnice, systemy szuflad i zawiasy dobieramy do
          konkretnego projektu. Viefe nie jest dla nas luksusowym dodatkiem. Jest standardem, tak samo jak Blum i
          Häfele.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {systems.map(([title, text, image]) => (
            <article key={title} className="overflow-hidden bg-white">
              <img src={image} alt={title} className="aspect-[4/3] w-full object-cover" loading="lazy" onError={hideBrokenImage} />
              <div className="p-6">
                <h2 className="text-xl font-bold tracking-tight">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}
