import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContactMap } from '@/components/contact-map';
import { companyDetails, studioAddress } from '@/lib/contact-content';

describe('Contact location', () => {
  it('preserves the supplied address and company registration details', () => {
    expect(studioAddress).toBe('ul. Adama Branickiego 11/197D, 02-972 Warszawa, Polska');
    expect(companyDetails.name).toBe('NEO FORM SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ');
    expect(companyDetails.nip).toBe('9512645064');
  });

  it('embeds a plain responsive iframe with no API key or extra parameters', () => {
    render(<ContactMap />);
    const iframe = screen.getByTitle(`NEO FORM — ${studioAddress} — Google Maps`);
    const url = new URL(iframe.getAttribute('src') ?? '');
    expect(url.origin).toBe('https://www.google.com');
    expect(url.pathname).toBe('/maps');
    expect(url.searchParams.get('q')).toBe(studioAddress);
    expect(url.searchParams.get('output')).toBe('embed');
    expect(url.searchParams.has('key')).toBe(false);
    expect(url.searchParams.has('channel')).toBe(false);
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '400');
    expect(iframe).toHaveAttribute('referrerpolicy', 'no-referrer');
  });
});
