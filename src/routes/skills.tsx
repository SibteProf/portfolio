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
        <ScrollReveal className="mb-12">
          <p className="section-kicker">Stack</p>
          <h1 className="section-title max-w-5xl">
            A toolchain shaped by{' '}
            <span className="hand-underline">production delivery</span>.
          </h1>
          <p className="section-subtitle mt-5">
            These are the tools I reach for most often when building
            fullstack-facing web and mobile products.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {stackGroups.map((group, index) => (
            <ScrollReveal key={group.title} delay={index * 0.05}>
              <article className="glass-card relative min-h-72 overflow-hidden rounded-xl p-6">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--primary-deep)]/20 blur-[70px]" />
                <div className="relative">
                  <p className="mb-4 font-code text-xs font-bold uppercase tracking-[0.12em] text-[var(--secondary)]">
                    group_0{index + 1}
                  </p>
                  <h2 className="mb-6 font-display text-3xl font-extrabold tracking-[-0.04em]">
                    {group.title}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span key={item} className="sticker">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section">
        <ScrollReveal className="mb-8">
          <p className="section-kicker">Also Comfortable With</p>
          <h2 className="section-title-sm max-w-4xl">
            Supporting tools I can slot into an existing setup.
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-dot bg-[#ff5f56]" />
              <span className="terminal-dot bg-[#ffbd2e]" />
              <span className="terminal-dot bg-[#27c93f]" />
              <span className="ml-auto font-code text-xs text-[var(--text-muted)]">
                stack.config.ts
              </span>
            </div>
            <div className="terminal-body">
              <p>
                <span className="text-[var(--secondary)]">const</span>{' '}
                adjacentTools = [
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {comfortStack.map((item) => (
                  <span key={item} className="sticker">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-5">]</p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
