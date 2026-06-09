import { motion, useInView } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import { useRef } from 'react'
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

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className = '' }: HoverCardProps) {
  return (
    <motion.div
      className={`surface-card ${className}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedBackground() {
  return null
}

export function Magnetic({
  children,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  return <div className={className}>{children}</div>
}

export function Typewriter({
  text,
  className = '',
}: {
  text: string
  speed?: number
  deleteSpeed?: number
  pauseMs?: number
  loop?: boolean
  className?: string
}) {
  return <span className={className}>{text}</span>
}

export function Counter({
  value,
  suffix = '',
  prefix = '',
}: {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
