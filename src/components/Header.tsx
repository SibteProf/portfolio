import { Link, useLocation } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--line)] backdrop-blur-lg transition-all duration-300 ${
        scrolled ? 'bg-[var(--header-bg)] shadow-sm' : 'bg-[var(--header-bg)]'
      }`}
    >
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4" aria-label="Main navigation">
        {/* Logo */}
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] transition-all sm:px-4 sm:py-2 hover:-translate-y-0.5 hover:border-[var(--lagoon)]"
          >
            {/* <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)] transition-transform group-hover:scale-125" /> */}
            <img src='/favicon.png' alt='Brand Image' />
          </Link>
        </h2>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link relative px-4 py-2 text-sm font-medium text-[var(--sea-ink-soft)] transition-colors"
              activeProps={{ className: 'nav-link is-active' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-3">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] p-2 text-[var(--sea-ink)] transition hover:border-[var(--lagoon)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lagoon)] focus-visible:ring-offset-2"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--header-bg)] px-4 py-4 sm:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link rounded-full px-4 py-3 text-sm font-medium text-[var(--sea-ink-soft)] transition-colors hover:bg-[var(--link-bg-hover)]"
                activeProps={{ className: 'nav-link is-active bg-[rgba(79,184,178,0.1)]' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}