import { n as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-footer-signature-1SEgqnX3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var neo_materials_default = "/assets/neo-materials-DuCQxpjZ.jpg";
var neo_plans_default = "/assets/neo-plans-C-RZToqp.jpg";
var revealTargets = [
	"h2",
	"h3",
	"p",
	".section-label",
	".paragraphs",
	".individuality",
	".principles-heading",
	".principle",
	".team-photo",
	".technology-tiles",
	".material-grid figure",
	".image-text > img",
	".system-names",
	".text-link",
	".process-grid article",
	".portfolio-filters",
	".gallery-photo-button",
	".gallery-caption",
	".evolution-wordmark",
	".about-evolution > div:first-child",
	".footer-top",
	".footer-bottom",
	".contact-map",
	".neo-lab-accordion"
].join(", ");
/** Progressive enhancement: server-rendered content stays readable without JS. */
function useScrollReveal(rootRef) {
	(0, import_react.useEffect)(() => {
		const root = rootRef.current;
		if (!root || typeof IntersectionObserver === "undefined") return;
		const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
		let observer;
		const candidates = Array.from(root.querySelectorAll(revealTargets)).filter((element) => !element.closest(".hero, .site-header, .mobile-nav, .site-footer-signature"));
		const candidateSet = new Set(candidates);
		const targets = candidates.filter((element) => {
			let ancestor = element.parentElement;
			while (ancestor && ancestor !== root) {
				if (candidateSet.has(ancestor)) return false;
				ancestor = ancestor.parentElement;
			}
			return true;
		});
		const show = (element) => {
			element.dataset["reveal"] = "visible";
			observer?.unobserve(element);
		};
		const setup = () => {
			observer?.disconnect();
			if (motionPreference.matches) {
				targets.forEach((element) => element.removeAttribute("data-reveal"));
				return;
			}
			observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target instanceof HTMLElement) show(entry.target);
				});
			}, {
				threshold: 0,
				rootMargin: "0px 0px -40px 0px"
			});
			targets.forEach((element) => {
				const rect = element.getBoundingClientRect();
				if (element.dataset["reveal"] === "visible" || rect.top < window.innerHeight && rect.bottom > 0) show(element);
				else {
					element.dataset["reveal"] = "pending";
					observer?.observe(element);
				}
			});
		};
		const revealFocusedContent = (event) => {
			if (!(event.target instanceof HTMLElement)) return;
			const target = event.target.closest("[data-reveal=\"pending\"]");
			if (target) show(target);
		};
		setup();
		motionPreference.addEventListener("change", setup);
		root.addEventListener("focusin", revealFocusedContent);
		return () => {
			observer?.disconnect();
			motionPreference.removeEventListener("change", setup);
			root.removeEventListener("focusin", revealFocusedContent);
			targets.forEach((element) => element.removeAttribute("data-reveal"));
		};
	}, [rootRef]);
}
var companyDetails = {
	name: "NEO FORM SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ",
	street: "ul. Adama Branickiego 11/197D",
	locality: "02-972 Warszawa",
	nip: "9512645064"
};
var studioAddress = `${companyDetails.street}, ${companyDetails.locality}, Polska`;
var studioMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress)}`;
var contactActions = {
	email: "kontakt@neoform.pl",
	phone: "+48500000000",
	phoneDisplay: "+48 500 000 000",
	whatsapp: "48500000000"
};
var contactInstagram = {
	url: "https://www.instagram.com/neoform.meble?srtk=NXB3OTFpOWlmbWh2",
	handle: "@neoform.meble",
	title: "POROZMAWIAJMY O TWOIM WNĘTRZU",
	intro: "Twój pomysł to początek nowej formy.",
	nameLabel: "Imię",
	messageLabel: "Wiadomość",
	submitLabel: "ZAMÓW PROJEKT",
	note: "Wiadomość skopiujesz i wyślesz w rozmowie na Instagramie.",
	copied: "Tekst skopiowany. Wklej go w rozmowie na Instagramie i wyślij.",
	fallback: "Skopiuj poniższy tekst i wyślij go w rozmowie na Instagramie.",
	preparedLabel: "Tekst do skopiowania"
};
var neo_interior_default = "/assets/neo-interior-BQQQ1ajo.jpg";
var neoLab = {
	title: "WIEDZA, KTÓRA POWSTAJE W PRAKTYCE",
	slogan: "Learn. Test. Create",
	contactLabel: "ZAPYTAJ O WYDARZENIE",
	description: "Doświadczenie ma wartość dopiero wtedy, kiedy można się nim podzielić. Neo Lab to przestrzeń wiedzy, spotkań i wymiany doświadczeń dla projektantów, architektów, producentów i montażystów. Nie chcemy zatrzymywać wiedzy wewnątrz firmy – chcemy ją przekazywać dalej. Nie interesują nas szkolenia, po których wychodzisz z kolejnym PDF. Interesuje nas wiedza, którą wykorzystasz następnego dnia. Prawdziwe projekty, prawdziwe problemy, prawdziwe rozwiązania.",
	partnerIntro: "Nie chcemy być jedynym źródłem wiedzy. Neo Lab tworzymy wspólnie z markami, które wyznaczają standardy: Blum, Häfele, Viefe, PEKA, ARPA, FENIX. To spotkania, podczas których produkt można dotknąć, przetestować i w pełni zrozumieć.",
	upcomingLabel: "NAJBLIŻSZE WYDARZENIA",
	registrationLabel: "ZAPISZ SIĘ",
	archiveLabel: "ARCHIWUM NEO LAB",
	archiveIntro: "Te spotkania już się odbyły...",
	videoLabel: "WIDEO / NEO LAB",
	invitationLabel: "ZAPROSZENIE",
	programLabel: "PROGRAM / NEO LAB × PEKA",
	photosLabel: "GALERIE SZKOLEŃ",
	galleryTitle: "Название обучения",
	galleryDate: "Дата обучения"
};
var neoLabEducation = [{
	id: "knowledge",
	title: "Wiedza dla architektów",
	text: "Pokazujemy nowe materiały, systemy, rozwiązania techniczne i sposoby łączenia materiałów w wymagających projektach."
}, {
	id: "practice",
	title: "Praktyka zamiast teorii",
	text: "Prawdziwe projekty, realne problemy, technologia w działaniu i inspiracja, która zaczyna się od rozmowy."
}];
var neoLabEvents = [
	"PEKA",
	"Materiały",
	"Technology"
];
var neoLabArchive = [
	{
		title: "Front Lab",
		date: "11.02.2026",
		dateTime: "2026-02-11"
	},
	{
		title: "Kamień & Spiek",
		date: "11.03.2026",
		dateTime: "2026-03-11"
	},
	{
		title: "Blum: Okucia meblowe",
		date: "15.04.2026",
		dateTime: "2026-04-15"
	}
];
var footerSignature = {
	brand: "NEO FORM",
	lines: [
		"Tworzymy meble",
		"Dzielimy się wiedzą",
		"Rozwijamy branżę"
	]
};
var pekaSchedule = [
	{
		time: "13:45",
		module: "OPENING",
		description: "Prezentacja nowej odsłony marki NEO FORM."
	},
	{
		time: "14:00",
		module: "MAPA KUCHNI",
		description: "Jak kuchnia stała się osią życia domowego."
	},
	{
		time: "14:20",
		module: "PEKA MASTERCLASS",
		description: "Okucia i systemy, które realnie zmieniają sposób użytkowania kuchni."
	},
	{
		time: "14:55",
		module: "CASE STUDY: KUCHNIA W CENTRUM",
		description: "Projekt kuchni jako centrum domu: założenia, decyzje, efekt końcowy."
	},
	{
		time: "15:20",
		module: "DRAWER LAB",
		description: "Praktyczny warsztat organizacji przestrzeni w szufladach."
	},
	{
		time: "15:40",
		module: "PROBLEM LAB",
		description: "Trzy trudne układki kuchenne i trzy sposoby ich rozwiązania."
	},
	{
		time: "16:00",
		module: "WORKSHOP: JAK ORGANIZOWAĆ PRZESTRZEŃ W KUCHNI",
		description: "Praca z materiałem NEO FORM i rozwiązaniami PEKA."
	},
	{
		time: "16:30",
		module: "NEO STANDARD",
		description: "Prezentacja nowej linii wzorniczej NEO FORM."
	},
	{
		time: "16:40",
		module: "REVEAL",
		description: "Oficjalna odsłona nowej identyfikacji wizualnej NEO FORM."
	},
	{
		time: "16:50",
		module: "Q&A / NETWORKING",
		description: "Rozmowy o kuchni, marce i detalach."
	}
];
function SiteFooterSignature() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "site-footer-signature",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "site-footer-brand",
				children: footerSignature.brand
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "site-footer-lines",
				children: footerSignature.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line }, line))
			})]
		})
	});
}
//#endregion
export { neoLab as a, neoLabEvents as c, neo_plans_default as d, pekaSchedule as f, useScrollReveal as h, contactInstagram as i, neo_interior_default as l, studioMapsUrl as m, companyDetails as n, neoLabArchive as o, studioAddress as p, contactActions as r, neoLabEducation as s, SiteFooterSignature as t, neo_materials_default as u };
