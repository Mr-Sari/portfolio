/**
 * Contact form submission, isolated from the UI.
 *
 * - If VITE_CONTACT_ENDPOINT is set (e.g. a Formspree form URL), the message
 *   is POSTed there as JSON and the UI shows a real "sent" state.
 * - Otherwise no backend exists, so the message is handed to the visitor's
 *   email app as a pre-filled draft and the UI says exactly that.
 *
 * To use EmailJS, Resend (via a serverless function) or anything else,
 * replace the body of `sendToEndpoint`.
 */
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactResult = { status: 'sent' } | { status: 'mailto' };

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();

export const hasContactBackend = Boolean(endpoint);

async function sendToEndpoint(url: string, msg: ContactMessage) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...msg, _replyto: msg.email, _subject: msg.subject }),
  });
  if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
}

function openMailDraft(to: string, msg: ContactMessage) {
  const body = `${msg.message}\n\n— ${msg.name} (${msg.email})`;
  const href = `mailto:${to}?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

export async function submitContactForm(to: string, msg: ContactMessage): Promise<ContactResult> {
  if (endpoint) {
    await sendToEndpoint(endpoint, msg);
    return { status: 'sent' };
  }
  openMailDraft(to, msg);
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
