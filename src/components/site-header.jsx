"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RollingText from "./rolling-text";
import ThemeToggle from "./theme-toggle";
import styles from "./site-header.module.css";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef(null);
  const menuToggleRef = useRef(null);
  const desktopLinksRef = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);
    let frame = 0;

    const updateNavigation = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);

      // Track section starts so even a several-screen sticky section stays active.
      const readingLine = window.innerHeight * 0.35;
      const bounds = sections.map((section) => section.getBoundingClientRect());
      const documentEnd = document.documentElement.scrollHeight - window.scrollY;
      let current = "";
      sections.forEach((section, index) => {
        const start = bounds[index].top;
        const end = bounds[index + 1]?.top ?? documentEnd - window.innerHeight + readingLine;
        const progress = Math.min(1, Math.max(0, (readingLine - start) / Math.max(1, end - start)));
        desktopLinksRef.current[index]?.style.setProperty("--section-progress", progress.toFixed(4));
        if (start <= readingLine) current = section.id;
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections.at(-1)?.id || current;
      }
      setActive(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateNavigation);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let focusFrame = 0;
    const onKeyDown = (event) => {
      if (!menuOpen) return;
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const focusable = Array.from(
          headerRef.current?.querySelectorAll('a[href], button:not([disabled])') || [],
        ).filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const desktop = window.matchMedia("(min-width: 761px)");
    const onViewportChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.body.classList.toggle("menu-is-open", menuOpen);
    if (menuOpen) {
      focusFrame = window.requestAnimationFrame(() => {
        headerRef.current?.querySelector('#mobile-navigation > a')?.focus();
      });
    }
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove("menu-is-open");
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    // Release scrolling before the browser follows a native section anchor.
    document.body.classList.remove("menu-is-open");
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`site-header ${styles.header} ${scrolled ? "is-scrolled" : ""}`}
      data-menu-open={menuOpen}
    >
      <a className="brand" href="#top" onClick={closeMenu} aria-label="Askar, back to top">
        ASKAR<span>®</span>
      </a>

      <nav className={`desktop-nav ${styles.navigation}`} aria-label="Primary navigation">
        {links.map(({ href, label }, index) => (
          <a
            key={href}
            ref={(element) => { desktopLinksRef.current[index] = element; }}
            href={href}
            className={`${styles.link} ${active === href.slice(1) ? "active" : ""}`}
            aria-current={active === href.slice(1) ? "location" : undefined}
          >
            <small className={styles.index} aria-hidden="true">0{index + 1}</small>
            <RollingText>{label}</RollingText>
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className={`mobile-nav ${styles.mobile}`}
            aria-label="Mobile navigation"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: {
                opacity: 0,
                clipPath: reducedMotion ? "none" : "inset(0 0 100% 0)",
                transition: { duration: reducedMotion ? 0 : 0.3 },
              },
              open: {
                opacity: 1,
                clipPath: reducedMotion ? "none" : "inset(0 0 0% 0)",
                transition: {
                  duration: reducedMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delayChildren: reducedMotion ? 0 : 0.1,
                  staggerChildren: reducedMotion ? 0 : 0.055,
                },
              },
            }}
          >
            <span className="eyebrow">Menu / Navigate</span>
            {links.map(({ href, label }, index) => (
              <motion.a
                key={href}
                href={href}
                className={styles.mobileLink}
                onClick={closeMenu}
                aria-current={active === href.slice(1) ? "location" : undefined}
                variants={{
                  closed: { opacity: 0, y: reducedMotion ? 0 : 28 },
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <small aria-hidden="true">0{index + 1}</small>
                <RollingText className={styles.mobileText}>{label}</RollingText>
              </motion.a>
            ))}
            <div className="mobile-nav-meta">
              <span>India · Worldwide</span>
              <a href="mailto:mamohamedaskarali@gmail.com">mamohamedaskarali@gmail.com</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
