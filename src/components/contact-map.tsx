import { studioAddress } from '@/lib/contact-content';

// Credential-free Google Maps embed: no API key, no dynamic loader, no extra
// query parameters. A plain iframe is the only thing that renders here.
const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(studioAddress)}&output=embed`;

export function ContactMap() {
  return (
    <div className="contact-map">
      <iframe
        title={`NEO FORM — ${studioAddress} — Google Maps`}
        src={embedUrl}
        width="100%"
        height="400"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
