import { createContext, useContext, type ReactNode } from "react";

/**
 * LoreReferenceContext — extension point for the future Story World Drawer.
 *
 * The renderer for inline lore tokens calls `onOpen(loreId)` when a
 * reference is activated. The default handler is a no-op so the reader
 * works as plain prose today; the drawer will provide a real handler.
 */

interface LoreReferenceContextValue {
  onOpen: (loreId: string) => void;
  enabled: boolean;
}

const LoreReferenceContext = createContext<LoreReferenceContextValue>({
  onOpen: () => {},
  enabled: false,
});

export function LoreReferenceProvider({
  children,
  onOpen,
}: {
  children: ReactNode;
  onOpen?: (loreId: string) => void;
}) {
  return (
    <LoreReferenceContext.Provider
      value={{ onOpen: onOpen ?? (() => {}), enabled: Boolean(onOpen) }}
    >
      {children}
    </LoreReferenceContext.Provider>
  );
}

export function useLoreReference() {
  return useContext(LoreReferenceContext);
}
