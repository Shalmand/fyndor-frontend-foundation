import { Link } from "@tanstack/react-router";
import { ShieldCheck, Users, FileText, Flag, Activity } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";

interface AdminLayoutProps {
  children: ReactNode;
}

const ADMIN_NAV = [
  { label: "Overview", to: "/admin", icon: Activity },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Content", to: "/admin/content", icon: FileText },
  { label: "Reports", to: "/admin/reports", icon: Flag },
  { label: "Moderation", to: "/admin/moderation", icon: ShieldCheck },
] as const;

/**
 * AdminLayout — internal staff console.
 * Higher information density, monochrome accents.
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-surface-0 px-4 py-6 md:flex">
        <Link to="/" className="mb-8 flex items-center gap-2 px-2">
          <Logo size={24} />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Admin
          </span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {ADMIN_NAV.map(({ label, to, icon: Icon }) => (
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
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-8">
          <h1 className="font-display text-lg font-semibold tracking-tight">Administration</h1>
          <span className="ml-2 rounded-full border border-border bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Internal
          </span>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
