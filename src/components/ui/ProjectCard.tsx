import { ArrowUpRight } from 'lucide-react'
import { StickerRow } from './Sticker'

interface Project {
  title: string
  type: string
  problem: string
  highlights: Array<string>
  outcome: string
  stack: Array<string>
  link?: string
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
 * hover. There are no screenshots in the repo, so the card header is a small
 * IDE window instead — window dots, the grid motif, and the project's own path
 * — which keeps the terminal identity the rest of the site is built on. If
 * screenshots turn up, they drop into the same slot behind the overlay.
 */
export default function ProjectCard({
  project,
  detailed = false,
}: {
  project: Project
  detailed?: boolean
}) {
  const { title, type, problem, highlights, outcome, stack, link } = project

  return (
    <article className="project-card glass-card h-full">
      <div className="project-card-media grid-motif">
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="terminal-dot bg-rose/70" />
          <span className="terminal-dot bg-amber/70" />
          <span className="terminal-dot bg-mint/70" />
        </div>
        <span className="font-code text-xs text-ink-3 sm:text-sm">
          ~/work/{slugify(title)}
        </span>
        {link ? (
          <span className="project-card-overlay">
            Visit project
            <ArrowUpRight size={14} aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-indigo"
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

        {detailed ? (
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
                      className="mt-3 h-1 w-1 shrink-0 rounded-full bg-mint"
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
