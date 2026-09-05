import type {
  DetailedHTMLProps,
  LinkHTMLAttributes,
  MetaHTMLAttributes,
} from 'react'

/**
 * The shapes a file route's `head()` accepts. Note these are React's DOM prop
 * types, which are narrower than router-core's `MetaDescriptor` — notably they
 * have no slot for `script:ld+json`, which the runtime does support. Hence the
 * single cast in `seo()` below.
 */
type MetaTag = DetailedHTMLProps<
  MetaHTMLAttributes<HTMLMetaElement>,
  HTMLMetaElement
>
type LinkTag = DetailedHTMLProps<
  LinkHTMLAttributes<HTMLLinkElement>,
  HTMLLinkElement
>

/** Canonical origin. No trailing slash. Every absolute URL on the site derives from this. */
export const SITE_URL = 'https://sibtehussain.com'
export const SITE_NAME = 'Sibte Hussain'

const DEFAULT_OG_IMAGE = '/og.jpg'
const OG_WIDTH = '1200'
const OG_HEIGHT = '630'

export interface SeoOptions {
  /** Page-specific title. Rendered as `${title} | Sibte Hussain`. */
  title: string
  /** Bypass the title template entirely. Home page only. */
  titleOverride?: string
  description: string
  /** Route path with a leading slash and no trailing slash. Drives canonical and og:url. */
  path: string
  /** Root-relative or absolute. Absolutised against SITE_URL. */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article' | 'profile'
  noindex?: boolean
  /** Emitted as <script type="application/ld+json"> tags, one per entry. */
  jsonLd?: Array<Record<string, unknown>>
}

/** Absolutise a root-relative path. Passes through anything already absolute. */
export const absoluteUrl = (path: string) =>
  path.startsWith('http') ? path : `${SITE_URL}${path}`

/**
 * Builds the `head()` payload for a route.
 *
 * Router meta is deduped deepest-match-first on `name ?? property`, so whatever a
 * route returns here overrides the fallbacks in __root.tsx automatically.
 *
 * Links are NOT deduped by `rel`, so canonical belongs here and never in the root
 * head — two canonical tags is worse than none.
 */
export function seo(opts: SeoOptions): {
  meta: Array<MetaTag>
  links: Array<LinkTag>
} {
  const title = opts.titleOverride ?? `${opts.title} | ${SITE_NAME}`
  const url = absoluteUrl(opts.path)
  const image = absoluteUrl(opts.image ?? DEFAULT_OG_IMAGE)
  const imageAlt = opts.imageAlt ?? `${SITE_NAME} — Full-Stack Engineer`

  return {
    meta: [
      { title },
      { name: 'description', content: opts.description },
      ...(opts.noindex
        ? [{ name: 'robots', content: 'noindex, nofollow' }]
        : []),

      { property: 'og:title', content: title },
      { property: 'og:description', content: opts.description },
      { property: 'og:type', content: opts.type ?? 'website' },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: OG_WIDTH },
      { property: 'og:image:height', content: OG_HEIGHT },
      { property: 'og:image:alt', content: imageAlt },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: opts.description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: imageAlt },

      // headContentUtils special-cases this key into an escaped
      // <script type="application/ld+json">. The cast is the price of the
      // route-level head type not modelling it.
      ...(opts.jsonLd?.map(
        (data) => ({ 'script:ld+json': data }) as unknown as MetaTag,
      ) ?? []),
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
