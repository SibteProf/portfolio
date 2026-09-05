import { createFileRoute } from '@tanstack/react-router'
import { SITE_URL } from '../lib/seo'

/** Replaces the old public/robots.txt, which had no Sitemap line. */
export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () => {
        const body = [
          'User-agent: *',
          'Allow: /',
          '',
          `Sitemap: ${SITE_URL}/sitemap.xml`,
          '',
        ].join('\n')

        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=0, s-maxage=86400',
          },
        })
      },
    },
  },
})
