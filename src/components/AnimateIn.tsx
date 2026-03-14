import { useEffect, useRef, useState, type ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  /** CSS class when in view (e.g. 'rise-in') */
  className?: string
  /** Inline animation delay when in view */
  style?: React.CSSProperties
  /** Root margin for Intersection Observer (e.g. '0px 0px -60px 0px' to trigger when 60px from bottom) */
  rootMargin?: string
  /** Minimum fraction of element visible to trigger (0–1) */
  threshold?: number
}

/**
 * Wraps content and adds an animation class when the element enters the viewport.
 * Respects prefers-reduced-motion by skipping the animation.
 */
export default function AnimateIn({
  children,
  className = '',
  style,
  rootMargin = '0px 0px -40px 0px',
  threshold = 0.1,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, prefersReducedMotion])

  return (
    <div
      ref={ref}
      className={isInView ? `${className} scroll-in`.trim() : 'opacity-0'}
      style={style}
    >
      {children}
    </div>
  )
}
