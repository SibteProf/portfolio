import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { impactStats } from '../../content/portfolio'
import { EASE_OUT } from '../../lib/motion'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (reduced) {
      setDisplay(value)
      return
    }

    const controls = animate(0, value, {
      duration: 1.1,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })

    return () => controls.stop()
  }, [inView, reduced, value])

  return (
    <span
      ref={ref}
      className="font-display text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl"
    >
      {display}
      <span className="text-indigo">{suffix}</span>
    </span>
  )
}

/**
 * Credibility band. `impactStats` has been exported from portfolio.ts and
 * rendered nowhere — it even computes a stack-breadth count that never reached
 * the DOM. This is where it lands.
 */
export default function StatBand() {
  return (
    <div className="line-panel">
      <dl className="page-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {impactStats.map((stat) => (
          // dt before dd keeps the pair semantically ordered; col-reverse puts the
          // number on top visually. The label used to be rendered twice — once
          // in an sr-only dt and again in the dd — so it was announced twice.
          <div key={stat.label} className="flex flex-col-reverse gap-2">
            <dt className="measure-sm text-sm leading-6 text-ink-3">
              {stat.label}
            </dt>
            <dd>
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
