import { createFileRoute } from '@tanstack/react-router'
import { Code2, Smartphone, Database, GitBranch, Palette, Layout, Server, Terminal } from 'lucide-react'

export const Route = createFileRoute('/skills')({
  component: Skills,
})

const skillCategories = [
  {
    id: 1,
    title: 'Frontend Development',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React.js', level: 95, description: 'Expert in building modern, interactive UIs' },
      { name: 'React 19', level: 90, description: 'Latest features and best practices' },
      { name: 'TypeScript', level: 90, description: 'Type-safe development experience' },
      { name: 'JavaScript (ES6+)', level: 95, description: 'Deep understanding of modern JS' },
      { name: 'Next.js', level: 85, description: 'SSR, SSG, and API routes' },
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
      { name: 'Expo', level: 90, description: 'Rapid development and testing' },
      { name: 'React Native Paper', level: 85, description: 'Material Design components' },
      { name: 'React Navigation', level: 90, description: 'Complex navigation patterns' },
      { name: 'Native Modules', level: 75, description: 'Custom native integrations' },
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
      { name: 'Zustand', level: 85, description: 'Lightweight state management' },
      { name: 'React Query', level: 88, description: 'Server state management' },
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
      { name: 'CSS Modules', level: 85, description: 'Scoped CSS for components' },
      { name: 'Styled Components', level: 80, description: 'CSS-in-JS solution' },
      { name: 'Framer Motion', level: 85, description: 'Production-ready animations' },
      { name: 'Material UI', level: 75, description: 'React component library' },
    ],
  },
  {
    id: 5,
    title: 'Testing',
    icon: Terminal,
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'Jest', level: 90, description: 'JavaScript testing framework' },
      { name: 'React Testing Library', level: 88, description: 'Component testing utilities' },
      { name: 'Vitest', level: 85, description: 'Fast unit testing with Vite' },
      { name: 'Cypress', level: 75, description: 'E2E testing framework' },
      { name: 'Detox', level: 80, description: 'Mobile E2E testing' },
    ],
  },
  {
    id: 6,
    title: 'Developer Tools',
    icon: GitBranch,
    color: 'from-slate-500 to-zinc-500',
    skills: [
      { name: 'Git', level: 95, description: 'Version control and collaboration' },
      { name: 'GitHub', level: 90, description: 'Git hosting and CI/CD' },
      { name: 'Webpack', level: 80, description: 'Module bundling' },
      { name: 'Vite', level: 90, description: 'Next-gen frontend tooling' },
      { name: 'ESLint', level: 85, description: 'Code linting and formatting' },
      { name: 'Prettier', level: 90, description: 'Code formatting' },
    ],
  },
  {
    id: 7,
    title: 'API & Backend',
    icon: Server,
    color: 'from-red-500 to-orange-500',
    skills: [
      { name: 'RESTful APIs', level: 95, description: 'REST API design and consumption' },
      { name: 'GraphQL', level: 85, description: 'Query language for APIs' },
      { name: 'WebSocket', level: 80, description: 'Real-time communication' },
      { name: 'Node.js', level: 75, description: 'JavaScript runtime' },
      { name: 'Firebase', level: 85, description: 'Backend-as-a-service platform' },
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
      { name: 'App Store Deployment', level: 90, description: 'iOS app store submission' },
      { name: 'Play Store Deployment', level: 90, description: 'Android play store submission' },
      { name: 'Push Notifications', level: 85, description: 'FCM and APNs integration' },
    ],
  },
]

function Skills() {
  return (
    <main className="page-wrap px-4 py-12">
      {/* Header */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.3),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

        <div className="relative z-10">
          <p className="island-kicker mb-3">Skills</p>
          <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
            Technical Expertise
          </h1>
          <p className="max-w-2xl text-lg text-[var(--sea-ink-soft)]">
            A comprehensive toolkit of technologies and frameworks I use to build
            exceptional web and mobile applications.
          </p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {skillCategories.map((category, categoryIndex) => {
          const Icon = category.icon
          return (
            <div
              key={category.id}
              className="island-shell feature-card rise-in rounded-2xl p-6 transition-all hover:border-[var(--lagoon)]"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              {/* Category Header */}
              <div className="mb-5 flex items-center gap-3">
                <div className={`rounded-full bg-gradient-to-br ${category.color} p-2.5 text-white shadow-lg`}>
                  <Icon size={22} />
                </div>
                <h2 className="text-xl font-semibold text-[var(--sea-ink)]">
                  {category.title}
                </h2>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="group">
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[var(--sea-ink)] group-hover:text-[var(--lagoon)] transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[var(--lagoon)]">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--line)]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--lagoon)] to-[var(--lagoon-deep)] transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          transitionDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms`,
                        }}
                      />
                    </div>
                    {/* Description */}
                    <p className="mt-1 text-xs text-[var(--sea-ink-soft)]">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* Key Technologies */}
      <section className="island-shell mt-12 rounded-2xl p-8">
        <div className="mb-6">
          <p className="island-kicker mb-2">Core Technologies</p>
          <h2 className="text-2xl font-semibold text-[var(--sea-ink)]">
            My Go-To Tech Stack
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            'React.js', 'React Native', 'TypeScript', 'Tailwind CSS',
            'Redux', 'Next.js', 'Jest', 'Git', 'GraphQL', 'Node.js',
            'Firebase', 'Expo', 'Vite', 'Webpack', 'CI/CD'
          ].map((tech, index) => (
            <span
              key={tech}
              className="rise-in rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-sm font-medium text-[var(--sea-ink-soft)] transition-all hover:border-[var(--lagoon)] hover:text-[var(--lagoon)] hover:-translate-y-0.5 hover:shadow-md"
              style={{ animationDelay: `${index * 50 + 800}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="island-shell mt-12 rounded-2xl p-8 text-center">
        <h2 className="display-title mb-4 text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
          Want to Discuss a Project?
        </h2>
        <p className="mb-6 max-w-xl mx-auto text-base text-[var(--sea-ink-soft)]">
          I'm always excited to work with new technologies and take on challenging projects.
          Let's discuss how my skills can help bring your vision to life!
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.4)] bg-[rgba(79,184,178,0.2)] px-8 py-4 text-sm font-semibold text-[var(--lagoon-deep)] transition-all hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.3)] hover:shadow-lg"
        >
          Get In Touch
        </a>
      </section>
    </main>
  )
}