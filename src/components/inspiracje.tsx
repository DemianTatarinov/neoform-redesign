import { ArrowUpRight } from 'lucide-react';
import { EditorialKicker } from '@/components/editorial-kicker';
import { inspiracje, inspiracjePosts } from '@/lib/inspiracje-content';
import { Link } from '@tanstack/react-router';
import { CONTACT_HASH } from '@/lib/scroll-to-section';

export function Inspiracje() {
  return (
    <section
      className="relative scroll-mt-32 bg-[color:var(--ink)] py-[var(--section-space)] text-[color:var(--on-ink)]"
      id="inspiracje"
      aria-labelledby="inspiracje-title"
    >
      <div className="container">
        <EditorialKicker className="mb-[var(--heading-space)]" aside="03 / 03">
          {inspiracje.label}
        </EditorialKicker>
        <div>
          <h2
            id="inspiracje-title"
            className="font-[family-name:var(--font-editorial)] text-[length:var(--type-display)] font-light uppercase leading-tight tracking-tight text-[color:var(--on-ink)]"
          >
            {inspiracje.heading[0]}
            <br />
            {inspiracje.heading[1]}
          </h2>
          <p className="mt-6 max-w-[var(--copy-width)] font-[family-name:var(--font-editorial)] text-[length:var(--type-lead)] font-light leading-relaxed text-[color:var(--subtle-ink)]">
            {inspiracje.lead}
          </p>
        </div>
        <div className="mt-[var(--heading-space)] grid grid-cols-1 gap-px border border-[color:var(--ink-border)] bg-[color:var(--ink-border)] sm:grid-cols-2 lg:grid-cols-3">
          {inspiracjePosts.map(post => (
            <article
              className="group relative flex cursor-pointer flex-col overflow-hidden bg-[color:var(--graphite)] transition-colors duration-300 hover:bg-[color:var(--steel)]"
              key={post.title}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-[700ms] ease-in-out group-hover:scale-105"
                  src={post.image}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-[var(--space-card)]">
                <span className="mb-3 font-mono text-[length:var(--type-small)] uppercase tracking-widest text-[color:var(--brand)]">
                  {post.tag}
                </span>
                <h3 className="font-[family-name:var(--font-editorial)] text-[length:var(--type-title)] font-light leading-snug text-[color:var(--on-ink)]">
                  {post.title}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-editorial)] text-[length:var(--type-small)] leading-relaxed text-[color:var(--subtle-ink)]">
                  {post.excerpt}
                </p>
                <span className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-widest text-[color:var(--subtle-ink)]">
                  {inspiracje.dateLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
        <Link
          to="/"
          hash={CONTACT_HASH}
          preload="intent"
          className="mx-auto mt-[var(--heading-space)] flex w-fit items-center gap-3 border border-[color:var(--brand)] px-8 py-4 font-mono text-[length:var(--type-small)] uppercase tracking-widest text-[color:var(--brand)] transition-colors hover:bg-[color:var(--brand-hover)] hover:text-[color:var(--ink)]"
        >
          {inspiracje.contactLabel}
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
