import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { neoLab, neoLabEducation, neoLabEvents, neoLabArchive, pekaSchedule } from '@/lib/neo-lab-content';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { contactInstagram } from '@/lib/contact-content';
import { NeoLabArchiveDialog } from '@/components/neo-lab-archive-dialog';
import { NeoLabVideo } from '@/components/neo-lab-video';
import materials from '@/assets/neo-materials.jpg';
import detail from '@/assets/neo-detail.jpg';
import peka from '@/assets/hardware-peka-1.jpg';
import blumLogo from '@/assets/neo-partner-blum.svg.asset.json';
import viefeLogo from '@/assets/neo-partner-viefe.svg.asset.json';
import pekaLogo from '@/assets/neo-partner-peka.svg.asset.json';
import fenixLogo from '@/assets/neo-partner-fenix.svg.asset.json';
import hafeleLogo from '@/assets/neo-partner-hafele.png.asset.json';

const partners = [
  { name: 'Blum', image: blumLogo.url, url: 'https://www.blum.com/pl/pl/' },
  { name: 'Häfele', image: hafeleLogo.url, url: 'https://www.hafele.pl/' },
  { name: 'Viefe', image: viefeLogo.url, url: 'https://www.viefe.com/' },
  { name: 'PEKA', image: pekaLogo.url, url: 'https://www.peka.pl/' },
  { name: 'ARPA', image: null, url: 'https://www.arpaindustriale.com/' },
  { name: 'FENIX', image: fenixLogo.url, url: 'https://www.fenixforinteriors.com/' },
];
const images = [peka, materials, detail];

export function NeoLab() {
  const [archiveIndex, setArchiveIndex] = useState<number | null>(null);
  const [registration, setRegistration] = useState('');
  const returnFocus = useRef<HTMLElement | null>(null);
  const archive = archiveIndex === null ? undefined : neoLabArchive[archiveIndex];
  const register = (event: string) => {
    setRegistration(`Chcę zapisać się na wydarzenie NEO LAB — ${event}.`);
    window.open(contactInstagram.url, '_blank', 'noopener,noreferrer');
  };
  return (
    <section className="neo-lab" id="neo-lab" aria-labelledby="neo-lab-title">
      <div className="lab-hero">
        <NeoLabVideo />
        <div className="container lab-introduction">
          <h3 className="lab-eyebrow">NEO LAB</h3>
          <h2 id="neo-lab-title">{neoLab.title}</h2>
        </div>
      </div>
      <div className="lab-statement">
        <div className="container lab-statement-grid">
          <p className="lab-main-copy">{neoLab.description}</p>
          <p className="lab-manifesto">{neoLab.slogan}</p>
        </div>
      </div>

      <div className="container lab-partners">
        <p>{neoLab.partnerIntro}</p>
        <div className="lab-partner-grid">{partners.map(partner => <Button asChild variant="ghost" className="lab-partner" key={partner.name}>
          <a href={partner.url} target="_blank" rel="noopener noreferrer" aria-label={partner.name}>
            {partner.image ? <img className={partner.name === 'Blum' ? 'lab-logo-blum' : partner.name === 'Häfele' ? 'lab-logo-hafele' : undefined} src={partner.image} alt={partner.name} width={160} height={64} loading="lazy" /> : <span className="lab-partner-wordmark">{partner.name}</span>}
          </a></Button>)}</div>
      </div>
      <div className="container lab-education"><Accordion type="multiple" className="lab-education-accordion">
        {neoLabEducation.map(item => <AccordionItem key={item.id} value={item.id} className="lab-education-item">
          <AccordionTrigger className="lab-education-trigger">{item.title}</AccordionTrigger>
          <AccordionContent className="lab-education-content"><p>{item.text}</p></AccordionContent>
        </AccordionItem>)}
      </Accordion></div>
      <div className="container lab-upcoming">
        <h3 className="lab-section-title">{neoLab.upcomingLabel}</h3>
        <div className="lab-event-grid">{neoLabEvents.map((event, index) => <article className="lab-event-card" key={event}>
          <img src={images[index]} alt={`${event} — zdjęcie poglądowe`} loading="lazy" width={1024} height={768} />
          <div className="lab-event-copy"><h3>{event}</h3><Button variant="outline" className="lab-register" onClick={() => register(event)}>{neoLab.registrationLabel}<ArrowUpRight aria-hidden="true" /></Button></div>
          {index === 0 && <details className="lab-event-program"><summary>{neoLab.programLabel}</summary><ol className="neo-lab-schedule">{pekaSchedule.map(entry => <li key={entry.time}><time dateTime={entry.time}>{entry.time}</time><div><strong>{entry.module}</strong><p>{entry.description}</p></div></li>)}</ol></details>}
        </article>)}</div>
        {registration && <div className="lab-registration-handoff"><p role="status">{contactInstagram.fallback}</p><textarea aria-label={contactInstagram.preparedLabel} readOnly value={registration} onFocus={event => event.currentTarget.select()} /><Button variant="outline" className="lab-register" onClick={() => window.open(contactInstagram.url, '_blank', 'noopener,noreferrer')}>Instagram<ArrowUpRight aria-hidden="true" /></Button></div>}
      </div>
      <div className="container lab-archive">
        <h3 className="lab-section-title">{neoLab.archiveLabel}</h3><p className="lab-archive-intro">{neoLab.archiveIntro}</p>
        <div className="lab-archive-grid">{neoLabArchive.map((item, index) => <Button variant="ghost" className="lab-archive-card" key={item.title} onClick={event => { returnFocus.current = event.currentTarget; setArchiveIndex(index); }} aria-haspopup="dialog">
          <img src={images[(index + 1) % images.length]} alt="" width={1024} height={768} loading="lazy" />
          <span className="lab-archive-caption"><strong>{item.title}</strong><span><time dateTime={item.dateTime}>{item.date}</time><ArrowUpRight aria-hidden="true" /></span></span>
        </Button>)}</div>
      </div>
      {archive && <NeoLabArchiveDialog title={archive.title} photoOffset={archiveIndex ?? 0} returnFocus={returnFocus.current} onClose={() => setArchiveIndex(null)} />}
    </section>
  );
}
