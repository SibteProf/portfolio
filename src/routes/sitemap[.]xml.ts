import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '../lib/seo'

/**
 * Served from code rather than a static file in public/ so the URL list and the
 * origin stay derived from one source. A static sitemap silently rots the first
 * time a route is added, and a stale sitemap feeds crawlers 404s.
 *
 * Note: if a public/sitemap.xml ever exists, Nitro's asset handler wins and this
 * route never runs.
 */
const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/experience', priority: '0.9', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
  { path: '/about', priority: '0.7', changefreq: 'yearly' },
  { path: '/skills', priority: '0.7', changefreq: 'yearly' },
]

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const lastmod = new Date().toISOString().slice(0, 10)

        const body = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...PAGES.flatMap((page) => [
            '  <url>',
            `    <loc>${SITE_URL}${page.path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `    <changefreq>${page.changefreq}</changefreq>`,
            `    <priority>${page.priority}</priority>`,
            '  </url>',
          ]),
          '</urlset>',
          '',
        ].join('\n')

        return new Response(body, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=3600',
          },
        })
      },
    },
  },
})
