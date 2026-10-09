import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactInstagram } from '@/lib/contact-content';
import { QuickActions } from '@/components/quick-actions';

export function ContactForm() {
  const [prepared, setPrepared] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle');

  function openInstagram(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !message) return;
    const text = `${name}\n\n${message}`;
    setPrepared(text);
    setCopyState('manual');
    // Open synchronously with the user's click; never put form data in a URL.
    window.open(contactInstagram.url, '_blank', 'noopener,noreferrer');
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(text).then(
        () => setCopyState('copied'),
        () => setCopyState('manual'),
      );
    }
  }

  return (
    <div className="contact-layout">
      <div className="contact-intro">
        <h3>{contactInstagram.title}</h3>
        <p>{contactInstagram.intro}</p>
        <QuickActions />
      </div>
      <form className="contact-form" onSubmit={openInstagram}>
        <div className="contact-field">
          <label htmlFor="contact-name">{contactInstagram.nameLabel}</label>
          <Input id="contact-name" name="name" autoComplete="given-name" required maxLength={100} pattern=".*\S.*" className="contact-input" />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-message">{contactInstagram.messageLabel}</label>
          <Textarea id="contact-message" name="message" required minLength={2} maxLength={3000} rows={4} className="contact-input contact-message" />
        </div>
        <div className="contact-actions">
          <p className="contact-note">{contactInstagram.note}</p>
          <Button type="submit" className="contact-submit">{contactInstagram.submitLabel}<ArrowUpRight size={18} aria-hidden="true" /></Button>
        </div>
        <p className="contact-status" role="status" aria-live="polite">{copyState === 'copied' ? contactInstagram.copied : copyState === 'manual' ? contactInstagram.fallback : ''}</p>
        {copyState === 'manual' && <div className="contact-field"><label htmlFor="contact-prepared">{contactInstagram.preparedLabel}</label><Textarea id="contact-prepared" readOnly value={prepared} className="contact-input contact-message" onFocus={event => event.currentTarget.select()} /></div>}
      </form>
    </div>
  );
}