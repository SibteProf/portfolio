import { Link, useLocation } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'
import { Menu, X, Github } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal, Magnetic } from './ui/ScrollReveal'

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
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg-secondary)]/80 backdrop-blur-xl border-b border-[var(--border-color)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="page-container flex items-center justify-between py-4" aria-label="Main navigation">
          {/* Logo */}
          <ScrollReveal delay={0}>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 no-underline"
            >
              <motion.div
                className="relative flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="h-10 w-10 rounded-xl  flex items-center justify-center text-[var(--text-inverse)] font-bold text-lg shadow-lg shadow-[var(--accent-glow)]">
                  <img src='/favicon.png' alt='Brand Image' />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-xl  opacity-0 blur-xl"
                  whileHover={{ opacity: 0.5 }}
                />
              </motion.div>
              {/* <span className="hidden sm:block font-display font-semibold text-[var(--text-primary)] text-lg">
                Sibte Hussain
              </span> */}
            </Link>
          </ScrollReveal>

          {/* Desktop Navigation */}
          <ScrollReveal delay={0.1} className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link no-underline px-4 py-2 rounded-full transition-all ${
                  location.pathname === link.to
                    ? 'bg-[var(--bg-glass)] text-[var(--text-primary)]'
                    : 'hover:bg-[var(--bg-glass)]'
                }`}
                activeProps={{ className: 'nav-link active bg-[var(--bg-glass)]' }}
              >
                {link.label}
              </Link>
            ))}
          </ScrollReveal>

          {/* Right Actions */}
          <ScrollReveal delay={0.2} className="flex items-center gap-3">
            <motion.a
              href="https://github.com/SibteHussain"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-glass-hover)] transition-all"
              aria-label="GitHub"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
            </motion.a>
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)]"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </ScrollReveal>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)]"
          >
            <nav className="page-container py-4 flex flex-col gap-2" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`nav-link no-underline px-4 py-3 rounded-xl text-base font-medium ${
                      location.pathname === link.to
                        ? 'bg-[var(--accent-glow)] text-[var(--accent-primary)]'
                        : 'hover:bg-[var(--bg-glass)]'
                    }`}
                    activeProps={{ className: 'nav-link active bg-[var(--accent-glow)] text-[var(--accent-primary)]' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-3 pt-4 mt-2 border-t border-[var(--border-color)]">
                <motion.a
                  href="https://github.com/SibteHussain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}