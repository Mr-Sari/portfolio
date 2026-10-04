import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageProvider';
import { ease } from './ui/motion';

// Scattered "raw" points on the left that resolve into one rising trend line.
const scatter = [
  [40, 96], [72, 54], [96, 118], [128, 78], [150, 132], [176, 40], [204, 102], [232, 66], [258, 124], [286, 88],
  [312, 52], [338, 110], [364, 74], [392, 128], [418, 92],
] as const;
const trend = 'M440 120 C 560 118, 620 104, 700 92 S 860 62, 940 50 S 1080 26, 1160 18';

/** Full-width statement: "From raw data → to meaningful insights." */
export function Interlude() {
  const { data } = useLanguage();
  const reduce = useReducedMotion();
  const { lead, accent } = data.statements.interlude;

  return (
    <div className="relative overflow-hidden border-t border-line py-16 sm:py-24">
      <div className="container-page">
        <motion.svg
          viewBox="0 0 1200 150"
          aria-hidden
          className="mb-8 h-auto w-full rtl:-scale-x-100"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        >
          <line x1="0" y1="148" x2="1200" y2="148" stroke="var(--border-strong)" />
          {scatter.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="var(--fg-subtle)"
              variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 0.55, scale: 1, transition: { delay: reduce ? 0 : i * 0.04, duration: 0.4 } } }}
            />
          ))}
          <motion.path
            d={trend}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{ hidden: { pathLength: reduce ? 1 : 0 }, show: { pathLength: 1, transition: { duration: reduce ? 0 : 1.6, ease, delay: reduce ? 0 : 0.5 } } }}
          />
          <motion.circle
            cx="1160"
            cy="18"
            r="7"
            fill="var(--accent)"
            variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { delay: reduce ? 0 : 2, duration: 0.4 } } }}
          />
        </motion.svg>
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 0.8, ease }}
          className="text-balance font-serif text-[2.4rem] leading-[1.02] text-fg min-[400px]:text-5xl sm:text-6xl lg:text-[5rem]"
        >
          <span className="text-fg-subtle">{lead}</span> <em className="text-accent">{accent}</em>
        </motion.p>
      </div>
    </div>
  );
}
