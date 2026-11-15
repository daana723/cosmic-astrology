"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { buildReading, type Reading } from "@/lib/astro/reading"
import { buildSections, type ReadingSection } from "@/lib/astro/fullReading"
import type { Chart } from "@/lib/astro/ephemeris"

/**
 * Cosmic Clarity — the full AstroPsychology reading (£5), live inside the app.
 * Chart maths runs on the server via /api/ephemeris (astronomy-engine).
 * The Sun and the computed chart are free; the written reading sits behind the paywall.
 */
const CHECKOUT_URL = "https://buy.stripe.com/eVqcMYbxweOKeIS3nE7N602" // TODO: repoint to the £5 one-time product
const PAID_KEY = "cc-paid"

interface GeoHit {
  latitude: number
  longitude: number
  timezone?: string
  name: string
}

/** Town name → coordinates + IANA timezone. Open-Meteo does not parse "City, Country", so the bare town is tried first. */
async function geocode(place: string): Promise<GeoHit | null> {
  const candidates = [
    place.split(",")[0].trim(),
    place,
    place.split(/[\s,]+/)[0],
  ].filter(Boolean)
  for (const q of candidates) {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?count=1&name=${encodeURIComponent(q)}`,
      )
      const json = await res.json()
      const hit = json?.results?.[0]
      if (hit && Number.isFinite(hit.latitude)) {
        return {
          latitude: hit.latitude,
          longitude: hit.longitude,
          timezone: hit.timezone,
          name: hit.name,
        }
      }
    } catch {
      /* try the next candidate */
    }
  }
  return null
}

/**
 * Wall-clock time at the birth place → UTC instant, using the place's IANA
 * timezone. Iterating twice converges across DST boundaries.
 */
function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
  const [y, m, d] = date.split("-").map(Number)
  const [hh, mm] = (time || "12:00").split(":").map(Number)
  const wall = Date.UTC(y, (m ?? 1) - 1, d ?? 1, hh ?? 12, mm ?? 0)

  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const shownUtc = (instant: number) => {
    const p = Object.fromEntries(
      fmt.formatToParts(new Date(instant)).map((part) => [part.type, Number(part.value)]),
    )
    return Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute)
  }

  // Start from the guess "wall clock is UTC", then correct by the observed offset twice.
  let utc = wall
  utc = wall - (shownUtc(utc) - utc)
  utc = wall - (shownUtc(utc) - utc)
  return new Date(utc)
}

export default function ReadingPage() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [place, setPlace] = useState("")
  const [chart, setChart] = useState<Chart | null>(null)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    setPaid(localStorage.getItem(PAID_KEY) === "1")
  }, [])

  const reading: Reading | null = useMemo(() => {
    if (!chart) return null
    return buildReading({
      sun: chart.sun.sign,
      moon: chart.moon.sign,
      rising: chart.ascendant.sign,
      moonPhaseName: chart.moonPhase.name,
    })
  }, [chart])

  const sections: ReadingSection[] = useMemo(() => (chart ? buildSections(chart) : []), [chart])

  async function compute() {
    setError("")
    if (!date) {
      setError("A birth date is needed — the Sun sign comes from it.")
      return
    }
    setBusy(true)
    try {
      const geo = place ? await geocode(place) : null
      if (place && !geo) {
        setError("Could not find that place. Try just the town name, e.g. “Manchester”.")
        return
      }
      const tz = geo?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone
      const timeInput = time || "12:00"
      const instant = zonedTimeToUtc(date, timeInput, tz)

      const res = await fetch("/api/ephemeris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: instant.toISOString(),
          latitude: geo?.latitude ?? 51.5,
          longitude: geo?.longitude ?? 0,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || "The chart could not be computed.")
        return
      }
      setChart(json.data)
    } catch {
      setError("Something went wrong computing the chart. Try again.")
    } finally {
      setBusy(false)
    }
  }

  function unlock() {
    localStorage.setItem(PAID_KEY, "1")
    setPaid(true)
  }

  const deg = (p: { degree: number; sign: string }) => `${p.sign} ${p.degree.toFixed(0)}°`

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200/80">Cosmic Clarity</p>
          <h1 className="text-3xl font-light text-amber-100">Your sky, computed — not conjured.</h1>
          <p className="text-sm leading-relaxed text-slate-300">
            A real astronomy engine places your Sun, Moon and Rising for the moment and place of
            your birth. The reading written from it is plain and specific: no vague compliments, no
            fear, no mysticism. Your Sun is free. The full three-part reading is £5.
          </p>
        </header>

        <Card className="border-white/10 bg-white/5">
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Birth date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Birth time</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="place">Birth place</Label>
              <Input
                id="place"
                value={place}
                placeholder="e.g. Manchester, UK"
                onChange={(e) => setPlace(e.target.value)}
              />
              <p className="text-xs text-slate-400">
                Used for coordinates and time zone — the Rising sign needs both. Nothing is stored on
                a server.
              </p>
            </div>
            {error && <p className="text-sm text-rose-300">{error}</p>}
            <Button onClick={compute} disabled={busy} className="w-full bg-amber-300 text-slate-900 hover:bg-amber-200">
              {busy ? "Computing…" : "Compute my chart"}
            </Button>
          </CardContent>
        </Card>

        {chart && reading && (
          <>
            <Card className="border-amber-200/30 bg-white/5">
              <CardContent className="space-y-2 pt-6">
                <p className="text-xs uppercase tracking-widest text-slate-400">Your Sun — free to read</p>
                <p className="text-xl text-amber-100">{deg(chart.sun)}</p>
                <p className="text-sm leading-relaxed text-slate-200">{reading.sun.text}</p>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <p className="text-xs uppercase tracking-widest text-slate-400">
                    The sky you were born under
                  </p>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-sm">
                    {chart.points.map((p) => (
                      <div key={p.key} className="contents">
                        <span className="py-0.5 text-slate-300">{p.label}</span>
                        <span className="py-0.5 text-amber-100">{deg(p)}</span>
                        <span className="py-0.5 text-slate-400">
                          {p.key === "ascendant" || p.key === "midheaven" ? "—" : `H${p.house}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400">
                    Whole-sign houses, counted from the Rising. Birth time read in the time zone of the
                    place you named, not your browser's.
                  </p>
                </div>
              </CardContent>
            </Card>

            {paid ? (
              <Card className="border-white/10 bg-white/5">
                <CardContent className="space-y-6 pt-6">
                  {sections.map((s) => (
                    <div key={s.title} className="space-y-2">
                      <p className="text-base text-amber-100">{s.title}</p>
                      {s.meta && (
                        <p className="text-xs uppercase tracking-widest text-slate-400">{s.meta}</p>
                      )}
                      {s.paragraphs.map((paragraph, i) => (
                        <p key={i} className="text-sm leading-relaxed text-slate-200">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                  <p className="border-t border-white/10 pt-4 text-xs text-slate-400">
                    Cosmic Clarity computes real planetary positions and interprets them through a
                    hand-written AstroPsychology framework — reflection, not prediction, and not medical,
                    financial or legal advice.
                  </p>
                </CardContent>
              </Card>
            ) : (
              /**
               * Locked state renders skeleton bars instead of the paid prose, so it cannot be read with
               * Ctrl+A, a screen reader, or view-source. Honest scope note: this is a trust gate, not
               * real access control — the templates ship in the client bundle and the unlock flag is
               * localStorage. The upgrade that makes it real is a Stripe webhook that marks an order
               * paid, plus a server route that returns the Moon/Rising/synthesis text only for paid
               * orders. Fine for £5 while that is pending; do not describe it as secure.
               */
              <Card className="border-white/10 bg-white/5">
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Your Moon</p>
                    {[168, 224, 128].map((w, i) => (
                      <div key={i} className="h-3 rounded bg-white/10" style={{ width: w }} />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Your Rising</p>
                    {[204, 156, 196].map((w, i) => (
                      <div key={i} className="h-3 rounded bg-white/10" style={{ width: w }} />
                    ))}
                  </div>
                  <div className="space-y-2 border-t border-white/10 pt-4">
                    <p className="text-xs uppercase tracking-widest text-slate-400">How they fit</p>
                    {[240, 180].map((w, i) => (
                      <div key={i} className="h-3 rounded bg-white/10" style={{ width: w }} />
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-3 pt-2 text-center">
                    <p className="text-lg text-amber-100">The full reading is £5</p>
                    <p className="max-w-sm text-sm text-slate-300">
                      The Moon, the Rising and midheaven axis, every planet in its house, the aspects between
                      nine chart points, your lunar phase, the element and modality balance and an integration
                      practice — 1,400 to 1,800 words.
                    </p>
                    <a href={CHECKOUT_URL} target="_blank" rel="noreferrer noopener">
                      <Button className="bg-amber-300 text-slate-900 hover:bg-amber-200">Unlock — £5</Button>
                    </a>
                    <button
                      className="text-xs text-slate-400 underline underline-offset-4"
                      onClick={unlock}
                    >
                      I just paid — show my reading
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <footer className="pt-4 text-xs leading-relaxed text-slate-500">
          Reflection, not prediction — this is not medical, legal or financial advice. Chart positions
          are real ephemeris mathematics (astronomy-engine); the wording is hand-written text selected
          by sign and element, with AI assistance in composition. contact@indigos.uk
        </footer>
      </div>
    </main>
  )
}
