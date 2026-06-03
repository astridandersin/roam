"use client";

import { useEffect } from "react";

/**
 * Locks scrolling on the underlying page while a modal is open.
 *
 * The previous per-modal "save & restore" pattern broke in dev because
 * the modal's `useEffect` deps included a freshly-created `onClose`
 * callback on every parent render. If the parent re-rendered while the
 * modal was open, the cleanup would re-fire and re-capture the
 * already-locked `overflow: hidden` value as the "previous" state,
 * leaking the lock past the close.
 *
 * This hook uses a module-scoped reference count instead:
 *   - The first modal to open captures the truly-original overflow value
 *     and locks the body.
 *   - Subsequent modals just bump the counter.
 *   - When the counter drops back to zero (all modals closed), the
 *     original overflow value is restored.
 *
 * It also avoids re-running on every render: the hook is keyed only on
 * the boolean `active`, not on the parent's callback references.
 */

let lockCount = 0;
let savedOverflow: string | null = null;

export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (typeof document === "undefined") return;

    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Tag the body so CSS can pause background animations while any
      // modal is open. The marquee, FlipText shimmer, etc. are still
      // animating behind the blurred backdrop and force the GPU to
      // re-rasterise the backdrop every frame, which is the single
      // biggest source of modal lag on lower-end devices.
      document.body.setAttribute("data-modal-open", "true");
    }
    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = savedOverflow ?? "";
        savedOverflow = null;
        document.body.removeAttribute("data-modal-open");
      }
    };
  }, [active]);
}
