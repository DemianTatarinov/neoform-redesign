import { EditorialSectionTitle } from '@/components/editorial-section';
import { ArrowUpRight } from 'lucide-react';
import { inspiracje, inspiracjePosts } from '@/lib/inspiracje-content';
import { Link } from '@tanstack/react-router';
import { CONTACT_HASH } from '@/lib/scroll-to-section';

export function Inspiracje() {
  return (
    <section
      className="section credo relative scroll-mt-32 border-t border-neutral-200/80"
      id="inspiracje"
      aria-labelledby="inspiracje-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="section-label">
          <span className="section-label-title">{inspiracje.label}</span>
          <span className="section-number">03 / 03</span>
        </div>
        <div className="credo-intro max-w-2xl text-left">
          <div className="min-w-0 text-left">
            <EditorialSectionTitle titleId="inspiracje-title">
              {inspiracje.heading[0]}
              <br />
              {inspiracje.heading[1]}
            </EditorialSectionTitle>
          </div>
          <p
            className="m-0 text-left font-[family-name:var(--font-editorial)] text-[19px] leading-[1.6] text-neutral-700"
          >
            {inspiracje.lead}
          </p>
        </div>
        <div className="mt-[var(--layout-gap)] grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {inspiracjePosts.map(post => (
            <article
              className="group flex cursor-pointer flex-col justify-between rounded-sm border border-neutral-200/80 bg-white p-6 shadow-sm transition-all hover:border-[color:var(--brand)] sm:p-7"
              key={post.title}
            >
              <div>
                <span
                  className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]"
                >
                  {post.tag}
                </span>
                <h3
                  className="mb-2 font-[family-name:var(--font-editorial)] text-xl font-normal uppercase text-[#121315] transition-colors group-hover:text-[color:var(--brand)]"
                >
                  {post.title}
                </h3>
                <p
                  className="mb-4 line-clamp-3 font-[family-name:var(--font-editorial)] text-[16px] leading-[1.5] text-neutral-600"
                >
                  {post.excerpt}
                </p>
              </div>
              <span
                className="font-mono text-xs uppercase tracking-wider text-neutral-400 transition-colors group-hover:text-[#121315]"
              >
                {inspiracje.readMoreLabel}
              </span>
            </article>
          ))}
        </div>
        <Link
          to="/"
          hash={CONTACT_HASH}
          preload="intent"
          className="mx-auto mt-10 flex w-fit items-center gap-2.5 rounded-[4px] border border-[color:var(--brand)] px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-[color:var(--brand)] transition-all duration-300 hover:bg-[color:var(--brand)] hover:text-black active:scale-[0.98]"
        >
          {inspiracje.contactLabel}
          <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  );
}
