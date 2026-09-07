/**
 * Builds every photographic asset the site ships from the originals in
 * `.assets-source/` and `.assets-source/work/`.
 *
 * Run with `npm run images`. Outputs are committed; the sources are not needed
 * at build time.
 */
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const sourceDir = join(root, '.assets-source')
const publicDir = join(root, 'public')

/**
 * Head-and-shoulders crop out of the 4000x3000 original.
 *
 * The original carries an EXIF orientation flag, so `.rotate()` has to run
 * before any geometry is measured — without it the crop box lands on a
 * sideways image. These numbers are in post-rotation (3000x4000) space.
 */
const PORTRAIT_SOURCE = join(sourceDir, 'personal_image.jpg')
const PORTRAIT_CROP = { left: 800, top: 210, width: 1715, height: 2145 }

/** 4:5. Wide enough for the hero card, small enough not to threaten LCP. */
const PORTRAIT_WIDTHS = [440, 880]

/**
 * The photo is a warm outdoor shot and the site is a cool indigo dark. A very
 * light lift settles it into the page.
 *
 * Deliberately no .tint(): sharp's tint converts to greyscale before applying
 * the colour, which turned a real colour photo into a sepia postcard. The
 * source already supplies the warmth the palette wants — dry grass, the maroon
 * jacket, the orange print — so the grade only has to get out of its way.
 */
const grade = (pipeline) =>
  pipeline.modulate({ saturation: 0.94, brightness: 1.05 })

async function buildPortrait() {
  const base = () =>
    grade(sharp(PORTRAIT_SOURCE).rotate().extract(PORTRAIT_CROP))

  for (const width of PORTRAIT_WIDTHS) {
    const suffix = width === PORTRAIT_WIDTHS[0] ? '' : `@${width}`
    const resized = () => base().resize(width)

    await resized()
      .avif({ quality: 58 })
      .toFile(join(publicDir, `portrait${suffix}.avif`))
    await resized()
      .webp({ quality: 74 })
      .toFile(join(publicDir, `portrait${suffix}.webp`))
    await resized()
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(join(publicDir, `portrait${suffix}.jpg`))
  }

  const { width, height } = await base().metadata()
  console.log(
    `portrait: ${width}x${height} source crop -> ${PORTRAIT_WIDTHS.join(', ')}px`,
  )
}

/**
 * Project screenshots. Cards render at `aspect-ratio: 16/5`, so the capture is
 * cropped from the top of the page — the part of a marketing site that
 * actually says what it is — rather than squashed to fit.
 */
const WORK_WIDTHS = [640, 1280]
const WORK_ASPECT = 16 / 5

async function buildWork() {
  const workSource = join(sourceDir, 'work')
  const workOut = join(publicDir, 'work')

  let files = []
  try {
    files = (await readdir(workSource)).filter((f) => /\.(png|jpe?g)$/i.test(f))
  } catch {
    console.log(
      [
        'work: nothing to do — .assets-source/work/ does not exist.',
        '      Captures go in that subdirectory, NOT in .assets-source/ itself,',
        '      and each file is named after its project slug (nowvplay.png,',
        "      pecunia.png, ...). That slug is what a project's `image` field",
        '      in src/content/portfolio.ts points at.',
      ].join('\n'),
    )
    return
  }
  if (!files.length) {
    console.log(
      'work: .assets-source/work/ exists but holds no png/jpg, skipping',
    )
    return
  }

  await mkdir(workOut, { recursive: true })

  for (const file of files) {
    const slug = file.replace(/\.(png|jpe?g)$/i, '')
    const src = join(workSource, file)
    const { width: sw } = await sharp(src).metadata()
    const cropHeight = Math.round(sw / WORK_ASPECT)

    for (const width of WORK_WIDTHS) {
      const suffix = width === WORK_WIDTHS[0] ? '' : `@${width}`
      const shot = () =>
        sharp(src)
          .extract({ left: 0, top: 0, width: sw, height: cropHeight })
          .resize(width)

      await shot()
        .avif({ quality: 52 })
        .toFile(join(workOut, `${slug}${suffix}.avif`))
      await shot()
        .webp({ quality: 72 })
        .toFile(join(workOut, `${slug}${suffix}.webp`))
    }
    console.log(`work: ${slug} -> ${WORK_WIDTHS.join(', ')}px`)
  }
}

await buildPortrait()
await buildWork()
