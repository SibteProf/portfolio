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

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var root=document.documentElement;root.classList.remove('light');root.classList.add('dark');root.setAttribute('data-theme','dark');root.style.colorScheme='dark';}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: `${profile.name} | ${profile.title}`,
      },
      {
        name: 'description',
        content:
          'Portfolio of Sibte Hussain, a full-stack engineer in Lahore building web and mobile apps with React, Next.js, Django, and React Native, and rooting phones for fun in his spare time.',
      },
      {
        name: 'keywords',
        content:
          'Sibte Hussain, Full-Stack Engineer, React, Next.js, Node.js, Django, React Native, TypeScript, portfolio',
      },
      {
        property: 'og:title',
        content: `${profile.name} | ${profile.title}`,
      },
      {
        property: 'og:description',
        content:
          'Full-stack portfolio: shipped web apps, mobile apps, and a few things built purely for fun.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
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
