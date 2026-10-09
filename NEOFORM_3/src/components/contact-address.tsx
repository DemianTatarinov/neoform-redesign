import { ArrowUpRight } from 'lucide-react';
import { companyDetails, studioMapsUrl } from '@/lib/contact-content';

// The address block sits under the map: the address itself is the headline,
// the company registration details stay visible next to it.
export function ContactAddress() {
  return (
    <div className="contact-address">
      <div className="container contact-address-inner">
        <div className="contact-address-main">
          <span className="contact-address-label">ADRES</span>
          <span className="accent-line" aria-hidden="true" />
          <p className="contact-address-street">{companyDetails.street}</p>
          <p className="contact-address-locality">{companyDetails.locality}</p>
          <a className="contact-address-link" href={studioMapsUrl} target="_blank" rel="noopener noreferrer">
            JAK DOJEDZIĆ<ArrowUpRight size={18} aria-hidden="true" />
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
