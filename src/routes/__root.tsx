import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useLayoutEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reloadScrollGuardScript } from "../lib/reload-scroll-guard";
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { BackToTop } from '@/components/back-to-top';

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "NEO FORM — Meble i zabudowy dla całych wnętrz" },
      { name: "title", content: "NEO FORM — Meble i zabudowy dla całych wnętrz" },
      { name: "description", content: "Projekt, materiał, detal, jakość. Tworzymy autorskie kuchnie oraz meble i zabudowy dla całych wnętrz." },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#000000" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pl_PL" },
      { property: "og:site_name", content: "NEO FORM" },
      { property: "og:url", content: "https://neoform.com.pl/" },
      { property: "og:title", content: "NEO FORM — Meble i zabudowy dla całych wnętrz" },
      { property: "og:description", content: "Projekt, materiał, detal, jakość. Tworzymy autorskie kuchnie oraz meble i zabudowy dla całych wnętrz." },
      { property: "og:image", content: "https://neoform.com.pl/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NEO FORM — Meble i zabudowy dla całych wnętrz" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: "https://neoform.com.pl/" },
      { name: "twitter:title", content: "NEO FORM — Meble i zabudowy dla całych wnętrz" },
      { name: "twitter:description", content: "Projekt, materiał, detal, jakość. Tworzymy autorskie kuchnie oraz meble i zabudowy dla całych wnętrz." },
      { name: "twitter:image", content: "https://neoform.com.pl/og-image.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;450;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NEO FORM",
          url: "https://neoform.com.pl",
          image: "https://neoform.com.pl/og-image.jpg",
          email: "ec@neoform.com.pl",
          telephone: "+48 662 755 566",
          address: {
            "@type": "PostalAddress",
            streetAddress: "ul. Adama Branickiego 11/197D",
            postalCode: "02-972",
            addressLocality: "Warszawa",
            addressCountry: "PL",
          },
        }),
      },
      {
        type: "module",
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": JSON.stringify({ token: "de5eac3737864e7da5c5b38ef2796ada" }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <script dangerouslySetInnerHTML={{ __html: reloadScrollGuardScript }} />
        <HeadContent />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: reloadScrollGuardScript }} />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function useLockScrollOnFullLoad() {
  useLayoutEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: state => state.location.pathname });
  useLockScrollOnFullLoad();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <div key={pathname} className="relative z-0 animate-fadeIn">
        <Outlet />
      </div>
      <SiteFooter />
      <BackToTop />
    </QueryClientProvider>
  );
}
