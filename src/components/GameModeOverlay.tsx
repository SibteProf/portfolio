import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import { Gamepad2, X } from 'lucide-react'
import { useGameMode } from '../lib/useGameMode'
import DinoGame from './DinoGame'

const CHARACTERS = '01アイウエオカキクケコサシスセソタチツテト<>{}[]();/=+-*'

export default function GameModeOverlay() {
  const { enabled } = useGameMode()
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showToast, setShowToast] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const wasEnabled = useRef(false)

  useEffect(() => {
    if (enabled && !wasEnabled.current) {
      setShowToast(true)
      const timeout = setTimeout(() => setShowToast(false), 4000)
      wasEnabled.current = true
      return () => clearTimeout(timeout)
    }
    wasEnabled.current = enabled
    if (!enabled) setShowGame(false)
  }, [enabled])

  useEffect(() => {
    if (!showGame) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setShowGame(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showGame])

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rootStyle = getComputedStyle(document.documentElement)
    const color = rootStyle.getPropertyValue('--secondary').trim() || '#4edea3'

    const fontSize = 16
    let columns = 0
    let drops: number[] = []

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      columns = Math.floor(canvas!.width / fontSize)
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * canvas!.height) / fontSize),
      )
    }

    resize()
    window.addEventListener('resize', resize)

    let frame = 0
    let animationId: number

    function draw() {
      frame += 1
      if (frame % 2 === 0) {
        ctx!.fillStyle = 'rgba(10, 10, 16, 0.08)'
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

        ctx!.fillStyle = color
        ctx!.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i += 1) {
          const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          ctx!.fillText(char, i * fontSize, drops[i] * fontSize)

          if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i] += 1
        }
      }
      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [enabled, prefersReducedMotion])

  if (!enabled || prefersReducedMotion) return null

  const showLauncher = location.pathname !== '/contact'

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18]"
      />
      <AnimatePresence>
        {showToast ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="glass-card fixed bottom-6 left-6 z-40 max-w-xs rounded-xl p-4 font-code text-xs leading-6 text-ink-2"
          >
            Game mode: on. Also, yes, I game, and there is an actual game hiding
            in the corner now.
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showLauncher ? (
        <motion.button
          type="button"
          onClick={() => setShowGame(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Play dino game"
          title="Play a quick game"
          className="btn btn-secondary fixed bottom-6 left-6 z-40 shadow-[0_16px_40px_rgba(78,222,163,0.25)]"
        >
          <Gamepad2 size={17} />
          <span className="hidden sm:inline">Play</span>
        </motion.button>
      ) : null}

      <AnimatePresence>
        {showGame ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(10,10,16,0.85)] p-4 backdrop-blur-sm"
            onClick={(event) => {
              if (event.target === event.currentTarget) setShowGame(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl"
            >
              <button
                type="button"
                onClick={() => setShowGame(false)}
                aria-label="Close game"
                className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-surface-2 text-ink-2 transition-colors hover:text-indigo"
              >
                <X size={16} />
              </button>
              <DinoGame />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
