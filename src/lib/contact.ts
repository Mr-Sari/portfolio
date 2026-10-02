/**
 * Contact form submission, isolated from the UI.
 *
 * Provider is picked from environment variables at build time:
 *   1. Formspree — VITE_FORMSPREE_ENDPOINT (e.g. https://formspree.io/f/abcdwxyz)
 *   2. EmailJS   — VITE_EMAILJS_SERVICE_ID + VITE_EMAILJS_TEMPLATE_ID + VITE_EMAILJS_PUBLIC_KEY
 *   3. Neither   — the message is opened as a pre-filled draft in the visitor's
 *                  email app, and the UI says so (it never claims it was sent).
 *
 * Formspree endpoints and EmailJS public keys are designed to be public;
 * no private secret is ever shipped to the browser.
 */
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactResult = { status: 'sent' } | { status: 'mailto' };
type Provider = 'formspree' | 'emailjs' | 'mailto';

const env = import.meta.env;
const formspreeEndpoint = env.VITE_FORMSPREE_ENDPOINT?.trim();
const emailjs = {
  serviceId: env.VITE_EMAILJS_SERVICE_ID?.trim(),
  templateId: env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
};

export const contactProvider: Provider = formspreeEndpoint
  ? 'formspree'
  : emailjs.serviceId && emailjs.templateId && emailjs.publicKey
    ? 'emailjs'
    : 'mailto';

async function sendWithFormspree(endpoint: string, msg: ContactMessage) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...msg, _replyto: msg.email, _subject: msg.subject }),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
}

/** EmailJS REST API — avoids shipping the EmailJS SDK. */
async function sendWithEmailJS(msg: ContactMessage) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: emailjs.serviceId,
      template_id: emailjs.templateId,
      user_id: emailjs.publicKey,
      // Template variables: {{from_name}}, {{reply_to}}, {{subject}}, {{message}}
      template_params: { from_name: msg.name, reply_to: msg.email, subject: msg.subject, message: msg.message },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS responded ${res.status}`);
}

function openMailDraft(to: string, msg: ContactMessage) {
  const body = `${msg.message}\n\n— ${msg.name} (${msg.email})`;
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(body)}`;
}

/** Resolves only when the provider confirms delivery; throws otherwise. */
export async function submitContactForm(to: string, msg: ContactMessage): Promise<ContactResult> {
  const clean = {
    name: msg.name.trim(),
    email: msg.email.trim(),
    subject: msg.subject.trim(),
    message: msg.message.trim(),
  };
  if (contactProvider === 'formspree') {
    await sendWithFormspree(formspreeEndpoint!, clean);
    return { status: 'sent' };
  }
  if (contactProvider === 'emailjs') {
    await sendWithEmailJS(clean);
    return { status: 'sent' };
  }
  openMailDraft(to, clean);
  return { status: 'mailto' };
}

export type ContactErrors = Partial<Record<keyof ContactMessage, 'required' | 'invalidEmail' | 'tooShort'>>;

export function validateContact(msg: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  if (!msg.name.trim()) errors.name = 'required';
  if (!msg.email.trim()) errors.email = 'required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(msg.email.trim())) errors.email = 'invalidEmail';
  if (!msg.subject.trim()) errors.subject = 'required';
  if (!msg.message.trim()) errors.message = 'required';
  else if (msg.message.trim().length < 10) errors.message = 'tooShort';
  return errors;
}
