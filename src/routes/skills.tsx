import { createFileRoute } from '@tanstack/react-router'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { comfortStack, stackGroups } from '../content/portfolio'

export const Route = createFileRoute('/skills')({
  component: Skills,
})

function Skills() {
  return (
    <div className="page-container py-12">
      <section className="section">
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Stack</p>
          <h1 className="display-title text-4xl font-bold md:text-6xl">
            A curated stack shaped by product delivery, not keyword collecting.
          </h1>
          <p className="section-subtitle mt-4">
            These are the tools I reach for most often when building fullstack-facing web and mobile
            products.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {stackGroups.map((group) => (
            <ScrollReveal key={group.title}>
              <div className="rounded-[1.75rem] border border-[var(--border-color)] p-6">
                <h2 className="mb-4 text-2xl font-semibold">{group.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--border-color)] px-3 py-1.5 text-sm text-[var(--text-secondary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section">
        <ScrollReveal className="mb-8">
          <p className="section-kicker">Also Comfortable With</p>
          <h2 className="display-title text-4xl font-bold md:text-5xl">
            Supporting tools I can slot into an existing team setup.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-[1.75rem] border border-[var(--border-color)] p-6">
            <div className="flex flex-wrap gap-2">
              {comfortStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border-color)] px-3 py-1.5 text-sm text-[var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
