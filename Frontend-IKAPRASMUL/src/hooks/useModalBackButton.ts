import { useEffect, useRef } from "react";

/**
 * Makes the browser/device Back button close an open modal instead of
 * navigating to the previous page (the expected behaviour on mobile).
 *
 * While `open` is true we push a throwaway history entry. Pressing Back pops it
 * and fires `popstate`, which we use to close the modal. If the modal is closed
 * any other way (X button, overlay, ESC), we remove that entry on cleanup so the
 * history stack stays balanced.
 */
export function useModalBackButton(
  open: boolean | undefined,
  onOpenChange?: (open: boolean) => void,
) {
  // Keep the latest callback without re-running the effect (which would push a
  // duplicate history entry on every render).
  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    let closedByBack = false;
    window.history.pushState(null, "");

    const handlePopState = () => {
      closedByBack = true;
      onOpenChangeRef.current?.(false);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      // Closed by something other than Back (X / overlay / ESC): drop the entry
      // we added so we don't leave a dead step in the history stack.
      if (!closedByBack) window.history.back();
    };
  }, [open]);
}
