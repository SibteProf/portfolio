import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../content/portfolio'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/experience' },
  { label: 'Stack', href: '/skills' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-white/10 bg-[rgba(13,13,21,0.52)] py-10">
      <div className="page-container grid gap-10 md:grid-cols-[1.15fr_0.7fr_0.8fr]">
        <div className="space-y-4">
          <a
            href="/"
            className="font-display text-xl font-semibold tracking-[-0.02em]"
          >
            {profile.name}
          </a>
          <p className="max-w-md text-sm leading-7 text-[var(--text-secondary)]">
            {profile.title} who also can&apos;t leave a phone&apos;s firmware
            alone. Based in {profile.location}.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="section-kicker !mb-0">Explore</h2>
          <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[var(--primary)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="section-kicker !mb-0">Connect</h2>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
            >
              <Mail size={16} />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-[var(--primary)]"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="page-container mt-8 border-t border-white/10 pt-5 text-xs text-[var(--text-muted)]">
        (c) {year} {profile.name}.
      </div>
    </footer>
  )
}
