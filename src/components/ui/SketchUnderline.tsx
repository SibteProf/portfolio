import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../../lib/motion'

/**
 * Hand-drawn annotation for key phrases, in Electric Indigo.
 *
 * DESIGN.md makes hand-drawn accents a core part of the brand ("The Human
 * Architect"), so this is a small family rather than a single underline:
 *
 *   underline — two offset strokes, which is what stops it reading as a
 *               border-bottom
 *   circle    — a loose ellipse, for a word being singled out
 *   bracket   — square brackets either side, for an aside
 *
 * Every variant draws itself with the same pathLength animation and the same
 * reduced-motion guard.
 */
type Variant = 'underline' | 'circle' | 'bracket'

const PATHS: Record<
  Variant,
  Array<{ d: string; width: number; opacity?: number }>
> = {
  underline: [
    { d: 'M3 8.2C38 3.4 74 9.8 104 5.6 134 1.4 168 8.6 197 4.4', width: 3.4 },
    {
      d: 'M8 11C44 7.2 78 12 110 8.4 141 5 172 10.4 193 8',
      width: 1.6,
      opacity: 0.45,
    },
  ],
  circle: [
    {
      d: 'M100 4C152 4 193 12 193 26 193 41 149 49 99 49 48 49 6 41 6 26 6 12 47 4 100 4',
      width: 2.2,
    },
    {
      d: 'M186 40C176 46 141 51 100 51 62 51 30 47 15 41',
      width: 1.6,
      opacity: 0.5,
    },
  ],
  bracket: [
    { d: 'M14 3C7 4 5 12 5 26 5 40 7 48 14 49', width: 2.4 },
    { d: 'M186 3C193 4 195 12 195 26 195 40 193 48 186 49', width: 2.4 },
  ],
}

const VIEWBOX: Record<Variant, string> = {
  underline: '0 0 200 12',
  circle: '0 0 200 53',
  bracket: '0 0 200 53',
}

export default function SketchUnderline({
  children,
  accent = false,
  variant = 'underline',
  trailing,
}: {
  children: ReactNode
  /** Draw in mint instead of indigo. */
  accent?: boolean
  variant?: Variant
  /**
   * Punctuation that belongs to the annotated phrase. The wrapper is an
   * inline-block, so a comma written as a sibling in the JSX is free to wrap
   * onto the next line on its own — which is exactly what the hero headline
   * used to do. Anything passed here renders inside the wrapper instead.
   */
  trailing?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()

  // indigo-hot, not indigo: #c0c1ff is a pale lavender that reads as a plain
  // white underline at a 3px stroke, which defeats the point of drawing it.
  const stroke = accent ? 'var(--color-mint)' : 'var(--color-indigo-hot)'
  const drawn = reduced || inView

  return (
    <span ref={ref} className={`sketch-mark sketch-${variant}`}>
      {children}
      <svg
        viewBox={VIEWBOX[variant]}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {PATHS[variant].map((path, index) => (
          <motion.path
            key={path.d}
            d={path.d}
            fill="none"
            stroke={stroke}
            strokeWidth={path.width}
            strokeLinecap="round"
            opacity={path.opacity ?? 1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: drawn ? 1 : 0 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : index * 0.1,
              ease: EASE_OUT,
            }}
          />
        ))}
      </svg>
      {trailing}
    </span>
  )
}
