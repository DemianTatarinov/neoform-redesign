import { createFileRoute } from '@tanstack/react-router';
import { NeoLabExperience } from '@/components/neo-lab-experience';
import { SiteFooterSignature } from '@/components/site-footer-signature';

export const Route = createFileRoute('/neo-lab')({
  head: () => ({ meta: [
    { title: 'NEO LAB — Wiedza, która powstaje w praktyce | NEO FORM' },
    { name: 'description', content: 'NEO LAB: wydarzenia, programy spotkań i inspiracje dla architektów. LEARN TEST CREATE' },
    { property: 'og:title', content: 'NEO LAB — Wiedza, która powstaje w praktyce' },
    { property: 'og:description', content: 'Wydarzenia NEO LAB / PEKA, ARCHITECTURE i MATERIAŁY oraz inspiracje ze świata projektowania.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: NeoLabPage,
});

function NeoLabPage() {
   return <><NeoLabExperience /><SiteFooterSignature /></>;
}