interface LogoProps {
  /** Edge length of the mark in px. The wordmark scales from it. */
  size?: number
  showWordmark?: boolean
  className?: string
}

/**
 * The brand mark: a terminal prompt. Mint chevron, indigo cursor, dark tile.
 *
 * Kept in sync by hand with public/logo.svg, which is what
 * scripts/generate-icons.mjs rasterises into the favicon and app icons.
 *
 * The cursor blinks on the same keyframes as the terminal caret in the hero,
 * so the mark and the page read as the same idea. The blink is pure CSS so the
 * reduced-motion media query can stop it without a hydration-unsafe hook.
 */
export function LogoMark({ size = 28, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="8" fill="#1b1b23" />
      <rect
        x="0.6"
        y="0.6"
        width="30.8"
        height="30.8"
        rx="7.4"
        fill="none"
        stroke="var(--color-indigo-deep)"
        strokeWidth="1.2"
      />
      <path
        d="M9.5 10.5 14.8 16 9.5 21.5"
        fill="none"
        stroke="var(--color-mint)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="17.2"
        y="19"
        width="6.4"
        height="2.6"
        rx="1.3"
        fill="var(--color-indigo)"
        className="logo-caret"
      />
    </svg>
  )
}

export default function Logo({
  size = 28,
  showWordmark = true,
  className = '',
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark ? (
        <span className="font-display text-[1.02rem] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover/logo:text-indigo">
          Sibte Hussain
        </span>
      ) : null}
    </span>
  )
}
