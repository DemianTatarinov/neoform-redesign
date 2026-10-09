export const companyDetails = {
  name: 'NEO FORM SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
  street: 'ul. Adama Branickiego 11/197D',
  locality: '02-972 Warszawa',
  nip: '9512645064',
};

export const studioAddress = `${companyDetails.street}, ${companyDetails.locality}, Polska`;
export const studioMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress)}`;

// Test values — replace with the real ones before launch.
export const contactActions = {
  email: 'kontakt@neoform.pl',
  phone: '+48500000000',
  phoneDisplay: '+48 500 000 000',
  whatsapp: '48500000000',
};

export const contactInstagram = {
  url: 'https://www.instagram.com/neoform.meble?srtk=NXB3OTFpOWlmbWh2',
  handle: '@neoform.meble',
  title: 'POROZMAWIAJMY O TWOIM WNĘTRZU',
  intro: 'Twój pomysł to początek nowej formy.',
  nameLabel: 'Imię',
  messageLabel: 'Wiadomość',
  submitLabel: 'ZAMÓW PROJEKT',
  note: 'Wiadomość skopiujesz i wyślesz w rozmowie na Instagramie.',
  copied: 'Tekst skopiowany. Wklej go w rozmowie na Instagramie i wyślij.',
  fallback: 'Skopiuj poniższy tekst i wyślij go w rozmowie na Instagramie.',
  preparedLabel: 'Tekst do skopiowania',
};