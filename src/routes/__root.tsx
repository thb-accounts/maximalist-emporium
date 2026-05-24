import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useCartSync } from "@/hooks/useCartSync";
import { ChatButton } from "@/components/ChatButton";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-9xl">404</h1>
        <h2 className="mt-4 font-display text-2xl uppercase">Page not found</h2>
        <p className="mt-2 font-mono-d text-xs uppercase tracking-widest text-ink/60">
          This page got lost in the merch pile.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center brutal-border brutal-shadow-hot bg-ink px-6 py-3 font-display text-cream uppercase">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl uppercase">Something broke loud.</h1>
        <p className="mt-2 font-mono-d text-xs uppercase text-ink/60">{error.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="brutal-border bg-ink text-cream px-4 py-2 font-display uppercase">
            Try again
          </button>
          <a href="/" className="brutal-border bg-cream px-4 py-2 font-display uppercase">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lumi & Dee-Dee — Anti-minimalist merch & branded gear" },
      { name: "description", content: "Lumi & Dee-Dee prints maximalist branded merch across 20+ categories: tees, hoodies, drinkware, packaging, eco gifts and more." },
      { property: "og:title", content: "Lumi & Dee-Dee — Anti-minimalist merch & branded gear" },
      { property: "og:description", content: "Lumi & Dee-Dee prints maximalist branded merch across 20+ categories: tees, hoodies, drinkware, packaging, eco gifts and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lumi & Dee-Dee — Anti-minimalist merch & branded gear" },
      { name: "twitter:description", content: "Lumi & Dee-Dee prints maximalist branded merch across 20+ categories: tees, hoodies, drinkware, packaging, eco gifts and more." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/599048a8-a5a0-40e4-8217-0ed319e34d04/id-preview-52815515--8556f8bd-2a28-44a9-afe9-28f112f7ec90.lovable.app-1779393602461.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/599048a8-a5a0-40e4-8217-0ed319e34d04/id-preview-52815515--8556f8bd-2a28-44a9-afe9-28f112f7ec90.lovable.app-1779393602461.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useCartSync();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" />
      <ChatButton />
    </QueryClientProvider>
  );
}
