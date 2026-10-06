import PageFrame, { PageIntro, pageCopy } from "@/components/PageFrame";
import { hideBrokenImage } from "@/utils/images";

export default function TeamPage() {
  return (
    <PageFrame>
      <PageIntro eyebrow="Zespół" title="FORMA ZACZYNA SIĘ OD LUDZI.">
        <p>
          Za każdą realizacją stoją ludzie. Projektanci, technolodzy, stolarze i monterzy: jeden zespół, który zna
          swoje rzemiosło i nie boi się trudnych pytań.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-6xl px-6 py-8 sm:px-12" data-reveal>
        <img
          src="https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1800&q=80"
          alt="Zespół Neo Form w warsztacie"
          className="h-[450px] w-full object-cover"
          loading="lazy"
          onError={hideBrokenImage}
        />
        <p className={`mt-10 text-neutral-600 ${pageCopy}`}>
          Rozmawiamy, szkicujemy, sprawdzamy, poprawiamy. Od pierwszej rozmowy z klientem aż do ostatniej półki na
          swoim miejscu. Każdy etap zostaje w rękach ludzi, którzy odpowiadają za detal, a nie za katalogowy skrót.
        </p>
      </section>
    </PageFrame>
  );
}
