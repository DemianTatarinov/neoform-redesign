import { footerSignature } from '@/lib/neo-lab-content';

const footerSlogan = footerSignature.lines.join(' / ');

export function SiteFooterSignature() {
  return (
    <div className="site-footer-signature text-neutral-900">
      <div className="container flex flex-col items-center gap-3 sm:gap-4">
        <img
          src="/favicon_2.png"
          alt="NEO FORM"
          className="mx-auto block h-12 w-auto object-contain sm:h-14"
          width={224}
          height={56}
          loading="lazy"
          decoding="async"
        />
        <p
          className="m-0 max-w-full whitespace-nowrap px-1 text-center font-[family-name:var(--font-editorial)] font-semibold uppercase tracking-tight text-[oklch(0.7_0_0)] sm:px-0 sm:tracking-normal"
          style={{ fontSize: 'clamp(9px, 2.85vw, 16px)', lineHeight: 1.5 }}
        >
          {footerSlogan}
        </p>
      </div>
    </div>
  );
}
