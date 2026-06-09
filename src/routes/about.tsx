import { createFileRoute } from '@tanstack/react-router'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { profile, timeline, workingPrinciples } from '../content/portfolio'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="page-container py-12">
      <section className="section grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <p className="section-kicker">About</p>
          <h1 className="display-title text-4xl font-bold md:text-6xl">
            I care about shipping software that still feels easy to work on later.
          </h1>
        </ScrollReveal>

        <ScrollReveal className="space-y-5 text-base leading-8 text-[var(--text-secondary)]">
          <p>
            {profile.name} is a {profile.title.toLowerCase()} based in {profile.location}. My background
            is strongest in React, Next.js, React Native, and the integration-heavy product work that sits
            between polished interfaces and backend-dependent behavior.
          </p>
          <p>
            I am usually at my best when a team needs someone who can own the product surface, connect it
            cleanly to APIs and third-party services, and make tradeoffs that keep the project moving
            without leaving a mess behind.
          </p>
          <p>
            That means thinking about maintainability, release pressure, user clarity, and collaboration
            just as much as the code itself.
          </p>
        </ScrollReveal>
      </section>

      <section className="section">
        <ScrollReveal className="mb-8">
          <p className="section-kicker">Working With Me</p>
          <h2 className="display-title text-4xl font-bold md:text-5xl">
            A practical partner for agency and product work.
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {workingPrinciples.map((item) => (
            <ScrollReveal key={item.title}>
              <div className="rounded-[1.75rem] border border-[var(--border-color)] p-6">
                <h3 className="mb-3 text-2xl font-semibold">{item.title}</h3>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section">
        <ScrollReveal className="mb-8">
          <p className="section-kicker">Timeline</p>
          <h2 className="display-title text-4xl font-bold md:text-5xl">
            Enough production work to understand both delivery speed and long-term cleanup.
          </h2>
        </ScrollReveal>

        <div className="space-y-5">
          {timeline.map((item) => (
            <ScrollReveal key={item.period}>
              <div className="grid gap-4 rounded-[1.75rem] border border-[var(--border-color)] p-6 md:grid-cols-[220px_1fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent-primary)]">
                    {item.period}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{item.role}</h3>
                  <p className="text-sm text-[var(--text-primary)]">{item.company}</p>
                </div>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">{item.summary}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
