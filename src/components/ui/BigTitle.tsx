import { motion, useReducedMotion } from 'framer-motion';
import { ease } from './motion';

interface Props {
  id: string;
  lead: string;
  accent: string;
  sub?: string;
  /** Visual size; `display` is used for the interlude and closing statements. */
  size?: 'section' | 'display';
  as?: 'h2' | 'p';
  className?: string;
}

/**
 * Large centred two-tone title that sharpens from a soft blur as it scrolls in
 * — the signature reveal of the page. Words animate in sequence.
 */
export function BigTitle({ id, lead, accent, sub, size = 'section', as = 'h2', className = '' }: Props) {
  const reduce = useReducedMotion();
  const Tag = as === 'h2' ? motion.h2 : motion.p;
  const word = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 18, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
  };
  const sizes = {
    section: 'text-[1.9rem] min-[390px]:text-[2.1rem] sm:text-5xl lg:text-[3.5rem]',
    display: 'text-[2rem] min-[390px]:text-[2.3rem] sm:text-5xl lg:text-[4rem]',
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className={`mx-auto max-w-3xl text-center ${className}`}
    >
      <Tag
        id={as === 'h2' ? `${id}-title` : undefined}
        className={`text-balance font-semibold leading-[1.15] tracking-[-0.035em] text-fg ${sizes[size]}`}
      >
        <motion.span variants={word} className="inline-block">
          {lead}
        </motion.span>{' '}
        <motion.span variants={word} className="text-gradient inline-block">
          {accent}
        </motion.span>
      </Tag>
      {sub && (
        <motion.p variants={word} className="mx-auto mt-3 max-w-xl text-sm text-fg-muted sm:text-base">
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}
