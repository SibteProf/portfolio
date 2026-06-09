import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { projects } from '../content/portfolio'

export const Route = createFileRoute('/experience')({
  component: Experience,
})

function Experience() {
  return (
    <div className="page-container py-12">
      <section className="section">
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Work</p>
          <h1 className="display-title text-4xl font-bold md:text-6xl">
            Expanded project detail with the context behind the build.
          </h1>
          <p className="section-subtitle mt-4">
            This page goes a bit deeper into the kinds of responsibilities I have handled across
            product, frontend architecture, integrations, and release-facing behavior.
          </p>
        </ScrollReveal>

        <div className="space-y-8">
          {projects.map((project) => (
            <ScrollReveal key={project.title}>
              <article className="surface-card rounded-[2rem] p-6 md:p-8">
                <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div>
                    <p className="section-kicker !mb-2">{project.type}</p>
                    <h2 className="display-title text-3xl font-bold md:text-4xl">{project.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
                      {project.role}
                    </p>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-primary)]"
                  >
                    Visit project
                    <ExternalLink size={16} />
                  </a>
                </div>

                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Product challenge
                    </h3>
                    <p className="text-sm leading-7 text-[var(--text-secondary)]">{project.problem}</p>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Implementation highlights
                    </h3>
                    <ul className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 border-t border-[var(--border-color)] pt-6 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Outcome
                    </h3>
                    <p className="text-sm leading-7 text-[var(--text-secondary)]">{project.outcome}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--border-color)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Experience
