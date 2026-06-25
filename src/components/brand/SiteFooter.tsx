import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand/Wordmark";
import { APP_NAME } from "@/lib/constants";

interface FooterLink {
  label: string;
  to: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Read",
    links: [
      { label: "Stories", to: "/" },
      { label: "Library", to: "/browse" },
      { label: "Universes", to: "/universes" },
    ],
  },
  {
    heading: "Create",
    links: [
      { label: "Studio", to: "/studio" },
      { label: "Writing guide", to: "/" },
      { label: "Community", to: "/" },
    ],
  },
  {
    heading: "Fyndor",
    links: [
      { label: "About", to: "/" },
      { label: "Guidelines", to: "/" },
      { label: "Privacy", to: "/" },
      { label: "Terms", to: "/" },
    ],
  },
];

/**
 * SiteFooter — minimal, premium, calm. Separated from content with
 * whitespace and a soft surface rather than a hard divider line.
 * Designed to read as the closing chord of a page, not as documentation.
 */
export function SiteFooter() {
  return (
    <footer className="relative mt-24">
      {/* Soft separation — gradient rule, never a hard border. */}
      <div className="container-wide">
        <div className="soft-rule" aria-hidden />
      </div>

      <div className="container-wide grid grid-cols-2 gap-x-8 gap-y-12 pb-16 pt-16 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link to="/" className="inline-flex items-center" aria-label={APP_NAME}>
            <Wordmark size="md" />
          </Link>
          <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
            A cinematic home for original fiction and fanfiction.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-3">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
              {col.heading}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-foreground/75 transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-wide flex flex-col items-start justify-between gap-3 pb-10 text-xs text-muted-foreground/70 sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {APP_NAME}. Stories belong to their authors.</span>
        <span>Made for readers.</span>
      </div>
    </footer>
  );
}
