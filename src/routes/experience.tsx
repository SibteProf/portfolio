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
        <ScrollReveal className="mb-12">
          <p className="section-kicker">Work</p>
          <h1 className="section-title max-w-5xl">
            Project work with the{' '}
            <span className="hand-underline">context behind the build</span>.
          </h1>
          <p className="section-subtitle mt-5">
            A closer look at responsibilities across web apps, mobile apps,
            APIs, databases, auth, real-time systems, performance, and internal
            AI tooling.
          </p>
        </ScrollReveal>

        <div className="space-y-10">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title}>
              <article className="glass-card overflow-hidden rounded-xl">
                <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
                  <div className="relative min-h-80 border-b border-white/10 bg-[var(--bg-secondary)] p-6 lg:border-b-0 lg:border-r">
                    <div className="scanline" />
                    <div className="terminal-window h-full">
                      <div className="terminal-header">
                        <span className="terminal-dot bg-[#ff5f56]" />
                        <span className="terminal-dot bg-[#ffbd2e]" />
                        <span className="terminal-dot bg-[#27c93f]" />
                        <span className="ml-auto font-code text-xs text-[var(--text-muted)]">
                          case-study-{index + 1}.tsx
                        </span>
                      </div>
                      <div className="terminal-body">
                        <p>
                          <span className="text-[var(--secondary)]">$</span>{' '}
                          open {project.title}
                        </p>
                        <p className="mt-5 text-[var(--text-muted)]">type:</p>
                        <p className="text-[var(--primary)]">{project.type}</p>
                        <p className="mt-5 text-[var(--text-muted)]">stack:</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span key={tech} className="sticker">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="section-kicker !mb-2">
                          0{index + 1} / Selected Build
                        </p>
                        <h2 className="font-display text-4xl font-extrabold tracking-[-0.05em] md:text-5xl">
                          {project.title}
                        </h2>
                        <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-[var(--text-primary)]">
                          {project.role}
                        </p>
                      </div>
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary shrink-0"
                        >
                          Visit
                          <ExternalLink size={16} />
                        </a>
                      ) : (
                        <span className="btn btn-secondary shrink-0 cursor-default opacity-70">
                          Internal Build
                        </span>
                      )}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                        <h3 className="mb-3 font-code text-xs font-bold uppercase tracking-[0.12em] text-[var(--secondary)]">
                          Product Challenge
                        </h3>
                        <p className="text-sm leading-7 text-[var(--text-secondary)]">
                          {project.problem}
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                        <h3 className="mb-3 font-code text-xs font-bold uppercase tracking-[0.12em] text-[var(--secondary)]">
                          Outcome
                        </h3>
                        <p className="text-sm leading-7 text-[var(--text-secondary)]">
                          {project.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg border border-white/10 bg-[rgba(13,13,21,0.48)] p-5">
                      <h3 className="mb-4 font-code text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        Implementation Highlights
                      </h3>
                      <ul className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--secondary)] shadow-[0_0_12px_rgba(78,222,163,0.7)]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
