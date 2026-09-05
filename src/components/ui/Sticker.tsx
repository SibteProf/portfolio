import type { ReactNode } from 'react'

interface StickerProps {
  children: ReactNode
  /**
   * Position in its row. Drives the tilt.
   *
   * The tilt is index-derived rather than random on purpose: a random rotation
   * differs between the server render and the client render, which React
   * reports as a hydration mismatch.
   */
  index?: number
  accent?: boolean
  className?: string
}

/**
 * Sticker badge, per DESIGN.md: pill-shaped, 2px border, tilted a couple of
 * degrees so a row of them reads as something physical rather than as another
 * rack of chips. Straightens on hover.
 */
export default function Sticker({
  children,
  index = 0,
  accent = false,
  className = '',
}: StickerProps) {
  return (
    <span
      data-tilt={index % 3}
      className={`sticker ${accent ? 'sticker-accent' : ''} ${className}`}
    >
      {children}
    </span>
  )
}

/** Convenience wrapper for the common case: a tech stack rendered as stickers. */
export function StickerRow({
  items,
  className = '',
}: {
  items: Array<string>
  className?: string
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((item, i) => (
        <Sticker key={item} index={i}>
          {item}
        </Sticker>
      ))}
    </div>
  )
}
