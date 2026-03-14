import type {ReactNode} from 'react';

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
 * Legacy component - now uses ScrollReveal internally
 * @deprecated Use ScrollReveal from components/ui/ScrollReveal.tsx instead
 */
export default function AnimateIn({
  children,
  className = '',
  style,
  rootMargin = '0px 0px -60px 0px',
  threshold = 0.1,
}: AnimateInProps) {
  return (
    <div
      className={className}
      style={style}
      data-animate-in
      data-root-margin={rootMargin}
      data-threshold={threshold}
    >
      {children}
    </div>
  )
}