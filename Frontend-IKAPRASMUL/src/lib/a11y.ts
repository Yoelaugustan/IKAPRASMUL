import type { KeyboardEvent } from "react";

// Makes a non-button element (a clickable card that wraps its own buttons, so
// it can't itself be a <button>) keyboard-operable: Enter/Space fire the same
// action as a click. Pair with role="button" + tabIndex={0}.
export function onActivate(action: () => void) {
  return (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };
}
