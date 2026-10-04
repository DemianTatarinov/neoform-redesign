/** Lightweight Unsplash stand-ins — interiors, kitchens, wood, architecture. */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  logo: "/logo/logo.png",
  logoOnDark: "/logo/logo-light.svg",
  heroSlide1: u("photo-1600585154340-be6161a56a0c", 1200),
  heroSlide2: u("photo-1600607687939-ce8a6b25145e", 1200),
  heroPoster: u("photo-1600585154340-be6161a56a0c", 1200),
  bespokeVeneer: u("photo-1546484396-fb3fc6f95f98"),
  bespokeMonolith: u("photo-1600585152220-90363fe7e115"),
  bespokeHiddenDoor: u("photo-1616486338812-3dadae4b3f4a"),
  bespokeMaterials: u("photo-1600607687939-ce8a6b25145e"),
  anatomyMaterial: u("photo-1546484396-fb3fc6f95f98"),
  projectPenthouse: u("photo-1600585154340-be6161a56a0c"),
  projectWilanow: u("photo-1600566753086-00f18fb6b3ea"),
  projectKonstancin: u("photo-1600585154526-990dced4db0d"),
  projectLoft: u("photo-1600607687920-4e2a09cf159d"),
  architectCollaboration: u("photo-1497366216548-37526070297c"),
  testimonialAnna: u("photo-1573496359142-b8d87734a435", 400),
  testimonialMarek: u("photo-1472099645785-5658abf4ff4e", 400),
  testimonialOlga: u("photo-1580489944761-15a19d654956", 400),
  credo: {
    project: u("photo-1503387762-592deb58ef4e", 900),
    material: u("photo-1546484396-fb3fc6f95f98", 900),
    technology: u("photo-1556911220-bff31c812dba", 900),
    countertop: u("photo-1600585154340-be6161a56a0c", 900),
  },
  materials: {
    fornir: u("photo-1546484396-fb3fc6f95f98", 900),
    blat: u("photo-1600585154340-be6161a56a0c", 900),
    hardware: u("photo-1556911220-bff31c812dba", 900),
    blum: u("photo-1556909114-f6e7ad7d3136", 900),
    fenix: u("photo-1600585152220-90363fe7e115", 900),
    viefe: u("photo-1616486338812-3dadae4b3f4a", 900),
  },
  pages: {
    bespoke: [
      u("photo-1546484396-fb3fc6f95f98"),
      u("photo-1556911220-bff31c812dba"),
      u("photo-1600585152220-90363fe7e115"),
      u("photo-1616486338812-3dadae4b3f4a"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1600607687644-c7171b42498f"),
    ],
    portfolio: [
      u("photo-1600210492486-724fe641c677"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1600607687920-4e2a09cf159d"),
      u("photo-1600607687939-ce8a6b25145e"),
      u("photo-1631679706909-1844bbd07221"),
    ],
    credo: [
      u("photo-1503387762-592deb58ef4e"),
      u("photo-1546484396-fb3fc6f95f98"),
      u("photo-1556911220-bff31c812dba"),
      u("photo-1600585154340-be6161a56a0c"),
    ],
    architects: [
      u("photo-1503387762-592deb58ef4e"),
      u("photo-1454165804606-c3d57bc86b40"),
      u("photo-1497366811353-6870744d04b2"),
      u("photo-1497366216548-37526070297c"),
      u("photo-1487958449943-2429e8be8625"),
      u("photo-1570129477492-45c003edd2be"),
    ],
    process: [
      u("photo-1503387762-592deb58ef4e"),
      u("photo-1556911220-bff31c812dba"),
      u("photo-1581092160607-ee22621dd758", 800),
      u("photo-1581091226825-a6a2a5aee158"),
    ],
    neoLab: [
      u("photo-1556911220-bff31c812dba"),
      u("photo-1546484396-fb3fc6f95f98"),
      u("photo-1487958449943-2429e8be8625"),
      u("photo-1600585154340-be6161a56a0c"),
    ],
    contact: [
      u("photo-1497366216548-37526070297c"),
      u("photo-1600210492486-724fe641c677"),
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600880292203-757bb62b1b81"),
    ],
  },
  gallery: {
    penthouse: [
      u("photo-1600210492486-724fe641c677"),
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1556911220-bff31c812dba"),
      u("photo-1600607687939-ce8a6b25145e"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1600585152220-90363fe7e115"),
      u("photo-1546484396-fb3fc6f95f98"),
      u("photo-1616486338812-3dadae4b3f4a"),
    ],
    wilanow: [
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1556911220-bff31c812dba"),
      u("photo-1600607687939-ce8a6b25145e"),
      u("photo-1546484396-fb3fc6f95f98"),
      u("photo-1600489000022-c2086d1e70fd"),
      u("photo-1600210492486-724fe641c677"),
      u("photo-1600607687920-4e2a09cf159d"),
    ],
    konstancin: [
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600210492486-724fe641c677"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1616486338812-3dadae4b3f4a"),
      u("photo-1600607687920-4e2a09cf159d"),
      u("photo-1631679706909-1844bbd07221"),
      u("photo-1556911220-bff31c812dba"),
    ],
    loft: [
      u("photo-1600607687920-4e2a09cf159d"),
      u("photo-1600607687939-ce8a6b25145e"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1556911220-bff31c812dba"),
      u("photo-1546484396-fb3fc6f95f98"),
      u("photo-1616486338812-3dadae4b3f4a"),
      u("photo-1600210492486-724fe641c677"),
    ],
  },
} as const;

export type MaterialCard = {
  number: string;
  title: string;
  caption: string;
  image: string;
};

export const credoCards: MaterialCard[] = [
  {
    number: "01",
    title: "PROJEKT",
    caption: "Koncepcja kuchni i zabudowy — detal, który decyduje o odbiorze po latach.",
    image: media.credo.project,
  },
  {
    number: "02",
    title: "MATERIAŁ",
    caption: "Naturalne drewno z zachowaniem ciągłości usłojenia.",
    image: media.credo.material,
  },
  {
    number: "03",
    title: "TECHNOLOGIA",
    caption: "Systemy szuflad, ukryte mechanizmy i precyzyjne styki.",
    image: media.credo.technology,
  },
  {
    number: "04",
    title: "BLAT",
    caption: "Monolit kamienia — kolor, grubość i struktura współgrają z meblem.",
    image: media.credo.countertop,
  },
];

export const materialCards: MaterialCard[] = [
  {
    number: "01",
    title: "FORNIR DĘBOWY",
    caption: "Naturalne drewno z zachowaniem ciągłości usłojenia.",
    image: media.materials.fornir,
  },
  {
    number: "02",
    title: "SPIEK KWARCOWY / BLAT",
    caption: "Duży format kamienia — kolor, grubość i struktura współgrają z meblem.",
    image: media.materials.blat,
  },
  {
    number: "03",
    title: "BLUM LEGRABOX",
    caption: "Systemy szuflad z cichym domykiem i dożywotnią gwarancją.",
    image: media.materials.blum,
  },
  {
    number: "04",
    title: "FENIX NTM",
    caption: "Głęboki mat, powłoka zapobiegająca odciskom palców.",
    image: media.materials.fenix,
  },
  {
    number: "05",
    title: "VIEFE",
    caption: "Detal uchwytu, który domyka linię zabudowy.",
    image: media.materials.viefe,
  },
  {
    number: "06",
    title: "HÄFELE",
    caption: "Technologia i precyzja w miejscu, którego później nie widać.",
    image: media.materials.hardware,
  },
  {
    number: "07",
    title: "PEKA",
    caption: "Organizacja wnętrza szaf — dostęp, który pracuje każdego dnia.",
    image: media.pages.bespoke[1],
  },
  {
    number: "08",
    title: "ARPA",
    caption: "HPL o spokojnej fakturze i wysokiej odporności na codzienne użytkowanie.",
    image: media.materials.fenix,
  },
];
