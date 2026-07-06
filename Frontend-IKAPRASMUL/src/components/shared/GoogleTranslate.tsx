"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useLang } from "./LanguageProvider";

const NON_PUBLIC_PREFIXES = ["/admin", "/login", "/forgot-password", "/reset-password"];

/**
 * When Google Translate is active it splits every text node into <font>-wrapped
 * fragments directly in the live DOM. React's reconciler still holds references
 * to the *original* nodes, so on the next commit (any client-side navigation —
 * a <Link> click, a router.push() from a button, even browser back/forward) it
 * calls removeChild/insertBefore expecting the DOM to still match its virtual
 * tree. It doesn't, so the browser throws NotFoundError and the tab crashes
 * ("This page couldn't load").
 *
 * This app navigates through many paths beyond <Link> — sort/filter/pagination
 * are router.push() calls from plain buttons and Radix Selects — so intercepting
 * clicks can't cover every case. The actual fix is to make the two DOM methods
 * React relies on tolerate a node that isn't where React thinks it is, instead
 * of throwing. This is the standard, widely-used patch for this exact React +
 * Google Translate conflict. Applied once at module load (not inside an effect)
 * so it's active before React's first commit and isn't re-applied on remounts.
 */
function patchDomForGoogleTranslate() {
  if (typeof window === "undefined" || typeof Node !== "function") return;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) {
      // Google Translate already moved/removed this node — nothing to do.
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    referenceNode: Node | null,
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      // React's reference point no longer exists in this parent — append
      // instead of throwing, so the tree stays close to what React intended.
      return this.appendChild(newNode) as T;
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

patchDomForGoogleTranslate();

// Clears the cookie Google sets when translating, so a reload/refresh doesn't
// silently re-translate after the user has switched back to Indonesian.
function clearGoogTransCookie() {
  const expired = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  const host = window.location.hostname;
  document.cookie = `googtrans=; ${expired}`;
  document.cookie = `googtrans=; ${expired}; domain=${host}`;
  document.cookie = `googtrans=; ${expired}; domain=.${host}`;
}

// True when the page is currently machine-translated (Google sets a
// `googtrans=/id/en` cookie and holds "en" in its hidden combo).
function isTranslationActive(): boolean {
  if (document.cookie.includes("googtrans=/")) return true;
  const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  return select?.value === "en";
}

/**
 * Triggering translation via the hidden combo (instead of a real click on
 * Google's own dropdown) still makes the widget show its "Translated to:
 * English" banner and shifts the page down. CSS alone races against Google's
 * own injected styles, so we forcibly re-hide it (inline !important beats every
 * stylesheet) whenever the DOM changes.
 */
function suppressGoogleBanner() {
  document
    .querySelectorAll<HTMLElement>(
      ".goog-te-banner-frame, iframe.goog-te-banner-frame, iframe.skiptranslate, .goog-te-banner-frame.skiptranslate",
    )
    .forEach((el) => {
      el.style.setProperty("display", "none", "important");
      el.style.setProperty("visibility", "hidden", "important");
      el.style.setProperty("height", "0", "important");
    });

  // Google offsets the whole page down (body { top: 40px }) to make room for the
  // banner — force it back so the fixed header isn't pushed under the viewport.
  document.body.style.setProperty("top", "0", "important");
  document.documentElement.style.setProperty("top", "0", "important");

  // Hover tooltip Google shows over translated words.
  const tooltip = document.getElementById("goog-gt-tt");
  if (tooltip) tooltip.style.setProperty("display", "none", "important");
}

/**
 * Runs Google's classic website-translator widget in the background to
 * auto-translate CMS-authored content (stories, news, business profiles —
 * always written in Indonesian) when the language toggle is set to English.
 * Our own dictionary already covers static chrome (header/footer/labels), so
 * those are marked `notranslate` to avoid a redundant/garbled double-pass.
 */
export function GoogleTranslate() {
  const { lang } = useLang();
  const pathname = usePathname();
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isPublicRoute = !NON_PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
  const target: "en" | "id" = isPublicRoute && lang === "en" ? "en" : "id";

  useEffect(() => {
    if (pollRef.current) clearInterval(pollRef.current);

    if (target === "en") {
      // Translate in place: poll until the widget's combo exists *and* Google
      // has actually populated it with an "en" option. On a cold first load
      // the <select> appears before that (it needs an extra round-trip to
      // Google's server for the language list), so setting .value = "en" too
      // early silently no-ops — the dispatched change event fires on a value
      // that never actually changed. By the time a user manually toggles
      // ID -> EN later the widget has long since finished initializing, which
      // is why this only seemed to fail on the very first automatic load.
      let attempts = 0;
      pollRef.current = setInterval(() => {
        attempts += 1;
        const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        const hasEnglishOption = !!select?.querySelector('option[value="en"]');
        if (select && hasEnglishOption) {
          if (select.value !== "en") {
            select.value = "en";
            select.dispatchEvent(new Event("change"));
          }
          if (pollRef.current) clearInterval(pollRef.current);
        } else if (attempts > 60) {
          if (pollRef.current) clearInterval(pollRef.current);
        }
      }, 250);
      return () => {
        if (pollRef.current) clearInterval(pollRef.current);
      };
    }

    // target === "id": restore the original. Google removes the combo's "no
    // translation" option once it has translated, so there's no in-place undo —
    // clear the cookie it set and reload. The lang=id cookie (already written by
    // LanguageProvider) makes the fresh page render Indonesian and stay
    // untranslated. Guarded so a normal Indonesian page doesn't reload-loop.
    if (isTranslationActive()) {
      clearGoogTransCookie();
      window.location.reload();
    }
  }, [target]);

  // Runs once for the app's lifetime: keeps Google's translate banner and the
  // body offset it injects permanently suppressed, however/whenever they appear.
  useEffect(() => {
    suppressGoogleBanner();
    const observer = new MutationObserver(suppressGoogleBanner);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    // Fallback sweeps in case the observer misses Google's initial injection.
    const timers = [200, 600, 1200, 2500].map((ms) =>
      setTimeout(suppressGoogleBanner, ms),
    );
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <div id="google_translate_element" className="hidden" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              { pageLanguage: 'id', includedLanguages: 'en', autoDisplay: false },
              'google_translate_element'
            );
          }
        `}
      </Script>
      <Script
        id="google-translate-widget"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
