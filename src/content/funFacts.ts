import { Cpu, Gamepad2, Music, Smartphone } from 'lucide-react'
import { interests } from './portfolio'

const iconByKey: Record<string, typeof Gamepad2> = {
  gaming: Gamepad2,
  'pc-building': Cpu,
  phones: Smartphone,
  music: Music,
}

/**
 * The accent now comes from the interest itself rather than a second lookup
 * table here, so there is one place to change a colour. Cards set it as
 * data-accent and read it back through var(--accent).
 */
export const funFacts = interests.map((item) => ({
  icon: iconByKey[item.key] ?? Gamepad2,
  label: item.label,
  value: item.value,
  short: item.short,
  accent: item.accent,
}))
