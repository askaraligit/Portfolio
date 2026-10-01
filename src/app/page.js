"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, MoveRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  { number: "01", year: "2025", name: "Task Manager", type: "Web application · Productivity", accent: "coral", description: "A collaborative workspace for creating tasks, tracking live time, chatting with the team, and comparing actual duration with estimated hours.", features: ["Task creation", "Live timesheets", "Team chat", "Estimates"] },
  { number: "02", year: "2025", name: "Low-Code ERP", type: "Enterprise platform · Full stack", accent: "lime", description: "A configurable ERP platform with dynamic forms, reusable components, RBAC, approval workflows, and real-time records in tables, calendars, Kanban boards, and maps.", features: ["Dynamic forms", "RBAC", "Workflow builder", "Real-time"] },
  { number: "03", year: "2025", name: "Multi-Org ERP & Tally", type: "Business systems · Full stack", accent: "sky", description: "A multi-organization ERP covering sales, purchases, inventory, invoicing, ledgers, and bi-directional Tally synchronization with operational reporting.", features: ["Tally sync", "Inventory", "Invoicing", "Reporting"] },
  { number: "04", year: "2024", name: "Digi Facility", type: "CAFM · Operations", accent: "coral", description: "An end-to-end facility-management application for work orders, technician assignment, progress tracking, preventive maintenance, and vendor workflows.", features: ["Work orders", "Maintenance", "Live tracking", "JWT auth"] },
  { number: "05", year: "2024", name: "Digicognit Website", type: "Corporate site · Next.js", accent: "lime", description: "A fast, SEO-focused corporate website with regional localisation, product-demo booking, content publishing, and a guided chatbot journey.", features: ["SEO", "Cal.com", "CMS", "Chatbot"] },
];

const skills = ["JavaScript", "React", "Next.js", "Node.js", "UI Engineering", "Product Thinking", "REST APIs", "Responsive Design"];

