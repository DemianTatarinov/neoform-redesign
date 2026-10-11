import { n as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, a as AccordionTrigger$1, i as AccordionItem$1, n as AccordionContent$1, r as AccordionHeader, t as Accordion$1, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { a as neoLab, c as neoLabEvents, d as neo_plans_default, f as pekaSchedule, h as useScrollReveal, i as contactInstagram, l as neo_interior_default, o as neoLabArchive, s as neoLabEducation, t as SiteFooterSignature, u as neo_materials_default } from "./site-footer-signature-1SEgqnX3.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as ArrowUpRight, s as ChevronDown, t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/neo-lab-dTLpVJiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Accordion$1;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem$1, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger$1, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionTrigger$1.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent$1, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionContent$1.displayName;
var neo_detail_default = "/assets/neo-detail-B7UsLAlk.jpg";
var hardware_blum_1_default = "/assets/hardware-blum-1-DrTC2HIi.jpg";
var hardware_peka_1_default = "/assets/hardware-peka-1-h7721Q3e.jpg";
var photographs = [
	neo_materials_default,
	neo_plans_default,
	neo_detail_default,
	neo_interior_default,
	hardware_blum_1_default,
	hardware_peka_1_default
];
function NeoLabArchiveDialog({ title, photoOffset, onClose, returnFocus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (open) => {
			if (!open) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "hardware-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "lab-archive-dialog",
			"aria-describedby": void 0,
			onCloseAutoFocus: (event) => {
				event.preventDefault();
				returnFocus?.focus({ preventScroll: true });
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hardware-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "lab-archive-dialog-title",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "hardware-close",
						"aria-label": "Zamknij galerię",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { "aria-hidden": "true" })
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lab-archive-photo-grid",
				children: photographs.map((_, index) => {
					const src = photographs[(index + photoOffset) % photographs.length];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: `${title} — zdjęcie poglądowe ${index + 1}`,
						width: 1024,
						height: 768,
						loading: "lazy"
					}, index);
				})
			})]
		})] })
	});
}
var VIDEO1_default = "/assets/VIDEO1-De3FZbIs.mp4";
function NeoLabVideo() {
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const video = videoRef.current;
		if (!video) return;
		const playVideo = () => {
			video.play().catch(() => {});
		};
		if (video.readyState >= 2) playVideo();
		else video.addEventListener("loadeddata", playVideo, { once: true });
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-black",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: videoRef,
			className: "w-full h-full object-cover",
			playsInline: true,
			muted: true,
			loop: true,
			autoPlay: true,
			preload: "auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
				src: VIDEO1_default,
				type: "video/mp4"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-16 z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hero-kicker",
				children: "NEO LAB"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl md:text-6xl font-light tracking-tight text-white max-w-3xl uppercase leading-tight",
				children: "WIEDZA, KTÓRA POWSTAJE W PRAKTYCE"
			})]
		})]
	});
}
var partners = [
	{
		name: "Blum",
		image: {
			version: 1,
			asset_id: "d3e7a7ce-68d7-45c7-93ef-5a01928d4df5",
			project_id: "c9e15923-b656-4d29-8e45-64174f6e278c",
			url: "/__l5e/assets-v1/d3e7a7ce-68d7-45c7-93ef-5a01928d4df5/neo-partner-blum.svg",
			r2_key: "a/v1/c9e15923-b656-4d29-8e45-64174f6e278c/d3e7a7ce-68d7-45c7-93ef-5a01928d4df5/neo-partner-blum.svg",
			original_filename: "neo-partner-blum.svg",
			size: 2321,
			content_type: "image/svg+xml",
			created_at: "2026-10-10T01:14:18Z"
		}.url,
		url: "https://www.blum.com/pl/pl/"
	},
	{
		name: "Häfele",
		image: {
			version: 1,
			asset_id: "ae16ad45-a6c8-4124-a2ca-67e0ddf14cb0",
			project_id: "c9e15923-b656-4d29-8e45-64174f6e278c",
			url: "/__l5e/assets-v1/ae16ad45-a6c8-4124-a2ca-67e0ddf14cb0/neo-partner-hafele.png",
			r2_key: "a/v1/c9e15923-b656-4d29-8e45-64174f6e278c/ae16ad45-a6c8-4124-a2ca-67e0ddf14cb0/neo-partner-hafele.png",
			original_filename: "neo-partner-hafele.png",
			size: 4094,
			content_type: "image/png",
			created_at: "2026-10-10T01:16:24Z"
		}.url,
		url: "https://www.hafele.pl/"
	},
	{
		name: "Viefe",
		image: {
			version: 1,
			asset_id: "a0b001c9-b063-487f-b990-b089ff2e2467",
			project_id: "c9e15923-b656-4d29-8e45-64174f6e278c",
			url: "/__l5e/assets-v1/a0b001c9-b063-487f-b990-b089ff2e2467/neo-partner-viefe.svg",
			r2_key: "a/v1/c9e15923-b656-4d29-8e45-64174f6e278c/a0b001c9-b063-487f-b990-b089ff2e2467/neo-partner-viefe.svg",
			original_filename: "neo-partner-viefe.svg",
			size: 2580,
			content_type: "image/svg+xml",
			created_at: "2026-10-10T01:14:20Z"
		}.url,
		url: "https://www.viefe.com/"
	},
	{
		name: "PEKA",
		image: {
			version: 1,
			asset_id: "14c60a9c-2052-4510-b738-eb417b24ce12",
			project_id: "c9e15923-b656-4d29-8e45-64174f6e278c",
			url: "/__l5e/assets-v1/14c60a9c-2052-4510-b738-eb417b24ce12/neo-partner-peka.svg",
			r2_key: "a/v1/c9e15923-b656-4d29-8e45-64174f6e278c/14c60a9c-2052-4510-b738-eb417b24ce12/neo-partner-peka.svg",
			original_filename: "neo-partner-peka.svg",
			size: 2206,
			content_type: "image/svg+xml",
			created_at: "2026-10-10T01:14:23Z"
		}.url,
		url: "https://www.peka.pl/"
	},
	{
		name: "ARPA",
		image: null,
		url: "https://www.arpaindustriale.com/"
	},
	{
		name: "FENIX",
		image: {
			version: 1,
			asset_id: "4d7fec1d-05de-49eb-adf7-39b610e6d74f",
			project_id: "c9e15923-b656-4d29-8e45-64174f6e278c",
			url: "/__l5e/assets-v1/4d7fec1d-05de-49eb-adf7-39b610e6d74f/neo-partner-fenix.svg",
			r2_key: "a/v1/c9e15923-b656-4d29-8e45-64174f6e278c/4d7fec1d-05de-49eb-adf7-39b610e6d74f/neo-partner-fenix.svg",
			original_filename: "neo-partner-fenix.svg",
			size: 1906,
			content_type: "image/svg+xml",
			created_at: "2026-10-10T01:14:25Z"
		}.url,
		url: "https://www.fenixforinteriors.com/"
	}
];
var images = [
	hardware_peka_1_default,
	neo_materials_default,
	neo_detail_default
];
function NeoLab() {
	const [archiveIndex, setArchiveIndex] = (0, import_react.useState)(null);
	const [registration, setRegistration] = (0, import_react.useState)("");
	const returnFocus = (0, import_react.useRef)(null);
	const archive = archiveIndex === null ? void 0 : neoLabArchive[archiveIndex];
	const register = (event) => {
		setRegistration(`Chcę zapisać się na wydarzenie NEO LAB — ${event}.`);
		window.open(contactInstagram.url, "_blank", "noopener,noreferrer");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "neo-lab",
		id: "neo-lab",
		"aria-labelledby": "neo-lab-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lab-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeoLabVideo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lab-statement",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container lab-statement-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lab-main-copy",
						children: neoLab.description
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lab-manifesto",
						children: neoLab.slogan
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container lab-partners",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: neoLab.partnerIntro }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lab-partner-grid",
					children: partners.map((partner) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						className: "lab-partner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: partner.url,
							target: "_blank",
							rel: "noopener noreferrer",
							"aria-label": partner.name,
							children: partner.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: partner.name === "Blum" ? "lab-logo-blum" : partner.name === "Häfele" ? "lab-logo-hafele" : void 0,
								src: partner.image,
								alt: partner.name,
								width: 160,
								height: 64,
								loading: "lazy"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "lab-partner-wordmark",
								children: partner.name
							})
						})
					}, partner.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container lab-education",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "multiple",
					className: "lab-education-accordion",
					children: neoLabEducation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: item.id,
						className: "lab-education-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "lab-education-trigger",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "lab-education-content",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.text })
						})]
					}, item.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container lab-upcoming",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "lab-section-title",
						children: neoLab.upcomingLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lab-event-grid",
						children: neoLabEvents.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "lab-event-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: images[index],
									alt: `${event} — zdjęcie poglądowe`,
									loading: "lazy",
									width: 1024,
									height: 768
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lab-event-copy",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: event }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "lab-register",
										onClick: () => register(event),
										children: [neoLab.registrationLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "aria-hidden": "true" })]
									})]
								}),
								index === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
									className: "lab-event-program",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: neoLab.programLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "neo-lab-schedule",
										children: pekaSchedule.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											dateTime: entry.time,
											children: entry.time
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entry.module }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: entry.description })] })] }, entry.time))
									})]
								})
							]
						}, event))
					}),
					registration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lab-registration-handoff",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "status",
								children: contactInstagram.fallback
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								"aria-label": contactInstagram.preparedLabel,
								readOnly: true,
								value: registration,
								onFocus: (event) => event.currentTarget.select()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "lab-register",
								onClick: () => window.open(contactInstagram.url, "_blank", "noopener,noreferrer"),
								children: ["Instagram", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "aria-hidden": "true" })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container lab-archive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "lab-section-title",
						children: neoLab.archiveLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lab-archive-intro",
						children: neoLab.archiveIntro
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lab-archive-grid",
						children: neoLabArchive.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "lab-archive-card",
							onClick: (event) => {
								returnFocus.current = event.currentTarget;
								setArchiveIndex(index);
							},
							"aria-haspopup": "dialog",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: images[(index + 1) % images.length],
								alt: "",
								width: 1024,
								height: 768,
								loading: "lazy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "lab-archive-caption",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
									dateTime: item.dateTime,
									children: item.date
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "aria-hidden": "true" })] })]
							})]
						}, item.title))
					})
				]
			}),
			archive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeoLabArchiveDialog, {
				title: archive.title,
				photoOffset: archiveIndex ?? 0,
				returnFocus: returnFocus.current,
				onClose: () => setArchiveIndex(null)
			})
		]
	});
}
var neo_team_asset_default = {
	version: 1,
	asset_id: "a9e10d2c-eee2-4e71-a764-92c494141cdd",
	project_id: "c9e15923-b656-4d29-8e45-64174f6e278c",
	url: "/__l5e/assets-v1/a9e10d2c-eee2-4e71-a764-92c494141cdd/neo-team.jpg",
	r2_key: "a/v1/c9e15923-b656-4d29-8e45-64174f6e278c/a9e10d2c-eee2-4e71-a764-92c494141cdd/neo-team.jpg",
	original_filename: "neo-team.jpg",
	size: 149637,
	content_type: "image/jpeg",
	created_at: "2026-10-06T21:10:18Z"
};
var neo_lab_poster_jpg_asset_default = {
	version: 1,
	asset_id: "cc78b911-90ca-422a-996a-82754901cbe9",
	project_id: "c9e15923-b656-4d29-8e45-64174f6e278c",
	url: "/__l5e/assets-v1/cc78b911-90ca-422a-996a-82754901cbe9/neo-lab-poster.jpg",
	r2_key: "a/v1/c9e15923-b656-4d29-8e45-64174f6e278c/cc78b911-90ca-422a-996a-82754901cbe9/neo-lab-poster.jpg",
	original_filename: "neo-lab-poster.jpg",
	size: 51763,
	content_type: "image/jpeg",
	created_at: "2026-10-08T23:49:52Z"
};
var inspiracje = {
	label: "INSPIRACJE",
	heading: ["IDEA, TREND", "I MATERIAŁ"],
	lead: "Krótkie formy: pomysły, obserwacje z targów i przeglądy materiałów, które wracają do naszych realizacji.",
	contactLabel: "ZAPYTAJ O INSPIRACJE",
	dateLabel: "Data publikacji"
};
var inspiracjePosts = [
	{
		tag: "TRENDY",
		title: "KUCHNIA BEZ UCHWYTÓW",
		excerpt: "Trzy sposoby otwierania, które wyglądają jak jedna spokojna płaszczyzna.",
		image: neo_detail_default
	},
	{
		tag: "MATERIAŁY",
		title: "FORNIR, KTÓRY LUBI DOTYK",
		excerpt: "Dlaczego naturalny fornir starzeje się piękniej niż równy lakier.",
		image: neo_materials_default
	},
	{
		tag: "WYSTAWY",
		title: "PIĘĆ ROZWIĄZAŃ Z TARGÓW",
		excerpt: "Co naprawdę warto przywieźć z wystawy do własnej kuchni.",
		image: neo_interior_default
	},
	{
		tag: "IDEE",
		title: "ŚWIATŁO JAKO DETAL",
		excerpt: "Jak światło zmienia proporcje szafki i rytm całego wnętrza.",
		image: neo_plans_default
	},
	{
		tag: "MATERIAŁY",
		title: "SPIEK W PRAKTYCE",
		excerpt: "Blat, który znosi wszystko i nadal wygląda spokojnie.",
		image: neo_lab_poster_jpg_asset_default.url
	},
	{
		tag: "WYSTAWY",
		title: "PRÓBKI NA WARSZTACIE",
		excerpt: "Jak układamy próbki, żeby decyzja zapadła w jeden wieczór.",
		image: neo_team_asset_default.url
	}
];
function Inspiracje() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "section paper inspiracje",
		id: "inspiracje",
		"aria-labelledby": "inspiracje-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-label",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inspiracje.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "section-number",
						children: "02 / 02"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						id: "inspiracje-title",
						children: [
							inspiracje.heading[0],
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							inspiracje.heading[1]
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lead",
						children: inspiracje.lead
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inspiracje-grid",
					children: inspiracjePosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "inspiracje-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "inspiracje-photo",
							src: post.image,
							alt: "",
							loading: "lazy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inspiracje-copy",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inspiracje-tag",
									children: post.tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: post.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: post.excerpt }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inspiracje-date",
									children: inspiracje.dateLabel
								})
							]
						})]
					}, post.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "inspiracje-contact",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						hash: "kontakt",
						children: [inspiracje.contactLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { "aria-hidden": "true" })]
					})
				})
			]
		})
	});
}
function NeoLabExperience() {
	const pageRef = (0, import_react.useRef)(null);
	useScrollReveal(pageRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		ref: pageRef,
		className: "neo-lab-page",
		id: "neo-lab-top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeoLab, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspiracje, {})]
	});
}
function NeoLabPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeoLabExperience, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooterSignature, {})] });
}
//#endregion
export { NeoLabPage as component };
