import { FormEvent, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import SiteChrome from "@/components/SiteChrome";
import MaterialsCarousel from "@/components/MaterialsCarousel";
import NeoLabEvents from "@/components/NeoLabEvents";
import { MapView } from "@/components/Map";
import { credoCards, media } from "@/assets/media";
import { triggerHaptic } from "@/utils/haptics";

const content = {
  bespoke: {
    eyebrow: "BESPOKE / INDYWIDUALNOŚĆ",
    title: <>INDYWIDUALNOŚĆ<br /><em>NIE JEST OPCJĄ.</em></>,
    intro: "Każde wnętrze jest inne. Inne są potrzeby jego mieszkańców. Inna architektura. Inne światło. Inne materiały. Inna historia.",
    copy: "Dlatego w Neo Form nie zaczynamy od katalogu. Zaczynamy od projektu.",
    image: media.bespokeMonolith,
    photos: media.pages.bespoke,
    points: [
      ["01", "FORNIR PROWADZONY PRZEZ KILKA ELEMENTÓW", "Zachowujemy ciągłość usłojenia. Estetyka bez kompromisów."],
      ["02", "ZABUDOWA SIĘGAJĄCA KILKU METRÓW", "Projektujemy dla przestrzeni, w których standardowe wymiary nie istnieją."],
      ["03", "UKRYTE DRZWI I SKOMPLIKOWANE MECHANIZMY", "Funkcjonalność, która staje się niewidzialna."],
      ["04", "POŁĄCZENIE RÓŻNYCH MATERIAŁÓW", "Precyzyjne łączenie kamienia, stali, drewna i spieków."],
    ],
  },
  credo: {
    eyebrow: "NASZE CREDO",
    title: <>CZTERY ELEMENTY.<br /><em>JEDNA FORMA.</em></>,
    intro: "Wierzymy, że dobry mebel nie powinien dominować nad wnętrzem. Powinien być jego naturalną częścią.",
    copy: "Dlatego zwracamy uwagę na proporcje, podziały, materiały, światło, sposób otwierania, dotyk i każdy detal.",
    image: media.anatomyMaterial,
    photos: media.pages.credo,
    points: [
      ["01", "PROJEKT", "Detal decyduje o tym, jak mebel będzie odbierany po latach."],
      ["02", "MATERIAŁ", "Poznajemy go, pracujemy z nim i łączymy go z architekturą."],
      ["03", "TECHNOLOGIA", "To, czego nie widać, ma równie duże znaczenie."],
      ["04", "BLAT", "Jego kolor, grubość i struktura muszą współgrać z meblem."],
    ],
  },
  architects: {
    eyebrow: "WSPÓŁPRACA Z ARCHITEKTEM",
    title: <>DOBRY PROJEKT<br /><em>POTRZEBUJE DOBREGO WYKONAWCY.</em></>,
    intro: "Architekt tworzy wizję. My pomagamy nadać jej fizyczną formę.",
    copy: "Pracujemy z projektantami już na etapie koncepcji, konsultując materiały, konstrukcję, technologię i możliwości wykonawcze. Nie chcemy zmieniać projektu dlatego, że jest trudny. Chcemy znaleźć sposób, żeby go wykonać.",
    image: media.architectCollaboration,
    photos: media.pages.architects,
    points: [
      ["01", "KONSULTACJE MATERIAŁOWE", "Dobieramy forniry, płyty, kamień i spieki do koncepcji pracowni."],
      ["02", "ROZWIĄZANIA KONSTRUKCYJNE", "Szukamy sposobu wykonania, a nie powodu, by uprościć projekt."],
      ["03", "TECHNOLOGIA WYKONANIA", "Okucia, mechanizmy i podziały wynikają z architektury, nie z katalogu."],
      ["04", "PRECYZYJNY MONTAŻ", "Domykamy realizację czysto, zgodnie z dokumentacją i detalem."],
    ],
  },
  process: {
    eyebrow: "PROCES",
    title: <>OD POMYSŁU DO<br /><em>GOTOWEGO WNĘTRZA.</em></>,
    intro: "Prowadzimy projekt od pierwszej rozmowy do ostatniego detalu.",
    copy: "Każdy etap ma swoje tempo, decyzje i odpowiedzialność. Dzięki temu trudne realizacje pozostają pod kontrolą.",
    image: media.projectPenthouse,
    photos: media.pages.process,
    points: [
      ["01", "KONCEPCJA / POMIAR", "Zaczynamy od zrozumienia przestrzeni i potrzeb."],
      ["02", "PROJEKT I DETALE", "Dobieramy forniry, płyty, blaty i okucia."],
      ["03", "PRODUKCJA CNC", "Każdy element jest precyzyjnie docinany i wykańczany."],
      ["04", "MONTAŻ", "Domykamy realizację czysto, precyzyjnie i zgodnie z projektem."],
    ],
  },
  "neo-lab": {
    eyebrow: "NEO FORM LAB",
    title: <>WIEDZA, KTÓRA<br /><em>POWSTAJE W PRAKTYCE.</em></>,
    intro: "Doświadczenie ma wartość dopiero wtedy, kiedy można się nim podzielić.",
    copy: "Neo Lab to przestrzeń wiedzy, spotkań i wymiany doświadczeń dla projektantów, architektów i producentów. LEARN. TEST. CREATE.",
    image: media.bespokeMaterials,
    photos: media.pages.neoLab,
    points: [
      ["01", "BLUM", "Rozwiązania do codziennej ergonomii."],
      ["02", "HÄFELE", "Technologia i precyzja w miejscu, którego nie widać."],
      ["03", "VIEFE", "Detal, który domyka projekt."],
      ["04", "PEKA / ARPA / FENIX", "Materiały i systemy, które testujemy w praktyce."],
    ],
  },
  contact: {
    eyebrow: "NEO FORM / KONTAKT",
    title: <>POROZMAWIAJMY<br /><em>O TWOIM PROJEKCIE.</em></>,
    intro: "Opowiedz nam o przestrzeni, potrzebach i kierunku, w którym chcesz iść.",
    copy: "Wersja demonstracyjna formularza — podłączymy docelowy email lub CRM po otrzymaniu danych firmy.",
    image: media.architectCollaboration,
    photos: media.pages.contact,
    points: [
      ["01", "SHOWROOM", "Spotkajmy się w Warszawie i omówmy materiały na żywo."],
      ["02", "KONSULTACJA", "Pierwsza rozmowa o przestrzeni, budżecie i terminie."],
      ["03", "DOKUMENTACJA", "Przekaż projekt od architekta — doprecyzujemy wykonanie."],
      ["04", "REALIZACJA", "Od koncepcji, przez produkcję, po montaż."],
    ],
  },
} as const;

type PageKey = keyof typeof content;

const ctaHref = (page: PageKey) => (page === "neo-lab" || page === "contact" ? "/contact" : "/portfolio");
const ctaLabel = (page: PageKey) => {
  if (page === "architects") return "Rozpocznij współpracę";
  if (page === "contact") return "Wyślij zapytanie";
  return "Zobacz realizacje";
};

function OrangeLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="button button--orange standalone-cta" href={href} onClick={() => triggerHaptic()}>
      {children}
      <ArrowUpRight size={15} strokeWidth={1.8} />
    </Link>
  );
}

