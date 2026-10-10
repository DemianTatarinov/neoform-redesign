import { Odometer } from "@/components/odometer";
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { copy, categories, technologies } from '@/lib/neo-content';
import interior from '@/assets/neo-interior.jpg';
import materials from '@/assets/neo-materials.jpg';
import detail from '@/assets/neo-detail.jpg';
import plans from '@/assets/neo-plans.jpg';
import team from '@/assets/neo-team.asset.json';
import { HardwareDialog } from '@/components/hardware-dialog';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ContactMap } from '@/components/contact-map';
import { HeroVideo } from '@/components/hero-video';
import { ContactAddress } from '@/components/contact-address';
import { ContactForm } from '@/components/contact-form';
import { SiteFooterSignature } from '@/components/site-footer-signature';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'NEO FORM — Nowa forma. Nieograniczone możliwości.' },
    { name: 'description', content: 'Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość. Poznaj NEO FORM.' },
    { property: 'og:title', content: 'NEO FORM — Nowa forma. Nieograniczone możliwości.' },
    { property: 'og:description', content: 'Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const principles = [
  { title: 'PROJEKT', image: plans, target: '#architekci' },
  { title: 'MATERIAŁ', image: materials, target: '#material' },
  { title: 'DETAL', image: detail, target: '#technologia' },
  { title: 'JAKOŚĆ', image: interior, target: '#realizacje' },
];

function Label({ children, number }: { children: React.ReactNode; number: string }) {
  return <div className="section-label"><span>{children}</span><span className="section-number">{number} / 10</span></div>;
}
function Paragraphs({ texts, className = '' }: { texts: string[]; className?: string }) {
  return <div className={`paragraphs ${className}`}>{texts.map((text, i) => <p key={text} className={i === texts.length - 1 ? 'last-paragraph' : ''}>{text}</p>)}</div>;
}
function Photo({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`editorial-photo ${className}`} loading="lazy" width={1536} height={1024} />;
}

