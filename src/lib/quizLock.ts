let popHandler: ((e: PopStateEvent) => void) | null = null;
let clickHandler: ((e: MouseEvent) => void) | null = null;
let beforeUnloadHandler: ((e: BeforeUnloadEvent) => void) | null = null;

// Extend the Window interface to safely store our flag
declare global {
  interface Window {
    __QUIZ_LOCK_ENABLED?: boolean;
  }
}

export function enableQuizLock(): void {
  if (typeof window === "undefined") return;

  // Already enabled?
  if (window.__QUIZ_LOCK_ENABLED) return;

  // Push a dummy state so back button won't leave immediately
  history.pushState(null, "", location.href);

  // Handle back button
  popHandler = (_e: PopStateEvent) => {
    history.pushState(null, "", location.href);
    window.dispatchEvent(new CustomEvent("quiz:blocked"));
  };
  window.addEventListener("popstate", popHandler);

  // Prevent internal anchor navigation
  clickHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest("a") as HTMLAnchorElement | null;
    if (anchor && anchor.hostname === location.hostname) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("quiz:blocked"));
    }
  };
  window.addEventListener("click", clickHandler, true);

  // Beforeunload: browser confirmation
  beforeUnloadHandler = (ev: BeforeUnloadEvent) => {
    ev.preventDefault();
    ev.returnValue = "";
  };
  window.addEventListener("beforeunload", beforeUnloadHandler);

  // Add body class for UI styling
  document.body.classList.add("quiz-active");

  // Request fullscreen (must be user gesture)
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {
      /* ignore */
    });
  }

  window.__QUIZ_LOCK_ENABLED = true;
}

export function disableQuizLock(): void {
  if (typeof window === "undefined") return;

  if (popHandler) {
    window.removeEventListener("popstate", popHandler);
    popHandler = null;
  }

  if (clickHandler) {
    window.removeEventListener("click", clickHandler, true);
    clickHandler = null;
  }

  if (beforeUnloadHandler) {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    beforeUnloadHandler = null;
  }

  document.body.classList.remove("quiz-active");

  // Exit fullscreen if active
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }

  window.__QUIZ_LOCK_ENABLED = false;
  window.dispatchEvent(new CustomEvent("quiz:unblocked"));
}
