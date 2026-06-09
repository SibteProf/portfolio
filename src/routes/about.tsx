import { createFileRoute } from '@tanstack/react-router'
import { Coffee, Keyboard, Moon } from 'lucide-react'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import {
  profile,
  stackGroups,
  timeline,
  workingPrinciples,
} from '../content/portfolio'

export const Route = createFileRoute('/about')({
  component: About,
})

const stats = [
  {
    icon: Coffee,
    label: 'Operating Mode',
    value: 'Product clarity before code volume',
    color: 'text-[var(--secondary)]',
  },
  {
    icon: Keyboard,
    label: 'Favorite Build Zone',
    value: 'UI, APIs, data, auth, and real-time flows working together',
    color: 'text-[var(--tertiary)]',
  },
  {
    icon: Moon,
    label: 'Design Bias',
    value: 'Dark systems, sharp edges, readable states',
    color: 'text-[var(--primary)]',
  },
]

function About() {
  return (
    <div className="page-container py-12">
      <section className="section grid gap-12 lg:grid-cols-12">
        <ScrollReveal className="space-y-8 lg:col-span-6">
          <div>
            <p className="section-kicker">About</p>
            <h1 className="section-title">
              <span className="hand-underline">Hello, World.</span>
            </h1>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[var(--text-secondary)]">
            <p>
              {profile.name} is a {profile.title.toLowerCase()} based in{' '}
              {profile.location}. My strongest work lives around React, Next.js,
              Node.js, React Native, databases, secure APIs, and
              integration-heavy product systems.
            </p>
            <p>
              I am usually at my best when a team needs someone who can own the
              end-to-end build, connect interfaces cleanly to APIs and
              third-party services, reason through data and auth constraints,
              and make tradeoffs that keep the project moving without leaving a
              mess behind.
            </p>
            <p>
              That means thinking about maintainability, release pressure, user
              clarity, and collaboration just as much as the code itself.
            </p>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h2 className="section-kicker !mb-5">Vital Signals</h2>
            <div className="space-y-5">
              {stats.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="flex gap-4 border-t border-white/10 pt-5 first:border-t-0 first:pt-0"
                  >
                    <Icon className={item.color} size={22} />
                    <div>
                      <p className="font-code text-xs font-bold uppercase tracking-[0.1em] text-[var(--text-primary)]">
                        {item.label}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="space-y-6 lg:col-span-6">
          <div>
            <p className="section-kicker">Working With Me</p>
            <h2 className="section-title-sm">
              A practical partner for full-stack product work.
            </h2>
          </div>
          <div className="grid gap-4">
            {workingPrinciples.map((item, index) => (
              <div key={item.title} className="glass-card rounded-xl p-6">
                <p className="mb-3 font-code text-xs font-bold uppercase tracking-[0.12em] text-[var(--secondary)]">
                  principle_0{index + 1}
                </p>
                <h3 className="mb-3 font-display text-2xl font-bold tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="section">
        <ScrollReveal className="mb-10 text-center">
          <p className="section-kicker">Stack Shape</p>
          <h2 className="section-title-sm mx-auto max-w-4xl">
            Tools chosen by delivery pressure, not keyword collecting.
          </h2>
        </ScrollReveal>

        <div className="glass-card relative overflow-hidden rounded-xl p-6 md:p-8">
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary-deep)]/20 blur-[90px]" />
          <div className="relative grid gap-8 md:grid-cols-2">
            {stackGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-5 font-code text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span key={item} className="sticker">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <ScrollReveal className="mb-12 text-center">
          <p className="section-kicker">Timeline</p>
          <h2 className="section-title-sm mx-auto max-w-4xl">
            Enough production work to respect both speed and cleanup.
          </h2>
        </ScrollReveal>

        <div className="relative mx-auto max-w-4xl pl-7 md:pl-0">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-white/10 md:left-1/2" />
          {timeline.map((item, index) => (
            <ScrollReveal key={item.period} delay={index * 0.05}>
              <div
                className={`relative mb-12 flex flex-col md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                >
                  <p className="font-code text-xs font-bold uppercase tracking-[0.12em] text-[var(--secondary)]">
                    {item.period}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold">
                    {item.role}
                  </h3>
                  <p className="text-sm text-[var(--primary)]">
                    {item.company}
                  </p>
                </div>
                <div className="absolute left-[-0.15rem] top-1 h-3 w-3 rounded-full bg-[var(--secondary)] shadow-[0_0_18px_rgba(78,222,163,0.7)] md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />
                <div
                  className={`mt-4 w-full md:mt-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}
                >
                  <div className="glass-card rounded-xl p-5">
                    <p className="font-code text-sm leading-7 text-[var(--text-secondary)]">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