export default function SectionPage({ page }: { page: PageKey }) {
  const item = content[page];
  const [sent, setSent] = useState(false);
  const photos = item.photos;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    triggerHaptic();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <SiteChrome
      eyebrow={item.eyebrow}
      title={item.title}
      lead={item.intro}
      cta={page === "contact" ? undefined : <OrangeLink href={ctaHref(page)}>{ctaLabel(page)}</OrangeLink>}
    >
      <section className="bespoke section-light" data-reveal>
        <div className="shell">
          <div className="bespoke__intro">
            <div>
              <p className="eyebrow">{item.eyebrow}</p>
              <h2>{item.title}</h2>
              <span className="accent-rule" />
            </div>
            <p className="bespoke__manifesto">
              {item.intro}
              <br />
              <br />
              <strong>{item.copy}</strong>
            </p>
          </div>
        </div>
        <div className="bespoke__rail" tabIndex={0} aria-label="Galeria">
          <div className="bespoke__track">
            {item.points.map(([number, title, description], index) => (
              <article className={`solution-card ${index % 2 === 0 ? "solution-card--portrait" : "solution-card--square"}`} key={title}>
                <div className="solution-card__image" style={{ backgroundImage: `url(${photos[index] ?? item.image})` }}>
                  <span>{number}</span>
                </div>
                <div className="solution-card__copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="anatomy section-dark" data-reveal>
        <div className="shell">
          <p className="eyebrow">{page === "credo" ? "CZTERY ELEMENTY / MATERIAŁY" : "MATERIAŁ / DETAL"}</p>
          <h2>{page === "credo" ? <>CZTERY ELEMENTY.<br />JEDNA FORMA.</> : <>FORMA, KTÓRA<br />WYTRZYMUJE CZAS.</>}</h2>
          <p className="anatomy__lead">{item.copy}</p>
          {page === "credo" ? (
            <MaterialsCarousel items={credoCards} />
          ) : (
            <div className="page-photo-grid">
              {photos.slice(0, 4).map((src, index) => (
                <div className="page-photo-grid__item" key={src} style={{ backgroundImage: `url(${src})` }} role="img" aria-label={`Realizacja ${index + 1}`} />
              ))}
            </div>
          )}
        </div>
      </section>

      {page === "architects" && (
        <section className="architects" data-reveal>
          <div className="architects__copy">
            <p className="eyebrow">WSPÓŁPRACA Z ARCHITEKTEM</p>
            <h2>DOBRY PROJEKT POTRZEBUJE DOBREGO WYKONAWCY.</h2>
            <p>{item.intro}</p>
            <p>{item.copy}</p>
            <blockquote>Jedną z naszych obecnych współprac jest Matsko Studio. To właśnie dialog pomiędzy projektantem i wykonawcą pozwala powstawać rozwiązaniom, których nie da się znaleźć w katalogu.</blockquote>
            <OrangeLink href="/contact">Rozpocznij współpracę</OrangeLink>
          </div>
          <div className="architects__image" style={{ backgroundImage: `url(${photos[0]})` }} role="img" aria-label="Projektant i wykonawca omawiają projekt" />
        </section>
      )}

      {page === "process" && (
        <section className="process section-light" data-reveal>
          <div className="shell">
            <div className="process__heading">
              <p className="eyebrow">PROCES</p>
              <h2>OD POMYSŁU DO<br />GOTOWEGO WNĘTRZA.</h2>
            </div>
            <div className="process-grid">
              {item.points.map(([number, title, description], index) => (
                <article className="process-card" key={number}>
                  <div className="process-card__image">
                    <img src={media.pages.process[index] ?? item.image} alt={title} className="object-cover w-full h-full" />
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
      )}

      {page === "neo-lab" && (
        <section className="neo-lab section-dark" data-reveal>
          <div className="shell neo-lab__grid">
            <div className="neo-lab__intro">
              <p className="lab-mark">NEO FORM <span>LAB</span></p>
              <h2>WIEDZA, KTÓRA<br />POWSTAJE<br />W PRAKTYCE.</h2>
              <p>{item.intro}</p>
              <p>{item.copy}</p>
              <strong className="lab-triad">LEARN. TEST. CREATE.</strong>
            </div>
            <NeoLabEvents />
          </div>
          <div className="shell">
            <MaterialsCarousel eyebrow="NEO LAB / MATERIAŁY I SYSTEMY" />
          </div>
        </section>
      )}

      {page === "contact" && (
        <>
          <section className="section-light" data-reveal>
            <div className="shell page-contact-split">
              <form className="page-contact-form" onSubmit={handleSubmit}>
                {["Imię i nazwisko", "Numer telefonu", "Adres e-mail", "Opis projektu"].map((label) => (
                  <label key={label}>
                    <span>{label}</span>
                    <input aria-label={label} required={label !== "Opis projektu"} />
                  </label>
                ))}
                <button className="button button--orange" type="submit">
                  {sent ? "DZIĘKUJEMY" : "WYŚLIJ ZAPYTANIE"}
                  <ArrowUpRight size={15} />
                </button>
                {sent && <p className="form-success">Otrzymaliśmy Twoją wiadomość. Skontaktujemy się wkrótce.</p>}
              </form>
              <div className="page-photo-grid page-photo-grid--contact">
                {photos.map((src) => (
                  <div className="page-photo-grid__item" key={src} style={{ backgroundImage: `url(${src})` }} />
                ))}
              </div>
            </div>
          </section>
          <section className="contact-map shell">
            <div>
              <p className="eyebrow">SHOWROOM / WARSZAWA</p>
              <h2>SPOTKAJMY SIĘ<br /><em>W DOBREJ PRZESTRZENI.</em></h2>
              <p>Mapa jest podłączona do Google Maps. Po otrzymaniu właściwego adresu showroomu ustawimy precyzyjny punkt i dane dojazdu.</p>
            </div>
            <MapView
              initialCenter={{ lat: 52.2297, lng: 21.0122 }}
              initialZoom={12}
              onMapReady={(map) => {
                new window.google.maps.marker.AdvancedMarkerElement({
                  map,
                  position: { lat: 52.2297, lng: 21.0122 },
                  title: "Neo Form — do uzupełnienia",
                });
              }}
            />
          </section>
        </>
      )}

      {page !== "contact" && page !== "neo-lab" && (
        <section className="shell bespoke__outro section-light">
          <p>To właśnie takie projekty znamy najlepiej.<br />Nietypowe i wymagające realizacje są naszym chlebem powszednim.</p>
          <OrangeLink href={ctaHref(page)}>{ctaLabel(page)}</OrangeLink>
        </section>
      )}
    </SiteChrome>
  );
}
