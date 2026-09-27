import { motion, type HTMLMotionProps } from 'framer-motion';
import { ease, stagger } from './motion';

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; as?: 'div' | 'ul' | 'ol' | 'dl' };

/** Fades children up once when they scroll into view. */
export function Reveal({ delay = 0, children, as = 'div', ...props }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } } }}
      {...props}
    >
      {children}
    </Comp>
  );
}

/** Staggers direct children that use the `fadeUp` variants. */
export function RevealGroup({ step = 0.07, delay = 0, children, as = 'div', ...props }: RevealProps & { step?: number }) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={stagger(step, delay)}
      {...props}
    >
      {children}
    </Comp>
  );
}
