import { Link } from "@tanstack/react-router";
import { PenLine, BookOpen, BarChart3, Sparkles, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";

interface StudioLayoutProps {
  children: ReactNode;
}

const STUDIO_NAV = [
  { label: "Drafts", to: "/studio", icon: PenLine },
  { label: "Published", to: "/studio/published", icon: BookOpen },
  { label: "Insights", to: "/studio/insights", icon: BarChart3 },
  { label: "Universes", to: "/studio/universes", icon: Sparkles },
] as const;

/**
 * StudioLayout — author/creator workspace.
 * Compact dense rail + canvas-style main area.
 */
export function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface-0 text-foreground">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-border/60 bg-background px-3 py-5 md:flex">
        <Link to="/" className="mb-6 flex items-center gap-2 px-2">
          <Logo size={24} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Studio
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {STUDIO_NAV.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-8">
          <h1 className="font-display text-lg font-semibold tracking-tight">Studio</h1>
          <button
            type="button"
            className="ml-auto inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <PenLine className="h-4 w-4" />
            New story
          </button>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
