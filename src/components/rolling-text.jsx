import styles from "./rolling-text.module.css";

export default function RollingText({ children, className = "" }) {
  const characters = Array.from(children);
  const lastCharacter = Math.max(1, characters.length - 1);
  const words = children.split(/(\s+)/);

  return (
    <span className={`${styles.text} ${className}`}>
      <span className={styles.label}>{children}</span>
      <span className={styles.visual} aria-hidden="true">
        {words.map((word, wordIndex) => {
          if (/^\s+$/.test(word)) return word;
          const offset = Array.from(words.slice(0, wordIndex).join("")).length;

          return (
            <span className={styles.word} key={wordIndex}>
              {Array.from(word).map((character, index) => {
                const delay = ((offset + index) / lastCharacter) * 0.2;

                return (
                  <span
                    className={styles.character}
                    key={index}
                    style={{ "--letter-delay": `${delay}s` }}
                  >
                    <span className={styles.glyph}>{character}</span>
                    <span className={`${styles.glyph} ${styles.copy}`}>{character}</span>
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}
