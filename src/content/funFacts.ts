import { Coffee, Gamepad2, Keyboard, Moon } from 'lucide-react'
import { offTheClock } from './portfolio'

export const funFacts = [
  {
    icon: Coffee,
    label: 'Operating Mode',
    value: 'Product clarity before code volume',
    color: 'text-[var(--secondary)]',
  },
  {
    icon: Keyboard,
    label: 'Favorite Build Zone',
    value: 'UI, APIs, data, auth, and real-time flows working together',
    color: 'text-[var(--tertiary)]',
  },
  {
    icon: Moon,
    label: 'Design Bias',
    value: 'Dark systems, sharp edges, readable states',
    color: 'text-[var(--primary)]',
  },
  {
    icon: Gamepad2,
    label: offTheClock.label,
    value: offTheClock.value,
    color: 'text-[var(--secondary)]',
  },
]
