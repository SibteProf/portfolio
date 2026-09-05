import type { Transition, Variants } from 'framer-motion'

/**
 * The house easing curve. Previously copy-pasted into ScrollReveal,
 * StaggerItem and FloatingContactCTA, which meant three places to drift.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.18,
  base: 0.35,
  slow: 0.5,
} as const

export const ease = (
  duration: number = DURATION.base,
  delay = 0,
): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
})

/** How far an element travels on a reveal. Small on purpose. */
export const REVEAL_Y = 16

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  visible: { opacity: 1, y: 0 },
}

export const STAGGER = 0.07
