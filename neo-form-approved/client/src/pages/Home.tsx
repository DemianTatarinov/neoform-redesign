import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  X,
} from "lucide-react";
import BackToTop from "@/components/BackToTop";
import BrandLogo from "@/components/BrandLogo";
import HeroVideo from "@/components/HeroVideo";
import MaterialsCarousel from "@/components/MaterialsCarousel";
import NeoLabEvents from "@/components/NeoLabEvents";
import SectionDivider from "@/components/SectionDivider";
import SiteHeader from "@/components/SiteHeader";
import { credoCards, media } from "@/assets/media";
import { triggerHaptic } from "@/utils/haptics";
import { hideBrokenImage } from "@/utils/images";

const storage = {
  bespoke1: media.bespokeVeneer,
  bespoke2: media.bespokeMonolith,
  bespoke3: media.bespokeHiddenDoor,
  bespoke4: media.bespokeMaterials,
  anatomy: media.anatomyMaterial,
  penthouse: media.projectPenthouse,
  wilanow: media.projectWilanow,
  konstancin: media.projectKonstancin,
  loft: media.projectLoft,
  architects: media.architectCollaboration,
  testimonialAnna: media.testimonialAnna,
  testimonialMarek: media.testimonialMarek,
  testimonialOlga: media.testimonialOlga,
};

const images = {
  bespoke1: storage.bespoke1,
  bespoke2: storage.bespoke2,
  bespoke3: storage.bespoke3,
  bespoke4: storage.bespoke4,
  project: storage.penthouse,
  material: storage.bespoke4,
  technology: storage.bespoke3,
  countertop: storage.bespoke2,
  architects: storage.konstancin,
};

const bespokeCards = [
  ["01", "FORNIR PROWADZONY PRZEZ KILKA ELEMENTÓW", "Zachowujemy ciągłość usłojenia. Estetyka bez kompromisów.", storage.bespoke1, "portrait"],
  ["02", "ZABUDOWA SIĘGAJĄCA KILKU METRÓW", "Projektujemy dla przestrzeni, w których standardowe wymiary nie istnieją.", storage.bespoke2, "square"],
  ["03", "UKRYTE DRZWI I SKOMPLIKOWANE MECHANIZMY", "Funkcjonalność, która staje się niewidzialna.", storage.bespoke3, "portrait"],
  ["04", "POŁĄCZENIE RÓŻNYCH MATERIAŁÓW", "Precyzyjne łączenie kamienia, stali, drewna i spieków.", storage.bespoke4, "square"],
] as const;

const projects = [
  ["PENTHOUSE MOKOTÓW", "Wyzwanie: zachować czystość formy przy maksymalnej funkcjonalności.", storage.penthouse],
  ["APARTAMENT WILANÓW", "Dialog między kamieniem a drewnem. FENIX i orzech amerykański w idealnych proporcjach.", storage.wilanow],
  ["DOM KONSTANCIN", "Zintegrowana zabudowa na wymiar sięgająca ponad trzech metrów.", storage.konstancin],
  ["LOFT POWIŚLE", "Szczotkowana stal, głęboki mat i skomplikowane mechanizmy ukryte w ascetycznej formie.", storage.loft],
] as const;

const processSteps = [
  ["01", "KONCEPCJA", "Zaczynamy od zrozumienia przestrzeni. Możemy pracować na gotowym projekcie od Twojego architekta albo stworzyć wstępne rozwiązanie układu wspólnie z Tobą.", media.pages.process[0]],
  ["02", "DETALE I TECHNOLOGIA", "Dobieramy odpowiednie forniry, płyty, blaty oraz systemy wewnętrzne i okucia, które najlepiej sprawdzą się w projekcie.", media.pages.process[1]],
  ["03", "PRODUKCJA", "Każdy element jest precyzyjnie docinany i wykańczany z dbałością o setne części milimetra.", media.pages.process[2]],
  ["04", "MONTAŻ", "Nasza doświadczona ekipa montażystów dba o to, by każdy mebel został zainstalowany czysto, precyzyjnie i zgodnie z projektem.", media.pages.process[3]],
] as const;

