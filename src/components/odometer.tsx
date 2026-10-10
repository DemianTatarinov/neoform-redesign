import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const DIGITS = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const STEP = 0.55; // seconds per digit drum
const STAGGER = 0.45; // next digit starts as the previous one settles

/** Mechanical counter: each digit spins from 9 down to its value every time it enters the viewport. */
export function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const reduce = useReducedMotion();

  return (
    <span ref={ref} className={`odometer ${className ?? ""}`} aria-label={value}>
      {value.split("").map((char, i) => {
        const digit = Number(char);
        if (Number.isNaN(digit)) return <span key={i} aria-hidden="true">{char}</span>;
        const target = DIGITS.indexOf(digit);
        return (
          <span key={i} className="odometer-digit" aria-hidden="true">
            <motion.span
              className="odometer-reel"
              initial={false}
              animate={{ y: `${-(inView || reduce ? target : 0) * 10}%` }}
              transition={reduce ? { duration: 0 } : { duration: STEP, delay: i * STAGGER, ease: [0.22, 1, 0.36, 1] }}
            >
              {DIGITS.map((d) => <span key={d}>{d}</span>)}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
