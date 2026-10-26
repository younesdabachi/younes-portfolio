import { useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useI18n } from '../i18n/I18n';
import { SectionHeading } from '../components/SectionHeading';
import { GlassCard } from '../components/GlassCard';
import { Reveal } from '../components/Reveal';
import { SocialButtons } from '../components/SocialButtons';
import { site } from '../data/site';
import { cn } from '../utils/cn';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: string; // honeypot anti-spam
}

const EMPTY: FormFields = { name: '', email: '', subject: '', message: '', botcheck: '' };

/**
 * Contact : liens cliquables (mailto/tel) + formulaire Web3Forms.
 * Sans clé VITE_WEB3FORMS_KEY, bascule proprement vers un mailto: pré-rempli.
 */
export function Contact() {
  const { dict, lang } = useI18n();
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (key: keyof FormFields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormFields, string>> = {};
    if (fields.name.trim().length < 2) next.name = dict.contact.form.nameError;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
      next.email = dict.contact.form.emailError;
    if (fields.message.trim().length < 10) next.message = dict.contact.form.messageError;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const openMailto = () => {
    const subject = fields.subject.trim() || `Portfolio — ${fields.name.trim()}`;
    const body = `${fields.message.trim()}\n\n— ${fields.name.trim()} (${fields.email.trim()})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setStatus('mailto');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    if (!validate()) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
    if (!accessKey || accessKey === 'your-access-key-here') {
      openMailto();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: fields.subject.trim() || `Portfolio — message de ${fields.name.trim()}`,
          from_name: `Portfolio — ${fields.name.trim()}`,
          name: fields.name.trim(),
          email: fields.email.trim(),
          message: fields.message.trim(),
          botcheck: fields.botcheck,
        }),
      });
      const data = (await response.json()) as { success?: boolean };
      if (response.ok && data.success) {
        setStatus('success');
        setFields(EMPTY);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (invalid?: string) =>
    cn(
      'w-full rounded-xl border bg-bg/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/60',
      invalid ? 'border-red-400/70' : 'border-line focus:border-accent/60'
    );

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading kicker={dict.contact.kicker} title={dict.contact.title} />

      <p className="-mt-6 mb-12 max-w-xl text-muted md:-mt-10">{dict.contact.intro}</p>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Coordonnées */}
        <div className="flex flex-col gap-4">
          <Reveal>
            <a
              href={`mailto:${site.email}`}
              className="glass gradient-border spotlight-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/40"
              data-cursor
            >
              <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-accent">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {dict.contact.emailLabel}
                </span>
                <span className="mt-1 block break-all text-sm font-medium">{site.email}</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={site.phoneHref}
              className="glass gradient-border spotlight-card flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/40"
              data-cursor
            >
              <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-accent">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {dict.contact.phoneLabel}
                </span>
                <span className="mt-1 block text-sm font-medium">{site.phoneDisplay}</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="glass gradient-border flex items-center gap-4 rounded-2xl p-5">
              <span className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-gold">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {dict.contact.locationLabel}
                </span>
                <span className="mt-1 block text-sm font-medium">{site.location[lang]}</span>
              </span>
            </div>
          </Reveal>

          {/* Réseaux sociaux */}
          <Reveal delay={0.24}>
            <div className="glass gradient-border spotlight-card flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {dict.contact.socialTitle}
              </span>
              <SocialButtons size="lg" />
            </div>
          </Reveal>
        </div>

        {/* Formulaire */}
        <Reveal delay={0.1}>
          <GlassCard className="p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold">{dict.contact.form.title}</h3>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              {/* Honeypot : invisible pour les humains, appétent pour les robots */}
              <input
                type="checkbox"
                name="botcheck"
                checked={fields.botcheck !== ''}
                onChange={set('botcheck')}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                    {dict.contact.form.name} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={fields.name}
                    onChange={set('name')}
                    placeholder={dict.contact.form.namePlaceholder}
                    className={inputClass(errors.name)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    autoComplete="name"
                    required
                  />
                  {errors.name && (
                    <p id="error-name" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                    {dict.contact.form.email} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={fields.email}
                    onChange={set('email')}
                    placeholder={dict.contact.form.emailPlaceholder}
                    className={inputClass(errors.email)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    autoComplete="email"
                    required
                  />
                  {errors.email && (
                    <p id="error-email" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium">
                  {dict.contact.form.subject}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={fields.subject}
                  onChange={set('subject')}
                  placeholder={dict.contact.form.subjectPlaceholder}
                  className={inputClass()}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
                  {dict.contact.form.message} <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={fields.message}
                  onChange={set('message')}
                  placeholder={dict.contact.form.messagePlaceholder}
                  className={cn(inputClass(errors.message), 'resize-y')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  required
                />
                {errors.message && (
                  <p id="error-message" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" /> {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-6 py-3 text-sm font-semibold text-[#01130b] shadow-[0_0_28px_-6px_rgba(74,222,128,0.55)] transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
                  data-cursor
                >
                  {status === 'sending' ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                  {status === 'sending' ? dict.contact.form.sending : dict.contact.form.send}
                </button>

                <p aria-live="polite">
                  {status === 'success' && (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> {dict.contact.form.success}
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="flex items-center gap-1.5 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" aria-hidden="true" /> {dict.contact.form.error}
                    </span>
                  )}
                  {status === 'mailto' && (
                    <span className="flex items-center gap-1.5 text-sm text-accent">
                      <Mail className="h-4 w-4" aria-hidden="true" /> {dict.contact.form.mailto}
                    </span>
                  )}
                </p>
              </div>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
