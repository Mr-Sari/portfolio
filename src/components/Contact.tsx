import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, CircleAlert, CircleCheck, Copy, Info, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { cloneElement, useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { contactProvider, submitContactForm, validateContact, type ContactErrors, type ContactMessage } from '../lib/contact';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';
import { Button } from './ui/Button';
import { Reveal, RevealGroup } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { ease, fadeUp } from './ui/motion';

const empty: ContactMessage = { name: '', email: '', subject: '', message: '' };
type Status = 'idle' | 'submitting' | 'sent' | 'mailto' | 'error';

export function Contact() {
  const { t, data } = useLanguage();
  const { personal } = data;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const linkedinHandle = personal.linkedin.replace(/^https?:\/\/(www\.)?/, '');
  const githubHandle = personal.github.replace(/^https?:\/\/(www\.)?/, '');

  return (
    <Section id="contact">
      <SectionHeading id="contact" kicker={t.contact.kicker} title={t.contact.title} intro={t.contact.intro} />

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-6">
        <RevealGroup as="ul" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
          <ContactRow icon={<Mail size={18} />} label={t.contact.email}>
            <a href={`mailto:${personal.email}`} className="break-all text-fg hover:text-accent">
              {personal.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={t.a11y.copyEmail}
              className="relative z-10 ms-auto grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-fg-muted transition-colors hover:bg-accent-soft hover:text-fg"
            >
              {copied ? <Check size={16} className="text-accent" aria-hidden /> : <Copy size={16} aria-hidden />}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? t.contact.copied : ''}
            </span>
          </ContactRow>
          <ContactRow icon={<LinkedInIcon size={17} />} label="LinkedIn" href={personal.linkedin}>
            {linkedinHandle}
          </ContactRow>
          <ContactRow icon={<GitHubIcon size={17} />} label="GitHub" href={personal.github}>
            {githubHandle}
          </ContactRow>
          <ContactRow icon={<Phone size={18} />} label={t.contact.phone}>
            <a href={`tel:${personal.phone.replace(/\s/g, '')}`} dir="ltr" className="text-fg hover:text-accent">
              {personal.phone}
            </a>
          </ContactRow>
          <ContactRow icon={<MapPin size={18} />} label={t.contact.location}>
            <span className="text-fg">{personal.location}</span>
          </ContactRow>
        </RevealGroup>

        <Reveal delay={0.1}>
          <ContactForm to={personal.email} />
        </Reveal>
      </div>
    </Section>
  );
}

function ContactRow({ icon, label, href, children }: { icon: ReactNode; label: string; href?: string; children: ReactNode }) {
  const { t } = useLanguage();
  return (
    <motion.li
      variants={fadeUp}
      className="card group relative flex items-center gap-3 rounded-2xl p-3 transition-[border-color,translate] duration-300 hover:border-line-strong"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-accent-soft text-accent">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[0.66rem] tracking-[0.08em] text-fg-subtle uppercase">{label}</div>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-fg after:absolute after:inset-0 after:rounded-2xl hover:text-accent">
            {children}
            <span className="sr-only">{t.a11y.opensNewTab}</span>
          </a>
        ) : (
          <div className="flex items-center gap-2 text-sm">{children}</div>
        )}
      </div>
      {href && (
        <ArrowUpRight size={16} aria-hidden className="shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent rtl:-scale-x-100" />
      )}
    </motion.li>
  );
}

function ContactForm({ to }: { to: string }) {
  const { t } = useLanguage();
  const f = t.contact.form;
  const uid = useId();
  const [values, setValues] = useState<ContactMessage>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactMessage, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = (field: keyof ContactMessage) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validateContact(next));
  };

  const blur = (field: keyof ContactMessage) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateContact(values));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = (Object.keys(found) as (keyof ContactMessage)[])[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      const result = await submitContactForm(to, values);
      setStatus(result.status);
      if (result.status === 'sent') setValues(empty);
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrors({});
    setTouched({});
  };

  const errorText = (field: keyof ContactMessage) => {
    const code = touched[field] ? errors[field] : undefined;
    return code ? f[code] : undefined;
  };

  return (
    <div className="card relative overflow-hidden p-4 sm:p-6">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' || status === 'mailto' ? (
          <StatusPanel
            key="done"
            tone="success"
            title={status === 'sent' ? f.successTitle : f.mailtoTitle}
            body={status === 'sent' ? f.successBody : f.mailtoBody}
            action={f.another}
            onAction={reset}
          />
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id={`${uid}-name`} label={f.name} error={errorText('name')}>
                <input type="text" autoComplete="name" value={values.name} onChange={update('name')} onBlur={blur('name')} />
              </Field>
              <Field id={`${uid}-email`} label={f.email} error={errorText('email')}>
                <input type="email" autoComplete="email" inputMode="email" dir="ltr" value={values.email} onChange={update('email')} onBlur={blur('email')} />
              </Field>
            </div>
            <Field id={`${uid}-subject`} label={f.subject} error={errorText('subject')}>
              <input type="text" value={values.subject} onChange={update('subject')} onBlur={blur('subject')} />
            </Field>
            <Field id={`${uid}-message`} label={f.message} error={errorText('message')}>
              <textarea rows={4} value={values.message} onChange={update('message')} onBlur={blur('message')} />
            </Field>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-3 rounded-xl border border-red-500/30 bg-red-500/8 p-4 text-sm">
                    <CircleAlert size={18} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" aria-hidden />
                    <div>
                      <p className="font-medium text-fg">{f.errorTitle}</p>
                      <p className="mt-0.5 text-fg-muted">
                        {f.errorBody}{' '}
                        <a href={`mailto:${to}`} className="font-medium text-accent underline underline-offset-2">
                          {to}
                        </a>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              {contactProvider === 'mailto' ? (
                <p className="flex max-w-xs gap-2 text-xs leading-relaxed text-fg-subtle">
                  <Info size={14} className="mt-0.5 shrink-0" aria-hidden />
                  {f.noBackendNote}
                </p>
              ) : (
                <span />
              )}
              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto"
                icon={
                  status === 'submitting' ? (
                    <LoaderCircle size={16} className="animate-spin" aria-hidden />
                  ) : (
                    <Send size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" aria-hidden />
                  )
                }
              >
                {status === 'submitting' ? f.sending : f.send}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactElement<Record<string, unknown>> }) {
  const errorId = `${id}-error`;
  const control = cloneElement(children, {
      id,
      name: id.split('-').pop(),
      required: true,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId : undefined,
      className: `w-full rounded-xl border bg-bg-elevated px-3.5 py-2.5 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 ${
        error ? 'border-red-500/60' : 'border-line-strong hover:border-fg-subtle/60'
      } ${children.type === 'textarea' ? 'min-h-28 resize-y' : 'min-h-11'}`,
  });
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
        <span className="text-accent" aria-hidden>
          {' '}
          *
        </span>
      </label>
      {control}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
          >
            <CircleAlert size={13} aria-hidden />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusPanel({ tone, title, body, action, onAction }: { tone: 'success'; title: string; body: string; action: string; onAction: () => void }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.4, ease } }}
      exit={{ opacity: 0 }}
      className="flex min-h-[20rem] flex-col items-center justify-center text-center"
      data-tone={tone}
    >
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 18, delay: 0.1 } }}
        className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent"
      >
        <CircleCheck size={30} aria-hidden />
      </motion.span>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-fg">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">{body}</p>
      <Button variant="secondary" onClick={onAction} className="mt-7">
        {action}
      </Button>
    </motion.div>
  );
}
