import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Link } from "wouter";
import BackToTop from "@/components/BackToTop";
import BrandLogo from "@/components/BrandLogo";
import HeroVideo from "@/components/HeroVideo";
import { kitchenProjects } from "@/assets/media";
import { triggerHaptic } from "@/utils/haptics";
import { hideBrokenImage } from "@/utils/images";

const heading = "max-w-4xl text-3xl font-bold uppercase tracking-tight md:text-5xl";
const copy = "max-w-3xl text-base leading-relaxed md:text-lg";
const ghostLight =
  "pointer-events-auto inline-flex items-center justify-center border border-white/40 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-[#F26522] hover:text-[#F26522]";
const ghostDark =
  "inline-flex items-center justify-center border border-neutral-950 px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-neutral-950 transition-colors hover:border-[#F26522] hover:text-[#F26522]";

const processSteps = [
  ["01", "Koncepcja.", "Poznajemy projekt, przestrzeń i ludzi."],
  ["02", "Technologia.", "Szukamy najlepszego sposobu realizacji."],
  ["03", "Materiał.", "Dobieramy materiały, wykończenia i detale."],
  ["04", "Produkcja.", "Projekt trafia do naszej produkcji."],
  ["05", "Montaż.", "Każdy element trafia na swoje miejsce."],
  ["06", "Gotowa realizacja.", "Forma staje się częścią wnętrza."],
] as const;

const labCards = [
  ["Neo Lab / PEKA", "organizacja przestrzeni w kuchni i najnowsze rozwiązania PEKA"],
  ["Neo Lab / Materiały", "fornir, HPL, FENIX, ARPA i możliwości ich zastosowania"],
  ["Neo Lab / Technology", "okucia, mechanizmy i rozwiązania Blum / Häfele"],
  ["Neo Lab / Architecture", "spotkania i warsztaty dla architektów i projektantów"],
] as const;

