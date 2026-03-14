import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  ScrollReveal,
  HoverCard,
} from '../components/ui/ScrollReveal'

export const Route = createFileRoute('/experience')({
  component: Experience,
})

const experiences = [
  {
    id: 1,
    role: 'Senior React Developer & React Native Developer',
    company: 'TechMosaic Solutions',
    location: 'Lahore, Pakistan',
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
    location: 'Lahore, Pakistan',
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
    location: 'Lahore, Pakistan',
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

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.15} className="relative pl-14 md:pl-20">
      {/* Timeline Dot */}
      <div className="absolute left-3 md:left-6 top-6 h-4 w-4 rounded-full border-4 border-[var(--bg-secondary)] bg-[var(--accent-primary)] shadow-lg shadow-[var(--accent-glow)] z-10" />

      <HoverCard className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)]">
              {exp.role}
            </h3>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-[var(--accent-glow)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 w-fit">
              {exp.type}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <Building2 size={16} className="text-[var(--accent-primary)]" />
              <span className="font-medium text-[var(--text-primary)]">{exp.company}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={16} className="text-[var(--accent-primary)]" />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-[var(--accent-primary)]" />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
          {exp.description}
        </p>

        {/* Achievements */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-[var(--accent-primary)]" />
            <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide">
              Key Achievements
            </h4>
          </div>
          <ul className="grid sm:grid-cols-2 gap-2">
            {exp.achievements.map((achievement, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
              >
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-[var(--accent-primary)]" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-[var(--accent-primary)]" />
            <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wide">
              Technologies Used
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </HoverCard>
    </ScrollReveal>
  )
}

function Experience() {
  return (
    <div className="page-container py-12">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-16 md:py-24">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[var(--accent-primary)]/10 blur-[100px] pointer-events-none" />

          <ScrollReveal delay={0}>
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent-primary)] mb-4">
              Experience
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6">
              My Professional <span className="text-gradient">Journey</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed">
              Over 5 years of experience building exceptional web and mobile applications,
              leading teams, and delivering impactful solutions that drive business growth.
            </p>
          </ScrollReveal>
        </section>
      </ScrollReveal>

      {/* Experience Timeline */}
      <ScrollReveal>
        <section className="py-10">
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              className="p-3 rounded-xl bg-[var(--accent-glow)]"
              style={{ color: 'var(--accent-primary)' }}
              whileHover={{ rotate: 10, scale: 1.05 }}
            >
              <Briefcase size={24} />
            </motion.div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
              Work History
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-5 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-tertiary)] to-transparent" />

            {/* Experience Cards */}
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <ExperienceCard key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-16">
          <motion.div
            className="relative overflow-hidden rounded-3xl card p-8 md:p-12 text-center"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[var(--accent-primary)]/5 blur-[80px]" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] mb-4">
                Interested in Working Together?
              </h2>
              <p className="max-w-xl mx-auto text-[var(--text-secondary)] mb-8">
                I'm always open to discussing new opportunities and projects.
                Let's connect and create something amazing!
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

export default Experience