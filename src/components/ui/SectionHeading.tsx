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
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between">
      <Reveal className="max-w-2xl">
        <p className="kicker mb-2">{kicker}</p>
        <h2 id={`${id}-title`} className="text-balance text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl lg:text-4xl lg:leading-[1.1]">
          {title}
        </h2>
        {intro && <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">{intro}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
