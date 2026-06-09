import { useLocation } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { useEffect, useState } from 'react'
import { Menu, X, Github } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../content/portfolio'

const navLinks = [
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'border-b border-[var(--border-color)] bg-[color:rgba(12,17,23,0.86)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="page-container flex items-center justify-between py-4"
          aria-label="Main navigation"
        >
          <a href="/" className="inline-flex items-center gap-3">
            <span className="font-display text-2xl font-bold text-accent">S</span>
            <span className="hidden text-sm font-medium text-[var(--text-secondary)] sm:inline">
              {profile.name}
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive =
                (link.href === '/about' && location.pathname === '/about') ||
                (link.href === '/contact' && location.pathname === '/contact')

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
              href="https://github.com/SibtePls"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] sm:flex"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <ThemeToggle />
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] md:hidden"
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
            className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] md:hidden"
          >
            <nav className="page-container flex flex-col gap-4 py-5" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link text-base">
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
