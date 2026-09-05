import { Link } from '@tanstack/react-router'
import { FileText, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../content/portfolio'
import { navLinks } from '../content/nav'
import Logo from './ui/Logo'

const socials = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'GitHub', href: profile.github, icon: Github, external: true },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin, external: true },
  {
    label: 'Resume (PDF)',
    href: profile.resume,
    icon: FileText,
    external: true,
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-line bg-[rgba(13,13,21,0.52)] py-14">
      <div className="page-container grid gap-10 md:grid-cols-[1.15fr_0.7fr_0.8fr]">
        <div className="space-y-4">
          <Link
            to="/"
            className="group/logo inline-flex"
            aria-label="Sibte Hussain, home"
          >
            <Logo size={30} />
          </Link>
          <p className="measure text-sm leading-7 text-ink-2">
            {profile.title} who also can&apos;t leave a phone&apos;s firmware
            alone. Based in {profile.location}.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="section-kicker">Explore</h2>
          <div className="flex flex-col gap-2 text-sm text-ink-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="w-fit transition-colors hover:text-indigo"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="section-kicker">Connect</h2>
          <div className="space-y-3 text-sm text-ink-2">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="flex w-fit items-center gap-2 transition-colors hover:text-indigo"
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container mt-10 border-t border-line pt-5 text-xs text-ink-3">
        © {year} {profile.name}. Built with React, TanStack Start and too much
        coffee.
      </div>
    </footer>
  )
}
