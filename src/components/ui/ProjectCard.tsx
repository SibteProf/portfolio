import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { StickerRow } from './Sticker'

interface Project {
  title: string
  type: string
  problem?: string
  highlights?: Array<string>
  outcome: string
  stack: Array<string>
  link?: string
  /** The product's own colour, read off its live site. Drives the whole card. */
  brand?: string
  tagline?: string
  domain?: string
  /** Slug under /work/ once a real capture exists. See scripts/generate-images.mjs. */
  image?: string
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Glass project card.
 *
 * DESIGN.md specifies a glassmorphic overlay blurring a project screenshot on
 * hover. Where a capture exists it goes straight into that slot; where it does
 * not, the media area falls back to a poster built from the project's own brand
 * colour and tagline rather than a placeholder path. Five cards then read as
 * five different products, which an identical grey rectangle repeated five
 * times did not.
 *
 * The IDE window chrome stays either way, so the card still belongs to the same
 * site as the hero terminal.
 */
export default function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project
  detailed?: boolean
}) {
  const {
    title,
    type,
    problem,
    highlights,
    outcome,
    stack,
    link,
    brand,
    tagline,
    domain,
    image,
  } = project

  // The card wears the product's colour, not the site's. This is the deliberate
  // exception to the accent role map in styles.css.
  const style = brand
    ? ({ '--accent': brand, '--accent-deep': brand } as CSSProperties)
    : undefined

  const MediaTag = link ? 'a' : 'div'
  const mediaLinkProps = link
    ? {
        href: link,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${title} (opens in a new tab)`,
      }
    : {}

  return (
    <article className="project-card glass-card h-full" style={style}>
      <MediaTag className="project-card-media grid-motif" {...mediaLinkProps}>
        <div className="absolute top-3 left-3 z-[2] flex gap-1.5">
          <span className="terminal-dot bg-rose/70" />
          <span className="terminal-dot bg-amber/70" />
          <span className="terminal-dot bg-mint/70" />
        </div>

        {image ? (
          <picture>
            <source
              type="image/avif"
              srcSet={`/work/${image}.avif 640w, /work/${image}@1280.avif 1280w`}
              sizes="(min-width: 1024px) 40vw, 92vw"
            />
            <img
              src={`/work/${image}.webp`}
              srcSet={`/work/${image}.webp 640w, /work/${image}@1280.webp 1280w`}
              sizes="(min-width: 1024px) 40vw, 92vw"
              width={640}
              height={200}
              alt={`${title} — screenshot of the live product`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </picture>
        ) : (
          <div className="project-poster">
            <p className="project-poster-tagline">
              {tagline ?? `~/work/${slugify(title)}`}
            </p>
            {domain ? <p className="project-poster-domain">{domain}</p> : null}
          </div>
        )}

        {link ? (
          <span className="project-card-overlay">
            Visit project
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        ) : null}
      </MediaTag>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--accent)]"
              >
                {title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              title
            )}
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-ink-3">{type}</p>
        </div>

        {detailed && problem && highlights ? (
          <>
            <div>
              <p className="section-kicker mb-1.5">The problem</p>
              <p className="text-sm leading-7 text-ink-2">{problem}</p>
            </div>
            <div>
              <p className="section-kicker mb-2">What I built</p>
              <ul className="space-y-2.5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-ink-2"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}

        <div>
          {detailed ? (
            <p className="section-kicker mb-1.5">The result</p>
          ) : null}
          <p className="text-sm leading-7 text-ink-2">{outcome}</p>
        </div>

        <StickerRow items={stack} className="mt-auto pt-2" />
      </div>
    </article>
  )
}
