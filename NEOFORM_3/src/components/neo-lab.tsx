import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { neoLab, neoLabCategories, pekaSchedule } from '@/lib/neo-lab-content';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { NeoLabVideo } from '@/components/neo-lab-video';

export function NeoLab() {
  return (
    <section className="neo-lab" id="neo-lab" aria-labelledby="neo-lab-title">
      <div className="neo-lab-hero">
        <NeoLabVideo />
        <div className="container neo-lab-hero-copy">
        <div className="section-label"><span>NEO LAB</span><span className="section-number">01 / 02</span></div>
        <div className="section-heading neo-lab-heading">
          <h1 id="neo-lab-title">{neoLab.title}</h1>
          <p className="neo-lab-slogan">{neoLab.slogan}</p>
          <div className="neo-lab-intro-copy"><p className="lead">{neoLab.description}</p>
            <Button asChild variant="outline" className="neo-lab-contact"><Link to="/" hash="kontakt">{neoLab.contactLabel}<ArrowUpRight aria-hidden="true" /></Link></Button>
          </div>
        </div>
        </div>
      </div>
      <div className="container neo-lab-events">
        <Accordion type="multiple" className="neo-lab-accordion">
          {neoLabCategories.map(category => (
            <AccordionItem key={category.id} value={category.id} className="neo-lab-item">
              <AccordionTrigger className="neo-lab-trigger"><span className="neo-lab-card-copy"><span className="neo-lab-card-tag">{category.tag}</span><span className="neo-lab-card-title">{category.title}</span><span className="neo-lab-card-description">{category.description}</span></span></AccordionTrigger>
              <AccordionContent className="neo-lab-panel">
                <h3 className="neo-lab-panel-label">{neoLab.invitationLabel}</h3>
                <p className="neo-lab-invitation">{category.invitation}</p>
                {category.program && <>
                  <h3 className="neo-lab-panel-label">{neoLab.programLabel}</h3>
                  <ol className="neo-lab-schedule" aria-label="Program NEO LAB × PEKA">
                    {pekaSchedule.map(entry => (
                      <li key={entry.time}>
                        <time dateTime={entry.time}>{entry.time}</time>
                        <div><strong>{entry.module}</strong><p>{entry.description}</p></div>
                      </li>
                    ))}
                  </ol></>}
                <h3 className="neo-lab-panel-label">{neoLab.photosLabel}</h3>
                <div className="neo-lab-galleries">
                  {Array.from({ length: 4 }, (_, galleryIndex) => (
                    <figure className="neo-lab-gallery" key={galleryIndex}>
                      <div className="neo-lab-photo-placeholder" aria-hidden="true" />
                      <figcaption lang="ru"><strong>{neoLab.galleryTitle}</strong><span>{neoLab.galleryDate}</span></figcaption>
                    </figure>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