function Section({
  id,
  className,
  tone,
  children,
}: {
  id?: string;
  className: string;
  tone: "light" | "dark";
  children: ReactNode;
}) {
  return (
    <section id={id} data-header-tone={tone} className={className}>
      <div className="mx-auto max-w-6xl" data-reveal>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const [legalOpen, setLegalOpen] = useState<"privacy" | "cookies" | null>(null);

  useEffect(() => {
    setCookiesVisible(localStorage.getItem("neo-form-cookies") !== "accepted");
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!revealItems.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("neo-form-cookies", "accepted");
    setCookiesVisible(false);
    setLegalOpen(null);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    triggerHaptic();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main className="relative z-0 overflow-x-hidden bg-[#f8f8f7] font-sans antialiased">
      {/* 01 HERO */}
      <section data-header-tone="dark" className="bg-black text-white">
        <HeroVideo>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
            <h1 className="max-w-4xl text-3xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
              INDYWIDUALNOŚĆ BEZ KOMPROMISÓW.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-300 sm:text-base">
              Każde wnętrze zaczyna się od innych potrzeb. Innej przestrzeni. Innego światła. Innego sposobu życia.
            </p>
          </div>
        </HeroVideo>
      </section>

      {/* 02 CREDO */}
      <Section id="credo" tone="light" className="bg-[#f8f8f7] px-6 pb-24 pt-2 text-neutral-950 sm:px-12">
        <div className="relative mx-auto my-10 flex h-[1px] w-full max-w-md items-center justify-center bg-gradient-to-r from-transparent via-[#F26522] to-transparent">
          <span className="bg-[#f8f8f7] px-4 font-mono text-xs uppercase tracking-widest text-[#F26522]">HERO</span>
        </div>
        <h2 className="max-w-3xl text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl">FORMA PONAD CZASEM</h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">
          Neo Form to nowy rozdział marki Neo Kuchnie. Przez lata tworzyliśmy kuchnie dla wymagających klientów i architektów. Dziś tworzymy meble i zabudowy dla całych wnętrz.
        </p>
        <div className="relative left-1/2 mt-8 mb-12 w-screen max-w-none -translate-x-1/2">
          <div className="w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-neutral-100">
            <img
              src="/images/credo-forma.jpg"
              alt="Zabudowa Neo Form — forma ponad czasem"
              className="w-full h-full object-cover grayscale"
              width="1600"
              height="900"
              loading="lazy"
              onError={hideBrokenImage}
            />
          </div>
        </div>
        <div className="relative flex items-center justify-center w-full max-w-xs mx-auto mb-12">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F26522]/30 to-transparent" />
          <span className="absolute bg-[#f8f8f7] px-3 text-[10px] font-mono tracking-widest uppercase text-[#F26522]/70">
            CREDO
          </span>
        </div>
        <div className="max-w-6xl mx-auto px-6 mb-16 mt-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-950 uppercase mb-6">
            Cztery elementy. Jedna forma.
          </h2>
          <div className="space-y-4 text-base md:text-lg text-neutral-700 leading-relaxed font-light max-w-4xl">
            <p>
              Projekt wyznacza kierunek, materiały budują charakter, technologia zapewnia precyzję i trwałość. Każde
              rozwiązanie powstaje dla konkretnego wnętrza. ✓
            </p>
            <p>
              Dobry mebel nie dominuje nad wnętrzem. Jest jego naturalną częścią. Dlatego liczą się proporcje, podziały,
              światło, sposób otwierania i dotyk, czyli wszystko, co zdecyduje o tym, jak mebel będzie odbierany po
              latach.
            </p>
            <p className="font-medium text-neutral-950 pt-2">
              Najwyższa jakość nie jest dodatkiem do projektu. Jest jego częścią.
            </p>
          </div>
        </div>
        <div className="relative left-1/2 mt-16 w-screen max-w-none -translate-x-1/2 bg-[#141414] py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 pb-8 scrollbar-none sm:gap-6 lg:grid lg:grid-cols-4">
              <Link
                className="group flex w-[260px] shrink-0 cursor-pointer snap-start flex-col no-underline sm:w-[280px] lg:w-auto"
                href="/technologia"
                onClick={() => triggerHaptic()}
              >
                <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
                    alt="Projekt"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={hideBrokenImage}
                  />
                </div>
                <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Projekt</h3>
                  <span
                    className="text-[11px] font-mono uppercase tracking-widest transition-colors group-hover:text-white"
                    style={{ color: "#F26522" }}
                  >
                    Poznaj ↗
                  </span>
                </div>
              </Link>
              <Link
                className="group flex w-[260px] shrink-0 cursor-pointer snap-start flex-col no-underline sm:w-[280px] lg:w-auto"
                href="/materialy"
                onClick={() => triggerHaptic()}
              >
                <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop"
                    alt="Materiał"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={hideBrokenImage}
                  />
                </div>
                <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Materiał</h3>
                  <span
                    className="text-[11px] font-mono uppercase tracking-widest transition-colors group-hover:text-white"
                    style={{ color: "#F26522" }}
                  >
                    Katalog ↗
                  </span>
                </div>
              </Link>
              <Link
                className="group flex w-[260px] shrink-0 cursor-pointer snap-start flex-col no-underline sm:w-[280px] lg:w-auto"
                href="/proces"
                onClick={() => triggerHaptic()}
              >
                <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop"
                    alt="Detal"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={hideBrokenImage}
                  />
                </div>
                <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Detal</h3>
                  <span
                    className="text-[11px] font-mono uppercase tracking-widest transition-colors group-hover:text-white"
                    style={{ color: "#F26522" }}
                  >
                    Proces ↗
                  </span>
                </div>
              </Link>
              <Link
                className="group flex w-[260px] shrink-0 cursor-pointer snap-start flex-col no-underline sm:w-[280px] lg:w-auto"
                href="/realizacje"
                onClick={() => triggerHaptic()}
              >
                <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                    alt="Jakość"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={hideBrokenImage}
                  />
                </div>
                <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Jakość</h3>
                  <span
                    className="text-[11px] font-mono uppercase tracking-widest transition-colors group-hover:text-white"
                    style={{ color: "#F26522" }}
                  >
                    Portfolio ↗
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 ZESPÓŁ */}
      <Section id="zespol" tone="light" className="bg-[#f8f8f7] text-neutral-950 py-20 px-6 sm:px-12 border-t border-neutral-200">
        <h2 className={heading}>FORMA ZACZYNA SIĘ OD LUDZI.</h2>
        <p className={`${copy} mt-8 text-neutral-700`}>
          Za każdą realizacją stoją ludzie. Projektanci, technolodzy, stolarze i monterzy: jeden zespół, który zna swoje rzemiosło i nie boi się trudnych pytań. Rozmawiamy, szkicujemy, sprawdzamy, poprawiamy. Od pierwszej rozmowy z klientem aż do ostatniej półki na swoim miejscu.
        </p>
        <img
          src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=80"
          alt="Zespół Neo Form w warsztacie"
          className="my-8 mx-auto h-[450px] w-full max-w-4xl object-cover"
          loading="lazy"
          onError={hideBrokenImage}
        />
      </Section>

      {/* 04 BESPOKE */}
      <Section id="bespoke" tone="dark" className="bg-[#0d0d0d] text-white py-24 px-6 sm:px-12">
        <h2 className={heading}>FORMA BEZ OGRANICZEŃ.</h2>
        <p className="mt-6 max-w-3xl text-xl font-medium text-white/90">Kiedy standardowe rozwiązanie nie wystarcza.</p>
        <p className={`${copy} mt-8 text-white/80`}>
          Nie zaczynamy od katalogu. Zaczynamy od projektu. Pracujemy na projekcie architekta albo tworzymy rozwiązanie wspólnie z klientem. Nietypowy wymiar? Niestandardowy kąt? Ukryte drzwi? Zabudowa sięgająca kilku metrów? Fornir prowadzony przez kilka elementów? Połączenie różnych materiałów? Skomplikowany mechanizm? Takie projekty znamy najlepiej. Dobry projekt nie powinien być ograniczany możliwościami standardowego mebla.
        </p>
      </Section>

      {/* 05 MATERIAŁ */}
      <Section id="materialy" tone="light" className="bg-[#f8f8f7] text-neutral-950 py-24 px-6 sm:px-12">
        <h2 className={heading}>MATERIAŁ NADAJE FORMIE CHARAKTER.</h2>
        <p className="mt-10 max-w-4xl text-2xl font-bold leading-snug tracking-tight md:text-4xl">
          Fornir. HPL. FENIX. ARPA. Stal. Drewno. Lakier. Kamień. Spiek.
        </p>
        <p className={`${copy} mt-8 text-neutral-700`}>
          Każdy z nich inaczej reaguje na światło, inaczej pracuje, inaczej się obrabia i inaczej się starzeje. Dlatego je poznajemy, pracujemy z nimi i łączymy. Fornir i HPL to dla nas codzienność. ARPA, FENIX i stal pozwalają budować rozwiązania, w których estetyka idzie w parze z funkcjonalnością.
        </p>
      </Section>

      {/* 06 TECHNOLOGIA */}
      <Section id="technologia" tone="dark" className="bg-[#0d0d0d] text-white py-24 px-6 sm:px-12">
        <h2 className={heading}>FORMA, KTÓRA DZIAŁA.</h2>
        <p className="mt-6 max-w-3xl text-xl font-medium text-white/90">To, czego nie widać, ma równie duże znaczenie.</p>
        <p className={`${copy} mt-8 text-white/80`}>
          Dobry mebel powinien być piękny, ale przede wszystkim powinien działać. Dlatego pracujemy na rozwiązaniach sprawdzonych producentów: Blum, Häfele, Viefe. Okucia, prowadnice, systemy szuflad i zawiasy dobieramy do konkretnego projektu. Viefe nie jest dla nas luksusowym dodatkiem. Jest standardem, tak samo jak Blum i Häfele.
        </p>
      </Section>

      {/* 07 BLAT */}
      <Section id="blat" tone="light" className="bg-[#f8f8f7] text-neutral-950 py-24 px-6 sm:px-12">
        <h2 className={heading}>OSTATNI ELEMENT FORMY.</h2>
        <p className={`${copy} mt-8 text-neutral-700`}>
          Kamień i spieki naturalnie dopełniają nasze realizacje. Blat nie jest osobnym elementem. Jego kolor, grubość, struktura, sposób łączenia i wykończenie muszą współgrać z meblem, od pierwszej szafki po ostatnią krawędź.
        </p>
      </Section>

      {/* 08 ARCHITEKCI */}
      <Section id="architekci" tone="dark" className="bg-[#0d0d0d] text-white py-24 px-6 sm:px-12">
        <h2 className={heading}>ARCHITEKT TWORZY WIZJĘ. MY NADAJEMY JEJ FORMĘ.</h2>
        <p className={`${copy} mt-8 text-white/80`}>
          Pracujemy z projektantami już na etapie koncepcji: konsultujemy materiały, konstrukcję, technologię i możliwości wykonawcze. Nie zmieniamy projektu dlatego, że jest trudny. Szukamy sposobu, żeby go wykonać. Jedną z naszych obecnych współprac jest Matsko Studio.
        </p>
      </Section>

      {/* 09 PROCES */}
      <Section id="proces" tone="light" className="bg-[#f8f8f7] text-neutral-950 py-24 px-6 sm:px-12">
        <h2 className={heading}>OD POMYSŁU DO FORMY.</h2>
        <ol className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
          {processSteps.map(([num, title, text]) => (
            <li key={num} className="border-t border-neutral-300 pt-6">
              <span className="text-sm font-medium tracking-[0.2em] text-[#F26522]">{num}</span>
              <p className="mt-3 text-lg leading-relaxed">
                <strong className="font-bold">{title}</strong> {text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 10 REALIZACJE */}
      <Section id="realizacje" tone="dark" className="bg-[#0d0d0d] text-white py-24 px-6 sm:px-12">
        <h2 className={heading}>PRZESTRZENIE, KTÓRE NABARŁY FORMY.</h2>
        <p className={`${copy} mt-8 text-white/80`}>
          Każda realizacja zaczyna się od ludzi: ich potrzeb, rytmu dnia i sposobu życia. Dopiero potem forma, materiały i detal nadają temu konkretny kształt. Kuchnie. Garderoby. Biblioteki. Zabudowy ścienne. Home office. Meble wolnostojące. Nietypowe konstrukcje. Pokazujemy projekty, nie produkty. Projekty naszych klientów i architektów, które powstały dlatego, że ktoś postanowił zrobić coś inaczej.
        </p>
        <Link href="/realizacje" onClick={() => triggerHaptic()} className={`${ghostLight} mt-10`}>
          ZOBACZ REALIZACJE ↗
        </Link>
      </Section>

      {/* 11 GALERIA */}
      <section id="galeria" data-header-tone="dark" className="bg-[#1a1a1a] px-6 py-24 text-white sm:px-12">
        <div className="mx-auto max-w-6xl" data-reveal>
          <h2 className={heading}>FORMA W GOTOWEJ PRZESTRZENI</h2>
          <p className="mt-6 max-w-3xl text-xl font-medium leading-relaxed text-white/90">
            Najlepszy efekt pojawia się wtedy, gdy forma, funkcja i codzienność przestają ze sobą konkurować.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {kitchenProjects.map((project) => (
              <Link
                key={project.slug}
                href="/realizacje"
                onClick={() => triggerHaptic()}
                className="gallery-card group relative block aspect-[4/5] overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.caption}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={hideBrokenImage}
                />
                <span className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/25" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 12 NEO KUCHNIE → NEO FORM */}
      <Section id="nowa-forma" tone="light" className="bg-[#f8f8f7] text-neutral-950 py-20 px-6 sm:px-12">
        <h2 className={heading}>NOWY CZAS. NOWA FORMA.</h2>
        <p className={`${copy} mt-8 text-neutral-700`}>
          Neo Kuchnie było początkiem. Tam zdobywaliśmy doświadczenie, poznawaliśmy materiały, technologie i potrzeby klientów. Neo Form jest jego naturalnym rozwinięciem. Zmienia się skala i możliwości. Rozwijamy współpracę z architektami, technologię i zakres realizacji. Nie zmienia się to, co najważniejsze: nasz charakter i najwyższe standardy jakości.
        </p>
      </Section>

      {/* 13 NEO LAB */}
      <Section id="neo-lab" tone="dark" className="bg-[#111111] text-white py-24 px-6 sm:px-12">
        <h2 className={heading}>WIEDZA, KTÓRA POWSTAJE W PRAKTYCE.</h2>
        <p className={`${copy} mt-8 text-white/80`}>
          Neo Lab to przestrzeń wiedzy, spotkań i wymiany doświadczeń wokół projektowania, produkcji i realizacji mebli. Nie tylko produkujemy. Pokazujemy, jak to robimy. Dla projektantów, architektów, producentów mebli, montażystów i osób, które dopiero zaczynają w branży. Tworzymy go razem z markami, które wyznaczają standardy: Blum, Häfele, Viefe, PEKA, ARPA, FENIX. Tak powstają spotkania, na których produkt można dotknąć, przetestować i zrozumieć. Neo Lab to nie szkoła. To laboratorium. Wiedza, którą można wykorzystać następnego dnia.
        </p>
        <p className="mt-12 text-2xl font-bold uppercase tracking-tight md:text-3xl">
          LEARN. TEST. CREATE. (Poznaj. Sprawdź. Stwórz.)
        </p>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {labCards.map(([title, text]) => (
            <article key={title} className="border border-white/10 p-6 transition-colors hover:border-[#F26522]">
              <h3 className="text-lg font-bold uppercase tracking-tight">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-white/75">{text}</p>
            </article>
          ))}
        </div>
        <Link href="/neo-lab" onClick={() => triggerHaptic()} className={`${ghostLight} mt-12`}>
          ZOBACZ WYDARZENIA ↗
        </Link>
      </Section>

      {/* 14 KONTAKT & FOOTER */}
      <footer id="kontakt" data-header-tone="light" className="bg-white text-neutral-900 border-t border-neutral-200 py-20 px-6 sm:px-12">
        <div className="mx-auto max-w-6xl" data-reveal>
          <h2 className={heading}>ZACZNIJ OD ROZMOWY. NADAMY JEJ FORMĘ.</h2>
          <p className={`${copy} mt-6 text-neutral-600`}>
            Opowiedz nam o przestrzeni, w której chcesz mieszkać lub pracować.
          </p>
          <form className="mt-10 grid max-w-xl gap-4" onSubmit={submitContact}>
            <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
              Imię
              <input name="name" required className="border-b border-neutral-300 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-neutral-950 outline-none focus:border-[#F26522]" />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
              E-mail
              <input name="email" type="email" required className="border-b border-neutral-300 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-neutral-950 outline-none focus:border-[#F26522]" />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
              Telefon
              <input name="phone" type="tel" required className="border-b border-neutral-300 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-neutral-950 outline-none focus:border-[#F26522]" />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
              Opis projektu
              <textarea name="project" required rows={4} className="resize-y border-b border-neutral-300 bg-transparent px-0 py-3 text-base normal-case tracking-normal text-neutral-950 outline-none focus:border-[#F26522]" />
            </label>
            <button type="submit" className={`${ghostDark} mt-2 w-fit`}>
              Wyślij
            </button>
            {sent ? <p className="text-sm text-neutral-600">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p> : null}
          </form>

          <div className="mt-20 grid gap-10 border-t border-neutral-200 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <BrandLogo tone="dark" className="h-14" />
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-600">
                NEO FORM. Tworzymy meble. Dzielimy się wiedzą. Rozwijamy branżę.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">Kontakt</p>
              <ul className="mt-3 grid gap-2 text-sm text-neutral-700">
                <li>
                  <a className="hover:text-[#F26522]" href="tel:+48000000000">+48 000 000 000</a>
                </li>
                <li>
                  <a className="hover:text-[#F26522]" href="mailto:hello@neoform.pl">hello@neoform.pl</a>
                </li>
                <li>
                  <Link className="hover:text-[#F26522]" href="/kontakt" onClick={() => triggerHaptic()}>
                    Strona kontaktu
                  </Link>
                </li>
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
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-500">
            <span>© 2026 NEO FORM</span>
            <button type="button" className="cursor-pointer hover:text-neutral-950 hover:underline" onClick={() => setLegalOpen("privacy")}>
              Polityka prywatności
            </button>
            <button type="button" className="cursor-pointer hover:text-neutral-950 hover:underline" onClick={() => setLegalOpen("cookies")}>
              Ustawienia cookies
            </button>
          </div>
        </div>
      </footer>

      {legalOpen && (
        <div className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={() => setLegalOpen(null)}>
          <div className="legal-modal__card" onClick={(event) => event.stopPropagation()}>
            <button className="project-modal__close" aria-label="Zamknij" onClick={() => setLegalOpen(null)}>
              <X size={20} />
            </button>
            <p className="mb-5 font-mono text-xs text-neutral-400">[ NEO FORM / INFORMACJE ]</p>
            <h2 id="legal-title">{legalOpen === "privacy" ? "Polityka prywatności" : "Ustawienia cookies"}</h2>
            {legalOpen === "privacy" ? (
              <>
                <p>
                  Chronimy dane przekazywane przez formularz kontaktowy i wykorzystujemy je wyłącznie do odpowiedzi na zapytanie. Nie
                  sprzedajemy danych osobowych i przechowujemy je tylko przez okres niezbędny do obsługi kontaktu.
                </p>
                <p>
                  To jest wersja robocza dokumentu. Przed publikacją należy uzupełnić dane administratora, podstawę prawną, okresy
                  retencji i dane kontaktowe firmy.
                </p>
              </>
            ) : (
              <>
                <p>
                  Ta wersja demonstracyjna korzysta wyłącznie z technicznych mechanizmów strony. Po akceptacji zapiszemy wybór w
                  pamięci przeglądarki.
                </p>
                <button type="button" className="mt-4 cursor-pointer border border-neutral-950 px-6 py-3 text-xs uppercase tracking-[0.16em]" onClick={acceptCookies}>
                  Akceptuję ustawienia
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {cookiesVisible && (
        <aside className="cookie-banner" aria-label="Ustawienia cookies">
          <div>
            <strong>Twoja prywatność</strong>
            <p>Używamy niezbędnych cookies, aby strona działała poprawnie. Szczegóły znajdziesz w polityce prywatności.</p>
          </div>
          <div className="cookie-banner__actions">
            <button type="button" className="cursor-pointer bg-white px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#0d0d0d]" onClick={acceptCookies}>
              Akceptuję
            </button>
            <button type="button" className="cursor-pointer text-xs text-neutral-300 underline underline-offset-4 hover:text-white" onClick={() => setLegalOpen("cookies")}>
              Ustawienia
            </button>
          </div>
        </aside>
      )}

      <BackToTop />
    </main>
  );
}
