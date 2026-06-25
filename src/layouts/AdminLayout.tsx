import { Link } from "@tanstack/react-router";
import { ShieldCheck, Users, FileText, Flag, Activity } from "lucide-react";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";

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
 * Higher information density, monochrome accents, no hard rules.
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-surface-0/80 px-5 py-7 backdrop-blur-xl md:flex">
        <Link to="/" className="mb-8 inline-flex items-center gap-3 px-1" aria-label="Fyndor Admin">
          <Wordmark size="md" />
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
            Admin
          </span>
        </Link>

        <nav aria-label="Admin" className="flex flex-1 flex-col gap-1">
          {ADMIN_NAV.map(({ label, to, icon: Icon }) => (
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
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 bg-background/70 px-4 backdrop-blur-xl md:px-8">
          <h1 className="font-display text-lg font-semibold tracking-tight">Administration</h1>
          <span className="ml-2 rounded-full bg-surface-2/80 px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
            Internal
          </span>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
