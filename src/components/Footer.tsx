import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react'

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
      href: 'mailto:sibtehussain@example.com',
      icon: Mail,
    },
  ]

  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[var(--header-bg)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap">
        {/* Top Section */}
        <div className="grid gap-8 pb-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)] flex items-center justify-center text-sm font-bold text-white">
                SH
              </span>
              <span className="text-lg font-semibold text-[var(--sea-ink)]">
                Sibte Hussain
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              Senior React & React Native Developer passionate about building
              exceptional web and mobile experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="island-kicker text-xs uppercase">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <a
                href="/"
                className="text-sm transition-colors hover:text-[var(--lagoon)]"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-sm transition-colors hover:text-[var(--lagoon)]"
              >
                About
              </a>
              <a
                href="/experience"
                className="text-sm transition-colors hover:text-[var(--lagoon)]"
              >
                Experience
              </a>
              <a
                href="/skills"
                className="text-sm transition-colors hover:text-[var(--lagoon)]"
              >
                Skills
              </a>
              <a
                href="/contact"
                className="text-sm transition-colors hover:text-[var(--lagoon)]"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="island-kicker text-xs uppercase">Contact</h3>
            <div className="flex items-center gap-2 text-sm">
              <Mail size={16} className="text-[var(--lagoon)]" />
              <a
                href="mailto:sibtehussain@example.com"
                className="transition-colors hover:text-[var(--lagoon)]"
              >
                sibtehussain@example.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-[var(--lagoon)]" />
              <span>Karachi, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4 border-t border-[var(--line)] pt-6 sm:flex-row sm:justify-between">
          <p className="m-0 text-sm">
            &copy; {year} Sibte Hussain. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.name !== 'Email' ? '_blank' : undefined}
                  rel={link.name !== 'Email' ? 'noreferrer' : undefined}
                  className="rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] p-2 text-[var(--sea-ink-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]"
                  aria-label={link.name}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}