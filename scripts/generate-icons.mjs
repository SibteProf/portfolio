/**
 * Rasterises the brand mark into every icon the site ships.
 * Run with `npm run icons` after any change to the mark.
 */
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import pngToIcoModule from 'png-to-ico'

const pngToIco = pngToIcoModule.default ?? pngToIcoModule

const root = fileURLToPath(new URL('..', import.meta.url))
const publicDir = join(root, 'public')

/**
 * Two sources, split by size. `logo.svg` carries the true 1.2px tile border,
 * which is right from ~64px up but vanishes below it; `favicon.svg` carries a
 * heavier border and chevron so the mark still reads at 16px. One source for
 * both ends leaves either a hairline or a slab.
 */
const LARGE_SOURCE = join(publicDir, 'logo.svg')
const SMALL_SOURCE = join(publicDir, 'favicon.svg')
const SMALL_BELOW = 64

/** The mark's own tile colour. Doubles as the opaque backdrop for iOS/Android. */
const TILE = '#1b1b23'

/** The SVGs declare a 32px box; sharp rasterises at that size unless we raise
 *  the DPI first. Resizing a 32px bitmap up to 512 would just be blur. */
const INTRINSIC = 32
const densityFor = (size) => Math.round((72 * size) / INTRINSIC)

const render = (size) =>
  sharp(size < SMALL_BELOW ? SMALL_SOURCE : LARGE_SOURCE, {
    density: densityFor(size),
  })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer()

/** Opaque variant: iOS ignores transparency and composites on white. */
const renderOpaque = async (size) =>
  sharp(await render(size))
    .flatten({ background: TILE })
    .png({ compressionLevel: 9 })
    .toBuffer()

/**
 * Android masks can crop up to 20% off each edge, so the mark sits at 60% of
 * the canvas with the tile colour bled to the corners.
 */
const renderMaskable = async (size) => {
  const inner = Math.round(size * 0.6)
  const pad = Math.round((size - inner) / 2)

  return sharp({
    create: { width: size, height: size, channels: 4, background: TILE },
  })
    .composite([{ input: await render(inner), top: pad, left: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

const write = async (name, buffer) => {
  await writeFile(join(publicDir, name), buffer)
  console.log(`  ${name.padEnd(24)} ${(buffer.length / 1024).toFixed(1)} KB`)
}

console.log('Generating icons from public/logo.svg + public/favicon.svg\n')

await write('apple-touch-icon.png', await renderOpaque(180))
await write('icon-192.png', await renderOpaque(192))
await write('icon-512.png', await renderOpaque(512))
await write('icon-maskable-512.png', await renderMaskable(512))

// png-to-ico takes file paths, so the ICO frames go through a temp dir.
const stage = await mkdtemp(join(tmpdir(), 'icons-'))
try {
  const frames = []
  for (const size of [16, 32, 48]) {
    const path = join(stage, `${size}.png`)
    await writeFile(path, await renderOpaque(size))
    frames.push(path)
  }
  await write('favicon.ico', await pngToIco(frames))
} finally {
  await rm(stage, { recursive: true, force: true })
}
/**
 * Stamp the mark onto the social card so a shared link carries the brand too.
 *
 * Composited from a pristine base in design/brand/ rather than in place, so
 * re-running this never stacks a second mark on top of the first.
 */
const OG_BASE = join(root, 'design', 'brand', 'og-base.jpg')
const OG_WIDTH = 1200
const OG_MARK = 84
const OG_INSET = 60

await write(
  'og.jpg',
  await sharp(OG_BASE)
    .composite([
      {
        input: await render(OG_MARK),
        top: OG_INSET,
        left: OG_WIDTH - OG_INSET - OG_MARK,
      },
    ])
    .jpeg({ quality: 88 })
    .toBuffer(),
)

console.log('\nDone.')