function Index() {
  const pageRef = useRef<HTMLElement>(null);
  useScrollReveal(pageRef);
  const [category, setCategory] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [principle, setPrinciple] = useState(0);
  const [hardwareBrand, setHardwareBrand] = useState<string | null>(null);
  const galleryImages = [interior, materials, plans, detail];
  return (
    <main ref={pageRef}>
      <section className="hero" id="top">
        <HeroVideo />
        <div className="hero-shade" />
        <div className="hero-copy"><div className="hero-kicker">NEO FORM</div><h1>NOWA FORMA<br />NIEOGRANICZONE<br />MOŻLIWOŚCI</h1><p>{copy.hero}</p></div>
        <div className="hero-bottom"><span>PROJEKT · MATERIAŁ · DETAL · JAKOŚĆ</span><a href="#credo" aria-label="Przejdź do CREDO"><ArrowDown size={22} /></a><span>01 / 10</span></div>
      </section>

      <section className="section credo" id="credo">
        <div className="container"><Label number="02">CREDO</Label>
          <div className="credo-intro"><div><h2>INDYWIDUALNOŚĆ<br />BEZ KOMROMISÓW</h2><span className="accent-line" aria-hidden="true" /></div><p className="lead">{copy.credo[0]}</p></div>
          <div className="credo-body"><Paragraphs texts={copy.credo.slice(1)} /></div>
          <ul className="individuality-slider" aria-label="Każde wnętrze jest inne">{copy.individuality.map((t, i) => <li key={t} className="individuality-card"><span>0{i + 1}</span><p>{t}</p></li>)}</ul>
          <div className="principles-split">
            <div className="principles-tabs"><p className="principles-title">Cztery elementy. Jedna forma</p><div role="tablist" aria-label="Cztery zasady NEO FORM">{principles.map((p, i) => <button key={p.title} type="button" role="tab" id={`principle-tab-${i}`} aria-selected={principle === i} aria-controls="principle-panel" className={principle === i ? 'principle-tab active' : 'principle-tab'} onClick={() => setPrinciple(i)}><span>0{i + 1}</span>{p.title}</button>)}</div></div>
            <div className="principles-photo" role="tabpanel" id="principle-panel" aria-labelledby={`principle-tab-${principle}`}>{principles.map((p, i) => <img key={p.title} src={p.image} alt={p.title} loading="lazy" width={1536} height={1024} className={principle === i ? 'active' : ''} aria-hidden={principle !== i} />)}</div>
          </div>
        </div>
      </section>

      <section className="section paper" id="zespol"><div className="container"><Label number="03">NEO STANDARD</Label><div className="section-heading"><h2>FORMA TWORZONA<br />PRZEZ LUDZI</h2><p className="lead">{copy.team[0]}</p></div><Photo src={team.url} alt="Zespół przy stole projektowym z próbkami materiałów" className="team-photo" /><div className="team-copy"><p>{copy.team[1]}</p><p>{copy.team[2]}</p></div></div></section>

      <section className="bespoke photo-section" id="bespoke"><Photo src={interior} alt="Spójna zabudowa kuchni przechodząca w salon" className="photo-background" /><div className="photo-shade" /><div className="container"><Label number="04">BESPOKE</Label><h2>FORMA W GOTOWEJ<br />PRZESTRZENI</h2><div className="bespoke-copy"><p className="lead">{copy.bespoke[0]}</p><p>{copy.bespoke[1]}</p><div className="technology-tiles">{technologies.map(t => <span key={t}>{t}</span>)}</div><p className="last-paragraph">{copy.bespoke[2]}</p></div></div></section>

      <section className="section graphite" id="material"><div className="container"><Label number="05">MATERIAŁ</Label><div className="section-heading"><h2>MATERIAŁ<br />MA ZNACZENIE</h2><Paragraphs texts={copy.materials} /></div><div className="material-grid">{['Drewno / Fornir', 'Kamień / Spieki', 'FENIX / ARPA / HPL', 'Stal'].map((name, i) => <figure key={name}><div className={`material-crop material-${i}`}><Photo src={materials} alt={name} /></div><figcaption><span>{name}</span><span>0{i + 1}</span></figcaption></figure>)}</div></div></section>

      <section className="section steel" id="technologia"><div className="container"><Label number="06">TECHNOLOGIA</Label><div className="image-text"><Photo src={detail} alt="Precyzyjnie spasowane fronty i ukryty zawias" /><div><h2>INŻYNIERIA<br />UKRYTA W FORMIE</h2><Paragraphs texts={copy.technology} /><div className="system-names">{['Blum', 'PEKA', 'Hettich'].map(name => <button key={name} type="button" className="system-name" onClick={() => setHardwareBrand(name)}>{name}</button>)}</div></div></div></div></section>

      <section className="section graphite" id="blat"><div className="container"><Label number="07">BLAT</Label><div className="image-text reversed"><div><h2>OSTATNI ELEMENT<br />KTÓRY POTRAFI<br />ZMIENIĆ CAŁOŚĆ</h2><Paragraphs texts={copy.countertop} /></div><Photo src={detail} alt="Połączenie naturalnego kamienia z matowym frontem" className="countertop-photo" /></div></div></section>

      <section className="section paper" id="architekci"><div className="container"><Label number="08">WSPÓŁPRACA Z ARCHITEKTAMI</Label><div className="image-text reversed"><div><h2>DOBRY PROJEKT<br />POTRZEBUJE DOBREGO<br />WYKONAWCY</h2><Paragraphs texts={copy.architects} /><a className="text-link" href="#kontakt">KONTAKT<ArrowUpRight size={18} /></a></div><Photo src={plans} alt="Rysunki architektoniczne i próbki materiałów podczas współpracy projektowej" /></div></div></section>

      <section className="section ink" id="proces"><div className="container"><Label number="09">PROCES</Label><h2>OD POMYSŁU<br />DO GOTOWEGO WNĘTRZA</h2><ol className="process-timeline">{copy.process.map(([title, text], i) => <li key={title} className="process-step"><Odometer className="process-watermark" value={`0${i + 1}`} /><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>

      <section className="section paper" id="realizacje"><div className="container"><Label number="10">REALIZACJE</Label><div className="section-heading"><h2>PRZESTRZENIE,<br />KTÓRE NABRAŁY FORMY</h2><Paragraphs texts={copy.portfolio} /></div><ul className="portfolio-grid">{categories.slice(0, 4).map((c, i) => <li key={c}><button type="button" className="portfolio-tile" onClick={() => { setCategory(i); setGalleryOpen(true); }} aria-label={`Powiększ zdjęcie: ${c}`}><img src={galleryImages[i]} alt={c} loading="lazy" width={1536} height={1024} /><span className="portfolio-caption"><strong>{c}</strong><span>{copy.portfolio[1]}</span></span></button></li>)}</ul></div></section>

      <footer className="contact-footer" id="kontakt"><div className="container"><div className="footer-top"><h2>KONTAKT</h2><a href="#top" aria-label="Wróć na początek strony"><ArrowUpRight size={40} /></a></div><ContactForm /></div>
        <ContactMap />
        <ContactAddress />
        <SiteFooterSignature />
      </footer>
      <HardwareDialog brand={hardwareBrand} onOpenChange={open => { if (!open) setHardwareBrand(null); }} />
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}><DialogContent className="portfolio-dialog"><DialogTitle>{categories[category]}</DialogTitle><Photo src={galleryImages[category] ?? interior} alt={categories[category] ?? 'Realizacje'} /><div className="dialog-navigation"><Button variant="ghost" size="icon" aria-label="Poprzednie zdjęcie" onClick={() => setCategory((category + 3) % 4)}><ArrowLeft /></Button><span>0{category + 1} / 04</span><Button variant="ghost" size="icon" aria-label="Następne zdjęcie" onClick={() => setCategory((category + 1) % 4)}><ArrowRight /></Button></div></DialogContent></Dialog>
    </main>
  );
}
