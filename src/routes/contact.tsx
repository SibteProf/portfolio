import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sibtehussain@example.com',
    link: 'mailto:sibtehussain@example.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Karachi, Pakistan',
    link: null,
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

    // Simulate form submission
    try {
      // In a real app, you would send this to your backend
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (error) {
      setStatus('error')
    }

    // Reset status after 5 seconds
    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <main className="page-wrap px-4 py-12">
      {/* Header */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.3),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

        <div className="relative z-10">
          <p className="island-kicker mb-3">Contact</p>
          <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
            Let's Connect
          </h1>
          <p className="max-w-2xl text-lg text-[var(--sea-ink-soft)]">
            Have a project in mind or just want to say hi? Feel free to reach out.
            I'm always excited to discuss new opportunities and ideas.
          </p>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="island-shell rise-in rounded-2xl p-6" style={{ animationDelay: '100ms' }}>
            <h2 className="mb-4 text-lg font-semibold text-[var(--sea-ink)]">
              Get in Touch
            </h2>
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="rounded-full bg-[rgba(79,184,178,0.15)] p-2">
                      <Icon size={18} className="text-[var(--lagoon)]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase text-[var(--sea-ink-soft)]">
                        {item.label}
                      </p>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-sm font-medium text-[var(--sea-ink)] transition-colors hover:text-[var(--lagoon)]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[var(--sea-ink)]">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Social Links */}
          <div className="island-shell rise-in rounded-2xl p-6" style={{ animationDelay: '200ms' }}>
            <h2 className="mb-4 text-lg font-semibold text-[var(--sea-ink)]">
              Follow Me
            </h2>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] p-3 text-[var(--sea-ink-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Response Time */}
          <div className="island-shell rise-in rounded-2xl p-6" style={{ animationDelay: '300ms' }}>
            <h2 className="mb-3 text-lg font-semibold text-[var(--sea-ink)]">
              Response Time
            </h2>
            <p className="text-sm text-[var(--sea-ink-soft)]">
              I typically respond to messages within 24-48 hours. For urgent matters,
              please mention it in your message subject.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="island-shell rise-in rounded-2xl p-6 sm:p-8" style={{ animationDelay: '200ms' }}>
            <h2 className="mb-6 text-xl font-semibold text-[var(--sea-ink)]">
              Send a Message
            </h2>

            {/* Success Message */}
            {status === 'success' && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 dark:border-green-800 dark:bg-green-900/20">
                <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-900/20">
                <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  Oops! Something went wrong. Please try again.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--sea-ink)]">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)]/50 transition-all focus:border-[var(--lagoon)] focus:outline-none focus:ring-2 focus:ring-[var(--lagoon)]/20 ${
                    errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[var(--line)]'
                  }`}
                  disabled={status === 'submitting'}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--sea-ink)]">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)]/50 transition-all focus:border-[var(--lagoon)] focus:outline-none focus:ring-2 focus:ring-[var(--lagoon)]/20 ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[var(--line)]'
                  }`}
                  disabled={status === 'submitting'}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[var(--sea-ink)]">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className={`w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)]/50 transition-all focus:border-[var(--lagoon)] focus:outline-none focus:ring-2 focus:ring-[var(--lagoon)]/20 ${
                    errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[var(--line)]'
                  }`}
                  disabled={status === 'submitting'}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--sea-ink)]">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className={`w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)]/50 transition-all focus:border-[var(--lagoon)] focus:outline-none focus:ring-2 focus:ring-[var(--lagoon)]/20 resize-none ${
                    errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[var(--line)]'
                  }`}
                  disabled={status === 'submitting'}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-[rgba(50,143,151,0.4)] bg-[rgba(79,184,178,0.2)] px-8 py-4 text-sm font-semibold text-[var(--lagoon-deep)] transition-all hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.3)] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
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
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}