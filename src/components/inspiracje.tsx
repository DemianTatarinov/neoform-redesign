import { EditorialSectionTitle } from '@/components/editorial-section';
import { inspiracje, inspiracjePosts } from '@/lib/inspiracje-content';
import { Link } from '@tanstack/react-router';
import { primaryBrandCtaArrowClassName, primaryBrandCtaMinimalClassName } from '@/lib/primary-brand-cta';
import { CONTACT_HASH } from '@/lib/scroll-to-section';

export function Inspiracje() {
  return (
    <section
      className="section credo relative scroll-mt-32 border-t border-neutral-200/80 !pb-8 sm:!pb-10 lg:!py-24 lg:!pb-20"
      id="inspiracje"
      aria-labelledby="inspiracje-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="section-label">
          <span className="section-label-title">{inspiracje.label}</span>
        </div>
        <div className="credo-intro max-w-2xl text-left lg:max-w-none lg:w-full">
          <div className="min-w-0 text-left">
            <EditorialSectionTitle
              titleId="inspiracje-title"
              titleClassName="editorial-section-title text-left font-[family-name:var(--font-editorial)] text-[22px] font-normal uppercase leading-[1.2] tracking-tight text-[#121315] sm:text-[25px] md:text-[26px] lg:w-full lg:max-w-none lg:text-balance lg:leading-[1.12]"
            >
              {inspiracje.heading[0]}
              <br className="lg:hidden" />
              {inspiracje.heading[1]}
            </EditorialSectionTitle>
          </div>
          <p
            className="m-0 text-left font-[family-name:var(--font-editorial)] text-[15px] leading-[1.55] text-black sm:text-[16px] md:text-[17px] lg:w-full lg:max-w-4xl lg:text-[19px] lg:leading-[1.65] lg:text-pretty lg:text-neutral-900 lg:antialiased xl:max-w-5xl"
          >
            {inspiracje.lead}
          </p>
        </div>
        <div className="mt-[var(--layout-gap)] grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:w-full lg:max-w-6xl lg:items-stretch lg:gap-6 xl:max-w-7xl">
          {inspiracjePosts.map(post => (
            <article
              className="group flex cursor-pointer flex-col gap-2 rounded-sm border border-neutral-200/80 bg-white p-3.5 shadow-sm transition-all hover:border-[color:var(--brand)] sm:p-4 lg:h-full lg:justify-between lg:ring-1 lg:ring-neutral-200/80 lg:transition-[border-color,box-shadow] lg:duration-300 lg:hover:ring-[color:var(--brand)]/35"
              key={post.title}
            >
              <div className="flex flex-col gap-2">
                <span
                  className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand)] sm:text-xs"
                >
                  {post.tag}
                </span>
                <h3
                  className="m-0 font-[family-name:var(--font-editorial)] text-[17px] font-normal uppercase leading-[1.3] text-[#121315] transition-colors group-hover:text-[color:var(--brand)] sm:text-[19px] md:text-[20px]"
                >
                  {post.title}
                </h3>
                <p
                  className="m-0 line-clamp-3 font-[family-name:var(--font-editorial)] text-[15px] leading-[1.55] text-black sm:text-[16px] md:text-[17px] lg:text-[19px] lg:leading-[1.65] lg:text-neutral-700"
                >
                  {post.excerpt}
                </p>
              </div>
              <span
                className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 transition-colors group-hover:text-[#121315] sm:text-xs lg:text-neutral-500 lg:transition-colors lg:duration-300 lg:group-hover:text-neutral-800"
              >
                {inspiracje.readMoreLabel}
              </span>
            </article>
          ))}
        </div>
        <div className="mt-8 flex w-full justify-start">
          <Link
            to="/"
            hash={CONTACT_HASH}
            preload="intent"
            className={primaryBrandCtaMinimalClassName}
          >
            {inspiracje.contactLabel}<span className={primaryBrandCtaArrowClassName} aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
