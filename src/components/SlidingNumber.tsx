import { motion } from "motion/react";

// ponytail: hand-rolled instead of installing @animate-ui's sliding-number package —
// same digit-roller technique, but reuses the `motion` dependency already in this
// project instead of pulling in react-use-measure + an extra hooks package for one component.
function Digit({ digit }: { digit: number }) {
  return (
    <span className="inline-block h-[1em] w-[0.62em] overflow-hidden align-bottom">
      <motion.span
        className="flex flex-col"
        animate={{ y: `-${digit * 10}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.4 }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} className="flex h-[1em] items-center justify-center">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function SlidingNumber({ value, className = "" }: { value: number; className?: string }) {
  const chars = value.toLocaleString().split("");
  return (
    <span className={`inline-flex tabular-nums ${className}`}>
      {chars.map((char, i) =>
        /\d/.test(char) ? <Digit key={i} digit={Number(char)} /> : <span key={i}>{char}</span>
      )}
    </span>
  );
}
