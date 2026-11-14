import { NextResponse } from "next/server"
import { computeChart, type Chart } from "@/lib/astro/ephemeris"

/**
 * Real ephemeris. Previously this file approximated planetary longitudes from
 * mean orbital periods, which put Mercury in the wrong sign for months at a
 * time; it now delegates to lib/astro/ephemeris (astronomy-engine).
 *
 * POST { date: ISO string, latitude: number, longitude: number }
 *   -> { success: true, data: Chart }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const date = new Date(body?.date)
    const latitude = Number(body?.latitude)
    const longitude = Number(body?.longitude)

    if (Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: "Invalid or missing date" }, { status: 400 })
    }
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return NextResponse.json(
        { error: "latitude and longitude are required (needed for the ascendant)" },
        { status: 400 },
      )
    }
    if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
      return NextResponse.json({ error: "latitude/longitude out of range" }, { status: 400 })
    }

    const data: Chart = computeChart({ time: date, latitude, longitude })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Ephemeris calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate planetary positions" }, { status: 500 })
  }
}
