import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/section-label';
import { companyDetails, studioMapsUrl } from '@/lib/contact-content';

// The address block sits under the map: the address itself is the headline,
// the company registration details stay visible next to it.
export function ContactAddress() {
  return (
    <div className="contact-address">
      <div className="container contact-address-inner">
        <SectionLabel number="11">ADRES</SectionLabel>
        <div className="contact-address-main">
          <span className="accent-line" aria-hidden="true" />
          <p className="contact-address-street">{companyDetails.street}</p>
          <p className="contact-address-locality">{companyDetails.locality}</p>
          <a className="contact-address-link normal-case" href={studioMapsUrl} target="_blank" rel="noopener noreferrer">
            Jak dojechać<ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <address className="contact-address-legal">
          <strong>{companyDetails.name}</strong>
          <span>NIP: {companyDetails.nip}</span>
        </address>
      </div>
    </div>
  );
}
