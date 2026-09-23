import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const storage = {
  logo: "/assets/neo-form-full-logo.png",
  bespoke1: "/assets/bespoke-veneer.jpg",
  bespoke2: "/assets/bespoke-monolith.jpg",
  bespoke3: "/assets/bespoke-hidden-door.jpg",
  bespoke4: "/assets/bespoke-materials.jpg",
  anatomy: "/assets/anatomy-material.jpg",
  penthouse: "/assets/project-penthouse.jpg",
  wilanow: "/assets/project-wilanow.jpg",
  konstancin: "/assets/project-konstancin.jpg",
  loft: "/assets/project-loft.jpg",
  architects: "/assets/architect-collaboration.jpg",
  testimonialAnna: "/assets/testimonial-anna.jpg",
  testimonialMarek: "/assets/testimonial-marek.jpg",
  testimonialOlga: "/assets/testimonial-olga.jpg",
  heroMp4: "/assets/hero.mp4",
  heroWebm: "/assets/hero.webm",
  poster: "/assets/hero-poster.jpg",
};

const images = {
  bespoke1: storage.bespoke1,
  bespoke2: storage.bespoke2,
  bespoke3: storage.bespoke3,
  bespoke4: storage.bespoke4,
  project: storage.anatomy,
  material: storage.bespoke4,
  technology: storage.bespoke3,
  countertop: storage.bespoke2,
  architects: storage.architects,
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

const tabs = [
  {
    id: "project",
    number: "01",
    label: "PROJEKT",
    text: "Najwyższa jakość nie jest dodatkiem do projektu. Jest jego częścią. Każdy detal decyduje o tym, jak mebel będzie odbierany po latach.",
    image: images.project,
  },
  {
    id: "material",
    number: "02",
    label: "MATERIAŁ",
    text: "Fornir. HPL. FENIX. ARPA. Stal. Drewno. Lakier. Kamień. Spiek. Każdy materiał ma własną charakterystykę. Inaczej reaguje na światło, inaczej pracuje.",
    image: images.material,
  },
  {
    id: "technology",
    number: "03",
    label: "TECHNOLOGIA",
    text: "To, czego nie widać, ma równie duże znaczenie. Okucia i systemy dobieramy do projektu. Bo jakość zaczyna się również w miejscu, którego później nie widać.",
    image: images.technology,
  },
  {
    id: "countertop",
    number: "04",
    label: "BLAT",
    text: "Nie traktujemy blatu jako osobnego elementu. Jego kolor, grubość i struktura muszą współgrać z meblem.",
    image: images.countertop,
  },
] as const;

const processSteps = [
  ["01", "KONCEPCJA", "Zaczynamy od zrozumienia przestrzeni. Możemy pracować na gotowym projekcie od Twojego architekta albo stworzyć wstępne rozwiązanie układu wspólnie z Tobą."],
  ["02", "DETALE I TECHNOLOGIA", "Dobieramy odpowiednie forniry, płyty, blaty oraz systemy wewnętrzne i okucia, które najlepiej sprawdzą się w projekcie."],
  ["03", "PRODUKCJA", "Każdy element jest precyzyjnie docinany i wykańczany z dbałością o setne części milimetra."],
  ["04", "MONTAŻ", "Nasza doświadczona ekipa montażystów dba o to, by każdy mebel został zainstalowany czysto, precyzyjnie i zgodnie z projektem."],
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
  return <a className={`button button--${variant}`} href={href}>{children}<ArrowUpRight size={15} strokeWidth={1.8} /></a>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("project");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [selectedProject, setSelectedProject] = useState<readonly [string, string, string] | null>(null);
  const [cookiesVisible, setCookiesVisible] = useState(false);
  const [legalOpen, setLegalOpen] = useState<"privacy" | "cookies" | null>(null);
  const activePanel = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <section className="hero" id="start">
        <video className="hero__video" autoPlay muted loop playsInline poster={storage.poster}>
          <source src={storage.heroMp4} type="video/mp4" />
          <source src={storage.heroWebm} type="video/webm" />
        </video>
        <div className="hero__overlay" />
        <header className="site-header shell">
          <a className="brand" href="#start" aria-label="Neo Form — strona główna" onClick={closeMenu}>
            <img src={storage.logo} alt="Neo Form" />
          </a>
          <button className="mobile-menu-button" aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`} aria-label="Główna nawigacja">
            <a href="#bespoke" onClick={closeMenu}>Bespoke</a>
            <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
            <a href="#anatomy" onClick={closeMenu}>Credo</a>
            <a href="#contact" onClick={closeMenu}>Kontakt</a>
          </nav>
          <a className="header-cta" href="#contact" onClick={closeMenu}>Porozmawiajmy <ArrowUpRight size={15} /></a>
        </header>
        <div className="hero__content shell">
          <Eyebrow light><span className="hero__reveal hero__reveal--1">NEO FORM / KUCHNIE I MEBLE NA WYMIAR</span></Eyebrow>
          <h1 className="hero__reveal hero__reveal--2">NOWA FORMA.<br /><em>NIEOGRANICZONE</em><br />MOŻLIWOŚCI.</h1>
          <p className="hero__lead hero__reveal hero__reveal--3">Dziś tworzymy meble i zabudowy dla całych wnętrz.</p>
          <span className="hero__reveal hero__reveal--4"><Button href="#portfolio">Zobacz projekty</Button></span>
        </div>
        <div className="hero__footer shell"><span>SCROLL TO EXPLORE</span><span className="hero__line" /><ArrowDown size={14} /><span className="hero__count">01 / 07</span></div>
      </section>

      <section className="bespoke section-light" id="bespoke" data-reveal>
        <div className="shell">
          <div className="bespoke__intro">
            <div><Eyebrow>BESPOKE / INDYWIDUALNOŚĆ</Eyebrow><h2>INDYWIDUALNOŚĆ<br /><span>NIE JEST OPCJĄ.</span></h2><span className="accent-rule" /></div>
            <p className="bespoke__manifesto">Każde wnętrze jest inne.<br />Inne są potrzeby jego mieszkańców.<br />Inna architektura. Inne światło. Inne materiały.<br />Inna historia.<br /><br /><strong>Dlatego w Neo Form nie zaczynamy od katalogu.<br />Zaczynamy od projektu.</strong></p>
          </div>
        </div>
        <div className="bespoke__rail" tabIndex={0} aria-label="Galeria rozwiązań bespoke"><div className="bespoke__track">
          {bespokeCards.map(([number, title, description, image, ratio]) => <article className={`solution-card solution-card--${ratio}`} key={number}><div className="solution-card__image" style={{ backgroundImage: `url(${image})` }}><span>{number}</span></div><div className="solution-card__copy"><h3>{title}</h3><p>{description}</p></div></article>)}
        </div></div>
        <div className="shell bespoke__outro"><p>To właśnie takie projekty znamy najlepiej.<br />Nietypowe i wymagające realizacje są naszym chlebem powszednim.</p><Button href="#portfolio">Zobacz realizacje</Button></div>
      </section>

      <section className="anatomy section-dark" id="anatomy" data-reveal>
        <div className="shell">
          <Eyebrow>NASZE CREDO</Eyebrow><h2>CZTERY ELEMENTY.<br />JEDNA FORMA.</h2>
          <p className="anatomy__lead">Wierzymy, że dobry mebel nie powinien dominować nad wnętrzem. Powinien być jego naturalną częścią. Dlatego zwracamy uwagę na proporcje, podziały, materiały, światło, sposób otwierania, dotyk i każdy detal.</p>
          <div className="anatomy__tabs">
            <div className="anatomy__labels" role="tablist" aria-label="Elementy projektu">{tabs.map((tab) => <button className={activeTab === tab.id ? "is-active" : ""} key={tab.id} role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}><span>{tab.number}</span>{tab.label}</button>)}</div>
            <div className="anatomy__panel" key={activePanel.id}><p>{activePanel.text}</p><div className="anatomy-panel__image" style={{ backgroundImage: `url(${activePanel.image})` }} /></div>
          </div>
        </div>
      </section>

      <section className="portfolio section-light" id="portfolio" data-reveal>
        <div className="shell"><Eyebrow>PORTFOLIO</Eyebrow><h2>PRZESTRZENIE,<br />KTÓRE STWORZYLIŚMY.</h2><p className="portfolio__lead">Nie tworzymy mebli do pustych pokoi. Tworzymy rozwiązania dla konkretnej architektury. Zobacz, jak nasze podejście do proporcji i materiału sprawdza się w praktyce.</p>
          <div className="project-grid">{projects.map(([title, description, image]) => <a href="#project-detail" className="project-tile" style={{ backgroundImage: `url(${image})` }} key={title} onClick={(event) => { event.preventDefault(); setSelectedProject([title, description, image]); }}><div><h3>{title}</h3><p>{description}</p><span className="project-tile__link">Otwórz projekt <ArrowUpRight size={15} /></span></div></a>)}</div>
        </div>
      </section>

      <section className="architects" id="architects" data-reveal><div className="architects__copy"><Eyebrow>WSPÓŁPRACA Z ARCHITEKTEM</Eyebrow><h2>DOBRY PROJEKT POTRZEBUJE DOBREGO WYKONAWCY.</h2><p>Architekt tworzy wizję. My pomagamy nadać jej fizyczną formę. Pracujemy z projektantami już na etapie koncepcji, konsultując materiały, konstrukcję, technologię i możliwości wykonawcze.</p><p>Nie chcemy zmieniać projektu dlatego, że jest trudny. Chcemy znaleźć sposób, żeby go wykonać.</p><blockquote>Jedną z naszych obecnych współprac jest Matsko Studio. To właśnie dialog pomiędzy projektantem i wykonawcą pozwala powstawać rozwiązaniom, których nie da się znaleźć w katalogu.</blockquote><Button variant="ghost">Rozpocznij współpracę</Button></div><div className="architects__image" style={{ backgroundImage: `url(${images.architects})` }} role="img" aria-label="Projektant i wykonawca omawiają projekt" /></section>

      <section className="testimonials section-light" id="opinie" data-reveal><div className="shell"><div className="testimonials__heading"><Eyebrow>OPINIE KLIENTÓW</Eyebrow><h2>FORMA, KTÓRA<br /><span>ZOSTAJE NA DŁUŻEJ.</span></h2><p>Najlepsze projekty zaczynają się od zaufania. Poznaj doświadczenia osób, które zaprosiły Neo Form do swoich wnętrz.</p></div><div className="testimonials__slider-wrap"><div className="testimonials__grid" aria-label="Opinie klientów — przesuń, aby zobaczyć kolejne opinie">{testimonials.map(([name, role, quote, image]) => <article className="testimonial-card" key={name}><div className="testimonial-card__top"><div className="testimonial-card__portrait" style={{ backgroundImage: `url(${image})` }} /><div><strong>{name}</strong><span>{role}</span></div></div><div className="testimonial-card__quote">“</div><p>{quote}</p><div className="testimonial-card__line" /></article>)}</div><div className="testimonials__mobile-hint"><span className="testimonials__hint-line" /><span>PRZESUŃ, ABY ZOBACZYĆ WIĘCEJ</span><ArrowUpRight size={14} /></div></div></div></section>

      <section className="process section-light" id="process" data-reveal><div className="shell"><div className="process__heading"><Eyebrow>PROCES</Eyebrow><h2>OD POMYSŁU DO<br />GOTOWEGO WNĘTRZA.</h2></div><div className="timeline">{processSteps.map(([number, title, description]) => <article className="timeline__item" key={number}><span className="timeline__number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>

      <section className="neo-lab section-dark" id="neo-lab" data-reveal><div className="shell neo-lab__grid"><div className="neo-lab__intro"><p className="lab-mark">NEO FORM <span>LAB</span></p><h2>WIEDZA, KTÓRA<br />POWSTAJE<br />W PRAKTYCE.</h2><p>Doświadczenie ma wartość dopiero wtedy, kiedy można się nim podzielić. Neo Lab to przestrzeń wiedzy, spotkań i wymiany doświadczeń dla projektantów, architektów i producentów.</p><p>Nie interesują nas szkolenia, po których wychodzisz z kolejnym PDF. Interesuje nas wiedza, którą wykorzystasz następnego dnia.</p><strong className="lab-triad">LEARN. TEST. CREATE.</strong></div><div className="neo-lab__events"><p className="partners-label">NEO LAB TWORZYMY Z:</p><div className="partner-list"><span>Blum</span><span>Häfele</span><span>Viefe</span><span>PEKA</span><span>ARPA</span><span>FENIX</span></div><h3>[ NAJBLIŻSZE WYDARZENIA ]</h3>{["Organizacja przestrzeni w kuchni i najnowsze rozwiązania.", "Fornir, HPL, FENIX, ARPA i możliwości ich zastosowania.", "Wymiana doświadczeń i spotkania dla architektów."].map((event, index) => <a href="#contact" className="event-card" key={event}><small>NEO LAB / {index === 0 ? "PEKA" : index === 1 ? "MATERIAŁY" : "ARCHITECTURE"}</small><strong>{event}</strong><ChevronRight size={18} /></a>)}<a className="events-link" href="#contact">[ ZOBACZ WSZYSTKIE WYDARZENIA ]</a></div></div></section>

      <footer className="site-footer section-dark" id="contact" data-reveal><div className="shell"><div className="footer__hero"><Eyebrow light>NEO FORM</Eyebrow><h2>TWORZYMY MEBLE.<br />DZIELIMY SIĘ WIEDZĄ.<br />ROZWIJAMY BRANŻĘ.</h2><form className="lead-form" onSubmit={handleSubmit}>{[["Imię i nazwisko", "text", "name"], ["Numer telefonu", "tel", "phone"], ["Adres e-mail", "email", "email"]].map(([label, type, name]) => <label key={name}><span>{label}</span><input type={type} name={name} required={name !== "email"} /></label>)}<button className="button button--orange" type="submit">{sent ? "DZIĘKUJEMY" : "WYŚLIJ ZAPYTANIE"}<ArrowUpRight size={15} /></button>{sent && <p className="form-success">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p>}</form></div><div className="footer__base"><div><strong>NEO FORM</strong><p>ul. Przykładowa 12, Warszawa<br />+48 000 000 000<br />hello@neoform.pl</p></div><div className="footer__social"><a href="#contact">Instagram</a><a href="#contact">Facebook</a><a href="#contact">Pinterest</a></div><div className="footer__legal"><span>© 2026 NEO FORM</span><button className="footer-link" onClick={() => setLegalOpen("privacy")}>Polityka prywatności</button><button className="footer-link" onClick={() => setLegalOpen("cookies")}>Ustawienia cookies</button></div></div></div></footer>
      {selectedProject && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={() => setSelectedProject(null)}>
          <div className="project-modal__card" onClick={(event) => event.stopPropagation()}>
            <button className="project-modal__close" aria-label="Zamknij projekt" onClick={() => setSelectedProject(null)}><X size={20} /></button>
            <div className="project-modal__image" style={{ backgroundImage: `url(${selectedProject[2]})` }} /><div className="project-modal__gallery">{[storage.penthouse, storage.wilanow, storage.konstancin, storage.loft].map((image, index) => <img src={image} alt={`Galeria projektu ${index + 1}`} key={image} />)}</div>
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
    </div>
  );
}
