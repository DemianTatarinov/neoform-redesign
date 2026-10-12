import type { ReactNode } from 'react';

/** Etalonowy blok akapitu (19px / 1.6, anty-ściskanie, bez kropek w treści — copy w neo-content). */
const editorialBodyCopyBaseClassName =
  'paragraphs editorial-copy editorial-body-copy flex flex-col space-y-5 [&>p+p]:mt-5 text-left font-[family-name:var(--font-editorial)] text-[19px] leading-[1.6]';

export const editorialBodyCopyClassName = `${editorialBodyCopyBaseClassName} text-neutral-700`;

export const editorialBodyCopyDarkClassName =
  `${editorialBodyCopyBaseClassName} text-neutral-300 [&_p]:text-neutral-300`;

export const editorialH2LightClassName =
  'editorial-section-title text-left font-[family-name:var(--font-editorial)] text-[#121315] font-normal leading-[1.15] uppercase';

export const editorialH2DarkClassName =
  'text-left font-[family-name:var(--font-editorial)] text-white font-normal leading-[1.15] uppercase';

export const copyAfterTitleClassName = 'mt-6 sm:mt-8';

export function EditorialSectionTitle({
  children,
  titleId,
  titleClassName = editorialH2LightClassName,
}: {
  children: ReactNode;
  titleId?: string;
  titleClassName?: string;
}) {
  return (
    <div className="section-heading-title">
      <h2 id={titleId} className={titleClassName}>{children}</h2>
      <span className="accent-line" aria-hidden="true" />
    </div>
  );
}

export function EditorialBodyCopy({
  children,
  className = '',
  variant = 'light',
}: {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}) {
  const base = variant === 'dark' ? editorialBodyCopyDarkClassName : editorialBodyCopyClassName;
  return <div className={`${base} ${className}`.trim()}>{children}</div>;
}
