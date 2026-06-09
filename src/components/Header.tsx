import { useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Github, Menu, Terminal, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../content/portfolio'

const navLinks = [
  { href: '/', label: 'Home', match: '/' },
  { href: '/experience', label: 'Work', match: '/experience' },
  { href: '/skills', label: 'Stack', match: '/skills' },
  { href: '/about', label: 'About', match: '/about' },
  { href: '/contact', label: 'Contact', match: '/contact' },
]

export default function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-200 ${
          scrolled
            ? 'border-white/10 bg-[rgba(13,13,21,0.86)] shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl'
            : 'border-white/5 bg-[rgba(19,19,27,0.64)] backdrop-blur-md'
        }`}
      >
        <nav
          className="page-container flex items-center justify-between py-4"
          aria-label="Main navigation"
        >
          <a href="/" className="group inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[var(--bg-card-strong)] text-[var(--primary)] shadow-[0_0_18px_rgba(73,75,214,0.22)] transition-colors group-hover:text-[var(--secondary)]">
              <Terminal size={19} aria-hidden />
            </span>
            <span className="font-display text-xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
              Sibte.dev
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.match

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[var(--text-secondary)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)] sm:flex"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="/contact"
              className="hidden sm:inline-flex btn btn-primary min-h-10 px-4 py-2"
            >
              Let&apos;s Talk
            </a>
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[var(--text-secondary)] lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              whileTap={{ scale: 0.96 }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="sticky top-[73px] z-40 border-b border-white/10 bg-[rgba(13,13,21,0.94)] backdrop-blur-xl lg:hidden"
          >
            <nav
              className="page-container flex flex-col gap-4 py-5"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link w-fit text-sm ${location.pathname === link.match ? 'active' : ''}`}
                >
                  {link.label}
                </a>
              ))}
              <a href="/contact" className="btn btn-primary mt-2">
                Start a Conversation
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
