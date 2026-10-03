"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ProjectVisual from "./project-visual";
import RollingText from "./rolling-text";
import { scrollPageTo } from "./smooth-scroll";
import styles from "./project-showcase.module.css";

const STACK_QUERY = "(min-width: 1000px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)";

function subscribeToStackLayout(callback) {
  const query = window.matchMedia(STACK_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getStackLayout() {
  return window.matchMedia(STACK_QUERY).matches;
}

function getServerLayout() {
  return false;
}

function ProgressSegment({ progress, index, count }) {
  const scaleX = useTransform(progress, [index / count, (index + 1) / count], [0, 1]);

  return <span className={styles.progressSegment}><motion.i style={{ scaleX }} /></span>;
}

function ProjectPanel({ project, index, count, enhanced, progress, revealPanel }) {
  // Complementary masks reveal the next composition without moving its text.
  const clipPath = useTransform(progress, (value) => {
    // Native scroll positions round to pixels; keep a fully arrived panel uncut.
    const position = Math.abs(value - Math.round(value)) < 0.001 ? Math.round(value) : value;
    const top = index === 0 ? 0 : Math.min(1, Math.max(0, index - position)) * 100;
    const bottom = index === count - 1 ? 0 : Math.min(1, Math.max(0, position - index)) * 100;
    return `inset(${top}% 0 ${bottom}% 0)`;
  });
  const visualScale = useTransform(progress, [index - 1, index, index + 1], [1.08, 1, 1]);

  const revealFocusedPanel = (event) => {
    if (!enhanced || !event.target.matches(":focus-visible")) return;
    revealPanel(index);
  };

  return (
    <motion.article
      id={`project-${project.number}`}
      tabIndex={-1}
      className={styles.stage}
      style={{ "--project-order": index, ...(enhanced ? { clipPath } : {}) }}
      onFocusCapture={revealFocusedPanel}
      aria-labelledby={`project-title-${project.number}`}
    >
      <div
        className={`${styles.card} project-${project.accent}`}
        data-project-panel="true"
        style={{ "--scene-accent": `var(--${project.accent})` }}
      >
        <div className={styles.sceneBackdrop} aria-hidden="true">
          <div><ProjectVisual type={project.visual} /></div>
        </div>
        <div className={`${styles.visual} project-card-visual`}>
          <div className="project-index"><span>Project / {project.number}</span><span>{project.year}</span></div>
          <span className={styles.backdropNumber} aria-hidden="true">{project.number}</span>
          <motion.div className={styles.visualInner} style={enhanced ? { scale: visualScale } : undefined}>
            <ProjectVisual type={project.visual} />
          </motion.div>
          <div className={styles.visualHover} aria-hidden="true">
            <div><ProjectVisual type={project.visual} /></div>
            <span>{project.outcome}</span>
          </div>
          <div className={styles.visualCaption} aria-hidden="true"><span>Selected work</span><span>Design &amp; engineering</span></div>
        </div>
        <div className={`${styles.copy} project-card-copy`}>
          <p className="eyebrow">{project.type}</p>
          <h3 id={`project-title-${project.number}`}>{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <p className="project-outcome"><span>Outcome</span>{project.outcome}</p>
          <div className="project-tags" aria-label={`${project.name} features`}>
            {project.features.map((feature) => <span key={feature}>{feature}</span>)}
          </div>
          <a className="project-link" href="#contact" aria-label={`Discuss a project like ${project.name}`}>
            <RollingText>Discuss a similar project</RollingText><ArrowUpRight size={19} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectShowcase({ projects, children }) {
  const showcaseRef = useRef(null);
  const introRef = useRef(null);
  const headerRef = useRef(null);
  const desktopMotion = useSyncExternalStore(subscribeToStackLayout, getStackLayout, getServerLayout);
  const [layout, setLayout] = useState({ fits: false, panelHeight: 0, frameHeight: 0 });
  const enhanced = desktopMotion && layout.fits && projects.length > 1;
  const distance = layout.panelHeight * projects.length;
  const { scrollY } = useScroll();
  const [start, setStart] = useState(0);
  const initialHashHandled = useRef(false);
  const scrollYProgress = useTransform(scrollY, (value) => Math.min(1, Math.max(0, (value - start) / (distance || 1))));
  // Leave a short pause with the first and last panels fully in view.
  const progress = useTransform(scrollYProgress, [0, 1], [-0.5, projects.length - 0.5]);

  useEffect(() => {
    const showcase = showcaseRef.current;
    const panels = [...showcase.querySelectorAll("[data-project-panel]")];
    let frame;
    const checkFit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const panelHeight = Math.max(0, ...panels.map((panel) => panel.offsetHeight));
        // The introduction is outside the pinned scene; its navigation overlays the scene.
        const frameHeight = panelHeight;
        const fits = frameHeight <= window.innerHeight;
        setLayout((previous) => previous.fits === fits && previous.panelHeight === panelHeight && previous.frameHeight === frameHeight
          ? previous : { fits, panelHeight, frameHeight });
        setStart(showcase.getBoundingClientRect().top + window.scrollY);
      });
    };
    const observer = new ResizeObserver(checkFit);
    [introRef.current, headerRef.current, document.body, ...panels].forEach((element) => observer.observe(element));
    window.addEventListener("resize", checkFit);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", checkFit);
    };
  }, [projects]);

  useEffect(() => {
    if (!layout.panelHeight) return;
    let cancelled = false;
    let initialFrame;
    const navigate = (hash, immediate = false) => {
      const index = projects.findIndex((project) => hash === `#project-${project.number}`);
      if (index < 0) return false;
      const target = document.getElementById(hash.slice(1));
      const header = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 76;
      const top = enhanced ? start + (index + 0.5) * layout.panelHeight
        : target.getBoundingClientRect().top + window.scrollY - header - 18;
      scrollPageTo(Math.max(0, top), { immediate, onComplete: () => target.focus({ preventScroll: true }) });
      return true;
    };
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest("a[href^='#project-']");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      if (navigate(link.hash)) {
        event.preventDefault();
        if (window.location.hash !== link.hash) window.history.pushState(null, "", link.hash);
      }
    };
    const onHashChange = () => navigate(window.location.hash, true);
    const restoreInitialHash = () => {
      document.fonts.ready.then(() => {
        if (cancelled || initialHashHandled.current) return;
        // Let the browser finish its native fragment jump and the grid settle.
        initialFrame = requestAnimationFrame(() => {
          initialFrame = requestAnimationFrame(() => {
            initialHashHandled.current = true;
            onHashChange();
          });
        });
      });
    };
    if (document.readyState === "complete") restoreInitialHash();
    else window.addEventListener("load", restoreInitialHash, { once: true });
    // Capture these before the general smooth-anchor handler: stacked cards share a position.
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelled = true;
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("load", restoreInitialHash);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [enhanced, layout.panelHeight, projects, start]);

  const revealPanel = (index) => {
    const top = start + (index + 0.5) * layout.panelHeight;
    scrollPageTo(Math.max(0, top), { immediate: true });
  };

  return (
    <>
      <div ref={introRef} className={styles.intro}>{children}</div>
      <div ref={showcaseRef} className={styles.showcase} data-enhanced={enhanced} style={enhanced ? { height: layout.frameHeight + distance } : undefined}>
        <div className={styles.frame}>
          <div ref={headerRef} className={styles.deckHeader} aria-hidden="true">
            <span className={styles.headerLabel}>A closer look <ArrowDown size={12} /></span>
            <div className={styles.progressRail}>
              {projects.map((project, index) => <ProgressSegment key={project.number} progress={scrollYProgress} index={index} count={projects.length} />)}
            </div>
            <span className={styles.headerCount}>{String(projects.length).padStart(2, "0")} projects</span>
          </div>
          <div className={styles.viewport}>
            {projects.map((project, index) => (
              <ProjectPanel key={project.number} project={project} index={index} count={projects.length} enhanced={enhanced} progress={progress} revealPanel={revealPanel} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
