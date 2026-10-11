import { footerSignature } from '@/lib/neo-lab-content';

const footerSlogan = `${footerSignature.lines.join(' / ')}.`;

export function SiteFooterSignature() {
  return (
    <div
      className="site-footer-signature text-neutral-900"
      style={{
        backgroundColor: 'oklch(0.9821 0 0)',
        paddingBlock: '24px max(24px, env(safe-area-inset-bottom))',
      }}
    >
      <div className="container flex flex-col items-center gap-4">
        <img
          src="/favicon_2.png"
          alt="NEO FORM"
          className="mx-auto h-24 w-auto object-contain sm:h-28"
          width={448}
          height={112}
          loading="lazy"
          decoding="async"
        />
        <p
          className="max-w-full whitespace-nowrap text-center font-[family-name:var(--font-editorial)] font-semibold uppercase tracking-tight text-[oklch(0.7_0_0)] sm:tracking-normal"
          style={{ fontSize: 'clamp(9px, 2.85vw, 16px)', lineHeight: 1.5 }}
        >
          {footerSlogan}
        </p>
      </div>
    </div>
  );
}
