export const neoLab = {
  title: 'WIEDZA, KTÓRA POWSTAJE W PRAKTYCE',
  slogan: 'LEARN TEST CREATE',
  contactLabel: 'ZAPYTAJ O WYDARZENIE',
  description: 'Program wydarzenia: organizacja przestrzeni w meblach kuchennych oraz prezentacja nowej odsłony marki NEO FORM.',
  videoLabel: 'WIDEO / NEO LAB',
  invitationLabel: 'ZAPROSZENIE',
  programLabel: 'PROGRAM / NEO LAB × PEKA',
  photosLabel: 'GALERIE SZKOLEŃ',
  galleryTitle: 'Название обучения',
  galleryDate: 'Дата обучения',
};

export const neoLabCategories = [
  {
    id: 'peka',
    tag: 'NEO LAB / PEKA',
    title: 'ZAPROSZENIA I PROGRAMY WYDARZEŃ',
    description: 'Zapowiedzi wydarzeń, programy spotkań i zaproszenia.',
    invitation: 'Zapraszamy na spotkanie NEO LAB × PEKA. Jeden dzień, jedna kuchnia i dziesięć modułów, w których sprawdzamy organizację przestrzeni w praktyce.',
    program: true,
  },
  {
    id: 'architecture',
    tag: 'NEO LAB / ARCHITECTURE',
    title: 'SPOTKANIA DLA ARCHITEKTÓW',
    description: 'Szkolenia, spotkania i wymiana doświadczeń dla architektów.',
    invitation: 'Zapraszamy architektów i projektantów wnętrz na spotkanie NEO LAB / ARCHITECTURE — studia przypadków, detale i wymiana doświadczeń przy jednym stole.',
    program: false,
  },
  {
    id: 'materials',
    tag: 'NEO LAB / MATERIAŁY',
    title: 'PRZEGLĄDY I PRÓBKI',
    description: 'Trendy, pomysły i przeglądy materiałów z targów.',
    invitation: 'Zapraszamy na przegląd materiałów NEO LAB / MATERIAŁY — próbki, wykończenia i rozwiązania przywiezione z targów i bieżących realizacji.',
    program: false,
  },
];

export const pekaSchedule = [
  { time: '13:45', module: 'OPENING', description: 'Prezentacja nowej odsłony marki NEO FORM.' },
  { time: '14:00', module: 'MAPA KUCHNI', description: 'Jak kuchnia stała się osią życia domowego.' },
  { time: '14:20', module: 'PEKA MASTERCLASS', description: 'Okucia i systemy, które realnie zmieniają sposób użytkowania kuchni.' },
  { time: '14:55', module: 'CASE STUDY: KUCHNIA W CENTRUM', description: 'Projekt kuchni jako centrum domu: założenia, decyzje, efekt końcowy.' },
  { time: '15:20', module: 'DRAWER LAB', description: 'Praktyczny warsztat organizacji przestrzeni w szufladach.' },
  { time: '15:40', module: 'PROBLEM LAB', description: 'Trzy trudne układki kuchenne i trzy sposoby ich rozwiązania.' },
  { time: '16:00', module: 'WORKSHOP: JAK ORGANIZOWAĆ PRZESTRZEŃ W KUCHNI', description: 'Praca z materiałem NEO FORM i rozwiązaniami PEKA.' },
  { time: '16:30', module: 'NEO STANDARD', description: 'Prezentacja nowej linii wzorniczej NEO FORM.' },
  { time: '16:40', module: 'REVEAL', description: 'Oficjalna odsłona nowej identyfikacji wizualnej NEO FORM.' },
  { time: '16:50', module: 'Q&A / NETWORKING', description: 'Rozmowy o kuchni, marce i detalach.' },
];
