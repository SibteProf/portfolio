import { createFileRoute, Link } from '@tanstack/react-router'
import { Code2, Smartphone, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import AnimateIn from '#/components/AnimateIn'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14" id="main-content" aria-label="Home">
      {/* Hero Section */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-16 sm:px-12 sm:py-20">
        {/* Animated Background Elements */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.4),transparent_70%)]" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.25),transparent_70%)]" style={{ animationDelay: '1s' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.15),transparent_75%)]" style={{ animationDelay: '2s' }} />

        <div className="relative z-10">
          {/* Greeting */}
          <p className="island-kicker mb-4 rise-in" style={{ animationDelay: '100ms' }}>
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="display-title mb-4 rise-in text-5xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-7xl lg:text-8xl" style={{ animationDelay: '200ms' }}>
            Sibte Hussain
          </h1>

          {/* Role badges */}
          <div className="mb-6 flex flex-wrap gap-3 rise-in" style={{ animationDelay: '300ms' }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.15)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)]">
              <Code2 size={16} />
              React Developer
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.15)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)]">
              <Smartphone size={16} />
              React Native Developer
            </span>
          </div>

          {/* Description */}
          <p className="mb-8 max-w-2xl rise-in text-lg text-[var(--sea-ink-soft)] sm:text-xl" style={{ animationDelay: '400ms' }}>
            Frontend Developer with 3+ years of experience building scalable web and mobile
            applications. Passionate about creating exceptional user experiences with modern technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 rise-in" style={{ animationDelay: '500ms' }}>
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.4)] bg-[rgba(79,184,178,0.2)] px-6 py-3 text-sm font-semibold text-[var(--lagoon-deep)] transition-all hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.3)] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lagoon)] focus-visible:ring-offset-2"
            >
              View My Work
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(23,58,64,0.25)] bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--sea-ink)] transition-all hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.4)] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lagoon)] focus-visible:ring-offset-2"
            >
              Get In Touch
            </Link>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap gap-4 rise-in" style={{ animationDelay: '600ms' }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] p-3 text-[var(--sea-ink-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] p-3 text-[var(--sea-ink-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] p-3 text-[var(--sea-ink-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--lagoon)] hover:text-[var(--lagoon)]"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="mt-12">
        <p className="island-kicker mb-6 rise-in">Core Technologies</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: '⚛️', name: 'React.js', desc: 'Building modern, interactive UIs' },
            { icon: '📱', name: 'React Native', desc: 'Cross-platform mobile apps' },
            { icon: '📘', name: 'TypeScript', desc: 'Type-safe development' },
            { icon: '🎨', name: 'Tailwind CSS', desc: 'Utility-first styling' },
          ].map((skill, index) => (
            <article
              key={skill.name}
              className="island-shell feature-card rise-in rounded-2xl p-6"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="mb-3 text-4xl">{skill.icon}</div>
              <h2 className="mb-2 text-lg font-semibold text-[var(--sea-ink)]">
                {skill.name}
              </h2>
              <p className="m-0 text-sm text-[var(--sea-ink-soft)]">{skill.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <AnimateIn className="scroll-in">
        <section className="island-shell mt-12 rounded-2xl p-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '20+', label: 'Projects Completed' },
            { value: '40%', label: 'Performance Boost' },
            { value: '4.8', label: 'App Store Rating' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center rise-in" style={{ animationDelay: `${index * 100 + 400}ms` }}>
              <div className="display-title text-4xl font-bold text-[var(--lagoon)] sm:text-5xl">
                {stat.value}
              </div>
              <p className="mt-2 text-sm font-medium text-[var(--sea-ink-soft)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="island-shell mt-12 rounded-2xl p-8 text-center">
        <h2 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)] sm:text-4xl">
          Let's Build Something Amazing Together
        </h2>
        <p className="mb-6 max-w-2xl mx-auto text-base text-[var(--sea-ink-soft)]">
          I'm always interested in hearing about new projects and opportunities.
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(50,143,151,0.4)] bg-[rgba(79,184,178,0.2)] px-8 py-4 text-sm font-semibold text-[var(--lagoon-deep)] transition-all hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.3)] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lagoon)] focus-visible:ring-offset-2"
        >
          Contact Me
          <ArrowRight size={16} />
        </Link>
      </section>
      </AnimateIn>
    </main>
  )
}