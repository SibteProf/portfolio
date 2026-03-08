import { createFileRoute } from '@tanstack/react-router'
import { GraduationCap, Code2, Target, Heart } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      {/* Hero Section */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.3),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

        <div className="relative z-10">
          <p className="island-kicker mb-3">About Me</p>
          <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
            Crafting Digital Experiences
          </h1>
          <p className="mb-4 max-w-2xl text-lg text-[var(--sea-ink-soft)]">
            Hello! I'm Sibte Hussain, a passionate developer with a dual expertise in React
            web applications and React Native mobile development.
          </p>
          <p className="max-w-2xl text-base text-[var(--sea-ink-soft)]">
            With 5+ years of professional experience, I specialize in building scalable,
            performant applications that delight users. I love turning complex problems into
            simple, beautiful, and intuitive solutions.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="island-shell rise-in rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-[rgba(79,184,178,0.15)] p-3">
              <Code2 className="text-[var(--lagoon)]" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--sea-ink)]">
              Web Development
            </h2>
          </div>
          <p className="text-base text-[var(--sea-ink-soft)] leading-relaxed">
            As a React Developer, I build modern, responsive web applications using
            React.js, TypeScript, and Next.js. I have experience creating component libraries,
            implementing state management with Redux, and optimizing application performance.
            My work includes building micro-frontends and integrating complex APIs.
          </p>
        </div>

        <div className="island-shell rise-in rounded-2xl p-6" style={{ animationDelay: '100ms' }}>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-[rgba(79,184,178,0.15)] p-3">
              <Code2 className="text-[var(--lagoon)]" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--sea-ink)]">
              Mobile Development
            </h2>
          </div>
          <p className="text-base text-[var(--sea-ink-soft)] leading-relaxed">
            As a React Native Developer, I create cross-platform mobile applications for both
            iOS and Android. I specialize in building native-like experiences with smooth
            animations, offline capabilities, and seamless API integrations. I've achieved
            4.8+ App Store ratings and improved app performance by up to 40%.
          </p>
        </div>

        <div className="island-shell rise-in rounded-2xl p-6" style={{ animationDelay: '200ms' }}>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-[rgba(79,184,178,0.15)] p-3">
              <Target className="text-[var(--lagoon)]" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--sea-ink)]">
              Leadership & Mentorship
            </h2>
          </div>
          <p className="text-base text-[var(--sea-ink-soft)] leading-relaxed">
            I've led teams of 4-5 developers on multiple projects, mentoring junior developers
            and conducting code reviews. I believe in collaborative development and creating
            environments where everyone can grow. I've built design systems that improved team
            productivity by 35% and established CI/CD pipelines.
          </p>
        </div>

        <div className="island-shell rise-in rounded-2xl p-6" style={{ animationDelay: '300ms' }}>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-[rgba(79,184,178,0.15)] p-3">
              <Heart className="text-[var(--lagoon)]" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--sea-ink)]">
              Continuous Learning
            </h2>
          </div>
          <p className="text-base text-[var(--sea-ink-soft)] leading-relaxed">
            I'm passionate about staying current with the latest technologies and best practices.
            I actively contribute to open-source projects, write technical blogs, and participate
            in developer communities. I believe that learning is a lifelong journey and I'm always
            excited to take on new challenges.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section className="island-shell mt-8 rounded-2xl p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-[rgba(79,184,178,0.15)] p-3">
            <GraduationCap className="text-[var(--lagoon)]" size={24} />
          </div>
          <div>
            <p className="island-kicker mb-1">Education</p>
            <h2 className="text-2xl font-semibold text-[var(--sea-ink)]">
              Academic Background
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--lagoon)]">
            <div>
              <h3 className="text-lg font-semibold text-[var(--sea-ink)]">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-[var(--lagoon)]">University of Karachi</p>
            </div>
            <p className="text-sm text-[var(--sea-ink-soft)]">
              Karachi, Pakistan
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="island-shell mt-8 rounded-2xl p-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: '5+', label: 'Years of Experience' },
            { value: '20+', label: 'Projects Delivered' },
            { value: '4.8', label: 'App Store Rating' },
            { value: '35%', label: 'Team Productivity Boost' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center rise-in" style={{ animationDelay: `${index * 100}ms` }}>
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

      {/* CTA */}
      <section className="island-shell mt-8 rounded-2xl p-8 text-center">
        <h2 className="display-title mb-4 text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
          Let's Work Together
        </h2>
        <p className="mb-6 max-w-xl mx-auto text-base text-[var(--sea-ink-soft)]">
          I'm always open to discussing new projects, creative ideas, or opportunities
          to be part of your vision. Feel free to reach out!
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