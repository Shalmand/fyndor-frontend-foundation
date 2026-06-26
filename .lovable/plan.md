## Root cause

The Home page crashes with:

> Objects are not valid as a React child (found: object with keys {$$typeof, render})

The `Section` component's `SectionIcon` decides between "icon component" vs "icon node" using:

```ts
function isComponent(value): value is ComponentType {
  return typeof value === "function";
}
```

`lucide-react` icons (`Clock3`, `Sparkles`, `Gem`, `Bookmark`, `Compass`) are created with `React.forwardRef`, so they are **objects** (`{ $$typeof, render }`), not functions. `isComponent` returns `false`, the code falls into the fallback branch and renders the raw component object as a child of `<span>` — React throws, the root error boundary catches it, and the Home page goes blank.

Home is passing icons exactly as the Section API documents (`icon={Clock3}`), so the bug is in `Section`, not in Home. All other pieces (route registration, mock data, Story Hero, Carousel, Story Card props) are wired correctly.

## Fix (single, minimal change)

Update `SectionIcon` in `src/components/section/Section.tsx` to recognize both plain function components and `forwardRef` / `memo` components, then render them via `<Icon />` as before. Use `React.isValidElement` to distinguish an already-rendered node from a component reference:

```ts
import { isValidElement, createElement } from "react";

function SectionIcon({ icon }) {
  // Pre-rendered node (e.g. <Badge />, custom JSX)
  if (isValidElement(icon)) {
    return <span aria-hidden className="shrink-0">{icon}</span>;
  }
  // Otherwise it's a component reference: function, forwardRef, or memo
  return (
    <span
      aria-hidden
      className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2/60 text-muted-foreground"
    >
      {createElement(icon as ComponentType<{ className?: string }>, { className: "size-4" })}
    </span>
  );
}
```

This preserves the locked Section v1.0 API and visual — no prop changes, no style changes, no Home redesign. Lucide icons now render correctly; pre-rendered nodes continue to work.

## Verification

1. Reload `/` in the preview — confirm the Hero + all six rails render with no error boundary.
2. Check the console for the "Objects are not valid as a React child" error — should be gone.
3. Visit `/showcase/section` to confirm the existing "With icon" example still renders identically.
4. `tsgo --noEmit` to confirm types still pass.

## Out of scope

- No changes to Story Hero, Carousel, Story Card, mock data, or the Home composition.
- No new components, no visual redesign, no backend.
