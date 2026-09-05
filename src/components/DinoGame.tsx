import { useEffect, useRef, useState } from 'react'

const HIGH_SCORE_KEY = 'dino-highscore'

const CANVAS_HEIGHT = 220
const GROUND_Y = CANVAS_HEIGHT - 32
const GRAVITY = 0.6
const JUMP_VELOCITY = -11.5
const PLAYER_SIZE = 26
const PLAYER_X = 40
const PLAYER_EMOJI = '🦖'
const OBSTACLE_EMOJIS = ['🌵', '🪨', '🌲']

interface Obstacle {
  x: number
  width: number
  height: number
  emoji: string
}

interface GameState {
  status: 'ready' | 'playing' | 'over'
  playerY: number
  velocityY: number
  obstacles: Obstacle[]
  speed: number
  distance: number
  spawnTimer: number
}

function createState(): GameState {
  return {
    status: 'ready',
    playerY: GROUND_Y - PLAYER_SIZE,
    velocityY: 0,
    obstacles: [],
    speed: 4.5,
    distance: 0,
    spawnTimer: 0,
  }
}

function readHighScore(): number {
  if (typeof window === 'undefined') return 0
  return Number(window.localStorage.getItem(HIGH_SCORE_KEY) ?? 0)
}

export default function DinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<GameState>(createState())
  const widthRef = useRef(600)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [status, setStatus] = useState<GameState['status']>('ready')

  useEffect(() => {
    setHighScore(readHighScore())
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      const parent = canvas!.parentElement
      widthRef.current = parent ? parent.clientWidth : 600
      canvas!.width = widthRef.current
      canvas!.height = CANVAS_HEIGHT
    }
    resize()
    window.addEventListener('resize', resize)

    let animationId: number
    let lastScoreShown = -1

    function jump() {
      const state = stateRef.current
      if (state.status === 'ready') {
        state.status = 'playing'
        setStatus('playing')
      } else if (state.status === 'over') {
        stateRef.current = createState()
        stateRef.current.status = 'playing'
        setStatus('playing')
        setScore(0)
        lastScoreShown = -1
        return
      }
      if (state.playerY >= GROUND_Y - PLAYER_SIZE - 0.5) {
        state.velocityY = JUMP_VELOCITY
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        event.preventDefault()
        jump()
      }
    }

    function handlePointerDown() {
      jump()
    }

    window.addEventListener('keydown', handleKeyDown)
    canvas.addEventListener('pointerdown', handlePointerDown)

    function draw() {
      const state = stateRef.current
      const width = widthRef.current
      const rootStyle = getComputedStyle(document.documentElement)
      const muted =
        rootStyle.getPropertyValue('--text-muted').trim() || '#908fa0'

      ctx!.clearRect(0, 0, width, CANVAS_HEIGHT)

      ctx!.strokeStyle = muted
      ctx!.lineWidth = 2
      ctx!.beginPath()
      ctx!.moveTo(0, GROUND_Y)
      ctx!.lineTo(width, GROUND_Y)
      ctx!.stroke()

      if (state.status === 'playing') {
        state.velocityY += GRAVITY
        state.playerY += state.velocityY
        if (state.playerY > GROUND_Y - PLAYER_SIZE) {
          state.playerY = GROUND_Y - PLAYER_SIZE
          state.velocityY = 0
        }

        state.speed = Math.min(4.5 + state.distance / 550, 15)
        state.distance += state.speed
        state.spawnTimer -= state.speed

        if (state.spawnTimer <= 0) {
          const height = 22 + Math.random() * 20
          const emoji =
            OBSTACLE_EMOJIS[Math.floor(Math.random() * OBSTACLE_EMOJIS.length)]
          state.obstacles.push({ x: width + 10, width: 20, height, emoji })
          // Gap must exceed how far a single jump covers at the current
          // speed, or a second obstacle can land mid-air and make a hit
          // unavoidable. Kept fairly tight so it stays a real reflex test
          // instead of a jog, while leaving a small reaction window.
          const jumpDistance =
            (state.speed * 2 * Math.abs(JUMP_VELOCITY)) / GRAVITY
          state.spawnTimer = jumpDistance * (1.15 + Math.random() * 0.35)
        }

        for (const obstacle of state.obstacles) {
          obstacle.x -= state.speed
        }
        state.obstacles = state.obstacles.filter(
          (obstacle) => obstacle.x + obstacle.width > 0,
        )

        const playerRect = {
          x: PLAYER_X,
          y: state.playerY,
          w: PLAYER_SIZE,
          h: PLAYER_SIZE,
        }
        for (const obstacle of state.obstacles) {
          const obstacleRect = {
            x: obstacle.x,
            y: GROUND_Y - obstacle.height,
            w: obstacle.width,
            h: obstacle.height,
          }
          const hit =
            playerRect.x < obstacleRect.x + obstacleRect.w - 4 &&
            playerRect.x + playerRect.w - 4 > obstacleRect.x &&
            playerRect.y < obstacleRect.y + obstacleRect.h - 2 &&
            playerRect.y + playerRect.h - 2 > obstacleRect.y
          if (hit) {
            state.status = 'over'
            setStatus('over')
            const finalScore = Math.floor(state.distance / 10)
            setScore(finalScore)
            const currentHigh = readHighScore()
            if (finalScore > currentHigh) {
              window.localStorage.setItem(HIGH_SCORE_KEY, String(finalScore))
              setHighScore(finalScore)
            }
          }
        }

        const liveScore = Math.floor(state.distance / 10)
        if (liveScore !== lastScoreShown) {
          lastScoreShown = liveScore
          setScore(liveScore)
        }
      }

      ctx!.textBaseline = 'bottom'
      ctx!.textAlign = 'center'

      ctx!.font = `${PLAYER_SIZE * 1.5}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`
      ctx!.globalAlpha = state.status === 'over' ? 0.5 : 1
      const playerCenterX = PLAYER_X + PLAYER_SIZE / 2
      const playerBottomY = state.playerY + PLAYER_SIZE
      ctx!.save()
      // The emoji glyph faces left by default; flip it so the dino faces
      // the direction it's running (right, toward incoming obstacles).
      ctx!.translate(playerCenterX, 0)
      ctx!.scale(-1, 1)
      ctx!.fillText(PLAYER_EMOJI, 0, playerBottomY)
      ctx!.restore()
      ctx!.globalAlpha = 1

      for (const obstacle of state.obstacles) {
        ctx!.font = `${obstacle.height * 1.6}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`
        ctx!.fillText(obstacle.emoji, obstacle.x + obstacle.width / 2, GROUND_Y)
      }

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', handleKeyDown)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <span className="terminal-dot bg-[#ff5f56]" />
        <span className="terminal-dot bg-[#ffbd2e]" />
        <span className="terminal-dot bg-[#27c93f]" />
        <span className="ml-auto font-code text-xs text-ink-3">dino.exe</span>
      </div>
      <div className="terminal-body">
        <div className="mb-3 flex items-center justify-between font-code text-xs text-ink-2">
          <span>
            score: <span className="text-indigo">{score}</span>
          </span>
          <span>
            best: <span className="text-mint">{highScore}</span>
          </span>
        </div>
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full cursor-pointer touch-none rounded-lg border border-white/10 bg-deep"
            style={{ height: CANVAS_HEIGHT }}
          />
          {status !== 'playing' ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-code text-sm text-ink-2">
              {status === 'ready'
                ? 'tap or press space to jump'
                : `game over. best: ${highScore}. tap to retry`}
            </div>
          ) : null}
        </div>
        <p className="mt-3 font-code text-xs text-ink-3">
          space / tap to jump. yes, this is the whole game.
        </p>
      </div>
    </div>
  )
}
