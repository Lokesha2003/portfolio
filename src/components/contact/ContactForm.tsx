import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CircleAlert, CircleCheck, Info, LoaderCircle, Mail } from 'lucide-react';
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { profile } from '../../data/profile';
import { cn } from '../../lib/utils';
import { buttonClasses } from '../ui/Button';

type FieldName = 'name' | 'email' | 'subject' | 'message';
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent' }
  | { kind: 'mail-opened' }
  | { kind: 'error'; message: string };

const MESSAGE_MAX = 2000;
const EMPTY: Values = { name: '', email: '', subject: '', message: '' };
const FIELD_ORDER: FieldName[] = ['name', 'email', 'subject', 'message'];

/** When set, the form POSTs JSON here. Otherwise it opens the visitor's email app. */
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || null;

function validate(values: Values): Errors {
  const errors: Errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Your name should be at least 2 characters.';

  if (!email) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'That email address doesn’t look right.';

  if (!subject) errors.subject = 'Please add a subject.';
  else if (subject.length < 3) errors.subject = 'The subject should be at least 3 characters.';

  if (!message) errors.message = 'Please write a message.';
  else if (message.length < 20) errors.message = 'Please write at least 20 characters so I have some context.';
  else if (message.length > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;

  return errors;
}

const inputClasses = (invalid: boolean) =>
  cn(
    'w-full rounded-xl border bg-canvas/50 px-4 py-3 text-[0.95rem] text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-200',
    'focus:outline-none focus-visible:outline-none focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)]',
    invalid ? 'border-danger/60 focus:border-danger' : 'border-line hover:border-line-strong focus:border-accent/60',
  );

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-sm text-danger"
          >
            <CircleAlert className="size-3.5 shrink-0" aria-hidden />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [honeypot, setHoneypot] = useState('');

  const errors = validate(values);
  const visibleError = (field: FieldName) => (touched[field] || submitAttempted ? errors[field] : undefined);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (status.kind === 'error' || status.kind === 'mail-opened') setStatus({ kind: 'idle' });
  };

  const onBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const fieldProps = (field: FieldName) => {
    const error = visibleError(field);
    return {
      id: `contact-${field}`,
      name: field,
      value: values[field],
      onChange,
      onBlur,
      required: true,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? `contact-${field}-error` : undefined,
      className: inputClasses(Boolean(error)),
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    if (!endpoint) {
      const body = `${payload.message}\n\n${payload.name}\n${payload.email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: 'mail-opened' });
      return;
    }

    // Bots fill hidden fields; quietly drop the submission.
    if (honeypot) {
      setStatus({ kind: 'sent' });
      return;
    }

    setStatus({ kind: 'submitting' });
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setStatus({ kind: 'sent' });
      setValues(EMPTY);
      setTouched({});
      setSubmitAttempted(false);
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === 'AbortError';
      setStatus({
        kind: 'error',
        message: timedOut ? 'The request timed out.' : 'Something went wrong while sending your message.',
      });
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (status.kind === 'sent') {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full min-h-80 flex-col items-center justify-center rounded-2xl border border-success/25 bg-success/[0.06] p-8 text-center"
      >
        <CircleCheck className="size-10 text-success" aria-hidden />
        <p className="mt-4 text-xl font-medium">Message sent. Thank you!</p>
        <p className="mt-2 max-w-sm text-muted">I’ll read it and get back to you at the email address you provided.</p>
        <button type="button" onClick={() => setStatus({ kind: 'idle' })} className={buttonClasses('secondary', 'sm', 'mt-6')}>
          Send another message
        </button>
      </motion.div>
    );
  }

  const submitting = status.kind === 'submitting';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby="contact-form-note" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={visibleError('name')}>
          <input type="text" autoComplete="name" placeholder="Your name" maxLength={80} {...fieldProps('name')} />
        </Field>
        <Field id="contact-email" label="Email" error={visibleError('email')}>
          <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" maxLength={120} {...fieldProps('email')} />
        </Field>
      </div>

      <Field id="contact-subject" label="Subject" error={visibleError('subject')}>
        <input type="text" placeholder="What’s it about?" maxLength={120} {...fieldProps('subject')} />
      </Field>

      <Field
        id="contact-message"
        label="Message"
        error={visibleError('message')}
        hint={
          <span className={cn('font-mono text-xs', values.message.length > MESSAGE_MAX ? 'text-danger' : 'text-faint')}>
            {values.message.length}/{MESSAGE_MAX}
          </span>
        }
      >
        <textarea rows={6} placeholder="Tell me a little about your idea, role or question…" {...fieldProps('message')} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting for bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={submitting} className={buttonClasses('primary', 'md', 'w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto')}>
          {submitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : endpoint ? (
            <>
              Send message
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden />
            </>
          ) : (
            <>
              <Mail className="size-4" aria-hidden />
              Open in email app
            </>
          )}
        </button>
        <p id="contact-form-note" className="text-xs leading-relaxed text-faint sm:max-w-[16rem] sm:text-right">
          {endpoint
            ? 'Your message is sent securely and only used to reply to you.'
            : 'Opens your email app with this message filled in. Nothing is sent until you send it there.'}
        </p>
      </div>

      <div aria-live="polite">
        <AnimatePresence>
          {status.kind === 'mail-opened' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/[0.06] p-4 text-sm text-muted"
            >
              <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>
                Your email app should now be open with the message ready to send. If nothing happened, email me directly at{' '}
                <a href={`mailto:${profile.email}`} className="font-medium break-all text-ink underline underline-offset-4">
                  {profile.email}
                </a>
                .
              </span>
            </motion.p>
          )}
          {status.kind === 'error' && (
            <motion.p
              role="alert"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/[0.07] p-4 text-sm text-muted"
            >
              <CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
              <span>
                {status.message} Please try again, or email me directly at{' '}
                <a href={`mailto:${profile.email}`} className="font-medium break-all text-ink underline underline-offset-4">
                  {profile.email}
                </a>
                .
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
