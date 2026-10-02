"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MoveRight,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import CustomCursor from "./custom-cursor";
import ProjectVisual from "./project-visual";
import SiteHeader from "./site-header";

const projects = [
  {
    number: "01",
    year: "2025",
    name: "Task Manager",
    type: "Productivity · Web application",
    visual: "tasks",
    accent: "coral",
    description:
      "A collaborative workspace that brings task planning, live time, team conversations, and estimates into one calm operational view.",
    outcome: "Unified task and time visibility",
    features: ["Task workflows", "Live timesheets", "Team chat", "Estimates"],
  },
  {
    number: "02",
    year: "2025",
    name: "Low-Code ERP",
    type: "Enterprise platform · Full stack",
    visual: "builder",
    accent: "lime",
    description:
      "A configurable ERP platform with dynamic forms, permissions, approval flows, and reusable views for complex business records.",
    outcome: "Complex operations, made configurable",
    features: ["Form builder", "RBAC", "Approvals", "Real-time views"],
  },
  {
    number: "03",
    year: "2025",
    name: "Multi-Org ERP & Tally",
    type: "Business systems · Full stack",
    visual: "finance",
    accent: "sky",
    description:
      "A multi-organization system connecting sales, purchasing, stock, invoicing, ledgers, and two-way Tally synchronization.",
    outcome: "One source of operational truth",
    features: ["Tally sync", "Inventory", "Invoicing", "Reporting"],
  },
  {
    number: "04",
    year: "2024",
    name: "Digi Facility",
    type: "CAFM · Operations",
    visual: "facility",
    accent: "violet",
    description:
      "An end-to-end facility platform for work orders, technician assignment, preventive maintenance, and vendor coordination.",
    outcome: "Field work that stays visible",
    features: ["Work orders", "Maintenance", "Live tracking", "Secure access"],
  },
  {
    number: "05",
    year: "2024",
    name: "Digicognit Website",
    type: "Corporate platform · Next.js",
    visual: "website",
    accent: "amber",
    description:
      "A fast, search-ready corporate experience with localization, content publishing, demo booking, and guided discovery.",
    outcome: "A clearer route from interest to enquiry",
    features: ["SEO", "Localization", "CMS", "Demo booking"],
  },
];

const capabilities = [
  { number: "01", title: "Product thinking", copy: "Clarifying the real problem before shaping the interface." },
  { number: "02", title: "Design engineering", copy: "Turning systems and flows into expressive, usable experiences." },
  { number: "03", title: "Full-stack delivery", copy: "Building dependable products from interface to API." },
  { number: "04", title: "Responsive craft", copy: "Making every state feel considered, from phone to widescreen." },
];

const process = [
  { number: "01", title: "Discover", copy: "Understand the people, constraints, and outcome that should guide every decision.", note: "Context before pixels" },
  { number: "02", title: "Define", copy: "Turn complexity into a clear product structure, flow, and visual direction.", note: "Clarity before decoration" },
  { number: "03", title: "Design & build", copy: "Prototype quickly, engineer carefully, and refine the details that create trust.", note: "Craft in every state" },
  { number: "04", title: "Validate", copy: "Test the experience, remove friction, and ship a resilient final product.", note: "Evidence before ego" },
];

