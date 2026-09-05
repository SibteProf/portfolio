import {
  HeadContent,
  Scripts,
  createRootRoute,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import FloatingContactCTA from '../components/FloatingContactCTA'
import GameModeOverlay from '../components/GameModeOverlay'
import Header from '../components/Header'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../content/portfolio'
import { SITE_NAME, SITE_URL } from '../lib/seo'

import appCss from '../styles.css?url'

const GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap'

/**
 * Site-wide identity. Sourced from `profile` so it can never drift from the
 * copy actually rendered on the page.
 */
const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  sameAs: [profile.github, profile.linkedin],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Django',
    'React Native',
    'Node.js',
    'PostgreSQL',
    'GraphQL',
  ],
}

export const Route = createRootRoute({
  head: () => ({
    // Everything here is a fallback: router meta dedupes deepest-match-first on
    // `name ?? property`, so any route defining its own head overrides these.
    // Canonical is deliberately absent — links are not deduped by `rel`, so a
    // root canonical would ship alongside every route's and conflict with it.
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${SITE_NAME} | ${profile.title}` },
      {
        name: 'description',
        content:
          'Portfolio of Sibte Hussain, a full-stack engineer in Lahore building web and mobile apps with React, Next.js, Django, and React Native, and rooting phones for fun in his spare time.',
      },
      { name: 'theme-color', content: '#13131b' },
      { name: 'author', content: SITE_NAME },
      {
        property: 'og:title',
        content: `${SITE_NAME} | ${profile.title}`,
      },
      {
        property: 'og:description',
        content:
          'Full-stack portfolio: shipped web apps, mobile apps, and a few things built purely for fun.',
      },
      { property: 'og:type', content: 'website' },
      { 'script:ld+json': PERSON_JSON_LD },
    ],
    links: [
      // Hoisted out of styles.css: as an @import it serialised
      // HTML -> app CSS -> Google CSS -> font files. Preconnect lets the
      // gstatic handshake overlap the stylesheet request.
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: GOOGLE_FONTS_HREF },
      { rel: 'stylesheet', href: appCss },
      // Canonical minimal icon set. The .ico carries 16/32/48 for legacy and
      // search crawlers; the SVG wins wherever it is supported.
      { rel: 'icon', href: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GameModeOverlay />
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            id="main-content"
            className="min-h-screen"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <FloatingContactCTA />
        {import.meta.env.DEV ? (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        ) : null}
        <Scripts />
      </body>
    </html>
  )
}
