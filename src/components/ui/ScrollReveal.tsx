import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface ScrollRevealProps extends MotionProps {
  children: ReactNode
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.4,
  once = true,
  className = '',
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
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

export function StaggerContainer({
  children,
  delay = 0,
  stagger = 0.08,
  className = '',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
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
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
