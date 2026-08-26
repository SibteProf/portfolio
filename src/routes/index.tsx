import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, Github } from 'lucide-react'
import InteractiveTerminal from '../components/InteractiveTerminal'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { funFacts } from '../content/funFacts'
import { profile, projects, services, timeline } from '../content/portfolio'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="pb-16 pt-8">
      <ScrollReveal>
        <section className="page-container section grid min-h-[calc(100vh-7rem)] gap-12 pt-0 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <div className="space-y-7">
            <span className="eyebrow-chip">{profile.availability}</span>
            <div className="space-y-6">
              <h1 className="section-title">
                I build full-stack products, and occasionally root a phone that
                was working fine.
              </h1>
              <p className="section-subtitle text-lg md:text-xl">
                {profile.intro}
              </p>
              <p className="max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
                {profile.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/experience" className="btn btn-primary group">
                Explore Work
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
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

          <InteractiveTerminal />
        </section>
      </ScrollReveal>

      <div className="prose-container">
        <section id="work" className="section">
          <ScrollReveal className="mb-10">
            <p className="section-kicker">Selected Work</p>
            <h2 className="section-title-sm">
              Stuff I&apos;ve actually shipped.
            </h2>
            <p className="section-subtitle mt-4">
              Not toy projects. Real users, real constraints, and code that
              still had to work after launch day.
            </p>
          </ScrollReveal>

          <div className="divided-list">
            {projects.map((project) => (
              <ScrollReveal key={project.title}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
                    {project.title}
                  </h3>
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
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {project.outcome}
                </p>
                <p className="stack-line mt-3">{project.stack.join(', ')}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <ScrollReveal className="mb-10">
            <p className="section-kicker">Services</p>
            <h2 className="section-title-sm">
              What I actually get hired to do.
            </h2>
          </ScrollReveal>

          <div className="divided-list">
            {services.map((service) => (
              <ScrollReveal key={service.title}>
                <h3 className="mb-2 font-display text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {service.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="section">
          <ScrollReveal className="mb-10">
            <p className="section-kicker">Career Snapshot</p>
            <h2 className="section-title-sm">
              The short version of how I got here.
            </h2>
          </ScrollReveal>
          <div className="divided-list">
            {timeline.map((item) => (
              <ScrollReveal key={item.period}>
                <p className="font-code text-xs text-[var(--text-muted)]">
                  {item.period}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  {item.role}
                </h3>
                <p className="text-sm text-[var(--primary)]">{item.company}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                  {item.summary}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="section">
          <ScrollReveal>
            <p className="section-kicker">About Me</p>
            <h2 className="section-title-sm">Hello, World.</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
              I&apos;m {profile.name}, a {profile.title.toLowerCase()} based in{' '}
              {profile.location}. {profile.intro} When I&apos;m not shipping
              something, I&apos;m probably rooting a phone I didn&apos;t need to
              root.
            </p>
            <a
              href="/about"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--secondary)]"
            >
              More about me
              <ArrowRight size={15} />
            </a>
          </ScrollReveal>

          <div className="divided-list mt-10">
            {funFacts.map((fact) => {
              const Icon = fact.icon
              return (
                <ScrollReveal key={fact.label} className="flex gap-4">
                  <Icon className={`mt-0.5 shrink-0 ${fact.color}`} size={20} />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {fact.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                      {fact.value}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        <ScrollReveal>
          <section className="section border-t border-white/10">
            <p className="section-kicker">Contact</p>
            <h2 className="section-title-sm">Got something to build?</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              If it involves a web app, a mobile app, or something in between,
              I&apos;m probably interested. Say hi.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/contact" className="btn btn-primary group">
                Start a Conversation
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-secondary">
                Email Directly
              </a>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
