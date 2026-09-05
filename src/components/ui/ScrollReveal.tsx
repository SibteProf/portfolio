import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  DURATION,
  REVEAL_Y,
  STAGGER,
  ease,
  revealVariants,
} from '../../lib/motion'

interface ScrollRevealProps extends MotionProps {
  children: ReactNode
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

/**
 * Fade-and-rise on scroll into view.
 *
 * Note the reduced-motion handling: the `prefers-reduced-motion` block in
 * styles.css only overrides CSS animation and transition durations, and
 * framer-motion animates via JS, so it ignored that block entirely. The check
 * has to happen here. The element still renders the same markup either way, so
 * SSR and hydration agree — only the transition duration changes.
 */
export function ScrollReveal({
  children,
  delay = 0,
  duration = DURATION.base,
  once = true,
  className = '',
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: REVEAL_Y }}
      animate={
        isInView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: REVEAL_Y }
      }
      transition={reduced ? { duration: 0 } : ease(duration, delay)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  delay?: number
  stagger?: number
  className?: string
}

/**
 * Coordinated reveal for grids and lists. Cheaper and better-looking than one
 * ScrollReveal per item, which makes every child observe the viewport on its
 * own and arrive out of step.
 */
export function StaggerContainer({
  children,
  delay = 0,
  stagger = STAGGER,
  className = '',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView || reduced ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            delayChildren: reduced ? 0 : delay,
            staggerChildren: reduced ? 0 : stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps extends MotionProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({
  children,
  className = '',
  ...props
}: StaggerItemProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      variants={revealVariants}
      transition={reduced ? { duration: 0 } : ease()}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Typewriter({
  text,
  className = '',
  speed = 45,
  deleteSpeed = 30,
  pauseMs = 1500,
  loop = false,
}: {
  text: string
  speed?: number
  deleteSpeed?: number
  pauseMs?: number
  loop?: boolean
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(prefersReducedMotion ? text : '')

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(text)
      return
    }

    let index = 0
    let deleting = false
    let timeoutId: ReturnType<typeof setTimeout>

    const tick = () => {
      if (!deleting) {
        index += 1
        setDisplay(text.slice(0, index))
        if (index >= text.length) {
          if (!loop) return
          timeoutId = setTimeout(() => {
            deleting = true
            tick()
          }, pauseMs)
          return
        }
        timeoutId = setTimeout(tick, speed)
      } else {
        index -= 1
        setDisplay(text.slice(0, index))
        if (index <= 0) {
          deleting = false
          timeoutId = setTimeout(tick, speed)
          return
        }
        timeoutId = setTimeout(tick, deleteSpeed)
      }
    }

    timeoutId = setTimeout(tick, speed)
    return () => clearTimeout(timeoutId)
  }, [text, speed, deleteSpeed, pauseMs, loop, prefersReducedMotion])

  return (
    <span className={className}>
      {display}
      {!prefersReducedMotion ? (
        <span className="typewriter-caret" aria-hidden="true">
          |
        </span>
      ) : null}
    </span>
  )
}
