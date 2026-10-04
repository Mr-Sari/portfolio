import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, CircleAlert, CircleCheck, Copy, Download, Info, LoaderCircle, Mail, Phone, Send } from 'lucide-react';
import { cloneElement, useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import { contactProvider, submitContactForm, validateContact, type ContactErrors, type ContactMessage } from '../lib/contact';
import { GitHubIcon, LinkedInIcon } from '../lib/icons';
import { Button } from './ui/Button';
import { Reveal, RevealGroup } from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';
import { asset } from '../lib/assets';
import { ease, fadeUp } from './ui/motion';

const empty: ContactMessage = { name: '', email: '', subject: '', message: '' };
type Status = 'idle' | 'submitting' | 'sent' | 'mailto' | 'error';

export function Contact() {
  const { t, data } = useLanguage();
  const { personal, statements } = data;
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

  const row =
    'group flex min-h-14 flex-1 items-center gap-4 py-3 text-fg transition-colors hover:text-accent';
  const label = 'block font-mono text-[0.68rem] text-fg-subtle';

  return (
    <Section id="contact" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div>
          <SectionHeader id="contact" index="06" title={t.contact.title} />
          <Reveal>
            <p className="font-serif text-[1.9rem] leading-tight text-fg sm:text-[2.3rem]">
              {statements.closing.lead} <em className="text-accent">{statements.closing.accent}</em>
            </p>
            <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-fg-muted">{statements.closing.sub}</p>
          </Reveal>

          <RevealGroup as="ul" step={0.06} className="mt-8 divide-y divide-line border-y border-line">
            <motion.li variants={fadeUp} className="flex items-center gap-2">
              <a href={`mailto:${personal.email}`} className={row}>
                <Mail size={18} aria-hidden className="shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className={label}>{t.contact.email}</span>
                  <span className="block truncate font-medium">{personal.email}</span>
                </span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={t.a11y.copyEmail}
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-line-strong text-fg-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                {copied ? <Check size={15} className="text-accent" aria-hidden /> : <Copy size={15} aria-hidden />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? t.contact.copied : ''}
              </span>
            </motion.li>
            <motion.li variants={fadeUp} className="flex">
              <a href={`tel:${personal.phone.replace(/\s/g, '')}`} className={row}>
                <Phone size={18} aria-hidden className="shrink-0 text-accent" />
                <span>
                  <span className={label}>{t.contact.phone}</span>
                  <span dir="ltr" className="block font-medium">
                    {personal.phone}
                  </span>
                </span>
              </a>
            </motion.li>
            <motion.li variants={fadeUp} className="flex">
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className={row}>
                <LinkedInIcon size={18} className="shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className={label}>LinkedIn</span>
                  <span className="block truncate font-medium" dir="ltr">
                    {personal.linkedin.replace(/^https:\/\/(www\.)?/, '')}
                  </span>
                </span>
                <span className="sr-only">{t.a11y.opensNewTab}</span>
                <ArrowUpRight size={16} aria-hidden className="ms-auto shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
              </a>
            </motion.li>
            <motion.li variants={fadeUp} className="flex">
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className={row}>
                <GitHubIcon size={18} className="shrink-0 text-accent" />
                <span className="min-w-0">
                  <span className={label}>GitHub</span>
                  <span className="block truncate font-medium" dir="ltr">
                    {personal.github.replace(/^https:\/\//, '')}
                  </span>
                </span>
                <span className="sr-only">{t.a11y.opensNewTab}</span>
                <ArrowUpRight size={16} aria-hidden className="ms-auto shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
              </a>
            </motion.li>
            <motion.li variants={fadeUp} className="flex">
              <a href={asset(personal.resume)} download className={row}>
                <Download size={18} aria-hidden className="shrink-0 text-accent" />
                <span>
                  <span className={label}>PDF</span>
                  <span className="block font-medium">{t.hero.downloadResume}</span>
                </span>
              </a>
            </motion.li>
          </RevealGroup>
        </div>

        <Reveal delay={0.1} className="lg:pt-24">
          <h3 className="mb-3 font-mono text-[0.72rem] text-fg-subtle">{t.contact.formTitle}</h3>
          <ContactForm to={personal.email} />
        </Reveal>
      </div>
    </Section>
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
    <div className="card relative overflow-hidden p-5 sm:p-7">
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
      className: `w-full rounded-lg border bg-bg px-3.5 py-2.5 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-200 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 ${
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
