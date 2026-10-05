import { ListTodo, Network, ShieldCheck } from "lucide-react";
import styles from "./skill-logo.module.css";

const brandLogos = {
  "React.js": "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  JavaScript: "javascript",
  MUI: "mui",
  "TanStack Query": "reactquery",
  Zustand: "zustand",
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",
  CSS: "css",
  HTML: "html5",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  "JWT Authentication": "jsonwebtokens",
  "Socket.IO": "socketdotio",
  MongoDB: "mongodb",
  Mongoose: "mongoose",
  Redis: "redis",
  Git: "git",
  GitHub: "github",
  GitLab: "gitlab",
  "GitHub Actions": "githubactions",
};

const conceptIcons = {
  "REST APIs": Network,
  RBAC: ShieldCheck,
  "Background Jobs & Queues": ListTodo,
};

export function SkillLogo({ skill }) {
  const Icon = conceptIcons[skill];

  if (Icon) {
    return <Icon className={styles.logo} strokeWidth={1.7} aria-hidden="true" />;
  }

  const logo = brandLogos[skill];

  if (!logo) return null;

  return (
    <span
      className={`${styles.logo} ${styles.brand}`}
      style={{ "--skill-logo": `url("/icons/skills/${logo}.svg")` }}
      aria-hidden="true"
    />
  );
}
