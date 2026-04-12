import { createFileRoute, Link } from '@tanstack/react-router'
import { Code2, Smartphone, Target, Award, Zap, Heart, TrendingUp, ArrowRight } from 'lucide-react'
import {
  ScrollReveal,
  HoverCard,
} from '../components/ui/ScrollReveal'

export const Route = createFileRoute('/about')({
  component: About,
})

const journeyTimeline = [
  {
    year: 'Oct 2024 - Present',
    title: 'Software Engineer',
    company: 'PlanLab Solutions',
    description:
      'Building scalable React, Next.js, and React Native applications with focus on performance, reusable architecture, and production deployments.',
    align: 'left',
  },
  {
    year: 'Jan 2023 - Oct 2024',
    title: 'Associate Software Developer',
    company: 'Agile District',
    description:
      'Developed responsive web and mobile apps using React.js, Next.js, and React Native while integrating REST and GraphQL APIs.',
    align: 'right',
  },
  {
    year: '2018 - 2022',
    title: 'Bachelor of Science in Computer Science',
    company: 'University of Management and Technology',
    description:
      'Built strong foundations in software engineering, algorithms, and web development while starting my journey with JavaScript and React.',
    align: 'left',
  },
]


const highlights = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Building modern, responsive web applications using React, TypeScript, and Next.js. Experience with component libraries, state management, and performance optimization.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Creating cross-platform mobile applications for iOS and Android. Specialized in smooth animations, offline capabilities, and seamless API integrations.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Optimization',
    description: 'Improving application performance by up to 40%. Expert in code splitting, lazy loading, and bundle size optimization.',
  },
  {
    icon: Target,
    title: 'Team Leadership',
    description: 'Leading teams of 4-5 developers, mentoring juniors, and conducting code reviews. Built design systems improving team productivity by 35%.',
  },
]

const stats = [
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 30, suffix: '+', label: 'Projects Delivered' },
  { value: 15, suffix: '+', label: 'Team Members Led' },
  { value: 40, suffix: '%', label: 'Performance Boost' },
]

function TimelineItem({ item, index }: { item: typeof journeyTimeline[0]; index: number }) {
  return (
    <ScrollReveal
      delay={index * 0.15}
      className={`relative flex gap-6 md:gap-0 ${
        item.align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--accent-primary)] border-4 border-[var(--bg-secondary)] shadow-lg shadow-[var(--accent-glow)] z-10" />

      {/* Content */}
      <div className="ml-12 md:ml-0 md:w-1/2 md:px-10">
        <HoverCard className="p-5">
          <div className="flex items-center gap-2 text-[var(--accent-primary)] text-sm font-medium mb-2">
            <Award size={16} />
            {item.year}
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
            {item.title}
          </h3>
          <p className="text-[var(--accent-secondary)] text-sm mb-2">
            {item.company}
          </p>
          <p className="text-[var(--text-secondary)] text-sm">
            {item.description}
          </p>
        </HoverCard>
      </div>
    </ScrollReveal>
  )
}

function About() {
  return (
    <div className="page-container py-12">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-16 md:py-24">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--accent-primary)]/10 blur-[100px] pointer-events-none" />

          <ScrollReveal delay={0}>
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent-primary)] mb-4">
              About Me
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Crafting Digital Experiences with <span className="text-gradient">Passion</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
              Hello! I'm Sibte Hussain, a passionate developer with dual expertise in React
              web applications and React Native mobile development. With over 3 years of
              professional experience, I specialize in building scalable, performant
              applications that delight users and drive business growth.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
              I love turning complex problems into simple, beautiful, and intuitive solutions.
              My approach combines technical excellence with a deep understanding of user needs,
              resulting in products that are both powerful and pleasurable to use.
            </p>
          </ScrollReveal>
        </section>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal>
        <section className="py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <HoverCard className="p-6 text-center">
                  <div className="font-display text-4xl font-bold text-gradient mb-2">
                    <Counter value={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* My Journey */}
      <ScrollReveal>
        <section className="py-16">
          <h2 className="section-title text-[var(--text-primary)] mb-10">
            My Journey
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-tertiary)] to-transparent" />

            <div className="space-y-8">
              {journeyTimeline.map((item, i) => (
                <TimelineItem key={item.year} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* What I Do */}
      <ScrollReveal>
        <section className="py-16">
          <h2 className="section-title text-[var(--text-primary)] mb-4">
            What I Do
          </h2>
          <p className="section-subtitle text-[var(--text-secondary)] mb-10">
            Specialized areas where I deliver exceptional results
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <HoverCard className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl bg-[var(--accent-glow)]"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      <item.icon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </HoverCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Philosophy */}
      <ScrollReveal>
        <section className="py-16">
          <div className="card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--accent-primary)]/5 blur-[100px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-glow)] mb-6">
                <Heart size={16} className="text-[var(--accent-primary)]" />
                <span className="text-sm text-[var(--accent-primary)]">My Philosophy</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                Code is not just about functionality—it's about{' '}
                <span className="text-gradient">experience</span>
              </h2>

              <p className="max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                I believe in writing clean, maintainable code that serves both current needs
                and future scalability. Every line should have purpose, every component
                should be reusable, and every interaction should delight users.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn btn-primary">
                  Let's Collaborate
                  <ArrowRight size={16} />
                </Link>
                <Link to="/skills" className="btn btn-secondary">
                  View My Skills
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

// Simple counter component to avoid import issues
function Counter({ value, duration, suffix }: { value: number; duration: number; suffix: string }) {
  return (
    <span>
      {value}{suffix}
    </span>
  )
}

export default About