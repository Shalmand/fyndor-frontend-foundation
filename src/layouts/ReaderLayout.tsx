import { Link } from "@tanstack/react-router";
import { Compass, Library, Bookmark, Bell, Search, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";

interface ReaderLayoutProps {
  children: ReactNode;
}

const READER_NAV = [
  { label: "Discover", to: "/", icon: Compass },
  { label: "Library", to: "/library", icon: Library },
  { label: "Lists", to: "/lists", icon: Bookmark },
] as const;

/**
 * ReaderLayout — authenticated browsing experience.
 * Persistent side rail on desktop, bottom nav on mobile.
 */
export function ReaderLayout({ children }: ReaderLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop side rail */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-surface-0 px-4 py-6 lg:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-2">
          <Logo size={26} />
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {READER_NAV.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl lg:px-8">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <Logo size={24} />
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search stories, authors, universes…"
                className="h-9 w-72 rounded-full border border-border bg-surface-1 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell className="h-4 w-4" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand to-brand-glow" />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="sticky bottom-0 z-30 flex h-16 items-center justify-around border-t border-border/60 bg-background/90 backdrop-blur-xl lg:hidden">
          {READER_NAV.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
