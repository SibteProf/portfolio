import { createFileRoute } from '@tanstack/react-router'
import ProjectCard from '../components/ui/ProjectCard'
import Section from '../components/ui/Section'
import SketchUnderline from '../components/ui/SketchUnderline'
import { StaggerContainer, StaggerItem } from '../components/ui/ScrollReveal'
import { projects } from '../content/portfolio'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/experience')({
  head: () =>
    seo({
      title: 'Work',
      description:
        'Production work by Sibte Hussain: NowVPlay, Pecunia, Kunji, GoodFynd and VueCent. Role-based dashboards, offline-first POS, real-time sockets, payments and auth.',
      path: '/experience',
    }),
  component: Experience,
})

function Experience() {
  return (
    <div className="page-container">
      <Section
        kicker="Work"
        headingAs="h1"
        size="lg"
        title={
          <>
            The stuff I&apos;ve <SketchUnderline>built</SketchUnderline>, and
            why it mattered at the time.
          </>
        }
        subtitle="No filler bullet points, just what the project needed and what I actually did about it."
      >
        <StaggerContainer className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.title} className="h-full">
              <ProjectCard project={project} detailed />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>
    </div>
  )
}

export default Experience
