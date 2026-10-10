import { footerSignature } from '@/lib/neo-lab-content';

export function SiteFooterSignature() {
  return <div className="site-footer-signature"><div className="container">
    <p className="site-footer-brand">{footerSignature.brand}</p>
    <p className="site-footer-lines">{footerSignature.lines.map(line => <span key={line}>{line}</span>)}</p>
  </div></div>;
}