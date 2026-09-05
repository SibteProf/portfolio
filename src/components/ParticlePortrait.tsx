import { useEffect, useRef } from 'react'

/**
 * Renders an image as a field of drifting particles that scatter away from the
 * cursor and spring back.
 *
 * The source must be a PNG with a transparent background — the sampler keys on
 * alpha, so anything opaque behind the subject becomes particles too. Source
 * hues are discarded and its luminance is remapped onto a ramp built from the
 * site tokens, which is what makes this read as part of the design rather than
 * a low-fidelity photo.
 */

/** Display pixels between sampled points. Lower is denser, quadratically more work. */
const SAMPLE_GAP = 4
/** Alpha above which a source pixel becomes a particle. */
const ALPHA_THRESHOLD = 128
const MAX_PARTICLES = 9000
/** Source tones quantise into this many buckets, so a frame sets fillStyle N times rather than once per particle. */
const TONE_BUCKETS = 10
/**
 * Opacity of the darkest tone. Hue alone cannot carry form here — both ends of
 * the palette are light, so a portrait mapped only to hue reads as a flat
 * silhouette. Brightness is what makes a face legible, so tone drives alpha and
 * hue merely tints.
 */
const ALPHA_FLOOR = 0.46
/** Lifts midtones, since dark clothing otherwise swallows most of the range. */
const TONE_GAMMA = 0.72
/**
 * Where along the tone ramp the accent hue starts. Below this the figure is
 * solidly --primary; only genuine highlights pick up --secondary, so the accent
 * reads as deliberate rather than as speckle.
 */
const ACCENT_PIVOT = 0.55
const PARTICLE_SIZE = 2

const CURSOR_RADIUS = 88
const CURSOR_FORCE = 4.6
const SPRING = 0.045
const FRICTION = 0.86

const FALLBACK_COLD = { r: 0xc0, g: 0xc1, b: 0xff } // --primary
const FALLBACK_WARM = { r: 0x4e, g: 0xde, b: 0xa3 } // --secondary

interface Rgb {
  r: number
  g: number
  b: number
}

function parseColor(value: string, fallback: Rgb): Rgb {
  const hex = value.trim().match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const n = parseInt(hex[1], 16)
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
  }
  const rgb = value.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/)
  if (rgb) {
    return { r: Number(rgb[1]), g: Number(rgb[2]), b: Number(rgb[3]) }
  }
  return fallback
}

