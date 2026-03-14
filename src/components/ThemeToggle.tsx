import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'

type ThemeMode = 'light' | 'dark' | 'auto'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }

  return 'auto'
}

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', mode)
  }

  document.documentElement.style.colorScheme = resolved
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('dark')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'auto') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeMode('auto')

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [mode])

  function toggleMode() {
    const nextMode: ThemeMode =
      mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light'
    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  const nextMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light'
  const label = `Theme: ${mode}. Click to switch to ${nextMode}`

  // Determine text color based on resolved theme
  const resolvedTheme = mode === 'auto'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : mode
  const iconColor = resolvedTheme === 'dark' ? '#0a0a0f' : '#0a0a0f'

  return (
    <motion.button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--accent-primary)] border border-[var(--accent-primary)] overflow-hidden"
      whileTap={{ scale: 0.9 }}
    >
      {/* Sliding background indicator */}
      <motion.div
        className="absolute inset-1 rounded-full bg-white"
        layout
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
        }}
        style={{
          left: mode === 'dark' ? '4px' : 'auto',
          right: mode === 'light' ? '4px' : 'auto',
          transform: mode === 'auto' ? 'translateX(-50%)' : undefined,
        }}
      />
      <AnimatePresence mode="wait">
        {mode === 'light' && (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center justify-center"
            style={{ width: '16px', height: '16px' }}
          >
            <Sun size={16} color={iconColor} />
          </motion.div>
        )}
        {mode === 'dark' && (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center justify-center"
            style={{ width: '16px', height: '16px' }}
          >
            <Moon size={16} color={iconColor} />
          </motion.div>
        )}
        {mode === 'auto' && (
          <motion.div
            key="auto"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 flex items-center justify-center"
            style={{ width: '16px', height: '16px' }}
          >
            <Monitor size={16} color={iconColor} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}