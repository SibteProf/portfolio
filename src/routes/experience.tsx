import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { projects } from '../content/portfolio'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/experience')({
  head: () =>
    seo({
      title: 'Work',
      description:
        'Production work by Sibte Hussain: NowVPlay, Pecunia, Kunji, GoodFynd and VueCent. Role-based dashboards, offline-first POS, real-time sockets, payments and auth.',
      path: '/experience',
    }),
  component: Experience,
})

function Experience() {
  return (
    <div className="prose-container py-12">
      <section className="section">
        <ScrollReveal className="mb-14">
          <p className="section-kicker">Work</p>
          <h1 className="section-title">
            The stuff I&apos;ve <span className="text-accent">built</span>, and
            why it mattered at the time.
          </h1>
          <p className="section-subtitle mt-5">
            No filler bullet points, just what the project needed and what I
            actually did about it.
          </p>
        </ScrollReveal>

        <div className="divided-list">
          {projects.map((project) => (
            <ScrollReveal key={project.title}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                  {project.title}
                </h2>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
                  >
                    Visit
                    <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {project.type}
              </p>
              <p className="stack-line mt-3">{project.stack.join(', ')}</p>

              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  The problem:{' '}
                </span>
                {project.problem}
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  The result:{' '}
                </span>
                {project.outcome}
              </p>

              <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2.5">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--text-muted)]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Experience
