import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'

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
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute -left-1/4 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-[var(--primary-deep)]/20 blur-[120px]"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{
          duration: 26,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute right-[-15%] top-[18%] h-[30rem] w-[30rem] rounded-full bg-[var(--secondary)]/10 blur-[120px]"
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
        transition={{
          duration: 32,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[30%] h-[28rem] w-[28rem] rounded-full bg-[var(--tertiary)]/10 blur-[120px]"
        animate={{ x: [0, 40, -40, 0], y: [0, -25, 25, 0] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export function Magnetic({
  children,
  strength = 0.35,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })
  const prefersReducedMotion = useReducedMotion()

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    if (
      typeof window !== 'undefined' &&
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return
    }

    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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

export function Counter({
  value,
  duration = 1.5,
  suffix = '',
  prefix = '',
}: {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    return rounded.on('change', (latest) => setDisplay(latest))
  }, [rounded])

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      motionValue.set(value)
      return
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [isInView, value, duration, prefersReducedMotion, motionValue])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
