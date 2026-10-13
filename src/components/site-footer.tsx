import { SiteFooterSignature } from '@/components/site-footer-signature';

/** Global site footer — same markup and styles on every route */
export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="NEO FORM">
      <SiteFooterSignature />
    </footer>
  );
}
