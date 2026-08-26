import { createFileRoute } from '@tanstack/react-router'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { comfortStack, stackGroups } from '../content/portfolio'

export const Route = createFileRoute('/skills')({
  component: Skills,
})

function Skills() {
  return (
    <div className="prose-container py-12">
      <section className="section">
        <ScrollReveal className="mb-12">
          <p className="section-kicker">Stack</p>
          <h1 className="section-title">
            What I actually <span className="text-accent">reach for</span>.
          </h1>
          <p className="section-subtitle mt-5">
            The full list, so I don't have to keep repeating it on every other
            page.
          </p>
        </ScrollReveal>

        <div className="divided-list">
          {stackGroups.map((group) => (
            <ScrollReveal key={group.title}>
              <h2 className="mb-2 font-display text-lg font-semibold">
                {group.title}
              </h2>
              <p className="stack-line">{group.items.join(', ')}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section">
        <ScrollReveal className="mb-6">
          <p className="section-kicker">Also Comfortable With</p>
          <h2 className="section-title-sm">
            Supporting tools I can slot into an existing setup.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <p className="stack-line">{comfortStack.join(', ')}</p>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            also comfortable flashing a ROM onto a phone that didn&apos;t ask
            for it
          </p>
        </ScrollReveal>
      </section>
    </div>
  )
}
