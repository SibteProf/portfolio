import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import emailjs from '@emailjs/browser'
import {
  AlertCircle,
  CheckCircle,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { profile, projectInquiryChecklist } from '../content/portfolio'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    link: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone,
    link: `tel:${profile.phone.replaceAll('-', '').replace('+', '+')}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: profile.location,
    link: null,
  },
]

const socialLinks = [
  { icon: Github, name: 'GitHub', href: profile.github },
  {
    icon: Linkedin,
    name: 'LinkedIn',
    href: profile.linkedin,
  },
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus('submitting')

    const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY
    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID

    if (!publicKey || !serviceId || !templateId) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        { publicKey },
      )
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const inputClasses = (hasError: boolean) =>
    `form-field ${hasError ? 'error' : ''}`

  return (
    <div className="prose-container py-12">
      <section className="section">
        <ScrollReveal className="mb-14">
          <span className="status-chip mb-8">{profile.availability}</span>
          <p className="section-kicker">Contact</p>
          <h1 className="section-title">
            Let&apos;s build something{' '}
            <span className="text-accent">exceptional</span>.
          </h1>
          <p className="section-subtitle mt-5">
            Have something in mind? Tell me about it below.
          </p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal className="divided-list">
            <div>
              <h2 className="section-kicker">Useful Context</h2>
              <ul className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                {projectInquiryChecklist.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--text-muted)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="section-kicker">Direct Contact</h2>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <Icon
                        size={16}
                        className="mt-1 text-[var(--text-muted)]"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
                          {item.label}
                        </p>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-sm text-[var(--text-primary)] hover:text-[var(--primary)]"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h2 className="section-kicker">Profiles</h2>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <Icon size={16} />
                      {link.name}
                    </a>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-7">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                Project inquiry
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                A few specifics are enough. We can untangle the rest together.
              </p>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  aria-live="polite"
                  className="mb-6 flex items-center gap-3 rounded-lg border border-[var(--secondary)]/30 bg-[var(--secondary)]/10 px-4 py-3"
                >
                  <CheckCircle
                    className="text-[var(--secondary)]"
                    size={20}
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-[var(--secondary)]">
                    Message sent successfully. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 flex items-center gap-3 rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3"
                >
                  <AlertCircle
                    className="text-[var(--danger)]"
                    size={20}
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-[var(--danger)]">
                    Something went wrong. Please try again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <FieldError id="name-error" message={errors.name}>
                <label
                  htmlFor="name"
                  className="mb-2 block font-code text-xs font-bold uppercase tracking-[0.1em]"
                >
                  Name{' '}
                  <span className="text-[var(--danger)]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClasses(!!errors.name)}
                  disabled={status === 'submitting'}
                />
              </FieldError>

              <FieldError id="email-error" message={errors.email}>
                <label
                  htmlFor="email"
                  className="mb-2 block font-code text-xs font-bold uppercase tracking-[0.1em]"
                >
                  Email{' '}
                  <span className="text-[var(--danger)]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClasses(!!errors.email)}
                  disabled={status === 'submitting'}
                />
              </FieldError>

              <FieldError id="subject-error" message={errors.subject}>
                <label
                  htmlFor="subject"
                  className="mb-2 block font-code text-xs font-bold uppercase tracking-[0.1em]"
                >
                  Subject{' '}
                  <span className="text-[var(--danger)]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="New project inquiry"
                  autoComplete="off"
                  aria-required="true"
                  aria-invalid={!!errors.subject}
                  aria-describedby={
                    errors.subject ? 'subject-error' : undefined
                  }
                  className={inputClasses(!!errors.subject)}
                  disabled={status === 'submitting'}
                />
              </FieldError>

              <FieldError id="message-error" message={errors.message}>
                <label
                  htmlFor="message"
                  className="mb-2 block font-code text-xs font-bold uppercase tracking-[0.1em]"
                >
                  Message{' '}
                  <span className="text-[var(--danger)]" aria-hidden="true">
                    *
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me what you are building, the timeline, and where you need help."
                  rows={6}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  className={`${inputClasses(!!errors.message)} resize-y`}
                  disabled={status === 'submitting'}
                />
              </FieldError>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="btn btn-primary w-full"
                whileTap={{ scale: status === 'submitting' ? 1 : 0.99 }}
              >
                {status === 'submitting' ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Start a Conversation
                  </>
                )}
              </motion.button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

function FieldError({
  id,
  message,
  children,
}: {
  id: string
  message?: string
  children: ReactNode
}) {
  return (
    <div>
      {children}
      {message && (
        <p id={id} className="mt-2 text-xs text-[var(--danger)]" role="alert">
          {message}
        </p>
      )}
    </div>
  )
}
