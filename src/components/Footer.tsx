import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { sectionIds } from '../i18n/strings';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';
import { scrollToSection } from '../lib/scroll';

export function Footer() {
  const { t, data } = useLanguage();
  const { personal } = data;
  const year = new Date().getFullYear();

  const socials = [
    { label: 'LinkedIn', href: personal.linkedin, icon: <LinkedInIcon size={16} /> },
    { label: 'GitHub', href: personal.github, icon: <GitHubIcon size={16} /> },
    { label: t.contact.email, href: `mailto:${personal.email}`, icon: <Mail size={16} aria-hidden /> },
  ];

  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-fg font-mono text-xs font-bold text-bg">{personal.initials}</span>
            <span className="font-semibold tracking-tight text-fg">{personal.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{t.footer.tagline}</p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-fg-subtle">
            <MapPin size={14} aria-hidden />
            {personal.location}
          </p>
        </div>

        <nav aria-label={t.footer.navigate}>
          <h2 className="font-mono text-[0.7rem] tracking-[0.08em] text-fg-subtle uppercase">{t.footer.navigate}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  className="text-fg-muted transition-colors hover:text-fg"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[0.7rem] tracking-[0.08em] text-fg-subtle uppercase">{t.footer.connect}</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group inline-flex items-center gap-2.5 text-fg-muted transition-colors hover:text-fg"
                >
                  <span className="grid size-8 place-items-center rounded-lg border border-line transition-[color,border-color,transform] group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:text-accent">
                    {s.icon}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personal.name}. {t.footer.rights}
          </p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
