import { motion, useInView } from 'framer-motion'
import type {MotionProps} from 'framer-motion';
import { useRef, useState, useEffect  } from 'react'
import type {ReactNode} from 'react';

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
  duration = 0.5,
  once = true,
  className = '',
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
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
  stagger = 0.1,
  className = '',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
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

export function StaggerItem({ children, className = '', ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface FadeInProps {
  children: ReactNode
  duration?: number
  className?: string
}

export function FadeIn({ children, duration = 0.3, className = '' }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ScaleInProps {
  children: ReactNode
  delay?: number
  scale?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, scale = 0.9, className = '' }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface CounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function Counter({ value, duration = 2, suffix = '', prefix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(0)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let animationId: number
    const startValue = 0
    const endValue = value
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 4)
      const current = startValue + (endValue - startValue) * easeProgress
      const rounded = Math.round(current)

      setDisplayValue(rounded)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

interface TextRevealProps {
  text: string
  delay?: number
  className?: string
}

export function TextReveal({ text, delay = 0, className = '' }: TextRevealProps) {
  const words = text.split(' ')

  return (
    <motion.div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + i * 0.05 }}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setPosition({ x, y })
  }

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 })
    // setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      onMouseMove={handleMouse}
      // onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedBackgroundProps {
  className?: string
}

interface TrailPoint {
  id: number
  x: number
  y: number
  createdAt: number
}

export function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const lastAddTime = useRef(0)
  const trailIdCounter = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isCoarsePointer) return

    let mounted = true
    let rafId = 0

    const TRAIL_LIFETIME = 1500 // ms before fully faded
    const ADD_INTERVAL = 16 // ms between adding new trail points

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastAddTime.current < ADD_INTERVAL) return

      // Calculate velocity (direction mouse is moving)
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y

      // Smooth velocity
      velocity.current.x = velocity.current.x * 0.5 + dx * 0.5
      velocity.current.y = velocity.current.y * 0.5 + dy * 0.5

      // Offset trail point behind the cursor (opposite direction of movement)
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      const offset = Math.min(speed * 2, 60) // Max 60px behind, scales with speed

      let offsetX = 0
      let offsetY = 0
      if (speed > 1) {
        offsetX = -(velocity.current.x / speed) * offset
        offsetY = -(velocity.current.y / speed) * offset
      }

      lastAddTime.current = now
      lastPos.current = { x: e.clientX, y: e.clientY }

      const newPoint: TrailPoint = {
        id: trailIdCounter.current++,
        x: e.clientX + offsetX,
        y: e.clientY + offsetY,
        createdAt: now,
      }

      setTrailPoints((prev) => [...prev.slice(-30), newPoint]) // Keep max 30 points
    }

    const tick = () => {
      if (!mounted) return
      const now = performance.now()

      setTrailPoints((prev) => prev.filter((p) => now - p.createdAt < TRAIL_LIFETIME))

      rafId = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    rafId = window.requestAnimationFrame(tick)

    return () => {
      mounted = false
      window.removeEventListener('pointermove', onMove)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={containerRef} className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Trail points */}
      {trailPoints.map((point) => {
        const age = performance.now() - point.createdAt
        const opacity = Math.max(0, 1 - age / 1500)
        const scale = 1 - (age / 1500) * 0.3 // Slightly shrink as it ages

        return (
          <div
            key={point.id}
            className="trail-point"
            style={{
              left: point.x,
              top: point.y,
              opacity,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
            aria-hidden
          />
        )
      })}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, var(--accent-marker), transparent)' }}
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
        style={{ background: 'radial-gradient(circle, #439c8a, transparent)' }}
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-10 blur-[60px]"
        style={{ background: 'radial-gradient(circle, var(--accent-secondary), transparent)' }}
        animate={{
          x: [0, 40, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}

interface HoverCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function HoverCard({ children, className = '', glowColor = 'var(--accent-marker)' }: HoverCardProps) {
  return (
    <motion.div
      className={`card relative overflow-hidden rounded-2xl ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="hover-card-glow absolute inset-0 opacity-0"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}15, transparent 70%)`,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

interface TypewriterProps {
  text: string
  speed?: number
  deleteSpeed?: number
  pauseMs?: number
  loop?: boolean
  className?: string
}

export function Typewriter({
  text,
  speed = 50,
  deleteSpeed = 35,
  pauseMs = 900,
  loop = false,
  className = '',
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let mounted = true
    let timeoutId: number | undefined

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutId = window.setTimeout(resolve, ms)
      })

    const run = async () => {
      setDisplayedText('')

      if (!loop) {
        for (let i = 0; i < text.length && mounted; i++) {
          setDisplayedText(text.slice(0, i + 1))
          await sleep(speed)
        }
        return
      }

      while (mounted) {
        // type forward
        for (let i = 0; i < text.length; i++) {
          setDisplayedText(text.slice(0, i + 1))
          await sleep(speed)
        }

        await sleep(pauseMs)

        // delete backward
        for (let i = text.length; i >= 0; i--) {
          setDisplayedText(text.slice(0, i))
          await sleep(deleteSpeed)
        }

        await sleep(pauseMs / 2)
      }
    }

    void run()

    return () => {
      mounted = false
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [text, speed, deleteSpeed, pauseMs, loop])

  return <span className={className}>{displayedText}</span>
}