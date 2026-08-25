import {
  offTheClock,
  profile,
  projects,
  stackGroups,
  timeline,
} from '../content/portfolio'

export const commandList = [
  'whoami',
  'projects',
  'skills',
  'experience',
  'contact',
  'fun',
  'sudo',
  'help',
  'clear',
]

export type CommandOutput = string[] | 'CLEAR'

export function runCommand(raw: string): CommandOutput {
  const cmd = raw.trim().toLowerCase()

  switch (cmd) {
    case 'whoami':
      return [
        `${profile.name}, ${profile.title}, ${profile.location}`,
        profile.intro,
        `P.S. type 'fun' if you want the non-technical version.`,
      ]

    case 'projects':
      return projects.map((project) => `${project.title}: ${project.type}`)

    case 'skills':
      return stackGroups.flatMap((group) => [
        `${group.title}:`,
        `  ${group.items.join(', ')}`,
      ])

    case 'experience':
    case 'timeline':
      return timeline.map(
        (item) => `${item.period}  ${item.role} @ ${item.company}`,
      )

    case 'contact':
      return [
        `Email: ${profile.email}`,
        `GitHub: ${profile.github}`,
        `LinkedIn: ${profile.linkedin}`,
      ]

    case 'fun':
    case 'hobbies':
      return [offTheClock.short]

    case 'sudo':
      return [
        'Permission denied: nice try.',
        'This terminal only has read access to my portfolio, not root.',
      ]

    case 'help':
      return [`Available commands: ${commandList.join(', ')}`]

    case 'clear':
      return 'CLEAR'

    case '':
      return []

    default:
      return [
        `command not found: ${cmd}`,
        `type 'help' to see what's available`,
      ]
  }
}
