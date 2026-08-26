import { Cpu, Gamepad2, Music, Smartphone } from 'lucide-react'
import { interests } from './portfolio'

const iconByKey: Record<string, typeof Gamepad2> = {
  gaming: Gamepad2,
  'pc-building': Cpu,
  phones: Smartphone,
  music: Music,
}

const colorByKey: Record<string, string> = {
  gaming: 'text-[var(--secondary)]',
  'pc-building': 'text-[var(--tertiary)]',
  phones: 'text-[var(--primary)]',
  music: 'text-[var(--secondary)]',
}

export const funFacts = interests.map((item) => ({
  icon: iconByKey[item.key] ?? Gamepad2,
  label: item.label,
  value: item.value,
  color: colorByKey[item.key] ?? 'text-[var(--secondary)]',
}))
