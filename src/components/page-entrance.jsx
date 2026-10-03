"use client";

import styles from "./page-entrance.module.css";

export default function PageEntrance() {
  return (
    <div className={styles.entrance} aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => <span key={index} style={{ "--column": index }} />)}
    </div>
  );
}
