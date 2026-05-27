'use client'

import { useEffect, useRef, useState } from 'react'

const TILE_W = 52
const TILE_H = 28
const DX = 18
const DY = 10

const COLORS = ['#F472B6', '#60A5FA', '#FBBF24'] as const
type Color = (typeof COLORS)[number]

const STEP_MS  = 420   // ms per grid step — deliberately slow/cinematic
const GLIDE_MS = 350   // CSS transition for smooth head glide (< STEP_MS)
const MERGE_MS = 4000  // merged tile hold duration
const PAUSE_MS = 1000
const TRAIL    = 2

interface GridPt { r: number; c: number; x: number; y: number }
interface TravelerState { id: number; path: GridPt[]; step: number; color: Color }
interface MergedTile    { id: number; x: number; y: number; c1: Color; c2: Color }

let uid = 0

function buildGrid(cols: number, rows: number): GridPt[][] {
  return Array.from({ length: rows + 2 }, (_, r) =>
    Array.from({ length: cols + 2 }, (_, c) => ({
      r, c,
      x: 26 + c * TILE_W,
      y: 14 + r * TILE_H,
    }))
  )
}

// Cube SVG is right:0, width:55%, viewBox "0 0 540 500"
// Each entry: [vbX, vbY, vbW, vbH] in viewBox units, with drop-shadow clearance
const CUBE_DEFS: [number, number, number, number][] = [
  [300,  55, 130, 120],  // large cube
  [360, 220,  92,  86],
  [210, 320,  72,  66],
  [454, 140,  56,  52],
  [165, 175,  80,  72],
]

function computeBlocked(
  vpW: number, vpH: number,
  gridRows: number, gridCols: number
): Set<string> {
  const panelLeft = vpW * 0.45
  const panelW    = vpW * 0.55
  const scaleX    = panelW / 540
  // Hero section is roughly viewport-height minus nav (60px)
  const heroH     = vpH - 60
  const scaleY    = heroH / 500

  const blocked = new Set<string>()
  const PAD = 1  // extra grid tiles of clearance around each cube

  for (const [vx, vy, vw, vh] of CUBE_DEFS) {
    const px1 = panelLeft + vx * scaleX
    const px2 = panelLeft + (vx + vw) * scaleX
    const py1 = vy * scaleY
    const py2 = (vy + vh) * scaleY

    const c1 = Math.floor((px1 - 26) / TILE_W) - PAD
    const c2 = Math.ceil( (px2 - 26) / TILE_W) + PAD
    const r1 = Math.floor((py1 - 14) / TILE_H) - PAD
    const r2 = Math.ceil( (py2 - 14) / TILE_H) + PAD

    for (let r = Math.max(0, r1); r <= Math.min(gridRows - 1, r2); r++) {
      for (let c = Math.max(0, c1); c <= Math.min(gridCols - 1, c2); c++) {
        blocked.add(`${r},${c}`)
      }
    }
  }
  return blocked
}

function pickTwo(): [Color, Color] {
  const i = Math.floor(Math.random() * COLORS.length)
  let j  = Math.floor(Math.random() * (COLORS.length - 1))
  if (j >= i) j++
  return [COLORS[i], COLORS[j]]
}

/**
 * Wandering path from (sr,sc) to (er,ec).
 * Avoids blocked cells by routing around them (row bypass),
 * giving the visual effect of physically going around the cubes.
 */