const testimonials = [
  ["Anna Kowalska", "Architektka / Warszawa", "Neo Form nie upraszcza trudnych pomysłów. Zespół szuka sposobu, żeby je dobrze wykonać — dokładnie tego potrzebuję przy wymagających projektach.", storage.testimonialAnna],
  ["Marek Zieliński", "Inwestor prywatny / Mokotów", "Od pierwszej rozmowy czuliśmy, że projekt jest prowadzony całościowo. Zabudowa jest piękna, ale przede wszystkim działa każdego dnia.", storage.testimonialMarek],
  ["Olga Nowak", "Projektantka wnętrz / Wilanów", "Największą wartością jest dialog. Neo Form słucha architektury, materiału i proporcji, a potem przekłada je na precyzyjne wykonanie.", storage.testimonialOlga],
] as const;

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{children}</p>;
}

function Button({ children, href = "#contact", variant = "orange" }: { children: React.ReactNode; href?: string; variant?: "orange" | "ghost" }) {
  return (
    <a
      className={`button button--${variant}`}
      href={href}
      onClick={() => triggerHaptic()}
    >
      {children}
      <ArrowUpRight size={15} strokeWidth={1.8} />
    </a>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);
  const [selectedProject, setSelectedProject] = useState<readonly [string, string, string] | null>(null);
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
      (entries) => entries.forEach((entry) => {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main className="site overflow-x-hidden">
      <section className="hero pointer-events-none" id="start" data-header-surface="dark">
        <HeroVideo />
        <SiteHeader homePage />
        <div className="hero__content shell relative z-10 pointer-events-none">
          <p className="hero__reveal hero__reveal--1 font-mono text-[10px] tracking-[0.18em] text-[#F26522] uppercase">
            [ WARSZAWA I MAZOWSZE · MEBLE NA WYMIAR ]
          </p>
          <h1 className="hero__reveal hero__reveal--2 text-white font-bold">
            NOWA FORMA.<br />
            BEZWZGLĘDNA PRECYZJA.
          </h1>
          <p className="hero__lead hero__reveal hero__reveal--3">
            Projektujemy i produkujemy autorskie kuchnie oraz zabudowy meblowe klasy bespoke.
          </p>
          <span className="hero__reveal hero__reveal--4">
            <a
              className="pointer-events-auto inline-flex items-center gap-2 rounded bg-[#F26522] px-6 py-3.5 font-medium text-white hover:bg-[#d95316]"
              href="#portfolio"
              onClick={() => triggerHaptic()}
            >
              ZOBACZ PROJEKTY
              <ArrowUpRight size={15} strokeWidth={1.8} />
            </a>
          </span>
        </div>
        <div className="hero__footer shell"><span>SCROLL TO EXPLORE</span><span className="hero__line" /><ArrowDown size={14} /><span className="hero__swipe-hint">SWIPE HORIZONTALLY FOR NEXT VIDEO</span></div>
      </section>

      <SectionDivider index="01" label="BESPOKE" tone="light" />

      <section className="bespoke section-light section-rhythm" id="bespoke" data-reveal data-header-surface="light">
        <div className="shell">
          <div className="bespoke__intro">
            <div><Eyebrow>BESPOKE / INDYWIDUALNOŚĆ</Eyebrow><h2>INDYWIDUALNOŚĆ<br /><span>NIE JEST OPCJĄ.</span></h2><span className="accent-rule" /></div>
            <p className="bespoke__manifesto">Każde wnętrze jest inne.<br />Inne są potrzeby jego mieszkańców.<br />Inna architektura. Inne światło. Inne materiały.<br />Inna historia.<br /><br /><strong>Dlatego w Neo Form nie zaczynamy od katalogu.<br />Zaczynamy od projektu.</strong></p>
          </div>
        </div>
        <div className="bespoke__rail section-rhythm__body" tabIndex={0} aria-label="Galeria rozwiązań bespoke"><div className="bespoke__track">
          {bespokeCards.map(([number, title, description, image, ratio]) => (
            <article className={`solution-card solution-card--${ratio}`} key={number}>
              <div className="solution-card__image">
                <img src={image} alt={title} className="object-cover w-full h-full" onError={hideBrokenImage} />
                <span>{number}</span>
              </div>
              <div className="solution-card__copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div></div>
        <div className="shell bespoke__outro"><p>To właśnie takie projekty znamy najlepiej.<br />Nietypowe i wymagające realizacje są naszym chlebem powszednim.</p><Button href="#portfolio">Zobacz realizacje</Button></div>
      </section>

      <SectionDivider index="02" label="CREDO" tone="dark" />

      <section className="anatomy section-dark section-rhythm" id="anatomy" data-reveal data-header-surface="dark">
        <div className="shell">
          <Eyebrow>NASZE CREDO</Eyebrow><h2>CZTERY ELEMENTY.<br />JEDNA FORMA.</h2>
          <p className="anatomy__lead">Wierzymy, że dobry mebel nie powinien dominować nad wnętrzem. Powinien być jego naturalną częścią. Dlatego zwracamy uwagę na proporcje, podziały, materiały, światło, sposób otwierania, dotyk i każdy detal.</p>
          <div className="section-rhythm__body">
            <MaterialsCarousel items={credoCards} />
          </div>
        </div>
      </section>

      <SectionDivider index="03" label="PORTFOLIO" tone="light" />

      <section className="portfolio section-light section-rhythm" id="portfolio" data-reveal data-header-surface="light">
        <div className="shell"><Eyebrow>PORTFOLIO</Eyebrow><h2>PRZESTRZENIE,<br />KTÓRE STWORZYLIŚMY.</h2><p className="portfolio__lead">Nie tworzymy mebli do pustych pokoi. Tworzymy rozwiązania dla konkretnej architektury. Zobacz, jak nasze podejście do proporcji i materiału sprawdza się w praktyce.</p>
          <div className="section-rhythm__body project-grid">
            {projects.map(([title, description, image]) => (
              <a
                href="#project-detail"
                className="project-tile group"
                key={title}
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedProject([title, description, image]);
                }}
              >
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={hideBrokenImage}
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="project-tile__link">Otwórz projekt <ArrowUpRight size={15} /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider index="04" label="ARCHITEKCI" tone="light" />

      <section className="architects section-rhythm" id="architects" data-reveal data-header-surface="light"><div className="architects__copy"><Eyebrow>WSPÓŁPRACA Z ARCHITEKTEM</Eyebrow><h2>DOBRY PROJEKT POTRZEBUJE DOBREGO WYKONAWCY.</h2><p>Architekt tworzy wizję. My pomagamy nadać jej fizyczną formę. Pracujemy z projektantami już na etapie koncepcji, konsultując materiały, konstrukcję, technologię i możliwości wykonawcze.</p><p>Nie chcemy zmieniać projektu dlatego, że jest trudny. Chcemy znaleźć sposób, żeby go wykonać.</p><blockquote>Jedną z naszych obecnych współprac jest Matsko Studio. To właśnie dialog pomiędzy projektantem i wykonawcą pozwala powstawać rozwiązaniom, których nie da się znaleźć w katalogu.</blockquote><Button variant="ghost">Rozpocznij współpracę</Button></div><div className="architects__image" role="img" aria-label="Projektant i wykonawca omawiają projekt"><img src={images.architects} alt="Współpraca z architektem" className="object-cover w-full h-full" onError={hideBrokenImage} /></div></section>

      <section className="testimonials section-light section-rhythm" id="opinie" data-reveal data-header-surface="light">
        <div className="shell">
          <div className="testimonials__heading">
            <Eyebrow>OPINIE / MATERIAŁ DEMONSTRACYJNY</Eyebrow>
            <h2>FORMA, KTÓRA<br /><span>ZOSTAJE NA DŁUŻEJ.</span></h2>
            <p>Teksty i portrety w tej wersji są demonstracyjne. Po otrzymaniu potwierdzonych opinii klientów zastąpię je prawdziwymi wypowiedziami i zgodami na publikację.</p>
          </div>
          <div className="testimonials__slider-wrap section-rhythm__body overflow-x-hidden">
            <div
              className="testimonials__grid flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 scrollbar-none sm:px-6 md:grid md:grid-cols-3 md:gap-px md:overflow-visible md:px-0 md:pb-0"
              aria-label="Opinie klientów — przesuń, aby zobaczyć kolejne opinie"
            >
              {testimonials.map(([name, role, quote]) => {
                const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2);
                return (
                  <article className="testimonial-card w-[85vw] max-w-md shrink-0 snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none" key={name}>
                    <div className="testimonial-card__top mb-4 flex items-center gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F26522]/30 bg-[#F26522]/15 text-sm font-bold text-[#F26522]">
                        {initials}
                      </div>
                      <div className="flex min-w-0 flex-col">
                        <strong className="font-semibold text-neutral-900">{name}</strong>
                        <span className="text-neutral-500">{role}</span>
                      </div>
                    </div>
                    <div className="testimonial-card__quote">“</div>
                    <p>{quote}</p>
                    <div className="testimonial-card__line" />
                  </article>
                );
              })}
            </div>
            <div className="testimonials__mobile-hint">
              <span className="testimonials__hint-line" />
              <span>PRZESUŃ, ABY ZOBACZYĆ WIĘCEJ</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider index="05" label="PROCES" tone="light" />

      <section className="process section-light section-rhythm" id="process" data-reveal data-header-surface="light">
        <div className="shell">
          <div className="process__heading">
            <Eyebrow>PROCES</Eyebrow>
            <h2>OD POMYSŁU DO<br />GOTOWEGO WNĘTRZA.</h2>
          </div>
          <div className="section-rhythm__body process-grid">
            {processSteps.map(([number, title, description, image]) => (
              <article className="process-card" key={number}>
                <div className="process-card__image">
                  <img src={image} alt={title} className="h-48 w-full rounded-t-sm object-cover" onError={hideBrokenImage} />
                </div>
                <span className="process-card__number">{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider index="06" label="NEO LAB" tone="dark" />

      <section className="neo-lab section-dark section-rhythm" id="neo-lab" data-reveal data-header-surface="dark">
        <div className="shell neo-lab__grid">
          <div className="neo-lab__intro">
            <p className="lab-mark">NEO FORM <span>LAB</span></p>
            <h2>WIEDZA, KTÓRA<br />POWSTAJE<br />W PRAKTYCE.</h2>
            <p>Doświadczenie ma wartość dopiero wtedy, kiedy można się nim podzielić. Neo Lab to przestrzeń wiedzy, spotkań i wymiany doświadczeń dla projektantów, architektów i producentów.</p>
            <p>Nie interesują nas szkolenia, po których wychodzisz z kolejnym PDF. Interesuje nas wiedza, którą wykorzystasz następnego dnia.</p>
            <strong className="lab-triad">LEARN. TEST. CREATE.</strong>
          </div>
          <NeoLabEvents />
        </div>
      </section>

      <SectionDivider index="07" label="KONTAKT" tone="dark" />

      <footer className="site-footer section-dark section-rhythm" id="contact" data-reveal data-header-surface="dark"><div className="shell"><div className="footer__hero"><Eyebrow light>NEO FORM</Eyebrow><h2>TWORZYMY MEBLE.<br />DZIELIMY SIĘ WIEDZĄ.<br />ROZWIJAMY BRANŻĘ.</h2><form className="lead-form" onSubmit={(event) => { triggerHaptic(); handleSubmit(event); }}>{[["Imię i nazwisko", "text", "name"], ["Numer telefonu", "tel", "phone"], ["Adres e-mail", "email", "email"]].map(([label, type, name]) => <label key={name}><span>{label}</span><input type={type} name={name} required={name !== "email"} /></label>)}<button className="button button--orange" type="submit">{sent ? "DZIĘKUJEMY" : "WYŚLIJ ZAPYTANIE"}<ArrowUpRight size={15} /></button>{sent && <p className="form-success">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p>}</form></div><div className="footer__base"><div><span className="footer__brand"><BrandLogo /></span><p>ul. Przykładowa 12, Warszawa<br />+48 000 000 000<br />hello@neoform.pl</p></div><div className="footer__social"><a href="#contact">Instagram</a><a href="#contact">Facebook</a><a href="#contact">Pinterest</a></div><div className="footer__legal"><span>© 2026 NEO FORM</span><button className="footer-link" onClick={() => setLegalOpen("privacy")}>Polityka prywatności</button><button className="footer-link" onClick={() => setLegalOpen("cookies")}>Ustawienia cookies</button></div></div></div></footer>
      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={() => setSelectedProject(null)}>
          <div className="project-modal__card" onClick={(event) => event.stopPropagation()}>
            <button className="project-modal__close" aria-label="Zamknij projekt" onClick={() => setSelectedProject(null)}><X size={20} /></button>
            <div className="project-modal__image"><img src={selectedProject[2]} alt={selectedProject[0]} className="object-cover w-full h-full" onError={hideBrokenImage} /></div><div className="project-modal__gallery">{[storage.penthouse, storage.wilanow, storage.konstancin, storage.loft].map((image, index) => <img src={image} alt={`Galeria projektu ${index + 1}`} className="object-cover w-full h-full" key={image} onError={hideBrokenImage} />)}</div>
            <div className="project-modal__body"><Eyebrow>REALIZACJA / NEO FORM</Eyebrow><h2 id="project-modal-title">{selectedProject[0]}</h2><p className="project-modal__meta">Powierzchnia: 140 m² &nbsp;|&nbsp; Współpraca: pracownia projektowa &nbsp;|&nbsp; Rok: 2026</p><p>{selectedProject[1]} Tworzymy rozwiązania dla konkretnej architektury — od pierwszej koncepcji po montaż.</p><Button href="#contact">Porozmawiajmy o Twoim projekcie</Button></div>
          </div>
        </div>
      )}
      {legalOpen && (
        <div className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={() => setLegalOpen(null)}>
          <div className="legal-modal__card" onClick={(event) => event.stopPropagation()}><button className="project-modal__close" aria-label="Zamknij" onClick={() => setLegalOpen(null)}><X size={20} /></button><Eyebrow>NEO FORM / INFORMACJE</Eyebrow><h2 id="legal-title">{legalOpen === "privacy" ? "Polityka prywatności" : "Ustawienia cookies"}</h2>{legalOpen === "privacy" ? <><p>Chronimy dane przekazywane przez formularz kontaktowy i wykorzystujemy je wyłącznie do odpowiedzi na zapytanie. Nie sprzedajemy danych osobowych i przechowujemy je tylko przez okres niezbędny do obsługi kontaktu.</p><p>To jest wersja robocza dokumentu. Przed publikacją należy uzupełnić dane administratora, podstawę prawną, okresy retencji i dane kontaktowe firmy.</p></> : <><p>Ta wersja demonstracyjna korzysta wyłącznie z technicznych mechanizmów strony. Po akceptacji zapiszemy wybór w pamięci przeglądarki.</p><button className="button button--orange" onClick={() => { localStorage.setItem("neo-form-cookies", "accepted"); setCookiesVisible(false); setLegalOpen(null); }}>Akceptuję ustawienia</button></>}</div>
        </div>
      )}
      {cookiesVisible && <aside className="cookie-banner" aria-label="Ustawienia cookies"><div><strong>Twoja prywatność</strong><p>Używamy niezbędnych cookies, aby strona działała poprawnie. Szczegóły znajdziesz w polityce prywatności.</p></div><div className="cookie-banner__actions"><button className="button button--orange" onClick={() => { localStorage.setItem("neo-form-cookies", "accepted"); setCookiesVisible(false); }}>Akceptuję</button><button className="cookie-link" onClick={() => setLegalOpen("cookies")}>Ustawienia</button></div></aside>}
      <BackToTop />
    </main>
  );
}
