import { useLanguage } from '../i18n/LanguageProvider';
import { BigTitle } from './ui/BigTitle';

/** A single personal statement between major sections. */
export function Interlude() {
  const { data } = useLanguage();
  return (
    <div className="relative py-10 sm:py-16">
      <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-40 max-w-2xl -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)] opacity-60" />
      <div className="container-page">
        <BigTitle id="interlude" as="p" size="display" lead={data.statements.interlude.lead} accent={data.statements.interlude.accent} />
      </div>
    </div>
  );
}