const tools = ["JavaScript", "React", "Next.js", "Node.js", "REST APIs", "UI systems", "Product design", "Responsive UX"];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedWord({ word, className = "", direction = 1 }) {
  const wordRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wordRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction > 0 ? ["-12%", "8%"] : ["8%", "-12%"],
  );

  return (
    <div ref={wordRef} className={`word-band ${className}`} aria-hidden="true">
      <motion.span style={shouldReduceMotion ? undefined : { x }}>{word}</motion.span>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className={`project-card project-${project.accent} ${index === 0 ? "project-featured" : ""}`}
      initial={{ opacity: 0, y: 45 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay: Math.min(index * 0.06, 0.2), ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-card-visual">
        <div className="project-index"><span>{project.number}</span><span>{project.year}</span></div>
        <ProjectVisual type={project.visual} />
      </div>
      <div className="project-card-copy">
        <p className="eyebrow">{project.type}</p>
        <h3>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-outcome"><span>Outcome</span>{project.outcome}</p>
        <div className="project-tags" aria-label={`${project.name} features`}>
          {project.features.map((feature) => <span key={feature}>{feature}</span>)}
        </div>
        <a className="project-link" href="#contact" aria-label={`Discuss a project like ${project.name}`}>
          <span>Discuss a similar project</span><ArrowUpRight size={19} />
        </a>
      </div>
    </motion.article>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 110]);
  const heroOpacity = useTransform(heroProgress, [0, 0.82], [1, 0]);
  const orbitScale = useTransform(heroProgress, [0, 1], [1, 1.25]);
  const orbitRotate = useTransform(heroProgress, [0, 1], [0, 22]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@askar.dev");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:hello@askar.dev";
    }
  };

  return (
    <main>
      <CustomCursor />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <SiteHeader />

      <section className="hero" id="top" ref={heroRef}>
        <motion.div
          className="hero-orbit"
          style={shouldReduceMotion ? undefined : { scale: orbitScale, rotate: orbitRotate }}
          aria-hidden="true"
        >
          <span /><span /><i /><b>✦</b>
        </motion.div>

        <div className="hero-topline">
          <p><i /> Available for select projects</p>
          <span>India · Worldwide</span>
        </div>

        <motion.div className="hero-content" style={shouldReduceMotion ? undefined : { y: heroY, opacity: heroOpacity }}>
          <p className="hero-kicker"><Sparkles size={15} /> Design engineer / Full-stack developer</p>
          <div className="hero-title-wrap">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              ASKAR
            </motion.h1>
          </div>
          <motion.div
            className="hero-statement"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <p>I shape complex ideas into digital products that feel <em>clear, capable,</em> and quietly memorable.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">View selected work <ArrowDown size={17} /></a>
              <a className="text-link" href="#contact">Start a conversation <MoveRight size={18} /></a>
            </div>
          </motion.div>
        </motion.div>

        <div className="hero-footer">
          <span>Portfolio / 2026</span>
          <a href="#work">Scroll to explore <ArrowDown size={15} /></a>
          <span>Thoughtful systems. Useful details.</span>
        </div>
      </section>

      <section className="capability-strip" aria-label="Core capabilities">
        <div className="marquee-track">
          {[...tools, ...tools].map((tool, index) => <span key={`${tool}-${index}`}>{tool}<i>✦</i></span>)}
        </div>
      </section>

      <section className="work-section" id="work">
        <AnimatedWord word="WORK" className="word-band-work" />
        <div className="section-intro">
          <Reveal className="section-label"><p className="eyebrow">Selected work / 01—05</p></Reveal>
          <Reveal className="section-title" delay={0.05}>
            <h2>Useful products,<br /><em>shaped with intent.</em></h2>
          </Reveal>
          <Reveal className="section-summary" delay={0.1}>
            <p>From productivity tools to connected business systems—designed to make demanding work feel more direct.</p>
          </Reveal>
        </div>

        <AnimatedWord word="PROJECTS" className="word-band-projects" direction={-1} />
        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.number} />)}
        </div>
      </section>

      <section className="about-section" id="about">
        <AnimatedWord word="ABOUT" className="word-band-about" />
        <div className="about-heading">
          <p className="eyebrow">About / Approach</p>
          <h2>Engineering with<br /><em>a point of view.</em></h2>
        </div>
        <div className="about-copy">
          <Reveal>
            <p className="about-lead">I enjoy the space where sharp engineering meets thoughtful design.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p>I take complex workflows, find the essential path through them, and build responsive experiences that help people move with confidence.</p>
          </Reveal>
          <Reveal className="about-facts" delay={0.12}>
            <div><strong>05</strong><span>Selected products</span></div>
            <div><strong>Full-stack</strong><span>Design to delivery</span></div>
            <div><strong>India</strong><span>Working worldwide</span></div>
          </Reveal>
        </div>

        <div className="capability-grid">
          {capabilities.map((item, index) => (
            <Reveal className="capability-card" delay={index * 0.05} key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </div>

        <div className="tool-list" aria-label="Tools and skills">
          {tools.map((tool) => <span key={tool}>{tool}</span>)}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="section-intro process-intro">
          <Reveal className="section-label"><p className="eyebrow">Process / 04 steps</p></Reveal>
          <Reveal className="section-title" delay={0.05}><h2>A clear rhythm<br /><em>from idea to impact.</em></h2></Reveal>
        </div>
        <div className="process-list">
          {process.map((step, index) => (
            <motion.article
              className="process-row"
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
            >
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <span className="process-note">{step.note}</span>
              <i aria-hidden="true"><ArrowUpRight size={20} /></i>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orbit" aria-hidden="true"><span /><i>✦</i></div>
        <p className="eyebrow">Have a project in mind?</p>
        <h2>Let&apos;s make<br /><em>something useful.</em></h2>
        <p className="contact-copy">Tell me what you&apos;re building, where it feels stuck, and what a good outcome looks like.</p>
        <div className="contact-actions">
          <a className="contact-email" href="mailto:hello@askar.dev">hello@askar.dev <MoveRight size={28} /></a>
          <button className="copy-email" type="button" onClick={copyEmail} aria-live="polite">
            {copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Askar</span>
          <span>Designed & built with care</span>
          <div>
            <a href="mailto:hello@askar.dev"><Mail size={15} /> Email</a>
            <a href="#top">Back to top <ArrowUpRight size={15} /></a>
          </div>
        </footer>
      </section>
    </main>
  );
}
