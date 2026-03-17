import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Github, Linkedin, Twitter, Code2, Smartphone, Zap, Target, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  Counter,
  Magnetic,
  HoverCard,
  Typewriter,
} from '../components/ui/ScrollReveal'

export const Route = createFileRoute('/')({ component: Home })

const stats = [
{ value: 3, suffix: '+', label: 'Years Experience' },
{ value: 10, suffix: '+', label: 'Projects Completed' },
{ value: 40, suffix: '%', label: 'Performance Boost' },
{ value: 25, suffix: '%', label: 'Faster Feature Delivery' },
]

const featuredSkills = [
  {
    icon: Code2,
    title: 'React Development',
    description: 'Building modern, interactive UIs with React, TypeScript, and Next.js',
    color: '#00d4aa',
  },
  {
    icon: Smartphone,
    title: 'React Native',
    description: 'Cross-platform mobile apps with smooth animations and native performance',
    color: '#00a080',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing applications for maximum speed and user experience',
    color: '#00f5c4',
  },
  {
    icon: Layers,
    title: 'Architecture',
    description: 'Scalable architecture patterns and best practices',
    color: '#00c4aa',
  },
]

const projects = [
  {
    title: 'NowVPlay',
    description:
      'Sports streaming and collaboration platform built with Next.js featuring OAuth authentication, role-based access control, and optimized Redux state management.',
    tech: ['Next.js', 'React', 'Redux', 'Material UI', 'OAuth'],
    github: '#',
    demo: 'https://www.nowvplay.com',
  },
  {
    title: 'RealWealtdy',
    description:
      'Scalable real estate web application for property listings and transactions with secure payments, Plaid integration, and real-time chat.',
    tech: ['React', 'TypeScript', 'Socket.IO', 'Plaid API', 'Stripe'],
    github: '#',
    demo: 'https://sbx.realwealtdy.net',
  },
  {
    title: 'GoodFynd',
    description:
      'Cross-platform fintech SaaS mobile application for food vendors with real-time chat, Redux state management, and optimized API handling.',
    tech: ['React Native', 'Expo', 'Redux', 'React Query', 'Socket.IO'],
    github: '#',
    demo: 'https://www.goodfynd.com',
  },
  // {
  //   title: 'Atypically-me',
  //   description:
  //     'Cross-platform social platform with custom UI components for iOS and Android and optimized API performance using memoization techniques.',
  //   tech: ['React Native', 'TypeScript', 'Redux', 'REST APIs'],
  //   github: '#',
  //   demo: '#',
  // },
]

function Home() {
  return (
    <div className="page-container py-12">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative min-h-[80vh] flex flex-col justify-center py-20">
          {/* Background glow */}
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-primary)]/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--accent-tertiary)]/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            {/* Greeting */}
            <ScrollReveal delay={0}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="h-2 w-2 rounded-full bg-[var(--accent-primary)]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm text-[var(--text-secondary)]">Available for freelance work</span>
              </motion.div>
            </ScrollReveal>

            {/* Name & Role */}
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-3xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] leading-tight mb-4">
                Hi, I'm{' '}
                <Typewriter
                  text="Sibte Hussain"
                  className="text-gradient"
                  loop
                  speed={75}
                  deleteSpeed={45}
                  pauseMs={1100}
                />
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="text-2xl md:text-3xl text-[var(--text-secondary)] font-medium mb-6">
                React & React Native Developer
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                I craft exceptional digital experiences with modern technologies.
                Specializing in building scalable web applications and performant
                cross-platform mobile apps that delight users.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={0.4} className="flex flex-wrap gap-4 mb-10">
              <Link to="/contact" className="btn btn-primary">
                Let's Work Together
                <ArrowRight size={18} />
              </Link>
              <Link to="/experience" className="btn btn-secondary">
                View My Work
              </Link>
            </ScrollReveal>

            {/* Social Links */}
            <ScrollReveal delay={0.5}>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: 'https://github.com/SibtePls', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/sibte-hussain-b55aa723b', label: 'LinkedIn' },
                  // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-glass-hover)] transition-all"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-16">
          <StaggerContainer delay={0.2} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  className="card rounded-2xl p-6 text-center"
                  whileHover={{ y: -4 }}
                >
                  <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">
                    <Counter value={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </ScrollReveal>

      {/* Featured Skills */}
      <ScrollReveal>
        <section className="py-16">
          <div className="mb-10">
            <h2 className="section-title text-[var(--text-primary)] mb-3">
              What I Do
            </h2>
            <p className="section-subtitle text-[var(--text-secondary)]">
              Specialized services to help bring your digital vision to life
            </p>
          </div>

          <StaggerContainer delay={0.1} stagger={0.1} className="grid md:grid-cols-2 gap-6">
            {featuredSkills.map((skill, i) => (
              <StaggerItem key={skill.title}>
                <HoverCard glowColor={skill.color} className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-[var(--bg-glass)] to-[var(--bg-tertiary)]"
                      style={{ color: skill.color }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <skill.icon size={28} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-[var(--text-secondary)]">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      </ScrollReveal>

      {/* Featured Projects */}
      <ScrollReveal>
        <section className="py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="section-title text-[var(--text-primary)] mb-3">
                Featured Projects
              </h2>
              <p className="section-subtitle text-[var(--text-secondary)]">
                A selection of my recent work and side projects
              </p>
            </div>
            <Link
              to="/experience"
              className="btn btn-secondary"
            >
              View My Work
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <HoverCard className="p-6 h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-[var(--bg-glass)] border border-[var(--border-color)] text-[var(--text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                    {/* <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] flex items-center gap-1"
                      whileHover={{ x: 2 }}
                    >
                      <Github size={16} />
                      Code
                    </motion.a> */}
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] flex items-center gap-1"
                      whileHover={{ x: 2 }}
                    >
                      <Target size={16} />
                      Demo
                    </motion.a>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-16">
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/20 via-[var(--accent-tertiary)]/10 to-[var(--bg-secondary)]" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--accent-primary)]/10 blur-[100px]" />

            <div className="relative p-10 md:p-16 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Let's Build Something Amazing
              </h2>
              <p className="max-w-xl mx-auto text-[var(--text-secondary)] mb-8">
                I'm always excited to discuss new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
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