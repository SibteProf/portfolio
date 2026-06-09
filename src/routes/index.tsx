import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Sparkles,
} from 'lucide-react'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/ui/ScrollReveal'
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
    <div className="page-container pb-16 pt-8">
      <ScrollReveal>
        <section className="section grid min-h-[calc(100vh-7rem)] gap-12 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="relative z-10 space-y-7">
            <div className="absolute -left-16 -top-16 -z-10 h-72 w-72 rounded-full bg-[var(--primary-deep)]/20 blur-[90px]" />
            <span className="eyebrow-chip">{profile.availability}</span>
            <div className="space-y-6">
              <h1 className="section-title">
                I build full-stack{' '}
                <span className="hand-underline">product systems</span> teams
                can ship.
              </h1>
              <p className="section-subtitle text-lg md:text-xl">
                {profile.intro}
              </p>
              <p className="max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
                My work covers React, Next.js, Node.js, React Native, SQL and
                NoSQL databases, REST and GraphQL APIs, auth/RBAC, real-time
                workflows, performance optimization, CI/CD, and local LLM
                integrations.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/experience" className="btn btn-primary">
                Explore Work
                <ArrowRight size={17} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Github size={17} />
                View GitHub
              </a>
            </div>
          </div>

          <TerminalHero />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="line-panel grid gap-5 rounded-xl px-5 py-6 md:grid-cols-2">
          {credibilityItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 text-sm text-[var(--text-secondary)] md:text-base"
            >
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-[var(--secondary)]"
              />
              <span>{item}</span>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <section id="work" className="section">
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Selected Work</p>
          <h2 className="section-title-sm max-w-4xl">
            Case studies with product context, integration depth, and release
            judgment.
          </h2>
          <p className="section-subtitle mt-4">
            These projects reflect the kind of work I enjoy most: complex user
            flows, real-world constraints, and code that has to stay useful
            after launch.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <StaggerItem key={project.title}>
              <article className="glass-card group relative flex h-full min-h-[31rem] flex-col overflow-hidden rounded-xl p-6">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 rounded-xl"
                    aria-label={`Visit ${project.title}`}
                  />
                ) : null}
                <div className="scanline opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-code text-xs font-semibold uppercase tracking-[0.12em] text-[var(--secondary)]">
                    0{index + 1} / Case Study
                  </span>
                  {project.link ? (
                    <ExternalLink
                      size={17}
                      className="text-[var(--text-muted)] transition-colors group-hover:text-[var(--primary)]"
                    />
                  ) : null}
                </div>
                <div className="mb-8 rounded-lg border border-white/10 bg-[var(--bg-secondary)] p-4 font-code text-xs leading-7 text-[var(--text-secondary)]">
                  <span className="text-[var(--primary)]">project</span>.ship(
                  {`{`}
                  <br />
                  &nbsp;&nbsp;name: &apos;{project.title}&apos;,
                  <br />
                  &nbsp;&nbsp;stack: &apos;
                  {project.stack.slice(0, 3).join(' + ')}&apos;
                  <br />
                  {`}`})
                </div>
                <div className="space-y-4">
                  <p className="section-kicker !mb-0">{project.type}</p>
                  <h3 className="font-display text-3xl font-extrabold tracking-[-0.04em] text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {project.role}
                  </p>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">
                    {project.outcome}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-7">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="sticker">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section id="services" className="section">
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Services</p>
          <h2 className="section-title-sm max-w-4xl">
            The delivery lanes where I create the most leverage.
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <ScrollReveal key={service.title}>
              <div className="glass-card rounded-xl p-6 transition-colors hover:border-[var(--primary)]/40">
                <Code2 className="mb-5 text-[var(--primary)]" size={24} />
                <h3 className="mb-3 font-display text-2xl font-bold tracking-[-0.03em]">
                  {service.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <p className="section-kicker">Engineering Approach</p>
          <h2 className="section-title-sm">
            Reduce complexity before adding polish.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
            {profile.summary}
          </p>
        </ScrollReveal>

        <div className="space-y-4">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.05}>
              <div className="glass-card grid gap-5 rounded-xl p-6 sm:grid-cols-[4rem_1fr]">
                <div className="font-code text-2xl font-bold text-[var(--primary)]">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="mb-2 font-display text-xl font-bold">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-7 text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section">
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Career Snapshot</p>
          <h2 className="section-title-sm max-w-4xl">
            Experience that supports client-facing delivery.
          </h2>
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-3">
          {timeline.map((item) => (
            <ScrollReveal key={item.period}>
              <div className="glass-card h-full rounded-xl p-6">
                <p className="mb-4 font-code text-xs font-bold uppercase tracking-[0.12em] text-[var(--secondary)]">
                  {item.period}
                </p>
                <h3 className="font-display text-xl font-bold">{item.role}</h3>
                <p className="mb-4 text-sm text-[var(--primary)]">
                  {item.company}
                </p>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {item.summary}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal>
        <section className="glass-card relative overflow-hidden rounded-xl p-8 md:p-12">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--primary-deep)]/25 blur-[90px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 className="section-title-sm">
                Need a full-stack engineer who can own the messy middle?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                I work best with teams that need steady communication, practical
                engineering decisions, secure integrations, performance
                awareness, and clean handoff quality.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <a href="/contact" className="btn btn-primary">
                Start a Conversation
                <ArrowRight size={17} />
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-secondary">
                Email Directly
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function TerminalHero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-y-8 rounded-full bg-[var(--primary-deep)]/25 blur-[90px]" />
      <div className="terminal-window relative rotate-0 transition-transform duration-500 hover:rotate-0 lg:-rotate-2">
        <div className="terminal-header">
          <span className="terminal-dot bg-[#ff5f56]" />
          <span className="terminal-dot bg-[#ffbd2e]" />
          <span className="terminal-dot bg-[#27c93f]" />
          <span className="ml-auto font-code text-xs text-[var(--text-muted)]">
            ~/portfolio/index.ts
          </span>
        </div>
        <div className="terminal-body">
          <p>
            <span className="text-[var(--secondary)]">$</span> npm run ship
          </p>
          <p className="mt-4 text-[var(--text-muted)]">
            // current operating mode
          </p>
          <p>
            const engineer ={' '}
            <span className="text-[var(--primary)]">
              &quot;{profile.name}&quot;
            </span>
          </p>
          <p>
            const focus = [
            <span className="text-[var(--tertiary)]">&quot;Next.js&quot;</span>,{' '}
            <span className="text-[var(--tertiary)]">&quot;Node.js&quot;</span>,{' '}
            <span className="text-[var(--tertiary)]">
              &quot;React Native&quot;
            </span>
            ]
          </p>
          <p>
            build({`{`} integrations: true, maintainable: true, users:
            &quot;first&quot; {`}`})
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {workingPrinciples.slice(0, 4).map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
              >
                <Sparkles size={15} className="mb-2 text-[var(--secondary)]" />
                <p className="font-code text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-primary)]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[var(--secondary)]">
            ready: production-minded delivery online
          </p>
        </div>
      </div>
    </div>
  )
}
