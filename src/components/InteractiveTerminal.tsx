import { Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Typewriter } from './ui/ScrollReveal'
import { runCommand } from '../lib/terminalCommands'
import { profile, workingPrinciples } from '../content/portfolio'

interface Line {
  id: number
  type: 'input' | 'output'
  text: string
}

const CHIP_COMMANDS = [
  'whoami',
  'projects',
  'skills',
  'experience',
  'contact',
  'fun',
]

let lineId = 0
function nextId() {
  lineId += 1
  return lineId
}

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>([])
  const [draft, setDraft] = useState('')
  const [commandLog, setCommandLog] = useState<string[]>([])
  const [logIndex, setLogIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight })
  }, [lines])

  function submit(raw: string) {
    const trimmed = raw.trim()
    setLines((prev) => [
      ...prev,
      { id: nextId(), type: 'input', text: trimmed },
    ])

    if (trimmed) {
      setCommandLog((prev) => [...prev, trimmed])
    }
    setLogIndex(-1)

    const result = runCommand(trimmed)
    if (result === 'CLEAR') {
      setLines([])
      return
    }

    setLines((prev) => [
      ...prev,
      ...result.map((text) => ({
        id: nextId(),
        type: 'output' as const,
        text,
      })),
    ])
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      submit(draft)
      setDraft('')
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (commandLog.length === 0) return
      const nextIndex = Math.min(logIndex + 1, commandLog.length - 1)
      setLogIndex(nextIndex)
      setDraft(commandLog[commandLog.length - 1 - nextIndex] ?? '')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (logIndex <= 0) {
        setLogIndex(-1)
        setDraft('')
        return
      }
      const nextIndex = logIndex - 1
      setLogIndex(nextIndex)
      setDraft(commandLog[commandLog.length - 1 - nextIndex] ?? '')
    }
  }

  return (
    <div className="relative">
      <div className="terminal-window relative">
        <div className="terminal-header">
          <span className="terminal-dot bg-[#ff5f56]" />
          <span className="terminal-dot bg-[#ffbd2e]" />
          <span className="terminal-dot bg-[#27c93f]" />
          <span className="ml-auto font-code text-xs text-[var(--text-muted)]">
            ~/portfolio/index.ts
          </span>
        </div>
        <div className="terminal-body">
          <p>
            <span className="text-[var(--secondary)]">$</span>{' '}
            <Typewriter text="npm run ship" speed={70} />
          </p>
          <p className="mt-4 text-[var(--text-muted)]">// this week, roughly</p>
          <p>
            const engineer ={' '}
            <span className="text-[var(--primary)]">
              &quot;{profile.name}&quot;
            </span>
          </p>
          <p>
            const alsoTrue = [
            <span className="text-[var(--tertiary)]">
              &quot;builds PCs for friends&quot;
            </span>
            ,{' '}
            <span className="text-[var(--tertiary)]">
              &quot;rooted a phone last weekend&quot;
            </span>
            ]
          </p>
          <p>
            build({`{`} breaksThings: true, fixesThem: &quot;usually&quot; {`}`}
            )
          </p>
          <div className="mt-6 space-y-1.5">
            {workingPrinciples.slice(0, 4).map((item) => (
              <div key={item.title} className="flex items-center gap-2">
                <Sparkles
                  size={13}
                  className="shrink-0 text-[var(--secondary)]"
                />
                <p className="text-xs text-[var(--text-primary)]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[var(--secondary)]">
            status: caffeinated, shipping, occasionally gaming
          </p>

          <div
            role="group"
            aria-label="Interactive terminal. Type a command and press Enter."
            className="mt-6 border-t border-white/10 pt-4"
          >
            <p className="sr-only">
              Interactive terminal. Type a command and press Enter. Try help to
              see what&apos;s available.
            </p>
            <div
              ref={outputRef}
              aria-live="polite"
              className="terminal-output max-h-40 space-y-1 overflow-y-auto pr-1"
            >
              {lines.map((line) => (
                <p key={line.id}>
                  {line.type === 'input' ? (
                    <>
                      <span className="text-[var(--secondary)]">$</span>{' '}
                      {line.text}
                    </>
                  ) : (
                    <span className="text-[var(--text-secondary)]">
                      {line.text}
                    </span>
                  )}
                </p>
              ))}
            </div>
            <div
              className="mt-2 flex items-center gap-2"
              onClick={() => inputRef.current?.focus()}
            >
              <span className="text-[var(--secondary)]">$</span>
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help'"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
                className="w-full bg-transparent font-code text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
              {CHIP_COMMANDS.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => submit(command)}
                  className="tag"
                >
                  {command}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
