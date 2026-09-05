import { createFileRoute } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import ParticlePortrait from '../components/ParticlePortrait'
import Section from '../components/ui/Section'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/ui/ScrollReveal'
import { funFacts } from '../content/funFacts'
import {
  credibilityItems,
  profile,
  timeline,
  workingPrinciples,
} from '../content/portfolio'
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
    <div className="page-container">
      <Section
        kicker="About"
        headingAs="h1"
        size="lg"
        title="Hello, World."
        headerClassName="mb-14"
      >
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal className="space-y-8">
            <ParticlePortrait
              src="/portrait-cutout.png"
              alt="Portrait of Sibte Hussain rendered as a field of particles"
              className="max-w-[320px]"
            />
            <div className="measure space-y-5 text-lg leading-8 text-ink-2">
              <p>
                I&apos;m {profile.name}, a {profile.title.toLowerCase()} based
                in {profile.location}. Most of what I build lives around React,
                Next.js, Node.js, Django, and React Native. Basically whatever
                gets an idea from &ldquo;wouldn&apos;t it be cool if&rdquo; to
                something you can actually click on.
              </p>
              <p>
                I do my best work when I own a feature end to end: interface,
                APIs, data, auth, the works. Outside of that, I&apos;m the guy
                friends call when their PC needs building or their phone needs a
                custom ROM it definitely didn&apos;t need. Same instinct,
                honestly, I just like taking things apart to see how they
                actually work.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            <ScrollReveal className="space-y-6">
              <div>
                <p className="section-kicker mb-3.5">Working With Me</p>
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
                    <p className="text-sm leading-7 text-ink-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <p className="section-kicker mb-4">Where I Am Solid</p>
              <ul className="space-y-3">
                {credibilityItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-ink-2"
                  >
                    <Check
                      size={16}
                      aria-hidden="true"
                      className="mt-2 shrink-0 text-mint"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Section kicker="Off Duty" title="What I do when nothing is compiling.">
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {funFacts.map((item) => {
            const Icon = item.icon

            return (
              <StaggerItem key={item.label}>
                <div className="surface-card h-full p-5">
                  <Icon
                    className={`shrink-0 ${item.color}`}
                    size={22}
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-sm font-semibold text-ink">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-2">
                    {item.value}
                  </p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Section>

      <Section kicker="Timeline" title="The short version of how I got here.">
        <div className="relative pl-7">
          <div className="absolute top-1 bottom-0 left-[0.32rem] w-px bg-white/10" />
          <div className="space-y-10">
            {timeline.map((item, index) => (
              <ScrollReveal
                key={item.period}
                delay={index * 0.05}
                className="relative"
              >
                <div className="absolute top-1.5 left-[-1.75rem] h-2 w-2 rounded-full bg-mint" />
                <p className="font-code text-xs text-ink-3">{item.period}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  {item.role}
                </h3>
                <p className="text-sm text-indigo">{item.company}</p>
                <p className="measure mt-2 text-sm leading-7 text-ink-2">
                  {item.summary}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

export default About
