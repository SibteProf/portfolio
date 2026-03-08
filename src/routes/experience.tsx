import { createFileRoute } from '@tanstack/react-router'
import { Briefcase, Building2, Calendar, MapPin, Award, TrendingUp } from 'lucide-react'

export const Route = createFileRoute('/experience')({
  component: Experience,
})

const experiences = [
  {
    id: 1,
    role: 'Senior React Developer & React Native Developer',
    company: 'TechMosaic Solutions',
    location: 'Karachi, Pakistan',
    period: 'Jan 2023 - Present',
    type: 'Full-time',
    description: 'Leading development teams for both web and mobile applications, delivering high-quality solutions with modern technologies.',
    achievements: [
      'Led 5-person team for React and 4-person team for React Native projects',
      'Improved application performance by 40% through optimization techniques',
      'Integrated GraphQL APIs, reducing data-fetching time by 25%',
      'Built comprehensive design system improving team productivity by 35%',
      'Achieved 4.8 App Store rating for mobile applications',
      'Implemented CI/CD pipelines, reducing deployment time from 4 hours to 30 minutes',
      'Built 15+ React components and 10+ reusable React Native components',
    ],
    technologies: ['React.js', 'React Native', 'TypeScript', 'GraphQL', 'Redux', 'Next.js', 'CI/CD'],
  },
  {
    id: 2,
    role: 'React Developer & React Native Developer',
    company: 'Nexus Digital',
    location: 'Karachi, Pakistan',
    period: 'Aug 2021 - Dec 2022',
    type: 'Full-time',
    description: 'Developed scalable web and mobile applications with focus on performance and user experience.',
    achievements: [
      'Developed 20+ React components and 3 micro-frontends',
      'Built 3 production-ready mobile apps with 25+ screens each',
      'Improved application load time by 35% using Webpack optimization',
      'Achieved 4.5+ App Store and Play Store ratings',
      'Implemented complex animations using React Native Reanimated',
      'Integrated third-party SDKs (Firebase, Google Maps, Stripe)',
      'Optimized app bundle size by 45%',
      'Conducted code reviews and mentored junior developers',
    ],
    technologies: ['React.js', 'React Native', 'TypeScript', 'REST APIs', 'WebSocket', 'Reanimated', 'Expo'],
  },
  {
    id: 3,
    role: 'Junior Frontend Developer & Junior Mobile Developer',
    company: 'ByteCraft Solutions',
    location: 'Karachi, Pakistan',
    period: 'Mar 2020 - Jul 2021',
    type: 'Full-time',
    description: 'Started my professional journey building React web applications and React Native mobile apps.',
    achievements: [
      'Built 30+ React components for customer-facing applications',
      'Developed 2 Single Page Applications from scratch with React Router',
      'Built 2 mobile apps with 15+ screens using React Native and Expo',
      'Implemented responsive designs using Tailwind CSS',
      'Implemented cross-platform push notifications with Firebase',
      'Contributed to company design system',
      'Handled iOS and Android deployments to app stores',
    ],
    technologies: ['React.js', 'React Native', 'TypeScript', 'Tailwind CSS', 'React Router', 'Firebase'],
  },
]

function Experience() {
  return (
    <main className="page-wrap px-4 py-12">
      {/* Header */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.3),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

        <div className="relative z-10">
          <p className="island-kicker mb-3">Experience</p>
          <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
            My Professional Journey
          </h1>
          <p className="max-w-2xl text-lg text-[var(--sea-ink-soft)]">
            Over 5 years of experience building exceptional web and mobile applications,
            leading teams, and delivering impactful solutions.
          </p>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="mt-8 space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-full bg-[rgba(79,184,178,0.15)] p-3">
            <Briefcase className="text-[var(--lagoon)]" size={24} />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--sea-ink)]">
            Work History
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--lagoon)] to-transparent sm:left-8" />

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="rise-in relative mb-8 pl-16 sm:pl-20"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-[var(--bg-base)] bg-[var(--lagoon)] shadow-lg sm:left-6" />

              <div className="island-shell feature-card rounded-2xl p-6 transition-all hover:border-[var(--lagoon)]">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-[var(--sea-ink)] sm:text-2xl">
                    {exp.role}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[var(--sea-ink-soft)]">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} className="text-[var(--lagoon)]" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} className="text-[var(--lagoon)]" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-[var(--lagoon)]" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <span className="mt-2 inline-block rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs font-medium text-[var(--lagoon)]">
                    {exp.type}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-4 text-base text-[var(--sea-ink-soft)] leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Award size={18} className="text-[var(--lagoon)]" />
                    <h4 className="text-sm font-semibold text-[var(--sea-ink)] uppercase tracking-wide">
                      Key Achievements
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-[var(--sea-ink-soft)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--lagoon)]" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <TrendingUp size={18} className="text-[var(--lagoon)]" />
                    <h4 className="text-sm font-semibold text-[var(--sea-ink)] uppercase tracking-wide">
                      Technologies Used
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--sea-ink-soft)] transition-colors hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="island-shell mt-12 rounded-2xl p-8 text-center">
        <h2 className="display-title mb-4 text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
          Interested in Working Together?
        </h2>
        <p className="mb-6 max-w-xl mx-auto text-base text-[var(--sea-ink-soft)]">
          I'm always open to discussing new opportunities and projects.
          Let's connect and create something amazing!
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