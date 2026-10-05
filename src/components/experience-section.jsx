"use client";

import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";
import RollingText from "./rolling-text";
import { Reveal, RevealHeading } from "./scroll-scenes";
import styles from "./experience-section.module.css";

const responsibilities = [
  "Developed configurable ERP systems with dynamic forms, role-based access, approval workflows, and reusable record views.",
  "Implemented secure authentication with JWT sessions, two-factor authentication, and account recovery.",
  "Integrated inventory, invoicing, ledgers, reporting, and two-way accounting synchronization across multiple organizations.",
  "Built facility management workflows and a multilingual corporate website with content publishing and demo booking.",
  "Improved responsiveness using Redis caching, background queues, and real-time updates.",
];

const technologies = ["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "Redis"];

export default function ExperienceSection() {
  return (
    <section className={styles.section} id="experience" aria-label="Professional experience">
      <div className={styles.intro}>
        <div className={styles.heading}>
          <Reveal><p className="eyebrow">Experience / Professional journey</p></Reveal>
          <RevealHeading first="Building systems," second="in the real world." />
        </div>
        <Reveal className={styles.summary} delay={0.08}>
          <p>Full-stack development across business platforms, facility operations, and corporate web experiences.</p>
        </Reveal>
      </div>

      <Reveal>
        <article className={styles.record} aria-labelledby="experience-role">
          <div className={styles.tenure}>
            <span className={styles.roleIcon}><BriefcaseBusiness size={26} strokeWidth={1.5} aria-hidden="true" /></span>
            <p className={styles.period}><time dateTime="2024-07">July 2024</time> - Present</p>
            <span className={styles.currentRole}><i aria-hidden="true" />Current role</span>
          </div>

          <div className={styles.details}>
            <h3 id="experience-role">Full Stack Developer</h3>
            <p className={styles.company}>Digicognit Pvt Ltd</p>
            <p className={styles.location}><MapPin size={15} aria-hidden="true" />Villupuram, Tamil Nadu</p>

            <h4 className={styles.detailLabel}>Profile summary</h4>
            <p className={styles.profileSummary}>
              Full Stack Developer with 2+ years of hands-on experience building and maintaining responsive web applications
              using modern frontend and backend technologies. Proficient in JavaScript, React, Node.js, and Express, with
              experience in RESTful API development, MongoDB database management, and Git-based version control. Skilled in
              collaborating with cross-functional teams to deliver scalable, maintainable solutions with a focus on clean
              code and performance.
            </p>

            <h4 className={styles.detailLabel}>Key contributions</h4>
            <ul className={styles.responsibilities}>
              {responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
            </ul>

            <ul className={styles.technologies} aria-label="Technologies used in this role">
              {technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>

            <a className={styles.workLink} href="#work">
              <RollingText>Explore related work</RollingText><ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
