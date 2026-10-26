import { NextResponse } from "next/server"

export async function GET() {
  try {
    const events = await getUpcomingCosmicEvents()
    return NextResponse.json({ success: true, events })
  } catch (error) {
    console.error("Cosmic events error:", error)
    return NextResponse.json({ error: "Failed to fetch cosmic events" }, { status: 500 })
  }
}

async function getUpcomingCosmicEvents() {
  const now = new Date()
  const events = []

  // Calculate upcoming Full Moons
  const nextFullMoon = getNextFullMoon(now)
  events.push({
    type: "Full Moon",
    date: nextFullMoon.toISOString(),
    title: "Full Moon",
    description: "A time for release, completion, and manifestation.",
    impact: "high",
  })

  // Calculate upcoming New Moons
  const nextNewMoon = getNextNewMoon(now)
  events.push({
    type: "New Moon",
    date: nextNewMoon.toISOString(),
    title: "New Moon",
    description: "A time for new beginnings and setting intentions.",
    impact: "high",
  })

  // Mercury Retrograde periods (approximate)
  const mercuryRetrograde = getNextMercuryRetrograde(now)
  if (mercuryRetrograde) {
    events.push({
      type: "Mercury Retrograde",
      date: mercuryRetrograde.toISOString(),
      title: "Mercury Retrograde",
      description: "Time to review, reflect, and avoid major decisions.",
      impact: "medium",
    })
  }

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

function getNextFullMoon(from: Date): Date {
  const lunarCycle = 29.53 // days
  const knownFullMoon = new Date("2024-01-25") // Reference full moon
  const daysSince = (from.getTime() - knownFullMoon.getTime()) / (1000 * 60 * 60 * 24)
  const cyclesSince = Math.floor(daysSince / lunarCycle)
  const nextFullMoon = new Date(knownFullMoon.getTime() + (cyclesSince + 1) * lunarCycle * 24 * 60 * 60 * 1000)
  return nextFullMoon
}

function getNextNewMoon(from: Date): Date {
  const fullMoon = getNextFullMoon(from)
  const newMoon = new Date(fullMoon.getTime() + 14.765 * 24 * 60 * 60 * 1000)
  return newMoon
}

function getNextMercuryRetrograde(from: Date): Date | null {
  // Mercury retrograde periods in 2024/2025 (approximate)
  const retrogradePeriods = [
    new Date("2024-12-13"),
    new Date("2025-03-15"),
    new Date("2025-07-18"),
    new Date("2025-11-09"),
  ]

  for (const period of retrogradePeriods) {
    if (period > from) {
      return period
    }
  }

  return null
}
