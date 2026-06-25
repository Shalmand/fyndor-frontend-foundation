import { Link } from "@tanstack/react-router";
import { ArrowLeft, Type, Bookmark, MessageSquare, Settings2 } from "lucide-react";
import type { ReactNode } from "react";

interface ReadingLayoutProps {
  children: ReactNode;
  storyTitle?: string;
  chapterTitle?: string;
}

/**
 * ReadingLayout — distraction-free chapter reader.
 * Warm reading surface, minimal chrome, paginated reader view.
 */
export function ReadingLayout({ children, storyTitle, chapterTitle }: ReadingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-reader-bg text-reader-fg">
      <header className="sticky top-0 z-30 border-b border-border/40 bg-reader-bg/85 backdrop-blur-xl">
        <div className="container-narrow flex h-14 items-center gap-3">
          <Link
            to="/"
            aria-label="Back"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-reader-muted transition-colors hover:bg-surface-2 hover:text-reader-fg"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="min-w-0 flex-1">
            {storyTitle && (
              <p className="truncate font-display text-sm font-medium text-reader-fg">
                {storyTitle}
              </p>
            )}
            {chapterTitle && (
              <p className="truncate text-xs text-reader-muted">{chapterTitle}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Typography"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-reader-muted transition-colors hover:bg-surface-2 hover:text-reader-fg"
            >
              <Type className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Bookmark"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-reader-muted transition-colors hover:bg-surface-2 hover:text-reader-fg"
            >
              <Bookmark className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Comments"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-reader-muted transition-colors hover:bg-surface-2 hover:text-reader-fg"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Settings"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-reader-muted transition-colors hover:bg-surface-2 hover:text-reader-fg"
            >
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container-reader flex-1 py-12 font-reading text-lg leading-relaxed">
        {children}
      </main>

      <footer className="container-reader py-8 text-xs text-reader-muted">
        <div className="border-t border-border/40 pt-6 text-center">
          End of chapter — continue reading
        </div>
      </footer>
    </div>
  );
}
