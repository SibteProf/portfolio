import { createFileRoute } from '@tanstack/react-router'
import Section from '../components/ui/Section'
import SketchUnderline from '../components/ui/SketchUnderline'
import Sticker, { StickerRow } from '../components/ui/Sticker'
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/ui/ScrollReveal'
import { comfortStack, stackGroups } from '../content/portfolio'
import { seo } from '../lib/seo'

export const Route = createFileRoute('/skills')({
  head: () =>
    seo({
      title: 'Stack',
      description:
        'The tools Sibte Hussain builds with: React, Next.js, TypeScript, Node, NestJS, Django, FastAPI, PostgreSQL, MongoDB, React Native, Expo, GraphQL, Socket.IO, Docker and AWS.',
      path: '/skills',
    }),
  component: Skills,
})

function Skills() {
  return (
    <div className="page-container">
      <Section
        kicker="Stack"
        headingAs="h1"
        size="lg"
        title={
          <>
            What I actually <SketchUnderline>reach for</SketchUnderline>.
          </>
        }
        subtitle="The full list, so I don't have to keep repeating it on every other page."
      >
        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {stackGroups.map((group) => (
            <StaggerItem key={group.title}>
              <div className="surface-card h-full p-6">
                <h2 className="mb-4 font-display text-lg font-semibold">
                  {group.title}
                </h2>
                <StickerRow items={group.items} />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section
        kicker="Also Comfortable With"
        title="Supporting tools I can slot into an existing setup."
      >
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-2.5">
            {comfortStack.map((item, i) => (
              <Sticker key={item} index={i} accent>
                {item}
              </Sticker>
            ))}
          </div>
          <p className="mt-8 font-code text-sm text-ink-3">
            # also comfortable flashing a ROM onto a phone that didn&apos;t ask
            for it
          </p>
        </ScrollReveal>
      </Section>
    </div>
  )
}
