import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContactAddress } from '@/components/contact-address';
import { companyDetails, studioMapsUrl } from '@/lib/contact-content';

describe('Contact address block', () => {
  it('shows the address as the main line with the company details alongside', () => {
    render(<ContactAddress />);
    expect(screen.getByText(companyDetails.street)).toBeInTheDocument();
    expect(screen.getByText(companyDetails.locality)).toBeInTheDocument();
    expect(screen.getByText(companyDetails.name)).toBeInTheDocument();
    expect(screen.getByText(`NIP: ${companyDetails.nip}`)).toBeInTheDocument();
  });

  it('links to the exact address in Google Maps', () => {
    render(<ContactAddress />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', studioMapsUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
