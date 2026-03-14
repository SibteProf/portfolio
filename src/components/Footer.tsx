import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ui/ScrollReveal'

export default function Footer() {
  const year = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: Linkedin,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: Twitter,
    },
    {
      name: 'Email',
      href: 'mailto:sibte566@gmail.com',
      icon: Mail,
    },
  ]

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    { label: 'Skills', href: '/skills' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] opacity-50" />

      <div className="relative page-container px-4 py-12">
        {/* Top Section */}
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <ScrollReveal delay={0} className="space-y-4">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-12 w-12 rounded-xl  flex items-center justify-center text-[var(--text-inverse)] font-bold text-lg shadow-lg shadow-[var(--accent-glow)]">
                <img src='/favicon.png' alt='Brand Image' />
              </div>
              <span className="font-display font-semibold text-[var(--text-primary)] text-xl">
                Sibte Hussain
              </span>
            </motion.div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
              Senior React & React Native Developer passionate about building
              exceptional web and mobile experiences.
            </p>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.1} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors inline-flex items-center gap-1.5 w-fit"
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </ScrollReveal>

          {/* Social Links */}
          <ScrollReveal delay={0.2} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all"
                    aria-label={link.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                    <span className="text-sm">{link.name}</span>
                  </motion.a>
                )
              })}
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.3} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Contact
            </h3>
            <div className="space-y-3">
              <motion.a
                href="mailto:sibte566@gmail.com"
                className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                whileHover={{ x: 4 }}
              >
                <div className="p-2 rounded-lg bg-[var(--accent-glow)]">
                  <Mail size={16} className="text-[var(--accent-primary)]" />
                </div>
                sibte566@gmail.com
              </motion.a>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <div className="p-2 rounded-lg bg-[var(--accent-glow)]">
                  <MapPin size={16} className="text-[var(--accent-primary)]" />
                </div>
                Lahore, Pakistan
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border-color)] pt-6 md:flex-row">
          <p className="text-sm text-[var(--text-muted)]">
            &copy; {year} Sibte Hussain. All rights reserved.
          </p>

          {/* Decorative accent */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-sm text-[var(--text-muted)]">Built with</span>
            <motion.span
              className="text-[var(--accent-primary)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            <span className="text-sm text-[var(--text-muted)]">using React</span>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}