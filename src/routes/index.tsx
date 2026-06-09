import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '../components/ui/ScrollReveal'
import {
  credibilityItems,
  processSteps,
  profile,
  projects,
  services,
  timeline,
  workingPrinciples,
} from '../content/portfolio'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="page-container pb-16 pt-8 md:pt-12">
      <ScrollReveal>
        <section className="section grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-7">
            <span className="eyebrow-chip">{profile.availability}</span>
            <div className="space-y-5">
              <h1 className="section-title display-title max-w-4xl">
                I build fullstack product experiences that teams can ship, maintain, and extend.
              </h1>
              <p className="max-w-3xl text-lg text-[var(--text-secondary)] md:text-xl">
                {profile.intro}
              </p>
              <p className="max-w-3xl text-base text-[var(--text-secondary)] md:text-lg">
                My work covers React and Next.js interfaces, React Native delivery, API integrations,
                auth and RBAC, payments, real-time product behavior, and the release details that keep
                production software dependable.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/contact" className="btn btn-primary">
                Discuss a Project
                <ArrowRight size={18} />
              </a>
              <a href="/#work" className="btn btn-secondary">
                See Selected Work
              </a>
            </div>
          </div>

          <div className="surface-card rounded-[2rem] p-6 md:p-8">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              How I work
            </p>
            <div className="space-y-5">
              {workingPrinciples.map((item) => (
                <div key={item.title} className="border-t border-[var(--border-color)] pt-5 first:border-t-0 first:pt-0">
                  <h2 className="mb-2 text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="line-panel grid gap-6 py-6 md:grid-cols-2">
          {credibilityItems.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] md:text-base">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--accent-primary)]" />
              <span>{item}</span>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <section id="work" className="section">
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Selected Work</p>
          <h2 className="display-title text-4xl font-bold md:text-6xl">
            Case studies that show product context, integrations, and delivery judgment.
          </h2>
          <p className="section-subtitle mt-4">
            These projects reflect the kind of work I enjoy most: complex user flows, real-world
            product constraints, and code that has to stay usable after launch.
          </p>
        </ScrollReveal>

        <StaggerContainer className="space-y-8">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <article className="surface-card rounded-[2rem] p-6 md:p-8">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="space-y-4">
                    <div>
                      <p className="section-kicker !mb-2">{project.type}</p>
                      <h3 className="display-title text-3xl font-bold">{project.title}</h3>
                    </div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{project.role}</p>
                    <p className="text-sm leading-7 text-[var(--text-secondary)]">{project.problem}</p>
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

                  <div className="space-y-5">
                    <div>
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        What I implemented
                      </p>
                      <ul className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-primary)]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-[var(--border-color)] pt-5">
                      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        Outcome
                      </p>
                      <p className="text-sm leading-7 text-[var(--text-secondary)]">{project.outcome}</p>
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
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section id="services" className="section">
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Services</p>
          <h2 className="display-title text-4xl font-bold md:text-6xl">
            The parts of product delivery I am strongest at.
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <ScrollReveal key={service.title}>
              <div className="rounded-[1.75rem] border border-[var(--border-color)] p-6">
                <h3 className="mb-3 text-2xl font-semibold">{service.title}</h3>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <p className="section-kicker">Engineering Approach</p>
          <h2 className="display-title text-4xl font-bold md:text-6xl">
            I try to reduce complexity before I add polish.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
            {profile.summary}
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.05}>
              <div className="rounded-[1.75rem] border border-[var(--border-color)] p-6">
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-primary)]">
                  0{index + 1}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section">
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Career Snapshot</p>
          <h2 className="display-title text-4xl font-bold md:text-6xl">
            Experience that supports client-facing delivery.
          </h2>
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-3">
          {timeline.map((item) => (
            <ScrollReveal key={item.period}>
              <div className="rounded-[1.75rem] border border-[var(--border-color)] p-6">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary)]">
                  {item.period}
                </p>
                <h3 className="text-xl font-semibold">{item.role}</h3>
                <p className="mb-3 text-sm text-[var(--text-primary)]">{item.company}</p>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">{item.summary}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="surface-card rounded-[2rem] p-8 md:p-12">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 className="display-title text-4xl font-bold md:text-6xl">
                Need someone who can own product details without overcomplicating the build?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                I work best with agencies and teams that value steady communication, practical
                engineering decisions, and clean handoff quality. If that sounds useful, let&apos;s talk.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <a href="/contact" className="btn btn-primary">
                Start a Conversation
                <ArrowRight size={18} />
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-secondary">
                Email Me Directly
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
