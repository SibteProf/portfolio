import { Gamepad2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGameMode } from '../lib/useGameMode'

export default function GameModeToggle() {
  const { enabled, toggle } = useGameMode()

  const label = `Game mode: ${enabled ? 'on' : 'off'}. Click to turn it ${
    enabled ? 'off' : 'on'
  }.`

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={enabled}
      whileTap={{ scale: 0.94 }}
      className={`hidden h-10 w-10 items-center justify-center rounded-lg border transition-colors sm:flex ${
        enabled
          ? 'border-mint text-mint'
          : 'border-white/10 bg-white/[0.03] text-ink-2 hover:border-indigo hover:text-indigo'
      }`}
    >
      <Gamepad2 size={18} />
    </motion.button>
  )
}
