"use client";

import {
  MotionConfig,
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
import AboutTransition from "./about-transition";
import CustomCursor from "./custom-cursor";
import ExperienceSection from "./experience-section";
import HeroFeatured from "./hero-featured";
import PageEntrance from "./page-entrance";
import ProjectShowcase from "./project-showcase";
import RollingText from "./rolling-text";
import SmoothScroll from "./smooth-scroll";
import { FooterSignature, HeroTitle, ProcessStep, Reveal, RevealHeading, ScrollMarquee, ScrollReading } from "./scroll-scenes";
import SiteHeader from "./site-header";
import { EducationSection, SkillsSection } from "./skills-education";

const projects = [
  {
    number: "01",
    year: "2025",
    name: "Task Management Platform",
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
    name: "Configurable ERP Platform",
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
    name: "Business Management Platform",
    type: "Business systems · Full stack",
    visual: "finance",
    accent: "sky",
    description:
      "A multi-organization system connecting sales, purchasing, stock, invoicing, ledgers, and two-way accounting synchronization.",
    outcome: "One source of operational truth",
    features: ["Accounting sync", "Inventory", "Invoicing", "Reporting"],
  },
  {
    number: "04",
    year: "2024",
    name: "Facility Management System",
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
    name: "Corporate Website",
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
  const clipPath = useTransform(scrollYProgress, [0, 0.35], ["inset(50% 0% 50% 0%)", "inset(0% 0% 0% 0%)"]);

  return (
    <motion.div ref={wordRef} className={`word-band ${className}`} style={shouldReduceMotion ? undefined : { clipPath }} aria-hidden="true">
      <motion.span style={shouldReduceMotion ? undefined : { x }}>{word}</motion.span>
    </motion.div>
  );
}

function Portfolio() {
  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 110]);
  const heroOpacity = useTransform(heroProgress, [0, 0.82], [1, 0]);
  const orbitScale = useTransform(heroProgress, [0, 1], [1, 1.25]);
  const orbitRotate = useTransform(heroProgress, [0, 1], [0, 22]);
  const { scrollYProgress: contactProgress } = useScroll({ target: contactRef, offset: ["start end", "start start"] });
  const contactOrbitY = useTransform(contactProgress, [0, 1], [110, 0]);
  const contactOrbitRotate = useTransform(contactProgress, [0, 1], [-50, 0]);
  const contactOrbitScale = useTransform(contactProgress, [0, 1], [0.72, 1]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("mamohamedaskarali@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:mamohamedaskarali@gmail.com";
    }
  };

  return (
    <main>
      <SmoothScroll />
      <PageEntrance />
      <CustomCursor />
      <motion.div className="scroll-progress" style={{ scaleX: shouldReduceMotion ? scrollYProgress : progress }} aria-hidden="true" />
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
            <HeroTitle progress={heroProgress} />
          </div>
          <motion.div
            className="hero-statement"
            data-reveal=""
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.55, duration: shouldReduceMotion ? 0 : 0.8 }}
          >
            <p>I shape complex ideas into digital products that feel <em>clear, capable,</em> and quietly memorable.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work"><RollingText>View selected work</RollingText><ArrowDown size={17} /></a>
              <a className="text-link" href="#contact"><RollingText>Start a conversation</RollingText><MoveRight size={18} /></a>
            </div>
          </motion.div>
        </motion.div>

        <HeroFeatured projects={projects} />

        <div className="hero-footer">
          <span>Portfolio / 2026</span>
          <a href="#work"><RollingText>Scroll to explore</RollingText><ArrowDown size={15} /></a>
          <span>Thoughtful systems. Useful details.</span>
        </div>
      </section>

      <ScrollMarquee items={tools} />

      <section className="work-section" id="work">
        <AnimatedWord word="WORK" className="word-band-work" />
        <ProjectShowcase projects={projects}>
          <div className="section-intro">
            <Reveal className="section-label"><p className="eyebrow">Selected work / 01—05</p></Reveal>
            <div className="section-title">
              <RevealHeading first="Useful products," second="shaped with intent." />
            </div>
            <Reveal className="section-summary" delay={0.1}>
              <p>From productivity tools to connected business systems—designed to make demanding work feel more direct.</p>
            </Reveal>
          </div>

          <AnimatedWord word="PROJECTS" className="word-band-projects" direction={-1} />
        </ProjectShowcase>
      </section>

      <section className="about-section" id="about">
        <AboutTransition />
        <AnimatedWord word="ABOUT" className="word-band-about" />
        <div className="about-intro">
          <div className="about-heading">
            <p className="eyebrow">About / Approach</p>
            <RevealHeading first="Engineering with" second="a point of view." />
          </div>
          <div className="about-copy">
            <ScrollReading text="I enjoy the space where sharp engineering meets thoughtful design." />
            <Reveal delay={0.08}>
              <p>I take complex workflows, find the essential path through them, and build responsive experiences that help people move with confidence.</p>
            </Reveal>
            <Reveal className="about-facts" delay={0.12}>
              <div><strong>05</strong><span>Selected products</span></div>
              <div><strong>Full-stack</strong><span>Design to delivery</span></div>
              <div><strong>India</strong><span>Working worldwide</span></div>
            </Reveal>
          </div>
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
      </section>

      <ExperienceSection />
      <SkillsSection />
      <EducationSection />

      <section className="process-section" id="process">
        <div className="section-intro process-intro">
          <Reveal className="section-label"><p className="eyebrow">Process / 04 steps</p></Reveal>
          <div className="section-title"><RevealHeading first="A clear rhythm" second="from idea to impact." /></div>
        </div>
        <div className="process-list">
          {process.map((step) => <ProcessStep step={step} key={step.number} />)}
        </div>
      </section>

      <section className="contact-section" id="contact" ref={contactRef}>
        <motion.div className="contact-orbit" style={shouldReduceMotion ? undefined : { y: contactOrbitY, rotate: contactOrbitRotate, scale: contactOrbitScale }} aria-hidden="true"><span /><i>✦</i></motion.div>
        <Reveal className="contact-kicker"><p className="eyebrow">Have a project in mind?</p></Reveal>
        <RevealHeading first="Let's make" second="something useful." />
        <Reveal className="contact-copy" delay={0.1}><p>Tell me what you&apos;re building, where it feels stuck, and what a good outcome looks like.</p></Reveal>
        <Reveal className="contact-actions" delay={0.18}>
          <a className="contact-email" href="mailto:mamohamedaskarali@gmail.com"><RollingText>mamohamedaskarali@gmail.com</RollingText><MoveRight size={28} /></a>
          <button className="copy-email" type="button" onClick={copyEmail} aria-live="polite">
            {copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy email"}
          </button>
        </Reveal>
        <FooterSignature />
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Askar</span>
          <span>Designed & built with care</span>
          <div>
            <a href="mailto:mamohamedaskarali@gmail.com"><Mail size={15} /><RollingText>Email</RollingText></a>
            <a href="#top"><RollingText>Back to top</RollingText><ArrowUpRight size={15} /></a>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default function HomePage() {
  return <MotionConfig reducedMotion="user"><Portfolio /></MotionConfig>;
}
