import { n as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useNavigate, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as ArrowUp, i as Menu, l as ArrowUpRight, t as X } from "../_libs/lucide-react.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cn9fZwl8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-xsKXCcD-.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var neo_logo_wordmark_default = "/assets/neo-logo-wordmark-4YOehfHI.png";
var sections = [
	["CREDO", "credo"],
	["NEO STANDARD", "zespol"],
	["BESPOKE", "bespoke"],
	["REALIZACJE", "realizacje"]
];
function SiteHeader() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [reducedMotion, setReducedMotion] = (0, import_react.useState)(false);
	const menuToggle = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const location = useRouterState({ select: (state) => state.location.href });
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	(0, import_react.useEffect)(() => {
		setMenuOpen(false);
	}, [location]);
	(0, import_react.useEffect)(() => {
		const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReducedMotion(preference.matches);
		sync();
		preference.addEventListener("change", sync);
		return () => preference.removeEventListener("change", sync);
	}, []);
	const scrollOptions = { behavior: reducedMotion ? "auto" : "smooth" };
	const closeMenu = () => setMenuOpen(false);
	const selectSection = (event, hash) => {
		closeMenu();
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || pathname !== "/") return;
		const target = document.getElementById(hash);
		if (!target) return;
		event.preventDefault();
		navigate({
			to: "/",
			hash,
			resetScroll: false,
			hashScrollIntoView: false
		});
		target.scrollIntoView({
			...scrollOptions,
			block: "start"
		});
	};
	const labLinkClass = `hover:opacity-70 transition-opacity${pathname === "/neo-lab" ? " nav-active" : ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "site-header fixed top-0 left-0 right-0 z-50 w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "header-logo",
				to: "/",
				hash: "top",
				"aria-label": "NEO FORM — strona główna",
				onClick: closeMenu,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: neo_logo_wordmark_default,
					alt: "NEO FORM",
					width: 893,
					height: 472
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "desktop-nav",
				"aria-label": "Nawigacja",
				children: [sections.map(([text, hash]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					hash,
					hashScrollIntoView: scrollOptions,
					onClick: (event) => selectSection(event, hash),
					children: text
				}, hash)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/neo-lab",
					className: labLinkClass,
					onClick: closeMenu,
					children: "NEO LAB"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				className: "contact-link",
				to: "/",
				hash: "kontakt",
				hashScrollIntoView: scrollOptions,
				onClick: (event) => selectSection(event, "kontakt"),
				children: ["KONTAKT ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				ref: menuToggle,
				variant: "ghost",
				size: "icon",
				className: "menu-toggle",
				"aria-label": menuOpen ? "Zamknij menu" : "Otwórz menu",
				"aria-expanded": menuOpen,
				"aria-controls": "mobile-menu",
				onClick: () => setMenuOpen(!menuOpen),
				children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
			})
		]
	}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "mobile-nav",
		id: "mobile-menu",
		"aria-label": "Menu mobilne",
		children: [
			sections.map(([text, hash]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				hash,
				hashScrollIntoView: scrollOptions,
				onClick: (event) => selectSection(event, hash),
				children: [text, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })]
			}, hash)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/neo-lab",
				className: `lab-menu-button ${labLinkClass}`,
				onClick: closeMenu,
				children: ["NEO LAB", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				hash: "kontakt",
				hashScrollIntoView: scrollOptions,
				onClick: (event) => selectSection(event, "kontakt"),
				children: ["KONTAKT", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })]
			})
		]
	})] });
}
function BackToTop() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				setVisible(window.scrollY > window.innerHeight * .75);
				ticking = false;
			});
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	function scrollTop() {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		window.scrollTo({
			top: 0,
			behavior: reduced ? "auto" : "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `back-to-top${visible ? " back-to-top-visible" : ""}`,
		onClick: scrollTop,
		"aria-label": "Wróć na górę strony",
		"aria-hidden": !visible,
		tabIndex: visible ? 0 : -1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {
			size: 20,
			"aria-hidden": "true"
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$2 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "NEO FORM — Nowa forma" },
			{
				name: "description",
				content: "Meble i zabudowy dla całych wnętrz. NEO FORM."
			},
			{
				property: "og:title",
				content: "NEO FORM — Nowa forma"
			},
			{
				property: "og:description",
				content: "Meble i zabudowy dla całych wnętrz. NEO FORM."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;450;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$2.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {})
		]
	});
}
var $$splitComponentImporter$1 = () => import("./routes-CN1Yw_Qv.mjs");
var Route$1 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "NEO FORM — Nowa forma. Nieograniczone możliwości." },
		{
			name: "description",
			content: "Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość. Poznaj NEO FORM."
		},
		{
			property: "og:title",
			content: "NEO FORM — Nowa forma. Nieograniczone możliwości."
		},
		{
			property: "og:description",
			content: "Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./neo-lab-dTLpVJiW.mjs");
var Route = createFileRoute("/neo-lab")({
	head: () => ({ meta: [
		{ title: "NEO LAB — Wiedza, która powstaje w praktyce | NEO FORM" },
		{
			name: "description",
			content: "NEO LAB: wydarzenia, programy spotkań i inspiracje dla architektów. LEARN TEST CREATE"
		},
		{
			property: "og:title",
			content: "NEO LAB — Wiedza, która powstaje w praktyce"
		},
		{
			property: "og:description",
			content: "Wydarzenia NEO LAB / PEKA, ARCHITECTURE i MATERIAŁY oraz inspiracje ze świata projektowania."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$1.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	NeoLabRoute: Route.update({
		id: "/neo-lab",
		path: "/neo-lab",
		getParentRoute: () => Route$2
	})
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