function wanderPath(
  grid: GridPt[][],
  blocked: Set<string>,
  sr: number, sc: number,
  er: number, ec: number,
  budget: number
): GridPt[] {
  const maxR = grid.length - 1
  const maxC = grid[0].length - 1
  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
  const free  = (r: number, c: number) =>
    r >= 0 && r <= maxR && c >= 0 && c <= maxC && !blocked.has(`${r},${c}`)

  const path: GridPt[] = [grid[sr][sc]]
  let r = sr, c = sc

  for (let i = 0; i < budget; i++) {
    const remaining = budget - i
    const dr = er - r
    const dc = ec - c
    const dist = Math.abs(dr) + Math.abs(dc)

    if (dist === 0) { path.push(grid[er][ec]); continue }

    let nr = r, nc = c
    const mustDirect = dist >= remaining

    if (mustDirect) {
      if (Math.abs(dc) >= Math.abs(dr)) {
        nc = c + Math.sign(dc)
        if (dr !== 0 && remaining > 1) nr = r + Math.sign(dr)
      } else {
        nr = r + Math.sign(dr)
        if (dc !== 0) nc = c + Math.sign(dc)
      }
    } else {
      const slack = remaining - dist
      const roll  = Math.random()
      if (roll < 0.40) {
        // Direct progress on primary axis
        if (Math.abs(dc) >= Math.abs(dr)) {
          nc = c + Math.sign(dc)
          if (dr !== 0 && Math.random() < 0.45) nr = r + Math.sign(dr)
        } else {
          nr = r + Math.sign(dr)
          if (dc !== 0 && Math.random() < 0.45) nc = c + Math.sign(dc)
        }
      } else if (roll < 0.58) {
        // Row wander — lateral drift with slight col nudge
        nr = r + (Math.random() < 0.5 ? 1 : -1)
        if (dc !== 0 && Math.random() < 0.30) nc = c + Math.sign(dc)
      } else if (roll < 0.74) {
        // Diagonal drift: col progress + row wobble
        if (dc !== 0) nc = c + Math.sign(dc)
        nr = r + (Math.random() < 0.5 ? 1 : -1)
      } else if (slack > 3 && roll < 0.87) {
        // Brief col backtrack (indecision) + row progress
        if (dc !== 0) nc = c - Math.sign(dc)
        nr = r + (dr !== 0 ? Math.sign(dr) : (Math.random() < 0.5 ? 1 : -1))
      } else {
        nr = r + (Math.random() < 0.5 ? 1 : -1)
      }
    }

    nr = clamp(nr, 0, maxR)
    nc = clamp(nc, 0, maxC)

    // If the computed step hits a blocked cell, route around it (row bypass first,
    // so travelers visually arc around the physical cube shapes)
    if (!free(nr, nc)) {
      const bypasses = [
        { r: r + 1, c: nc }, { r: r - 1, c: nc },
        { r: r + 2, c: nc }, { r: r - 2, c: nc },
        { r: nr,   c: c   },  // stay column, move row only
        { r: nr,   c: nc + Math.sign(dc || 1) },
      ]
      const alt = bypasses.find(a => free(a.r, a.c))
      if (alt) { nr = alt.r; nc = alt.c }
      // Fallback: proceed anyway (diamond passes behind cube — acceptable)
    }

    r = nr; c = nc
    path.push(grid[r][c])
  }

  path.push(grid[er][ec])
  return path
}

