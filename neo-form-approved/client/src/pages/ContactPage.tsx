import { FormEvent, useState } from "react";
import PageFrame, { PageIntro, pageCopy } from "@/components/PageFrame";
import BrandLogo from "@/components/BrandLogo";
import { triggerHaptic } from "@/utils/haptics";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    triggerHaptic();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <PageFrame>
      <PageIntro eyebrow="Kontakt" title="ZACZNIJ OD ROZMOWY. NADAMY JEJ FORMĘ.">
        <p>Opowiedz nam o przestrzeni, w której chcesz mieszkać lub pracować.</p>
      </PageIntro>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-8 sm:px-12 lg:grid-cols-[minmax(0,28rem)_1fr]" data-reveal>
        <form className="grid gap-4" onSubmit={submitContact}>
          <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
            Imię
            <input name="name" required className="border border-neutral-300 bg-white px-4 py-3 text-base normal-case tracking-normal text-neutral-950 outline-none focus:border-neutral-950" />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
            E-mail
            <input name="email" type="email" required className="border border-neutral-300 bg-white px-4 py-3 text-base normal-case tracking-normal text-neutral-950 outline-none focus:border-neutral-950" />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
            Telefon
            <input name="phone" type="tel" required className="border border-neutral-300 bg-white px-4 py-3 text-base normal-case tracking-normal text-neutral-950 outline-none focus:border-neutral-950" />
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
            Opis projektu
            <textarea name="project" required rows={5} className="resize-y border border-neutral-300 bg-white px-4 py-3 text-base normal-case tracking-normal text-neutral-950 outline-none focus:border-neutral-950" />
          </label>
          <button type="submit" className="mt-2 inline-flex w-fit items-center justify-center border border-neutral-950 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-neutral-950 hover:text-white">
            Wyślij
          </button>
          {sent ? <p className="text-sm text-neutral-600">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p> : null}
        </form>

        <div>
          <BrandLogo tone="dark" className="h-14" />
          <p className={`mt-8 text-neutral-600 ${pageCopy}`}>
            NEO FORM. Tworzymy meble. Dzielimy się wiedzą. Rozwijamy branżę.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Kontakt</p>
              <ul className="mt-3 grid gap-2 text-sm text-neutral-700">
                <li><a className="hover:underline" href="tel:+48000000000">+48 000 000 000</a></li>
                <li><a className="hover:underline" href="mailto:hello@neoform.pl">hello@neoform.pl</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Showroom</p>
              <address className="mt-3 text-sm not-italic leading-relaxed text-neutral-600">
                ul. Przykładowa 12
                <br />
                00-001 Warszawa
              </address>
            </div>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
