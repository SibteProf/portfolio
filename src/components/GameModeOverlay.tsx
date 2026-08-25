import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useGameMode } from '../lib/useGameMode'

const CHARACTERS = '01アイウエオカキクケコサシスセソタチツテト<>{}[]();/=+-*'

export default function GameModeOverlay() {
  const { enabled } = useGameMode()
  const prefersReducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showToast, setShowToast] = useState(false)
  const wasEnabled = useRef(false)

  useEffect(() => {
    if (enabled && !wasEnabled.current) {
      setShowToast(true)
      const timeout = setTimeout(() => setShowToast(false), 4000)
      wasEnabled.current = true
      return () => clearTimeout(timeout)
    }
    wasEnabled.current = enabled
  }, [enabled])

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
            className="glass-card fixed bottom-6 left-6 z-40 max-w-xs rounded-xl p-4 font-code text-xs leading-6 text-[var(--text-secondary)]"
          >
            Game mode: on. Also, yes, I game. Try{' '}
            <span className="text-[var(--secondary)]">fun</span> in the
            terminal.
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
