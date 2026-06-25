import { Link } from "@tanstack/react-router";
import { Search, Bell } from "lucide-react";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { NAV_PUBLIC } from "@/lib/constants";

interface PublicLayoutProps {
  children: ReactNode;
}

/**
 * PublicLayout — marketing, discovery & unauthenticated browsing.
 *
 * Header has no hard divider: it floats over the page on a blurred surface
 * and fades into content. Brand wordmark anchors the left, navigation is
 * quiet and centered around storytelling vocabulary.
 */
export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40">
        {/* Translucent surface — separation via blur + opacity, never a border. */}
        <div className="absolute inset-0 -z-10 bg-background/60 backdrop-blur-xl" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" aria-hidden />

        <div className="container-wide flex h-20 items-center gap-10">
          <Link
            to="/"
            className="group inline-flex shrink-0 items-center"
            aria-label="Fyndor — Home"
          >
            <Wordmark size="lg" />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center gap-9 md:flex"
          >
            {NAV_PUBLIC.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative text-[0.9rem] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Search stories"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
            >
              <Search className="h-[1.05rem] w-[1.05rem]" />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-foreground/5 hover:text-foreground"
            >
              <Bell className="h-[1.05rem] w-[1.05rem]" />
            </button>
            <Link
              to="/"
              className="ml-2 inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
              style={{ backgroundImage: "var(--gradient-brand-soft)" }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}
