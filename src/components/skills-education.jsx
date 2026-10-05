"use client";

import { Braces, Database, GitBranch, GraduationCap, Languages, Server } from "lucide-react";
import { Reveal, RevealHeading } from "./scroll-scenes";
import styles from "./skills-education.module.css";

const skillGroups = [
  {
    title: "Frontend",
    icon: Braces,
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "MUI", "TanStack Query", "Zustand", "Tailwind CSS", "Bootstrap", "CSS", "HTML"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "RBAC", "Socket.IO", "Background Jobs & Queues"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["MongoDB", "Mongoose", "Redis"],
  },
  {
    title: "Tools & workflow",
    icon: GitBranch,
    skills: ["Git", "GitHub", "GitLab", "GitHub Actions"],
  },
];

export function SkillsSection() {
  return (
    <section className={styles.skillsSection} id="skills" aria-label="Skills">
      <div className={styles.intro}>
        <div className={styles.heading}>
          <Reveal><p className="eyebrow">Skills / Technical toolkit</p></Reveal>
          <RevealHeading first="The stack behind" second="the work." />
        </div>
        <Reveal className={styles.summary} delay={0.08}>
          <p>Tools I use to build responsive interfaces, reliable APIs, and connected business systems.</p>
        </Reveal>
      </div>

      <div className={styles.skillGroups}>
        {skillGroups.map(({ title, icon: Icon, skills }, index) => (
          <Reveal key={title}>
            <article className={styles.skillRow}>
              <div className={styles.groupTitle}>
                <span className={styles.index} aria-hidden="true">0{index + 1}</span>
                <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                <h3>{title}</h3>
              </div>
              <ul className={styles.skillList} aria-label={`${title} skills`}>
                {skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className={styles.languages}>
        <div className={styles.languageTitle}>
          <Languages size={20} strokeWidth={1.5} aria-hidden="true" />
          <h3>Languages</h3>
        </div>
        <ul aria-label="Languages">
          <li>Tamil</li>
          <li>English</li>
          <li>French <span>(Reading)</span></li>
        </ul>
      </Reveal>
    </section>
  );
}

export function EducationSection() {
  return (
    <section className={styles.educationSection} id="education" aria-label="Education">
      <div className={styles.heading}>
        <Reveal><p className="eyebrow">Education / Academic background</p></Reveal>
        <RevealHeading first="A foundation" second="in computing." />
      </div>

      <Reveal className={styles.educationRecord}>
        <article>
          <div className={styles.educationTopline}>
            <span className={styles.degreeIcon}><GraduationCap size={28} strokeWidth={1.5} aria-hidden="true" /></span>
            <p className="eyebrow">Undergraduate degree</p>
          </div>
          <h3>Bachelor of Computer Application</h3>
          <p className={styles.institution}>Siga College of Management and Computer Science</p>
          <p className={styles.location}>Villupuram</p>
          <dl className={styles.educationDetails}>
            <div>
              <dt>Study period</dt>
              <dd><time dateTime="2020">2020</time><span aria-hidden="true"> - </span><span className="sr-only"> to </span><time dateTime="2023">2023</time></dd>
            </div>
            <div>
              <dt>CGPA</dt>
              <dd>7.3</dd>
            </div>
          </dl>
        </article>
      </Reveal>
    </section>
  );
}
