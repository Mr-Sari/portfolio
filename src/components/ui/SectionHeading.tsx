import { Reveal } from './Reveal';

interface Props {
  id: string;
  /** Section number, e.g. "02" — matches the order in the navigation. */
  kicker: string;
  title: string;
  intro?: string;
  aside?: React.ReactNode;
}

/** Numbered section heading shared by every section. */
export function SectionHeading({ id, kicker, title, intro, aside }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
      <Reveal className="max-w-2xl">
        <p className="kicker mb-3 flex items-center gap-3" aria-hidden>
          <span lang="en">{kicker}</span>
          <span className="h-px w-10 bg-accent/50" />
        </p>
        <h2 id={`${id}-title`} className="text-balance text-[2rem] leading-[1.1] font-semibold tracking-[-0.035em] text-fg sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {intro && <p className="mt-3 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-fg-muted sm:text-base">{intro}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
