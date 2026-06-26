import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ReadingPreferences } from "./types";

/**
 * ReadingPreferencesContext — extension point.
 *
 * Today the context exposes the defaults; a future settings drawer
 * will mutate them. The shape is locked so the rest of the reader
 * can already read from it.
 */

const DEFAULT_PREFERENCES: ReadingPreferences = {
  fontSize: "md",
  fontFamily: "serif",
  lineSpacing: "comfortable",
  theme: "dark",
  readingWidth: "default",
};

interface ReadingPreferencesContextValue {
  preferences: ReadingPreferences;
  setPreferences: (next: Partial<ReadingPreferences>) => void;
}

const ReadingPreferencesContext = createContext<ReadingPreferencesContextValue | null>(null);

export function ReadingPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setState] = useState<ReadingPreferences>(DEFAULT_PREFERENCES);
  const value = useMemo<ReadingPreferencesContextValue>(
    () => ({
      preferences,
      setPreferences: (next) => setState((prev) => ({ ...prev, ...next })),
    }),
    [preferences],
  );
  return (
    <ReadingPreferencesContext.Provider value={value}>
      {children}
    </ReadingPreferencesContext.Provider>
  );
}

export function useReadingPreferences(): ReadingPreferencesContextValue {
  const ctx = useContext(ReadingPreferencesContext);
  if (!ctx) {
    // Fallback for components rendered outside a provider (e.g. previews).
    return {
      preferences: DEFAULT_PREFERENCES,
      setPreferences: () => {},
    };
  }
  return ctx;
}
