import { Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { contactActions, contactInstagram } from '@/lib/contact-content';

const actions = [
  {
    label: 'Email',
    href: `mailto:${contactActions.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: 'Zadzwoń',
    href: `tel:${contactActions.phone}`,
    icon: Phone,
    external: false,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/${contactActions.whatsapp}`,
    icon: MessageCircle,
    external: true,
  },
  {
    label: 'Instagram',
    href: contactInstagram.url,
    icon: Instagram,
    external: true,
  },
];

export function QuickActions() {
  return (
    <ul className="quick-actions" aria-label="Szybki kontakt">
      {actions.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            className="quick-action"
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
