import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  X,
} from "lucide-react";
import BackToTop from "@/components/BackToTop";
import BrandLogo from "@/components/BrandLogo";
import HeroVideo from "@/components/HeroVideo";
import MaterialsCarousel from "@/components/MaterialsCarousel";
import SiteHeader from "@/components/SiteHeader";
import { credoCards, media } from "@/assets/media";
import { triggerHaptic } from "@/utils/haptics";

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
    <div className="site">
      <section className="hero" id="start">
        <HeroVideo />
        <div className="hero__overlay" />
        <SiteHeader homePage />
        <div className="hero__content shell">
          <Eyebrow light><span className="hero__reveal hero__reveal--1">NEO FORM / KUCHNIE I MEBLE NA WYMIAR</span></Eyebrow>
          <h1 className="hero__reveal hero__reveal--2">NOWA FORMA.<br /><em>NIEOGRANICZONE</em><br />MOŻLIWOŚCI.</h1>
          <p className="hero__lead hero__reveal hero__reveal--3">Dziś tworzymy meble i zabudowy dla całych wnętrz.</p>
          <span className="hero__reveal hero__reveal--4"><Button href="#portfolio">Zobacz projekty</Button></span>
        </div>
        <div className="hero__footer shell"><span>SCROLL TO EXPLORE</span><span className="hero__line" /><ArrowDown size={14} /><span className="hero__swipe-hint">SWIPE HORIZONTALLY FOR NEXT VIDEO</span></div>
      </section>

      <section className="bespoke section-light" id="bespoke" data-reveal>
        <div className="shell">
          <div className="bespoke__intro">
            <div><Eyebrow>BESPOKE / INDYWIDUALNOŚĆ</Eyebrow><h2>INDYWIDUALNOŚĆ<br /><span>NIE JEST OPCJĄ.</span></h2><span className="accent-rule" /></div>
            <p className="bespoke__manifesto">Każde wnętrze jest inne.<br />Inne są potrzeby jego mieszkańców.<br />Inna architektura. Inne światło. Inne materiały.<br />Inna historia.<br /><br /><strong>Dlatego w Neo Form nie zaczynamy od katalogu.<br />Zaczynamy od projektu.</strong></p>
          </div>
        </div>
        <div className="bespoke__rail" tabIndex={0} aria-label="Galeria rozwiązań bespoke"><div className="bespoke__track">
          {bespokeCards.map(([number, title, description, image, ratio]) => (
            <article className={`solution-card solution-card--${ratio}`} key={number}>
              <div className="solution-card__image">
                <img src={image} alt={title} className="object-cover w-full h-full" />
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

      <section className="anatomy section-dark" id="anatomy" data-reveal>
        <div className="shell">
          <Eyebrow>NASZE CREDO</Eyebrow><h2>CZTERY ELEMENTY.<br />JEDNA FORMA.</h2>
          <p className="anatomy__lead">Wierzymy, że dobry mebel nie powinien dominować nad wnętrzem. Powinien być jego naturalną częścią. Dlatego zwracamy uwagę na proporcje, podziały, materiały, światło, sposób otwierania, dotyk i każdy detal.</p>
          <MaterialsCarousel items={credoCards} />
        </div>
      </section>

      <section className="portfolio section-light" id="portfolio" data-reveal>
        <div className="shell"><Eyebrow>PORTFOLIO</Eyebrow><h2>PRZESTRZENIE,<br />KTÓRE STWORZYLIŚMY.</h2><p className="portfolio__lead">Nie tworzymy mebli do pustych pokoi. Tworzymy rozwiązania dla konkretnej architektury. Zobacz, jak nasze podejście do proporcji i materiału sprawdza się w praktyce.</p>
          <div className="project-grid">{projects.map(([title, description, image]) => <a href="#project-detail" className="project-tile" key={title} onClick={(event) => { event.preventDefault(); setSelectedProject([title, description, image]); }}><img src={image} alt={title} className="object-cover w-full h-full" /><div><h3>{title}</h3><p>{description}</p><span className="project-tile__link">Otwórz projekt <ArrowUpRight size={15} /></span></div></a>)}</div>
        </div>
      </section>

      <section className="architects" id="architects" data-reveal><div className="architects__copy"><Eyebrow>WSPÓŁPRACA Z ARCHITEKTEM</Eyebrow><h2>DOBRY PROJEKT POTRZEBUJE DOBREGO WYKONAWCY.</h2><p>Architekt tworzy wizję. My pomagamy nadać jej fizyczną formę. Pracujemy z projektantami już na etapie koncepcji, konsultując materiały, konstrukcję, technologię i możliwości wykonawcze.</p><p>Nie chcemy zmieniać projektu dlatego, że jest trudny. Chcemy znaleźć sposób, żeby go wykonać.</p><blockquote>Jedną z naszych obecnych współprac jest Matsko Studio. To właśnie dialog pomiędzy projektantem i wykonawcą pozwala powstawać rozwiązaniom, których nie da się znaleźć w katalogu.</blockquote><Button variant="ghost">Rozpocznij współpracę</Button></div><div className="architects__image" role="img" aria-label="Projektant i wykonawca omawiają projekt"><img src={images.architects} alt="Współpraca z architektem" className="object-cover w-full h-full" /></div></section>

      <section className="testimonials section-light" id="opinie" data-reveal><div className="shell"><div className="testimonials__heading"><Eyebrow>OPINIE / MATERIAŁ DEMONSTRACYJNY</Eyebrow><h2>FORMA, KTÓRA<br /><span>ZOSTAJE NA DŁUŻEJ.</span></h2><p>Teksty i portrety w tej wersji są demonstracyjne. Po otrzymaniu potwierdzonych opinii klientów zastąpię je prawdziwymi wypowiedziami i zgodami na publikację.</p></div><div className="testimonials__slider-wrap"><div className="testimonials__grid" aria-label="Opinie klientów — przesuń, aby zobaczyć kolejne opinie">{testimonials.map(([name, role, quote, image]) => <article className="testimonial-card" key={name}><div className="testimonial-card__top"><div className="testimonial-card__portrait"><img src={image} alt={name} className="object-cover w-full h-full" /></div><div><strong>{name}</strong><span>{role}</span></div></div><div className="testimonial-card__quote">“</div><p>{quote}</p><div className="testimonial-card__line" /></article>)}</div><div className="testimonials__mobile-hint"><span className="testimonials__hint-line" /><span>PRZESUŃ, ABY ZOBACZYĆ WIĘCEJ</span><ArrowUpRight size={14} /></div></div></div></section>

      <section className="process section-light" id="process" data-reveal><div className="shell"><div className="process__heading"><Eyebrow>PROCES</Eyebrow><h2>OD POMYSŁU DO<br />GOTOWEGO WNĘTRZA.</h2></div><div className="process-grid">{processSteps.map(([number, title, description, image]) => <article className="process-card" key={number}><div className="process-card__image"><img src={image} alt={title} className="object-cover w-full h-full" /></div><span className="process-card__number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>

      <section className="neo-lab section-dark" id="neo-lab" data-reveal>
        <div className="shell neo-lab__grid">
          <div className="neo-lab__intro">
            <p className="lab-mark">NEO FORM <span>LAB</span></p>
            <h2>WIEDZA, KTÓRA<br />POWSTAJE<br />W PRAKTYCE.</h2>
            <p>Doświadczenie ma wartość dopiero wtedy, kiedy można się nim podzielić. Neo Lab to przestrzeń wiedzy, spotkań i wymiany doświadczeń dla projektantów, architektów i producentów.</p>
            <p>Nie interesują nas szkolenia, po których wychodzisz z kolejnym PDF. Interesuje nas wiedza, którą wykorzystasz następnego dnia.</p>
            <strong className="lab-triad">LEARN. TEST. CREATE.</strong>
          </div>
          <div className="neo-lab__events">
            <h3>[ NAJBLIŻSZE WYDARZENIA ]</h3>
            {[
              ["Organizacja przestrzeni w kuchni i najnowsze rozwiązania.", "PEKA", media.pages.neoLab[0]],
              ["Fornir, HPL, FENIX, ARPA i możliwości ich zastosowania.", "MATERIAŁY", media.pages.neoLab[1]],
              ["Wymiana doświadczeń i spotkania dla architektów.", "ARCHITECTURE", media.pages.neoLab[2]],
            ].map(([event, tag, image]) => (
              <a href="#contact" className="event-card event-card--media" key={event}>
                <img src={image} alt="" className="object-cover w-full h-full" />
                <small>NEO LAB / {tag}</small>
                <strong>{event}</strong>
                <ChevronRight size={18} />
              </a>
            ))}
            <a className="events-link" href="#contact">[ ZOBACZ WSZYSTKIE WYDARZENIA ]</a>
          </div>
        </div>
      </section>

      <footer className="site-footer section-dark" id="contact" data-reveal><div className="shell"><div className="footer__hero"><Eyebrow light>NEO FORM</Eyebrow><h2>TWORZYMY MEBLE.<br />DZIELIMY SIĘ WIEDZĄ.<br />ROZWIJAMY BRANŻĘ.</h2><form className="lead-form" onSubmit={(event) => { triggerHaptic(); handleSubmit(event); }}>{[["Imię i nazwisko", "text", "name"], ["Numer telefonu", "tel", "phone"], ["Adres e-mail", "email", "email"]].map(([label, type, name]) => <label key={name}><span>{label}</span><input type={type} name={name} required={name !== "email"} /></label>)}<button className="button button--orange" type="submit">{sent ? "DZIĘKUJEMY" : "WYŚLIJ ZAPYTANIE"}<ArrowUpRight size={15} /></button>{sent && <p className="form-success">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p>}</form></div><div className="footer__base"><div><span className="footer__brand"><BrandLogo /></span><p>ul. Przykładowa 12, Warszawa<br />+48 000 000 000<br />hello@neoform.pl</p></div><div className="footer__social"><a href="#contact">Instagram</a><a href="#contact">Facebook</a><a href="#contact">Pinterest</a></div><div className="footer__legal"><span>© 2026 NEO FORM</span><button className="footer-link" onClick={() => setLegalOpen("privacy")}>Polityka prywatności</button><button className="footer-link" onClick={() => setLegalOpen("cookies")}>Ustawienia cookies</button></div></div></div></footer>
      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={() => setSelectedProject(null)}>
          <div className="project-modal__card" onClick={(event) => event.stopPropagation()}>
            <button className="project-modal__close" aria-label="Zamknij projekt" onClick={() => setSelectedProject(null)}><X size={20} /></button>
            <div className="project-modal__image"><img src={selectedProject[2]} alt={selectedProject[0]} className="object-cover w-full h-full" /></div><div className="project-modal__gallery">{[storage.penthouse, storage.wilanow, storage.konstancin, storage.loft].map((image, index) => <img src={image} alt={`Galeria projektu ${index + 1}`} className="object-cover w-full h-full" key={image} />)}</div>
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
    </div>
  );
}
