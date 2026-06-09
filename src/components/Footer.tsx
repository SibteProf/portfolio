import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../content/portfolio'

const footerLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-color)] py-10">
      <div className="page-container grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <div className="font-display text-2xl font-bold">{profile.name}</div>
          <p className="max-w-md text-sm text-[var(--text-secondary)]">
            {profile.title} focused on shipping maintainable web and mobile products for agencies and growing teams.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Explore
          </h2>
          <div className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-[var(--text-primary)]">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Contact
          </h2>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-[var(--text-primary)]">
              <Mail size={16} />
              {profile.email}
            </a>
            <a
              href="https://github.com/SibtePls"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--text-primary)]"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sibte-hussain-b55aa723b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--text-primary)]"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="page-container mt-8 border-t border-[var(--border-color)] pt-5 text-sm text-[var(--text-muted)]">
        © {year} {profile.name}. Built to show how I think, ship, and collaborate.
      </div>
    </footer>
  )
}
