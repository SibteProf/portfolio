import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
    icon: MapPin,
    label: 'Location',
    value: profile.location,
    link: null,
  },
]

const socialLinks = [
  { icon: Github, name: 'GitHub', href: 'https://github.com/SibtePls' },
  { icon: Linkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/sibte-hussain-b55aa723b' },
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
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

  const handleSubmit = async (e: React.FormEvent) => {
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
        { publicKey }
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    `w-full rounded-3xl border px-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] bg-transparent transition-colors focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        : 'border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20'
    }`

  return (
    <div className="page-container py-12">
      <section className="section grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal className="space-y-6">
          <div>
            <p className="section-kicker">Contact</p>
            <h1 className="display-title text-4xl font-bold md:text-6xl">
              Start a conversation with enough detail to make the next step useful.
            </h1>
          </div>
          <p className="text-base leading-8 text-[var(--text-secondary)]">
            I work with agencies and teams that need dependable implementation across frontend,
            integrations, and production-ready product details. If you are reaching out about a
            project, sending the basics below helps me respond well.
          </p>

          <div className="rounded-[1.75rem] border border-[var(--border-color)] p-6">
            <h2 className="mb-4 text-lg font-semibold">Useful context to include</h2>
            <ul className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
              {projectInquiryChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-[var(--border-color)] p-5">
              <h2 className="mb-4 text-lg font-semibold">Direct contact</h2>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <Icon size={18} className="mt-1 text-[var(--accent-primary)]" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                          {item.label}
                        </p>
                        {item.link ? (
                          <a href={item.link} className="text-sm text-[var(--text-primary)]">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">{item.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[var(--border-color)] p-5">
              <h2 className="mb-4 text-lg font-semibold">Profiles</h2>
              <div className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <Icon size={18} />
                      {link.name}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="surface-card rounded-[2rem] p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-semibold">Project inquiry</h2>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  role="alert"
                  aria-live="polite"
                  className="mb-6 flex items-center gap-3 rounded-3xl border border-green-500/30 bg-green-500/10 px-4 py-3"
                >
                  <CheckCircle className="text-green-500" size={20} aria-hidden />
                  <p className="text-sm font-medium text-green-400">
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
                  className="mb-6 flex items-center gap-3 rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3"
                >
                  <AlertCircle className="text-red-500" size={20} aria-hidden />
                  <p className="text-sm font-medium text-red-400">
                    Something went wrong. Please try again.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Name <span className="text-red-500" aria-hidden="true">*</span>
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
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-500" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Email <span className="text-red-500" aria-hidden="true">*</span>
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
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Subject <span className="text-red-500" aria-hidden="true">*</span>
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
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className={inputClasses(!!errors.subject)}
                  disabled={status === 'submitting'}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1 text-xs text-red-500" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Message <span className="text-red-500" aria-hidden="true">*</span>
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
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClasses(!!errors.message)} resize-y`}
                  disabled={status === 'submitting'}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-500" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                aria-busy={status === 'submitting'}
                className="btn btn-primary w-full"
                whileTap={{ scale: status === 'submitting' ? 1 : 0.99 }}
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
