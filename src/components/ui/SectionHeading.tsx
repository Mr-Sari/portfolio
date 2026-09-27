import { Reveal } from './Reveal';

interface Props {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  aside?: React.ReactNode;
}

export function SectionHeading({ id, kicker, title, intro, aside }: Props) {
  return (
    <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
      <Reveal className="max-w-2xl">
        <p className="kicker mb-3">{kicker}</p>
        <h2 id={`${id}-title`} className="text-balance text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">{intro}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
