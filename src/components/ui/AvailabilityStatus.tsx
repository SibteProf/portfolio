import { profile } from '../../content/portfolio'

/**
 * The availability signal.
 *
 * This used to be a bordered pill with a small green dot, which is the single
 * most reused component on the internet — every SaaS marketing page and every
 * generated developer portfolio ships it, so it reads as a template part rather
 * than as this person's site.
 *
 * The replacement is built out of the site's own mark instead: the chevron and
 * the blinking caret are exactly what `LogoMark` draws, so the line echoes the
 * logo and the hero terminal rather than borrowing someone else's badge. No
 * pill, no dot, no border.
 */
export default function AvailabilityStatus({
  className = '',
}: {
  className?: string
}) {
  return (
    <p className={`status-line ${className}`}>
      <span className="status-line-glyph" aria-hidden="true">
        &gt;
      </span>
      {profile.availability}
      <span className="status-line-caret" aria-hidden="true">
        ▍
      </span>
    </p>
  )
}
