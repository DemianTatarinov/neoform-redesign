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
import { useEffect, useLayoutEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reloadScrollGuardScript } from "../lib/reload-scroll-guard";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Analytics } from '@vercel/analytics/react';
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
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

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
      { title: "NEO FORM — Nowa forma. Nieograniczone możliwości." },
      { name: "title", content: "NEO FORM — Nowa forma. Nieograniczone możliwości." },
      { name: "description", content: "Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neoform-redesign.vercel.app/" },
      { property: "og:title", content: "NEO FORM — Nowa forma. Nieograniczone możliwości." },
      { property: "og:description", content: "Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość." },
      { property: "og:image", content: "https://neoform-redesign.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: "https://neoform-redesign.vercel.app/" },
      { name: "twitter:title", content: "NEO FORM — Nowa forma. Nieograniczone możliwości." },
      { name: "twitter:description", content: "Indywidualne meble i zabudowy dla całych wnętrz. Projekt, materiał, detal, jakość." },
      { name: "twitter:image", content: "https://neoform-redesign.vercel.app/og-image.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;450;500;600;700&display=swap" },
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
      <Analytics />
    </QueryClientProvider>
  );
}
