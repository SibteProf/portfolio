import { HeadContent, Scripts, createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimatedBackground } from '../components/ui/ScrollReveal'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Sibte Hussain - React & React Native Developer',
      },
      {
        name: 'description',
        content: 'Portfolio of Sibte Hussain - Senior React and React Native Developer with 3+ years of experience building scalable web and mobile applications.',
      },
      {
        name: 'keywords',
        content: 'React, React Native, TypeScript, Frontend Developer, Mobile Developer, Portfolio, Sibte Hussain',
      },
      {
        property: 'og:title',
        content: 'Sibte Hussain - React & React Native Developer',
      },
      {
        property: 'og:description',
        content: 'Portfolio of Sibte Hussain - Senior React and React Native Developer with 3+ years of experience building scalable web and mobile applications.',
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

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  }

  const pageTransition = {
    type: 'tween',
    ease: [0.25, 0.4, 0.25, 1],
    duration: 0.4,
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[var(--accent-primary)] selection:text-[var(--text-inverse)]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnimatedBackground />
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            id="main-content"
            className="min-h-screen"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}