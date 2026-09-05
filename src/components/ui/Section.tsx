import type { ElementType, ReactNode } from 'react'
import { ScrollReveal } from './ScrollReveal'

interface SectionProps {
  /** Small mono label above the heading. Rendered as a <p>, never a heading. */
  kicker?: string
  title?: ReactNode
  subtitle?: ReactNode
  /** Heading level. Every page gets exactly one h1. */
  headingAs?: ElementType
  /** Display size of the heading, independent of its level. */
  size?: 'lg' | 'sm'
  id?: string
  className?: string
  headerClassName?: string
  children?: ReactNode
}

/**
 * One section rhythm for the whole site.
 *
 * This also fixes a real accessibility problem: the kicker class used to be
 * applied to <h2> elements in the footer and on About and Contact, so those
 * headings rendered as 11px uppercase mono labels. Here the kicker is always a
 * <p> and the heading is always a heading.
 */
export default function Section({
  kicker,
  title,
  subtitle,
  headingAs: Heading = 'h2',
  size = 'sm',
  id,
  className = '',
  headerClassName = 'mb-12',
  children,
}: SectionProps) {
  const hasHeader = Boolean(kicker || title || subtitle)

  return (
    <section id={id} className={`section ${className}`}>
      {hasHeader ? (
        <ScrollReveal className={headerClassName}>
          {kicker ? <p className="section-kicker mb-3.5">{kicker}</p> : null}
          {title ? (
            <Heading
              className={size === 'lg' ? 'section-title' : 'section-title-sm'}
            >
              {title}
            </Heading>
          ) : null}
          {subtitle ? (
            <p className="section-subtitle measure mt-5">{subtitle}</p>
          ) : null}
        </ScrollReveal>
      ) : null}
      {children}
    </section>
  )
}
