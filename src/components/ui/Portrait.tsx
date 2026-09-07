/**
 * The photo of an actual person.
 *
 * Built by `npm run images` from `.assets-source/personal_image.jpg`. AVIF
 * first, WebP next, JPEG as the floor. Intrinsic size is always declared so the
 * hero cannot shift while the image decodes.
 */
const W = 440
const H = 550

export default function Portrait({
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 26rem, 60vw',
}: {
  className?: string
  /** Set on the hero copy only. Everywhere else the photo is below the fold. */
  priority?: boolean
  sizes?: string
}) {
  return (
    <picture>
      <source
        type="image/avif"
        sizes={sizes}
        srcSet="/portrait.avif 440w, /portrait@880.avif 880w"
      />
      <source
        type="image/webp"
        sizes={sizes}
        srcSet="/portrait.webp 440w, /portrait@880.webp 880w"
      />
      <img
        src="/portrait.jpg"
        srcSet="/portrait.jpg 440w, /portrait@880.jpg 880w"
        sizes={sizes}
        width={W}
        height={H}
        alt="Sibte Hussain, sitting outdoors on a fallen log"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
      />
    </picture>
  )
}
