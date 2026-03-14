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
import { motion } from 'framer-motion'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/ui/ScrollReveal'

export const Route = createFileRoute('/skills')({
  component: Skills,
})

interface Skill {
  name: string
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
      { name: 'React.js', description: 'Modern, interactive UIs' },
      { name: 'React 19', description: 'Latest features' },
      { name: 'TypeScript', description: 'Type-safe development' },
      { name: 'JavaScript (ES6+)', description: 'Modern JS' },
      { name: 'Next.js', description: 'SSR, SSG, API routes' },
      { name: 'Gatsby', description: 'Static sites' },
    ],
  },
  {
    id: 2,
    title: 'React Native',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'React Native', description: 'Cross-platform mobile' },
      { name: 'Expo', description: 'Rapid development' },
      { name: 'React Native Paper', description: 'Material Design' },
      { name: 'React Navigation', description: 'Navigation patterns' },
      { name: 'Native Modules', description: 'Custom integrations' },
      { name: 'Detox', description: 'E2E testing' },
    ],
  },
  {
    id: 3,
    title: 'State Management',
    icon: Database,
    color: 'from-purple-500 to-violet-500',
    skills: [
      { name: 'Redux', description: 'Global state' },
      { name: 'React Context', description: 'Local & global state' },
      { name: 'Zustand', description: 'Lightweight state' },
      { name: 'React Query', description: 'Server state' },
      { name: 'MobX', description: 'Reactive state' },
    ],
  },
  {
    id: 4,
    title: 'Styling & UI',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'Tailwind CSS', description: 'Utility-first CSS' },
      { name: 'CSS Modules', description: 'Scoped CSS' },
      { name: 'Styled Components', description: 'CSS-in-JS' },
      { name: 'Framer Motion', description: 'Animations' },
      { name: 'Material UI', description: 'Component library' },
    ],
  },
  {
    id: 5,
    title: 'Testing',
    icon: Terminal,
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'Jest', description: 'Testing framework' },
      { name: 'React Testing Library', description: 'Component testing' },
      { name: 'Vitest', description: 'Fast unit testing' },
      { name: 'Cypress', description: 'E2E testing' },
      { name: 'Detox', description: 'Mobile E2E' },
    ],
  },
  {
    id: 6,
    title: 'Developer Tools',
    icon: GitBranch,
    color: 'from-slate-500 to-zinc-500',
    skills: [
      { name: 'Git', description: 'Version control' },
      { name: 'GitHub', description: 'CI/CD' },
      { name: 'Webpack', description: 'Bundling' },
      { name: 'Vite', description: 'Frontend tooling' },
      { name: 'ESLint', description: 'Linting' },
      { name: 'Prettier', description: 'Formatting' },
    ],
  },
  {
    id: 7,
    title: 'API & Backend',
    icon: Server,
    color: 'from-red-500 to-orange-500',
    skills: [
      { name: 'RESTful APIs', description: 'API design' },
      { name: 'GraphQL', description: 'Query language' },
      { name: 'WebSocket', description: 'Real-time' },
      { name: 'Node.js', description: 'Runtime' },
      { name: 'Firebase', description: 'BaaS' },
    ],
  },
  {
    id: 8,
    title: 'Mobile Platforms',
    icon: Layout,
    color: 'from-indigo-500 to-blue-500',
    skills: [
      { name: 'iOS', description: 'App development' },
      { name: 'Android', description: 'App development' },
      { name: 'App Store', description: 'Deployment' },
      { name: 'Play Store', description: 'Deployment' },
      { name: 'Push Notifications', description: 'FCM & APNs' },
    ],
  },
]

const allTechnologies = [
  'React.js', 'React Native', 'TypeScript', 'Tailwind CSS',
  'Redux', 'Next.js', 'Jest', 'Git', 'GraphQL', 'Node.js',
  'Firebase', 'Expo', 'Vite', 'Webpack', 'CI/CD',
  'Framer Motion', 'React Query', 'Zustand', 'WebSocket',
  'Material UI', 'React Navigation',
]

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <StaggerItem>
      <motion.div
        className="group relative rounded-xl px-4 py-3 bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 transition-colors duration-300"
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors block">
          {skill.name}
        </span>
        <div className="overflow-hidden max-h-0 group-hover:max-h-8 transition-[max-height] duration-200 ease-out">
          <p className="pt-1 text-xs text-[var(--text-muted)] line-clamp-1">
            {skill.description}
          </p>
        </div>
      </motion.div>
    </StaggerItem>
  )
}

function CategoryCard({
  category,
  index,
}: {
  category: SkillCategory
  index: number
}) {
  const Icon = category.icon
  return (
    <ScrollReveal delay={index * 0.06}>
      <div className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <motion.div
              className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Icon size={22} className="text-white" />
            </motion.div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] tracking-tight">
              {category.title}
            </h2>
          </div>
          <StaggerContainer stagger={0.04} delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <SkillPill key={skill.name} skill={skill} />
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </ScrollReveal>
  )
}

function Skills() {
  return (
    <div className="page-container py-12">
      {/* Hero */}
      <ScrollReveal>
        <section className="relative py-16 md:py-20">
          <div className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full bg-[var(--accent-primary)]/10 blur-[80px] pointer-events-none" />
          <ScrollReveal delay={0.05}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)] mb-3">
              Skills
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
              Technical <span className="text-gradient">Expertise</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="max-w-xl text-[var(--text-secondary)] leading-relaxed">
              Technologies and tools I use to build web and mobile applications.
            </p>
          </ScrollReveal>
        </section>
      </ScrollReveal>

      {/* Categories Grid */}
      <section className="py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {skillCategories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <ScrollReveal>
        <section className="py-12">
          <motion.div
            className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-sm p-6 md:p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[var(--accent-primary)]/5 blur-[60px]" />
            <div className="relative z-10 flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[var(--accent-glow)]">
                <Zap size={20} className="text-[var(--accent-primary)]" />
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                Go-To Stack
              </h2>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              {allTechnologies.map((tech, index) => (
                <ScrollReveal key={tech} delay={index * 0.015}>
                  <motion.span
                    className="inline-block px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/40 hover:text-[var(--accent-primary)] transition-colors cursor-default"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {tech}
                  </motion.span>
                </ScrollReveal>
              ))}
            </div>
          </motion.div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <section className="py-10">
          <motion.div
            className="relative rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] backdrop-blur-sm p-8 md:p-10 text-center overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ borderColor: 'rgba(0, 212, 170, 0.2)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-3">
                Want to Discuss a Project?
              </h2>
              <p className="max-w-md mx-auto text-[var(--text-secondary)] mb-6 text-sm">
                I'm always excited to work with new technologies. Let's talk.
              </p>
              <Link to="/contact" className="btn btn-primary inline-flex items-center gap-2">
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
