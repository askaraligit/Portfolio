"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "./project-visual";
import styles from "./hero-featured.module.css";

export default function HeroFeatured({ projects }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [focusedProject, setFocusedProject] = useState(null);
  const featured = projects.slice(0, 4);
  const activeProject = hoveredProject ?? focusedProject;

  const closePreview = () => {
    setHoveredProject(null);
    setFocusedProject(null);
  };

  return (
    <>
      <div className={styles.backdrops} aria-hidden="true">
        {featured.map((project) => (
          <div
            className={styles.backdrop}
            data-active={activeProject === project.number}
            key={project.number}
            style={{ "--preview-accent": `var(--${project.accent})` }}
          >
            <div className={styles.previewMeta}>
              <span>Selected project / {project.number}</span>
              <span>{project.type}</span>
            </div>
            <div className={styles.previewVisual}>
              <ProjectVisual type={project.visual} />
            </div>
            <div className={styles.previewTitle}>
              <span>{project.name}</span>
              <ArrowUpRight strokeWidth={1} />
            </div>
          </div>
        ))}
      </div>

      <nav className={styles.featured} aria-label="Featured projects" data-previewing={activeProject !== null}>
        <span className={styles.label}>Featured work <ArrowUpRight size={12} aria-hidden="true" /></span>
        <div className={styles.thumbnails}>
          {featured.map((project, index) => (
            <a
              className={styles.thumbnail}
              href={`#project-${project.number}`}
              aria-label={`View ${project.name}`}
              data-active={activeProject === project.number}
              key={project.number}
              style={{ "--preview-accent": `var(--${project.accent})`, "--preview-index": index }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse" || event.pointerType === "pen") {
                  setHoveredProject(project.number);
                }
              }}
              onPointerLeave={() => setHoveredProject(null)}
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) {
                  setFocusedProject(project.number);
                }
              }}
              onBlur={() => setFocusedProject(null)}
              onClick={closePreview}
            >
              <div className={styles.thumbnailVisual}><ProjectVisual type={project.visual} /></div>
              <span className={styles.number} aria-hidden="true">{project.number}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
