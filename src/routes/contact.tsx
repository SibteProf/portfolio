import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  HoverCard,
  Magnetic,
} from '../components/ui/ScrollReveal'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sibte566@gmail.com',
    link: 'mailto:sibte566@gmail.com',
    color: '#00d4aa',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Lahore, Pakistan',
    link: null,
    color: '#00a080',
  },
]

const socialLinks = [
  {
    icon: Github,
    name: 'GitHub',
    href: 'https://github.com',
  },
  {
    icon: Linkedin,
    name: 'LinkedIn',
    href: 'https://linkedin.com',
  },
  {
    icon: Twitter,
    name: 'Twitter',
    href: 'https://twitter.com',
  },
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

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

    if (!validateForm()) {
      return
    }

    setStatus('submitting')

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (error) {
      setStatus('error')
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const inputClasses = (hasError: boolean) => `
    w-full rounded-xl bg-[var(--bg-glass)] border px-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all focus:outline-none focus:ring-2
    ${hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20 hover:border-[var(--border-hover)]'
    }
  `

  return (
    <div className="page-container py-12">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-16 md:py-24">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--accent-primary)]/10 blur-[100px] pointer-events-none" />

          <ScrollReveal delay={0}>
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent-primary)] mb-4">
              Contact
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Let's <span className="text-gradient">Connect</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
              Have a project in mind or just want to say hi? Feel free to reach out.
              I'm always excited to discuss new opportunities and ideas.
            </p>
          </ScrollReveal>
        </section>
      </ScrollReveal>

      <div className="grid gap-8 lg:grid-cols-3 min-w-0">
        {/* Contact Info */}
        <div className="space-y-6">
          <StaggerContainer delay={0.1}>
            {/* Contact Details */}
            <StaggerItem>
              <HoverCard className="p-6">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.label} className="flex items-start gap-3">
                        <div
                          className="p-2.5 rounded-lg bg-[var(--accent-glow)]"
                          style={{ color: item.color }}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                            {item.label}
                          </p>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-[var(--text-primary)]">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </HoverCard>
            </StaggerItem>

            {/* Social Links */}
            <StaggerItem>
              <HoverCard className="p-6">
                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                  Follow Me
                </h2>
                <div className="flex gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Magnetic key={link.name} strength={0.1}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all"
                          aria-label={link.name}
                        >
                          <Icon size={20} />
                        </a>
                      </Magnetic>
                    )
                  })}
                </div>
              </HoverCard>
            </StaggerItem>

            {/* Response Time */}
            <StaggerItem>
              <HoverCard className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-[var(--accent-glow)]">
                    <Send size={16} className="text-[var(--accent-primary)]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                    Response Time
                  </h2>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  I typically respond to messages within 24-48 hours.
                  For urgent matters, please mention it in your message subject.
                </p>
              </HoverCard>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 min-w-0">
          <ScrollReveal delay={0.2}>
            <motion.div
              className="card rounded-2xl p-6 sm:p-8"
              whileHover={{ y: -2 }}
            >
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                Send a Message
              </h2>

              {/* Success Message */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    role="alert"
                    aria-live="polite"
                    className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3"
                  >
                    <CheckCircle className="text-green-500" size={20} aria-hidden />
                    <p className="text-sm font-medium text-green-400">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    role="alert"
                    aria-live="assertive"
                    className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
                  >
                    <AlertCircle className="text-red-500" size={20} aria-hidden />
                    <p className="text-sm font-medium text-red-400">
                      Oops! Something went wrong. Please try again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
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
                    placeholder="John Doe"
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

                {/* Email */}
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
                    placeholder="john@example.com"
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

                {/* Subject */}
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
                    placeholder="Project Inquiry"
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

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                    Message <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${inputClasses(!!errors.message)} resize-none`}
                    disabled={status === 'submitting'}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-500" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  aria-busy={status === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-8 py-4 text-sm font-semibold text-[var(--text-inverse)] shadow-lg shadow-[var(--accent-glow)] transition-all hover:shadow-xl hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg"
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
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
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}