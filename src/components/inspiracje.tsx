import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { inspiracje, inspiracjePosts } from '@/lib/inspiracje-content';
import { Link } from '@tanstack/react-router';

export function Inspiracje() {
  return (
    <section className="section paper inspiracje" id="inspiracje" aria-labelledby="inspiracje-title">
      <div className="container">
        <div className="section-label"><span>{inspiracje.label}</span><span className="section-number">02 / 02</span></div>
        <div className="section-heading">
          <h2 id="inspiracje-title">{inspiracje.heading[0]}<br />{inspiracje.heading[1]}</h2>
          <p className="lead">{inspiracje.lead}</p>
        </div>
        <div className="inspiracje-grid">
          {inspiracjePosts.map(post => (
            <article className="inspiracje-card" key={post.title}>
              <img className="inspiracje-photo" src={post.image} alt="" loading="lazy" />
              <div className="inspiracje-copy">
                <span className="inspiracje-tag">{post.tag}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="inspiracje-date">{inspiracje.dateLabel}</span>
              </div>
            </article>
          ))}
        </div>
        <Button asChild variant="outline" className="inspiracje-contact"><Link to="/" hash="kontakt">{inspiracje.contactLabel}<ArrowUpRight aria-hidden="true" /></Link></Button>
      </div>
    </section>
  );
}
