import { Link } from "@tanstack/react-router";
import { PenLine, BookOpen, BarChart3, Sparkles, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";

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
 * Compact dense rail + canvas-style main area. Surfaces, not borders,
 * carry the separation.
 */
export function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface-0 text-foreground">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-background/80 px-4 py-6 backdrop-blur-xl md:flex">
        <Link to="/" className="mb-8 inline-flex items-center gap-3 px-1" aria-label="Fyndor Studio">
          <Wordmark size="md" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
            Studio
          </span>
        </Link>

        <nav aria-label="Studio" className="flex flex-1 flex-col gap-1">
          {STUDIO_NAV.map(({ label, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
              activeProps={{ className: "bg-foreground/5 text-foreground" }}
            >
              <Icon className="h-[1.05rem] w-[1.05rem]" />
              {label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
        >
          <Settings className="h-[1.05rem] w-[1.05rem]" />
          Settings
        </Link>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-background/70 px-4 backdrop-blur-xl md:px-8">
          <h1 className="font-display text-lg font-semibold tracking-tight">Studio</h1>
          <button
            type="button"
            className="ml-auto inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
            style={{ backgroundImage: "var(--gradient-brand-soft)" }}
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
