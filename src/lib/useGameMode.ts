import { useEffect, useState } from 'react'

const STORAGE_KEY = 'game-mode'
const EVENT = 'gamemode-change'

function readStored(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(STORAGE_KEY) === 'on'
}

export function useGameMode() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(readStored())

    const handler = () => setEnabled(readStored())
    window.addEventListener(EVENT, handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener(EVENT, handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  function toggle() {
    const next = !enabled
    window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
    window.dispatchEvent(new Event(EVENT))
  }

  return { enabled, toggle }
}
