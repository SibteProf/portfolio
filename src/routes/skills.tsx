import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Code2,
  Smartphone,
  Database,
  GitBranch,
  Palette,
  Layout,
  Server,
  Terminal,
  Zap,
  ArrowRight,
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from '../components/ui/ScrollReveal'

export const Route = createFileRoute('/skills')({
  component: Skills,
})

interface Skill {
  name: string
  level: number
  description: string
}

interface SkillCategory {
  id: number
  title: string
  icon: React.ComponentType<{ size?: number }>
  color: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    id: 1,
    title: 'Frontend Development',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React.js', level: 95, description: 'Building modern, interactive UIs' },
      { name: 'React 19', level: 90, description: 'Latest features and best practices' },
      { name: 'TypeScript', level: 90, description: 'Type-safe development experience' },
      { name: 'JavaScript (ES6+)', level: 95, description: 'Deep understanding of modern JS' },
      { name: 'Next.js', level: 88, description: 'SSR, SSG, and API routes' },
      { name: 'Gatsby', level: 75, description: 'Static site generation' },
    ],
  },
  {
    id: 2,
    title: 'React Native Development',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'React Native', level: 95, description: 'Cross-platform mobile development' },
      { name: 'Expo', level: 92, description: 'Rapid development and testing' },
      { name: 'React Native Paper', level: 85, description: 'Material Design components' },
      { name: 'React Navigation', level: 90, description: 'Complex navigation patterns' },
      { name: 'Native Modules', level: 78, description: 'Custom native integrations' },
      { name: 'Detox', level: 80, description: 'E2E testing for mobile apps' },
    ],
  },
  {
    id: 3,
    title: 'State Management',
    icon: Database,
    color: 'from-purple-500 to-violet-500',
    skills: [
      { name: 'Redux', level: 90, description: 'Global state management' },
      { name: 'React Context API', level: 95, description: 'Local and global state' },
      { name: 'Zustand', level: 88, description: 'Lightweight state management' },
      { name: 'React Query', level: 90, description: 'Server state management' },
      { name: 'MobX', level: 70, description: 'Reactive state management' },
    ],
  },
  {
    id: 4,
    title: 'Styling & UI',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'Tailwind CSS', level: 95, description: 'Utility-first CSS framework' },
      { name: 'CSS Modules', level: 88, description: 'Scoped CSS for components' },
      { name: 'Styled Components', level: 82, description: 'CSS-in-JS solution' },
      { name: 'Framer Motion', level: 88, description: 'Production-ready animations' },
      { name: 'Material UI', level: 78, description: 'React component library' },
    ],
  },
  {
    id: 5,
    title: 'Testing',
    icon: Terminal,
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'Jest', level: 92, description: 'JavaScript testing framework' },
      { name: 'React Testing Library', level: 90, description: 'Component testing utilities' },
      { name: 'Vitest', level: 88, description: 'Fast unit testing with Vite' },
      { name: 'Cypress', level: 78, description: 'E2E testing framework' },
      { name: 'Detox', level: 82, description: 'Mobile E2E testing' },
    ],
  },
  {
    id: 6,
    title: 'Developer Tools',
    icon: GitBranch,
    color: 'from-slate-500 to-zinc-500',
    skills: [
      { name: 'Git', level: 95, description: 'Version control and collaboration' },
      { name: 'GitHub', level: 92, description: 'Git hosting and CI/CD' },
      { name: 'Webpack', level: 82, description: 'Module bundling' },
      { name: 'Vite', level: 92, description: 'Next-gen frontend tooling' },
      { name: 'ESLint', level: 88, description: 'Code linting and formatting' },
      { name: 'Prettier', level: 92, description: 'Code formatting' },
    ],
  },
  {
    id: 7,
    title: 'API & Backend',
    icon: Server,
    color: 'from-red-500 to-orange-500',
    skills: [
      { name: 'RESTful APIs', level: 95, description: 'REST API design and consumption' },
      { name: 'GraphQL', level: 88, description: 'Query language for APIs' },
      { name: 'WebSocket', level: 82, description: 'Real-time communication' },
      { name: 'Node.js', level: 78, description: 'JavaScript runtime' },
      { name: 'Firebase', level: 88, description: 'Backend-as-a-service platform' },
    ],
  },
  {
    id: 8,
    title: 'Mobile Platforms',
    icon: Layout,
    color: 'from-indigo-500 to-blue-500',
    skills: [
      { name: 'iOS Development', level: 85, description: 'iOS app development' },
      { name: 'Android Development', level: 85, description: 'Android app development' },
      { name: 'App Store Deployment', level: 92, description: 'iOS app store submission' },
      { name: 'Play Store Deployment', level: 92, description: 'Android play store submission' },
      { name: 'Push Notifications', level: 88, description: 'FCM and APNs integration' },
    ],
  },
]

