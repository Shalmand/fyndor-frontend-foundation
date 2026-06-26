/**
 * Compute pixel coordinates of the caret inside a <textarea>,
 * relative to the textarea's own top-left corner.
 *
 * Implementation uses a hidden mirror <div> that copies the textarea's
 * layout-affecting computed styles, writes the same prefix text, and
 * measures a marker <span> at the caret offset.
 */
export interface CaretCoords {
  top: number;
  left: number;
  height: number;
}

const COPIED_STYLES = [
  "boxSizing",
  "width",
  "height",
  "overflowX",
  "overflowY",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "fontStretch",
  "fontSize",
  "lineHeight",
  "fontFamily",
  "textAlign",
  "textTransform",
  "textIndent",
  "letterSpacing",
  "wordSpacing",
  "tabSize",
  "whiteSpace",
  "wordWrap",
] as const;

export function getCaretCoords(
  el: HTMLTextAreaElement,
  position: number,
): CaretCoords {
  if (typeof document === "undefined") return { top: 0, left: 0, height: 0 };
  const style = window.getComputedStyle(el);
  const mirror = document.createElement("div");

  for (const key of COPIED_STYLES) {
    // @ts-expect-error — index access into CSSStyleDeclaration
    mirror.style[key] = style[key];
  }
  mirror.style.position = "absolute";
  mirror.style.visibility = "hidden";
  mirror.style.whiteSpace = "pre-wrap";
  mirror.style.wordWrap = "break-word";
  mirror.style.top = "0";
  mirror.style.left = "-9999px";

  // Replace whitespace with a non-breaking marker for accurate wrap.
  const before = el.value.substring(0, position);
  mirror.textContent = before;

  const marker = document.createElement("span");
  marker.textContent = el.value.substring(position) || ".";
  mirror.appendChild(marker);

  document.body.appendChild(mirror);

  const lineHeight = parseFloat(style.lineHeight || "20") || 20;
  const coords: CaretCoords = {
    top: marker.offsetTop - el.scrollTop,
    left: marker.offsetLeft - el.scrollLeft,
    height: lineHeight,
  };

  document.body.removeChild(mirror);
  return coords;
}
