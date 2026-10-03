"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1];

export function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      data-reveal=""
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function HeroLetter({ letter, index, progress }) {
  const reduceMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, -35 - index * 18]);
  const rotate = useTransform(progress, [0, 1], [0, (index - 2) * 2]);

  return (
    <motion.span className="hero-letter" style={reduceMotion ? undefined : { y, rotate }}>
      <motion.span
        data-reveal=""
        initial={reduceMotion ? false : { y: "110%", rotate: 6 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.15, delay: reduceMotion ? 0 : 0.08 * index, ease }}
      >
        {letter}
      </motion.span>
    </motion.span>
  );
}

export function HeroTitle({ progress }) {
  return (
    <h1 className="hero-letter-title" aria-label="Askar">
      <span aria-hidden="true">
        {Array.from("ASKAR").map((letter, index) => (
          <HeroLetter key={index} letter={letter} index={index} progress={progress} />
        ))}
      </span>
    </h1>
  );
}

function RevealCharacters({ text, offset = 0 }) {
  const reduceMotion = useReducedMotion();
  let characterIndex = offset;

  return text.split(" ").map((word, wordIndex) => (
    <span className="reveal-word" key={`${word}-${wordIndex}`}>
      {Array.from(word).map((letter, index) => {
        const order = characterIndex++;
        return (
          <motion.span
            key={index}
            className="reveal-character"
            data-reveal=""
            variants={{ hidden: { y: reduceMotion ? "0%" : "110%" }, visible: { y: "0%" } }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : order * 0.012, ease }}
          >{letter}</motion.span>
        );
      })}
      {" "}
    </span>
  ));
}

export function RevealHeading({ first, second }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h2
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label={`${first} ${second}`}
    >
      {[first, second].map((line, index) => (
        <span className="heading-line" aria-hidden="true" key={line}>
          <span>
            {index === 1 ? <em><RevealCharacters text={line} offset={first.length} /></em> : <RevealCharacters text={line} />}
          </span>
        </span>
      ))}
    </motion.h2>
  );
}

export function FooterSignature() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);

  return (
    <div ref={ref} className="footer-signature" aria-hidden="true">
      <motion.span style={reduceMotion ? undefined : { y }}>ASKAR<span>®</span></motion.span>
    </div>
  );
}

function ReadingWord({ word, index, total, progress }) {
  const reduceMotion = useReducedMotion();
  const color = useTransform(progress, [index / total, (index + 1) / total], ["#92938b", "#f3efe7"]);

  return (
    <motion.span className="reading-word" style={reduceMotion ? undefined : { color }} aria-hidden="true">
      {word}{" "}
    </motion.span>
  );
}

export function ScrollReading({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p className="about-lead scroll-reading" ref={ref}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <ReadingWord key={`${word}-${index}`} word={word} index={index} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

export function ScrollMarquee({ items }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section className="capability-strip" aria-label="Core capabilities" ref={ref}>
      <motion.div className="marquee-track scroll-marquee" style={reduceMotion ? undefined : { x }}>
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
            {items.map((item) => <span key={item}>{item}<i aria-hidden="true">✦</i></span>)}
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export function ProcessStep({ step }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-45, 0]);

  return (
    <article className="process-row" ref={ref}>
      <span className="process-number">{step.number}</span>
      <h3>{step.title}</h3>
      <p>{step.copy}</p>
      <span className="process-note">{step.note}</span>
      <i aria-hidden="true"><motion.span style={reduceMotion ? undefined : { rotate }}><ArrowUpRight size={20} /></motion.span></i>
      <motion.span className="process-row-progress" aria-hidden="true" style={reduceMotion ? undefined : { scaleX }} />
    </article>
  );
}
