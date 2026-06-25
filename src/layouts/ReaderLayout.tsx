import { Link } from "@tanstack/react-router";
import { Compass, Library, Bookmark, Bell, Search, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";

interface ReaderLayoutProps {
  children: ReactNode;
}

const READER_NAV = [
  { label: "Stories", to: "/", icon: Compass },
  { label: "Library", to: "/library", icon: Library },
  { label: "Lists", to: "/lists", icon: Bookmark },
] as const;

/**
 * ReaderLayout — authenticated browsing experience.
 * Persistent side rail on desktop, bottom nav on mobile.
 * Separation through surfaces and whitespace — no hard divider lines.
 */
export function ReaderLayout({ children }: ReaderLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop side rail */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-surface-0/80 px-5 py-7 backdrop-blur-xl lg:flex">
        <Link to="/" className="mb-10 inline-flex items-center px-1" aria-label="Fyndor — Home">
          <Wordmark size="lg" />
        </Link>

        <nav aria-label="Reader" className="flex flex-1 flex-col gap-1">
          {READER_NAV.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
              activeProps={{ className: "bg-foreground/5 text-foreground" }}
            >
              <Icon className="h-[1.05rem] w-[1.05rem]" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
          >
            <Settings className="h-[1.05rem] w-[1.05rem]" />
            Settings
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 bg-background/60 px-4 backdrop-blur-xl lg:px-8">
          <Link to="/" className="inline-flex items-center lg:hidden" aria-label="Fyndor — Home">
            <Wordmark size="md" />
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search stories, authors, universes…"
                aria-label="Search"
                className="h-10 w-80 rounded-full bg-surface-1/80 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:bg-surface-2 focus:outline-none"
              />
            </div>
            <button
              type="button"
              aria-label="Notifications"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
            >
              <Bell className="h-[1.05rem] w-[1.05rem]" />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="h-9 w-9 rounded-full"
              style={{ backgroundImage: "var(--gradient-brand-soft)" }}
            />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Mobile bottom nav */}
        <nav
          aria-label="Reader"
          className="sticky bottom-0 z-30 flex h-16 items-center justify-around bg-background/85 backdrop-blur-xl lg:hidden"
        >
          {READER_NAV.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
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
