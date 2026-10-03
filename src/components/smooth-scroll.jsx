"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let controller = null;

export function scrollPageTo(top, { immediate = false, onComplete } = {}) {
  if (controller) {
    controller.scrollTo(top, { immediate, duration: 1, onComplete });
  } else {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: immediate || reducedMotion ? "instant" : "smooth" });
    onComplete?.();
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const syncMenu = () => {
      if (document.body.classList.contains("menu-is-open")) controller?.stop();
      else controller?.start();
    };
    const configure = () => {
      controller?.destroy();
      controller = media.matches ? new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 0.7, syncTouch: false }) : null;
      syncMenu();
    };
    const navigate = (event) => {
      if (!controller || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a[href^='#']");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      syncMenu();
      const header = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 76;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - header - 18);
      if (window.location.hash !== link.hash) window.history.pushState(null, "", link.hash);
      scrollPageTo(top, { onComplete: () => {
        // Match native anchor navigation for keyboard and screen-reader users.
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      } });
    };
    const interruptForKeyboard = (event) => {
      if (["Tab", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        controller?.scrollTo(window.scrollY, { immediate: true });
      }
    };
    configure();
    const observer = new MutationObserver(syncMenu);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    media.addEventListener("change", configure);
    document.addEventListener("click", navigate);
    document.addEventListener("keydown", interruptForKeyboard);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", configure);
      document.removeEventListener("click", navigate);
      document.removeEventListener("keydown", interruptForKeyboard);
      controller?.destroy();
      controller = null;
    };
  }, []);

  return null;
}
