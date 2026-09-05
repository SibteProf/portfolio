import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { FileText, Github, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../content/portfolio'
import { navLinks } from '../content/nav'
import Logo from './ui/Logo'
import GameModeToggle from './GameModeToggle'

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
            ? 'border-white/10 bg-[rgba(13,13,21,0.86)] backdrop-blur-xl'
            : 'border-transparent bg-[rgba(19,19,27,0.4)] backdrop-blur-md'
        }`}
      >
        <nav
          className="page-container flex h-[var(--header-h)] items-center justify-between"
          aria-label="Main navigation"
        >
          <Link to="/" className="group/logo" aria-label="Sibte Hussain, home">
            <Logo />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link"
                activeProps={{ className: 'active' }}
                activeOptions={{ exact: link.href === '/' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <GameModeToggle />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-ink-2 transition-all hover:border-indigo hover:text-indigo sm:flex"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-indigo lg:inline-flex"
            >
              <FileText size={15} />
              Resume
            </a>
            <Link
              to="/contact"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              Let&apos;s Talk
            </Link>
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-ink-2 lg:hidden"
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
            className="sticky top-[var(--header-h)] z-40 border-b border-white/10 bg-[rgba(13,13,21,0.94)] backdrop-blur-xl lg:hidden"
          >
            <nav
              className="page-container flex flex-col gap-4 py-5"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="nav-link w-fit text-sm"
                  activeProps={{ className: 'active' }}
                  activeOptions={{ exact: link.href === '/' }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link flex w-fit items-center gap-1.5 text-sm"
              >
                <FileText size={15} />
                Resume
              </a>
              <Link to="/contact" className="btn btn-primary btn-block mt-2">
                Start a Conversation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
