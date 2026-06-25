import { Link } from "@tanstack/react-router";
import { Search, Bell } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { NAV_PUBLIC } from "@/lib/constants";

interface PublicLayoutProps {
  children: ReactNode;
}

/**
 * PublicLayout — marketing, discovery & unauthenticated browsing.
 * Cinematic header that fades into the page on scroll (extension point).
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="container-wide flex h-16 items-center gap-8">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Logo size={28} />
          </Link>

          <nav className="hidden flex-1 items-center gap-6 md:flex">
            {NAV_PUBLIC.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell className="h-4 w-4" />
            </button>
            <Link
              to="/"
              className="ml-2 inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60 bg-surface-0">
        <div className="container-wide flex flex-col gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Logo size={22} />
            <span>© {new Date().getFullYear()} Fyndor. All stories belong to their authors.</span>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link to="/" className="hover:text-foreground">About</Link>
            <Link to="/" className="hover:text-foreground">Guidelines</Link>
            <Link to="/" className="hover:text-foreground">Privacy</Link>
            <Link to="/" className="hover:text-foreground">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