function Reveal({ children, className = "", delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.accent} card-${project.number}`}>
      <div className="project-top"><span>{project.number}</span><span>{project.year}</span></div>
      <div className="project-art" aria-hidden="true"><span className="orb one" /><span className="orb two" /><span className="grid-lines" /><span className="art-readout">{project.features?.[0] || "Digital product"}</span></div>
      <div className="project-copy"><p>{project.type}</p><h3>{project.name}</h3><span>{project.description}</span>{project.features && <div className="project-features">{project.features.map((feature) => <small key={feature}>{feature}</small>)}</div>}<button aria-label={`View ${project.name}`}><ArrowUpRight size={22} /></button></div>
    </article>
  );
}

function ProjectsIntro() {
  const introRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: introRef, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 0.48, 1], [90, 0, -70]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const markX = useTransform(scrollYProgress, [0, 1], [-170, 145]);
  const lineScale = useTransform(scrollYProgress, [0.12, 0.52], [0, 1]);

  return (
    <section className="projects-intro" ref={introRef} aria-label="Projects introduction">
      <motion.div className="projects-mark" style={{ x: markX }} aria-hidden="true">PROJECTS</motion.div>
      <motion.div className="projects-intro-content" style={{ y: titleY, opacity: titleOpacity }}>
        <p>(Five selected digital products)</p>
        <h2>Made for real<br /><em>work.</em></h2>
        <div className="projects-intro-bottom">
          <motion.i style={{ scaleX: lineScale }} />
          <span>From productivity tools to connected business systems.</span>
          <strong>01 — 05</strong>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const workRef = useRef(null);
  const aboutRef = useRef(null);
  const processRef = useRef(null);
  const contactRef = useRef(null);
  const [pointer, setPointer] = useState({ x: -100, y: -100 });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const wordY = useTransform(heroProgress, [0, 1], [0, 120]);
  const sideY = useTransform(heroProgress, [0, 1], [0, -80]);
  const ringsScale = useTransform(heroProgress, [0, 1], [1, 1.32]);
  const ringsRotate = useTransform(heroProgress, [0, 1], [0, 14]);
  const ringsX = useTransform(heroProgress, [0, 1], [0, 105]);
  const introX = useTransform(heroProgress, [0, 1], [0, 90]);
  const nameScale = useTransform(heroProgress, [0, 1], [1, 0.88]);
  const nameOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);
  const footerY = useTransform(heroProgress, [0, 1], [0, 65]);
  const { scrollYProgress: workProgress } = useScroll({ target: workRef, offset: ["start end", "end start"] });
  const workTitleY = useTransform(workProgress, [0, 0.38, 1], [105, 0, -85]);
  const workTitleOpacity = useTransform(workProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0]);
  const workMarkX = useTransform(workProgress, [0, 1], [-190, 160]);
  const workOrbitRotate = useTransform(workProgress, [0, 1], [-24, 150]);
  const workOrbitScale = useTransform(workProgress, [0, 1], [0.78, 1.18]);
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutTitleX = useTransform(aboutProgress, [0, 0.45, 1], [-115, 0, 80]);
  const aboutTitleY = useTransform(aboutProgress, [0, 0.45, 1], [75, 0, -48]);
  const aboutBodyY = useTransform(aboutProgress, [0, 0.42, 1], [120, 0, -70]);
  const aboutBodyOpacity = useTransform(aboutProgress, [0, 0.15, 0.84, 1], [0, 1, 1, 0]);
  const aboutOrbitRotate = useTransform(aboutProgress, [0, 1], [-45, 170]);
  const aboutOrbitScale = useTransform(aboutProgress, [0, 1], [0.7, 1.25]);
  const { scrollYProgress: processProgress } = useScroll({ target: processRef, offset: ["start end", "end start"] });
  const processTitleY = useTransform(processProgress, [0, 0.42, 1], [90, 0, -70]);
  const processRowsY = useTransform(processProgress, [0, 0.4, 1], [110, 0, -55]);
  const processMarkX = useTransform(processProgress, [0, 1], [155, -170]);
  const { scrollYProgress: contactProgress } = useScroll({ target: contactRef, offset: ["start end", "end start"] });
  const contactTitleY = useTransform(contactProgress, [0, 0.42, 1], [115, 0, -62]);
  const contactMarkX = useTransform(contactProgress, [0, 1], [-180, 150]);
  const contactOrbitRotate = useTransform(contactProgress, [0, 1], [20, 210]);
  const contactBottomY = useTransform(contactProgress, [0, 0.55, 1], [70, 0, -25]);

  useEffect(() => {
    const movePointer = (event) => setPointer({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", movePointer);
    return () => window.removeEventListener("pointermove", movePointer);
  }, []);

  return (
    <main>
      <motion.div className="cursor-glow" animate={{ x: pointer.x - 160, y: pointer.y - 160 }} transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.25 }} />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <nav className="nav"><a className="brand" href="#top">ASKAR<span>®</span></a><div className={`nav-links ${menuOpen ? "open" : ""}`}><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div><button className="menu" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu size={24} /></button></nav>

      <section className="hero" id="top" ref={heroRef}>
        <motion.div className="hero-rings" style={{ scale: ringsScale, rotate: ringsRotate, x: ringsX }} aria-hidden="true"><i /><b /></motion.div>
        <motion.div className="hero-label" style={{ y: sideY }}><span className="pulse" /> Available for select projects <span>2025 — 26</span></motion.div>
        <motion.p className="hero-intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ x: introX }} transition={{ delay: 0.5, duration: 0.7 }}>I make digital products that are<br />clear, capable, and quietly memorable.</motion.p>
        <motion.div className="hero-name" style={{ y: wordY, scale: nameScale, opacity: nameOpacity }}><motion.h1 initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}>ASKAR</motion.h1><motion.div className="hero-role" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}><Sparkles size={17} /> DESIGNING / BUILDING</motion.div></motion.div>
        <motion.div className="hero-footer" style={{ y: footerY, opacity: nameOpacity }}><a href="#work" className="scroll-link"><span className="scroll-glyph">N</span> Scroll to explore <ArrowDownRight size={18} /></a><span>Portfolio / 2025</span><span className="location">Based in India · Working everywhere</span></motion.div>
        <motion.div className="hero-star" style={{ y: sideY }}>✳</motion.div>
      </section>

      <section className="marquee" aria-label="Skills"><div>{[...skills, ...skills].map((skill, index) => <span key={`${skill}-${index}`}>{skill} <i>✦</i></span>)}</div></section>

      <motion.section ref={workRef} className="work section" id="work">
        <motion.div className="work-intro" style={{ y: workTitleY, opacity: workTitleOpacity }}><motion.div className="work-mark" style={{ x: workMarkX }} aria-hidden="true">WORK</motion.div><motion.div className="work-orbit" style={{ rotate: workOrbitRotate, scale: workOrbitScale }} aria-hidden="true"><i /><b /><span>✳</span></motion.div><div className="section-heading work-heading"><p>(Selected work)</p><h2>Ideas, shaped<br />into <em>impact.</em></h2><span>01 — 05</span></div></motion.div>
        <ProjectsIntro />
        <div className="projects work-grid">{projects.map((project) => <ProjectCard project={project} key={project.number} />)}</div>
      </motion.section>

      <motion.section ref={aboutRef} className="about section" id="about">
        <motion.div className="about-mark" style={{ x: aboutTitleX }} aria-hidden="true">ABOUT</motion.div>
        <motion.div className="about-orbit" style={{ rotate: aboutOrbitRotate, scale: aboutOrbitScale }} aria-hidden="true"><i /><b /><span>✳</span></motion.div>
        <motion.div className="about-sticky" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} style={{ x: aboutTitleX, y: aboutTitleY }}><p>(A little about me)</p><h2>Built around<br /><em>curiosity.</em></h2></motion.div>
        <motion.div className="about-body" style={{ y: aboutBodyY, opacity: aboutBodyOpacity }}><Reveal><p className="statement">I&apos;m a developer who enjoys the space where sharp engineering meets thoughtful design.</p></Reveal><Reveal delay={0.12}><p>I use a practical, detail-led approach to create responsive web experiences that solve real problems. Every project is a chance to make technology feel more intuitive.</p></Reveal><Reveal className="skill-cloud" delay={0.18}>{skills.map((skill) => <span key={skill}>{skill}</span>)}</Reveal></motion.div>
      </motion.section>

      <motion.section ref={processRef} className="process section"><motion.div className="process-mark" style={{ x: processMarkX }} aria-hidden="true">METHOD</motion.div><motion.div className="process-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} style={{ y: processTitleY }}><p>(My approach)</p><h2>Good work has<br />a <em>rhythm.</em></h2></motion.div><motion.div className="process-list" style={{ y: processRowsY }}>
        {[['01', 'Listen closely', 'Start with the people, the problem, and what success really needs to look like.'], ['02', 'Make it clear', 'Turn complex ideas into an interface with hierarchy, flow, and a strong visual point of view.'], ['03', 'Ship with care', 'Build responsive, maintainable experiences that feel as good in the hand as they do on the screen.']].map(([number, title, copy]) => <Reveal className="process-row" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><ArrowDownRight size={22} /></Reveal>)}
      </motion.div></motion.section>

      <motion.section ref={contactRef} className="contact" id="contact"><motion.div className="contact-mark" style={{ x: contactMarkX }} aria-hidden="true">HELLO</motion.div><motion.div className="contact-orbit" style={{ rotate: contactOrbitRotate }} aria-hidden="true"><i /><span>✳</span></motion.div><motion.div className="contact-main" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} style={{ y: contactTitleY }}><p>(Let&apos;s make something good)</p><h2>Have a project<br />in <em>mind?</em></h2><a className="email-link" href="mailto:hello@askar.dev">Let&apos;s talk <MoveRight size={30} /></a></motion.div><motion.div className="contact-bottom" style={{ y: contactBottomY }}><span>© {new Date().getFullYear()} Askar</span><div><a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a href="https://github.com" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a><a href="mailto:hello@askar.dev"><Mail size={17} /> Email</a></div></motion.div></motion.section>
    </main>
  );
}
