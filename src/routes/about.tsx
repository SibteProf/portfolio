import { createFileRoute } from '@tanstack/react-router'
import ParticlePortrait from '../components/ParticlePortrait'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { funFacts } from '../content/funFacts'
import { profile, timeline, workingPrinciples } from '../content/portfolio'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'About',
      description:
        'Sibte Hussain, full-stack engineer in Lahore. How I work, what I build, and the phones I root for no good reason. Background, principles, and a short career timeline.',
      path: '/about',
      type: 'profile',
    }),
  component: About,
})

function About() {
  return (
    <div className="prose-container py-12">
      <section className="section grid gap-12 lg:grid-cols-2">
        <ScrollReveal className="space-y-8">
          <div>
            <p className="section-kicker">About</p>
            <h1 className="section-title">Hello, World.</h1>
          </div>
          <ParticlePortrait
            src="/portrait-cutout.png"
            alt="Portrait of Sibte Hussain rendered as a field of particles"
            className="max-w-[260px]"
          />
          <div className="space-y-5 text-lg leading-8 text-[var(--text-secondary)]">
            <p>
              I&apos;m {profile.name}, a {profile.title.toLowerCase()} based in{' '}
              {profile.location}. Most of what I build lives around React,
              Next.js, Node.js, Django, and React Native. Basically whatever
              gets an idea from "wouldn&apos;t it be cool if" to something you
              can actually click on.
            </p>
            <p>
              I do my best work when I own a feature end to end: interface,
              APIs, data, auth, the works. Outside of that, I&apos;m the guy
              friends call when their PC needs building or their phone needs a
              custom ROM it definitely didn&apos;t need. Same instinct,
              honestly, I just like taking things apart to see how they actually
              work.
            </p>
          </div>
          <div>
            <h2 className="section-kicker">Off Duty</h2>
            <div className="divided-list">
              {funFacts.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="flex gap-4">
                    <Icon
                      className={`mt-0.5 shrink-0 ${item.color}`}
                      size={20}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="space-y-6">
          <div>
            <p className="section-kicker">Working With Me</p>
            <h2 className="section-title-sm">
              How I actually work, not the LinkedIn version.
            </h2>
          </div>
          <div className="divided-list">
            {workingPrinciples.map((item) => (
              <div key={item.title}>
                <h3 className="mb-2 font-display text-lg font-semibold">
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
        <ScrollReveal className="mb-10">
          <p className="section-kicker">Timeline</p>
          <h2 className="section-title-sm">
            The short version of how I got here.
          </h2>
        </ScrollReveal>

        <div className="relative pl-7">
          <div className="absolute bottom-0 left-[0.32rem] top-1 w-px bg-white/10" />
          <div className="space-y-10">
            {timeline.map((item, index) => (
              <ScrollReveal
                key={item.period}
                delay={index * 0.05}
                className="relative"
              >
                <div className="absolute left-[-1.75rem] top-1.5 h-2 w-2 rounded-full bg-[var(--secondary)]" />
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
        </div>
      </section>
    </div>
  )
}

export default About
