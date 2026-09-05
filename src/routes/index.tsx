import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Github } from 'lucide-react'
import InteractiveTerminal from '../components/InteractiveTerminal'
import ProjectCard from '../components/ui/ProjectCard'
import Section from '../components/ui/Section'
import SketchUnderline from '../components/ui/SketchUnderline'
import StatBand from '../components/ui/StatBand'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/ui/ScrollReveal'
import { funFacts } from '../content/funFacts'
import {
  featuredProjects,
  profile,
  projects,
  services,
  timeline,
} from '../content/portfolio'
import { SITE_NAME, SITE_URL, seo } from '../lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      // The home page owns the bare brand title; every other route gets the
      // "${page} | Sibte Hussain" template.
      title: 'Full-Stack Engineer',
      titleOverride: `${SITE_NAME} | Full-Stack Engineer`,
      description:
        'Sibte Hussain builds full-stack web and mobile products with React, Next.js, Django and React Native. Shipped work, services, and a terminal you can actually type into.',
      path: '/',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          description:
            'Portfolio of Sibte Hussain, full-stack engineer in Lahore.',
          inLanguage: 'en',
          publisher: { '@id': `${SITE_URL}/#person` },
        },
      ],
    }),
  component: Home,
})

function Home() {
  return (
    <div className="pb-16">
      {/* Deliberately not wrapped in ScrollReveal. That put the largest text on
          the page behind an opacity-0 initial state, and it is the LCP element. */}
      <section className="page-container grid min-h-[calc(100svh-var(--header-h))] items-center gap-14 py-16 lg:grid-cols-[1fr_0.92fr] lg:py-0">
        <div className="space-y-8">
          <span className="chip">
        
            {profile.availability}
          </span>
          <div className="space-y-6">
            <h1 className="section-title">
              I build <SketchUnderline>full-stack products</SketchUnderline>,
              and occasionally root a phone that was working fine.
            </h1>
            <p className="section-subtitle measure text-lg md:text-xl">
              {profile.intro}
            </p>
            <p className="measure text-base leading-8 text-ink-2">
              {profile.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/experience" className="btn btn-primary group">
              Explore Work
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
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

      <StatBand />

      <div className="page-container">
        <Section
          id="work"
          kicker="Selected Work"
          title="Stuff I've actually shipped."
          subtitle="Not toy projects. Real users, real constraints, and code that still had to work after launch day."
        >
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.title} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal className="mt-10">
            <Link
              to="/experience"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo transition-colors hover:text-mint"
            >
              See all {projects.length} projects
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </ScrollReveal>
        </Section>

        <Section
          id="services"
          kicker="Services"
          title="What I actually get hired to do."
        >
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <div className="surface-card h-full p-6">
                  <h3 className="mb-3 font-display text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-7 text-ink-2">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>

        <Section
          kicker="Career Snapshot"
          title="The short version of how I got here."
        >
          <StaggerContainer className="divided-list">
            {timeline.map((item) => (
              <StaggerItem
                key={item.period}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {item.role}
                  </h3>
                  <p className="text-sm text-indigo">{item.company}</p>
                </div>
                <p className="font-code text-xs text-ink-3">{item.period}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal className="mt-8">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-indigo transition-colors hover:text-mint"
            >
              Read the full timeline
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </ScrollReveal>
        </Section>

        <Section kicker="About Me" title="Hello, World.">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ScrollReveal>
              <p className="measure text-base leading-8 text-ink-2">
                I&apos;m {profile.name}, a {profile.title.toLowerCase()} based
                in {profile.location}. {profile.intro} When I&apos;m not
                shipping something, I&apos;m probably rooting a phone I
                didn&apos;t need to root.
              </p>
              <Link
                to="/about"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo transition-colors hover:text-mint"
              >
                More about me
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </ScrollReveal>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {funFacts.map((fact) => {
                const Icon = fact.icon
                return (
                  <StaggerItem key={fact.label}>
                    <div className="surface-card flex h-full gap-4 p-5">
                      <Icon
                        className={`mt-0.5 shrink-0 ${fact.color}`}
                        size={20}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {fact.label}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-ink-2">
                          {fact.value}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </Section>
      </div>

      <div className="line-panel">
        <div className="page-container">
          <Section kicker="Contact" title="Got something to build?">
            <ScrollReveal>
              <p className="measure text-base leading-8 text-ink-2">
                If it involves a web app, a mobile app, or something in between,
                I&apos;m probably interested. Say hi.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn btn-primary group">
                  Start a Conversation
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn-secondary"
                >
                  Email Directly
                </a>
              </div>
            </ScrollReveal>
          </Section>
        </div>
      </div>
    </div>
  )
}