/** Builds a tone ramp from the live design tokens, dark to light. */
function toneRampFromTokens(): Array<string> {
  let cold = FALLBACK_COLD
  let warm = FALLBACK_WARM

  if (typeof window !== 'undefined') {
    const styles = getComputedStyle(document.documentElement)
    cold = parseColor(styles.getPropertyValue('--primary'), FALLBACK_COLD)
    warm = parseColor(styles.getPropertyValue('--secondary'), FALLBACK_WARM)
  }

  return Array.from({ length: TONE_BUCKETS }, (_, i) => {
    const t = i / (TONE_BUCKETS - 1)
    // Hue and opacity ride the same tone but on different curves: opacity
    // spans the whole range to carry form, hue stays put until the highlights.
    const hueT = Math.max(0, (t - ACCENT_PIVOT) / (1 - ACCENT_PIVOT))
    const r = Math.round(cold.r + (warm.r - cold.r) * hueT)
    const g = Math.round(cold.g + (warm.g - cold.g) * hueT)
    const b = Math.round(cold.b + (warm.b - cold.b) * hueT)
    const alpha = ALPHA_FLOOR + (1 - ALPHA_FLOOR) * t
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`
  })
}

interface Particle {
  homeX: number
  homeY: number
  x: number
  y: number
  vx: number
  vy: number
  bucket: number
}

export default function ParticlePortrait({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const toneRamp = toneRampFromTokens()
    let particles: Array<Particle> = []
    let buckets: Array<Array<Particle>> = []
    let frame = 0
    let visible = true
    let disposed = false
    let width = 0
    let height = 0
    const pointer = { x: -9999, y: -9999, active: false }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    /** Samples the image into particles laid out to fill the current canvas box. */
    const build = (image: HTMLImageElement) => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Fit the source inside the box, preserving aspect ratio.
      const scale = Math.min(width / image.width, height / image.height)
      const drawW = Math.max(1, Math.round(image.width * scale))
      const drawH = Math.max(1, Math.round(image.height * scale))
      const offsetX = Math.round((width - drawW) / 2)
      const offsetY = Math.round((height - drawH) / 2)

      const sampler = document.createElement('canvas')
      sampler.width = drawW
      sampler.height = drawH
      const sctx = sampler.getContext('2d', { willReadFrequently: true })
      if (!sctx) return
      sctx.drawImage(image, 0, 0, drawW, drawH)

      const { data } = sctx.getImageData(0, 0, drawW, drawH)
      const next: Array<Particle> = []

      // Widen the gap rather than truncating the loop, so a dense source thins
      // out evenly instead of losing its bottom half.
      let gap = SAMPLE_GAP
      const estimate = (g: number) =>
        Math.ceil(drawW / g) * Math.ceil(drawH / g)
      while (estimate(gap) > MAX_PARTICLES * 1.6) gap += 1

      for (let y = 0; y < drawH; y += gap) {
        for (let x = 0; x < drawW; x += gap) {
          const i = (y * drawW + x) * 4
          if (data[i + 3] < ALPHA_THRESHOLD) continue

          // Perceptual luminance drives the position along the tone ramp.
          const lum =
            (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) /
            255
          const bucket = Math.min(
            TONE_BUCKETS - 1,
            Math.floor(Math.pow(lum, TONE_GAMMA) * TONE_BUCKETS),
          )

          next.push({
            homeX: offsetX + x,
            homeY: offsetY + y,
            x: offsetX + x,
            y: offsetY + y,
            vx: 0,
            vy: 0,
            bucket,
          })
        }
      }

      particles = next
      buckets = Array.from(
        { length: TONE_BUCKETS },
        () => [] as Array<Particle>,
      )
      for (const particle of particles) buckets[particle.bucket].push(particle)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let b = 0; b < buckets.length; b++) {
        const bucket = buckets[b]
        if (!bucket.length) continue
        ctx.fillStyle = toneRamp[b]
        for (const particle of bucket) {
          ctx.fillRect(particle.x, particle.y, PARTICLE_SIZE, PARTICLE_SIZE)
        }
      }
    }

    const step = () => {
      if (disposed) return

      for (const particle of particles) {
        if (pointer.active) {
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distSq = dx * dx + dy * dy
          if (distSq < CURSOR_RADIUS * CURSOR_RADIUS && distSq > 0.01) {
            const dist = Math.sqrt(distSq)
            const push = ((CURSOR_RADIUS - dist) / CURSOR_RADIUS) * CURSOR_FORCE
            particle.vx += (dx / dist) * push
            particle.vy += (dy / dist) * push
          }
        }

        particle.vx += (particle.homeX - particle.x) * SPRING
        particle.vy += (particle.homeY - particle.y) * SPRING
        particle.vx *= FRICTION
        particle.vy *= FRICTION
        particle.x += particle.vx
        particle.y += particle.vy
      }

      draw()
      frame = requestAnimationFrame(step)
    }

    const start = () => {
      if (reducedMotion || disposed || frame) return
      frame = requestAnimationFrame(step)
    }
    const stop = () => {
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    const image = new Image()
    image.decoding = 'async'
    image.src = src

    image.onload = () => {
      if (disposed) return
      build(image)
      draw()
      if (visible) start()
    }
    // Collapse the slot entirely if the cutout is missing, so the layout closes
    // up rather than reserving a blank aspect-ratio box.
    image.onerror = () => {
      wrap.style.display = 'none'
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      },
      { rootMargin: '120px' },
    )
    observer.observe(wrap)

    let resizeTimer = 0
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (disposed || !image.complete || !image.naturalWidth) return
        build(image)
        draw()
      }, 150)
    })
    resizeObserver.observe(wrap)

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      disposed = true
      stop()
      observer.disconnect()
      resizeObserver.disconnect()
      window.clearTimeout(resizeTimer)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [src])

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-[4/5] w-full ${className}`}
      role="img"
      aria-label={alt}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
