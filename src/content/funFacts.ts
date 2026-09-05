import { Cpu, Gamepad2, Music, Smartphone } from 'lucide-react'
import { interests } from './portfolio'

const iconByKey: Record<string, typeof Gamepad2> = {
  gaming: Gamepad2,
  'pc-building': Cpu,
  phones: Smartphone,
  music: Music,
}

const colorByKey: Record<string, string> = {
  gaming: 'text-mint',
  'pc-building': 'text-amber',
  phones: 'text-indigo',
  music: 'text-mint',
}

export const funFacts = interests.map((item) => ({
  icon: iconByKey[item.key] ?? Gamepad2,
  label: item.label,
  value: item.value,
  color: colorByKey[item.key] ?? 'text-mint',
}))
