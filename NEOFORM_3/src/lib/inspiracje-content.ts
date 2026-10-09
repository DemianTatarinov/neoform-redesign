import detail from '@/assets/neo-detail.jpg';
import interior from '@/assets/neo-interior.jpg';
import materials from '@/assets/neo-materials.jpg';
import plans from '@/assets/neo-plans.jpg';
import team from '@/assets/neo-team.asset.json';
import labPoster from '@/assets/neo-lab-poster.jpg.asset.json';

export const inspiracje = {
  label: 'INSPIRACJE',
  heading: ['IDEA, TREND', 'I MATERIAŁ'],
  lead: 'Krótkie formy: pomysły, obserwacje z targów i przeglądy materiałów, które wracają do naszych realizacji.',
  contactLabel: 'ZAPYTAJ O INSPIRACJE',
  dateLabel: 'Data publikacji',
};

export const inspiracjePosts = [
  {
    tag: 'TRENDY',
    title: 'KUCHNIA BEZ UCHWYTÓW',
    excerpt: 'Trzy sposoby otwierania, które wyglądają jak jedna spokojna płaszczyzna.',
    image: detail,
  },
  {
    tag: 'MATERIAŁY',
    title: 'FORNIR, KTÓRY LUBI DOTYK',
    excerpt: 'Dlaczego naturalny fornir starzeje się piękniej niż równy lakier.',
    image: materials,
  },
  {
    tag: 'WYSTAWY',
    title: 'PIĘĆ ROZWIĄZAŃ Z TARGÓW',
    excerpt: 'Co naprawdę warto przywieźć z wystawy do własnej kuchni.',
    image: interior,
  },
  {
    tag: 'IDEE',
    title: 'ŚWIATŁO JAKO DETAL',
    excerpt: 'Jak światło zmienia proporcje szafki i rytm całego wnętrza.',
    image: plans,
  },
  {
    tag: 'MATERIAŁY',
    title: 'SPIEK W PRAKTYCE',
    excerpt: 'Blat, który znosi wszystko i nadal wygląda spokojnie.',
    image: labPoster.url,
  },
  {
    tag: 'WYSTAWY',
    title: 'PRÓBKI NA WARSZTACIE',
    excerpt: 'Jak układamy próbki, żeby decyzja zapadła w jeden wieczór.',
    image: team.url,
  },
];
