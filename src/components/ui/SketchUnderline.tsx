import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../../lib/motion'

/**
 * The hand-drawn underline DESIGN.md calls for on key headline phrases, in
 * Electric Indigo. Two offset strokes rather than one, which is what stops it
 * reading as a border-bottom.
 *
 * Replaces the flat coloured-span treatment the headlines used before.
 */
export default function SketchUnderline({
  children,
  accent = false,
}: {
  children: ReactNode
  /** Draw in mint instead of indigo. */
  accent?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  const stroke = accent ? 'var(--color-mint)' : 'var(--color-indigo)'
  const drawn = reduced || inView

  return (
    <span ref={ref} className="sketch-underline">
      {children}
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M3 8.2C38 3.4 74 9.8 104 5.6 134 1.4 168 8.6 197 4.4"
          fill="none"
          stroke={stroke}
          strokeWidth="3.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
        />
        <motion.path
          d="M8 11C44 7.2 78 12 110 8.4 141 5 172 10.4 193 8"
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.45"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: drawn ? 1 : 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.1,
            ease: EASE_OUT,
          }}
        />
      </svg>
    </span>
  )
}