const allTechnologies = [
  'React.js', 'React Native', 'TypeScript', 'Tailwind CSS',
  'Redux', 'Next.js', 'Jest', 'Git', 'GraphQL', 'Node.js',
  'Firebase', 'Expo', 'Vite', 'Webpack', 'CI/CD',
  'GraphQL', 'REST APIs', 'Framer Motion', 'React Query',
  'Zustand', 'WebSocket', 'Material UI', 'React Navigation',
]

function ProgressBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(skill.level)
      }, 100 + index * 50)
      return () => clearTimeout(timer)
    }
  }, [isInView, skill.level, index])

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
          {skill.name}
        </span>
        <span className="text-sm font-medium text-[var(--accent-primary)]">
          {width}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${width}%` : '0%' }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        {skill.description}
      </p>
    </div>
  )
}

function Skills() {
  return (
    <div className="page-container py-12">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-16 md:py-24">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--accent-primary)]/10 blur-[100px] pointer-events-none" />

          <ScrollReveal delay={0}>
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent-primary)] mb-4">
              Skills
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              Technical <span className="text-gradient">Expertise</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
              A comprehensive toolkit of technologies and frameworks I use to build
              exceptional web and mobile applications. Always learning and adapting
              to new technologies.
            </p>
          </ScrollReveal>
        </section>
      </ScrollReveal>

      {/* Skills Grid */}
      <ScrollReveal>
        <section className="py-10">
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <ScrollReveal
                  key={category.id}
                  delay={categoryIndex * 0.05}
                >
                  <HoverCard className="p-6 h-full">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                        {category.title}
                      </h2>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <ProgressBar
                          key={skill.name}
                          skill={skill}
                          index={skillIndex}
                        />
                      ))}
                    </div>
                  </HoverCard>
                </ScrollReveal>
              )
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Key Technologies */}
      <ScrollReveal>
        <section className="py-10">
          <motion.div
            className="card rounded-3xl p-8 relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--accent-primary)]/5 blur-[100px]" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[var(--accent-glow)]">
                  <Zap size={24} className="text-[var(--accent-primary)]" />
                </div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                  My Go-To Tech Stack
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {allTechnologies.map((tech, index) => (
                  <ScrollReveal
                    key={tech}
                    delay={index * 0.02}
                    className="px-4 py-2 text-sm font-medium rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-glass-hover)] transition-all cursor-default"
                  >
                    {tech}
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-10">
          <motion.div
            className="relative overflow-hidden rounded-3xl card p-8 md:p-12 text-center"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[var(--accent-primary)]/5 blur-[80px]" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-4">
                Want to Discuss a Project?
              </h2>
              <p className="max-w-xl mx-auto text-[var(--text-secondary)] mb-8">
                I'm always excited to work with new technologies and take on challenging projects.
                Let's discuss how my skills can help bring your vision to life!
              </p>
              <Link to="/contact" className="btn btn-primary">
                Get In Touch
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </section>
      </ScrollReveal>
    </div>
  )
}