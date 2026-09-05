import { Link, useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DURATION, EASE_OUT } from '../lib/motion'

const MotionLink = motion.create(Link)

export default function FloatingContactCTA() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shouldShow = visible && location.pathname !== '/contact'

  return (
    <AnimatePresence>
      {shouldShow ? (
        <MotionLink
          to="/contact"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: DURATION.fast, ease: EASE_OUT }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="btn btn-primary fixed right-6 bottom-6 z-40 shadow-[0_16px_40px_rgba(73,75,214,0.35)]"
          aria-label="Start a conversation"
        >
          <MessageSquare size={17} />
          <span className="hidden sm:inline">Let&apos;s Talk</span>
        </MotionLink>
      ) : null}
    </AnimatePresence>
  )
}