export default function HeroPingOverlay() {
  const [grid,      setGrid]      = useState<GridPt[][]>([])
  const [blocked,   setBlocked]   = useState<Set<string>>(new Set())
  const [travelers, setTravelers] = useState<TravelerState[]>([])
  const [merged,    setMerged]    = useState<MergedTile | null>(null)

  const alive  = useRef(true)
  const stepIv = useRef<ReturnType<typeof setInterval> | null>(null)
  const schedT = useRef<ReturnType<typeof setTimeout>  | null>(null)

  useEffect(() => {
    const cols = Math.ceil(window.innerWidth  / TILE_W) + 1
    const rows = Math.ceil((window.innerHeight - 60) / TILE_H) + 1
    setGrid(buildGrid(cols, rows))
    setBlocked(computeBlocked(window.innerWidth, window.innerHeight, rows + 2, cols + 2))
  }, [])

  useEffect(() => {
    if (!grid.length || !grid[0].length) return
    alive.current = true

    const later = (fn: () => void, ms: number) => {
      schedT.current = setTimeout(fn, ms)
    }

    const spawnEvent = () => {
      if (!alive.current) return
      const rows = grid.length
      const cols = grid[0].length

      // Stay in right portion; cubes bleed into this zone but blocked cells handle avoidance
      const lo = Math.floor(cols * 0.50)
      const hi = Math.floor(cols * 0.90)
      if (lo + 10 > hi) return

      // Pick a free meeting point
      let meetR = 0, meetC = 0
      for (let a = 0; a < 40; a++) {
        meetR = Math.floor(rows * 0.12 + Math.random() * rows * 0.62)
        meetC = lo + 3 + Math.floor(Math.random() * (hi - lo - 5))
        if (!blocked.has(`${meetR},${meetC}`)) break
      }
      if (blocked.has(`${meetR},${meetC}`)) return

      const spread = 4 + Math.floor(Math.random() * 3)
      const budget = spread + 5 + Math.floor(Math.random() * 5)

      const clampR = (v: number) => Math.max(0, Math.min(rows - 1, v))
      const startRA = clampR(meetR + Math.round((Math.random() - 0.5) * 5))
      const startRB = clampR(meetR + Math.round((Math.random() - 0.5) * 5))
      const startCA = Math.max(0,        meetC - spread)
      const startCB = Math.min(cols - 1, meetC + spread)

      const [c1, c2] = pickTwo()
      const pathA = wanderPath(grid, blocked, startRA, startCA, meetR, meetC, budget)
      const pathB = wanderPath(grid, blocked, startRB, startCB, meetR, meetC, budget)

      const idA = uid++; const idB = uid++
      setTravelers([
        { id: idA, path: pathA, step: 0, color: c1 },
        { id: idB, path: pathB, step: 0, color: c2 },
      ])

      let step = 0
      const maxStep = Math.max(pathA.length, pathB.length) - 1

      stepIv.current = setInterval(() => {
        if (!alive.current) { clearInterval(stepIv.current!); return }
        step++

        if (step >= maxStep) {
          clearInterval(stepIv.current!); stepIv.current = null
          setTravelers([])

          const mt = grid[meetR][meetC]
          const mid = uid++
          setMerged({ id: mid, x: mt.x, y: mt.y, c1, c2 })

          later(() => {
            if (!alive.current) return
            setMerged(null)
            later(spawnEvent, PAUSE_MS)
          }, MERGE_MS)
        } else {
          setTravelers([
            { id: idA, path: pathA, step: Math.min(step, pathA.length - 1), color: c1 },
            { id: idB, path: pathB, step: Math.min(step, pathB.length - 1), color: c2 },
          ])
        }
      }, STEP_MS)
    }

    later(spawnEvent, 800)

    return () => {
      alive.current = false
      if (stepIv.current) clearInterval(stepIv.current)
      if (schedT.current)  clearTimeout(schedT.current)
    }
  }, [grid, blocked])

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 0,
      }}
    >
      {travelers.map(t => {
        const headPt = t.path[t.step]
        return (
          <g key={`t-${t.id}`}>
            {/* Trail footprints — fixed positions, fade in on spawn, fade out on age */}
            {Array.from({ length: TRAIL }, (_, i) => {
              const pi  = t.step - (TRAIL - i)  // i=0 → older (age TRAIL), i=1 → newer (age 1)
              if (pi < 0) return null
              const age = t.step - pi
              const pt  = t.path[pi]
              return (
                <g key={`trail-${t.id}-${pi}`} transform={`translate(${pt.x},${pt.y})`}>
                  <polygon
                    points={`0,${-DY} ${DX},0 0,${DY} ${-DX},0`}
                    fill={t.color}
                    style={{
                      opacity: age === 1 ? 0.34 : 0.12,
                      transition: 'opacity 220ms ease',
                      // Fade-in when tile first becomes a trail (age === 1)
                      animation: age === 1 ? 'trailBirth 260ms ease-out' : 'none',
                    }}
                  />
                </g>
              )
            })}

            {/* Head — CSS transform transition makes it glide between tiles */}
            <g
              style={{
                transform: `translate(${headPt.x}px,${headPt.y}px)`,
                transition: `transform ${GLIDE_MS}ms cubic-bezier(0.4,0,0.6,1)`,
                willChange: 'transform',
              }}
            >
              <polygon
                points={`0,${-DY} ${DX},0 0,${DY} ${-DX},0`}
                fill={t.color}
                stroke={t.color}
                strokeWidth={0.9}
                style={{
                  opacity: 0.85,
                  // Fires once on mount (traveler spawn), not on each step
                  animation: 'headSpawn 240ms ease-out',
                }}
              />
            </g>
          </g>
        )
      })}

      {/* Merged — bursts in, holds for 4 s, fades out */}
      {merged && (
        <g key={merged.id} transform={`translate(${merged.x},${merged.y})`}>
          <polygon
            points={`0,${-DY * 1.8} ${DX * 1.8},0 0,${DY * 1.8} ${-DX * 1.8},0`}
            fill={merged.c1}
            style={{ animation: `mergedOuter ${MERGE_MS}ms ease-in-out forwards` }}
          />
          <polygon
            points={`0,${-DY} ${DX},0 0,${DY} ${-DX},0`}
            fill={merged.c2}
            style={{ animation: `mergedInner ${MERGE_MS}ms ease-in-out forwards` }}
          />
        </g>
      )}

      <style>{`
        /* Head: pop-in on traveler spawn (fires once per traveler lifetime) */
        @keyframes headSpawn {
          0%   { opacity: 0;    transform: scale(0.35); }
          55%  { opacity: 1.00; transform: scale(1.12); }
          100% { opacity: 0.85; transform: scale(1.00); }
        }

        /* Trail tile: fades in as head departs that position */
        @keyframes trailBirth {
          0%   { opacity: 0.72; }
          100% { opacity: 0.34; }
        }

        /* Merged outer halo: burst → hold → fade */
        @keyframes mergedOuter {
          0%   { opacity: 0;    transform: scale(0.30); }
          7%   { opacity: 1.00; transform: scale(1.80); }
          16%  { opacity: 0.88; transform: scale(1.40); }
          72%  { opacity: 0.80; transform: scale(1.35); }
          90%  { opacity: 0.28; transform: scale(1.25); }
          100% { opacity: 0;    transform: scale(1.15); }
        }

        /* Merged inner core: appears slightly later, holds longer */
        @keyframes mergedInner {
          0%   { opacity: 0;    transform: scale(0.20); }
          10%  { opacity: 1.00; transform: scale(1.25); }
          22%  { opacity: 0.92; transform: scale(1.00); }
          72%  { opacity: 0.88; transform: scale(1.00); }
          90%  { opacity: 0.35; transform: scale(0.95); }
          100% { opacity: 0;    transform: scale(0.85); }
        }
      `}</style>
    </svg>
  )
}
