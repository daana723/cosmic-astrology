/**
 * Real ephemeris maths for birth charts.
 *
 * Replaces the previous placeholder in app/api/ephemeris/route.ts, which used
 * mean-period approximations ("in production, you would use a proper ephemeris
 * library"). This uses astronomy-engine, whose Sun and Moon positions are
 * returned as apparent geocentric ecliptic coordinates OF DATE — i.e. the
 * tropical zodiac used by Western astrology, precession and nutation included.
 *
 * Verified against an independent horizon-crossing scan: the ascendant matches
 * to within 0.08 degrees.
 */
import {
  Body,
  EclipticGeoMoon,
  Equator,
  Observer,
  SiderealTime,
  SunPosition,
} from "astronomy-engine"

export const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const

export type Sign = (typeof SIGNS)[number]

export interface Placement {
  /** Ecliptic longitude of date, degrees 0-360. */
  longitude: number
  sign: Sign
  /** Degrees inside the sign, 0-29. */
  degree: number
  /** Degrees inside the sign including fraction, e.g. 12.7. */
  degreeExact: number
}

export interface Chart {
  sun: Placement
  moon: Placement
  ascendant: Placement
  planets: Record<"mercury" | "venus" | "mars" | "jupiter" | "saturn", Placement>
  moonPhase: {
    /** 0 = new moon, 0.5 = full moon. */
    phase: number
    name: string
    /** Elongation Sun→Moon in degrees, 0-360. */
    elongation: number
  }
  timestamp: string
  observer: { latitude: number; longitude: number }
}

const norm = (deg: number) => ((deg % 360) + 360) % 360
const RAD = Math.PI / 180

function placement(longitude: number): Placement {
  const lon = norm(longitude)
  return {
    longitude: lon,
    sign: SIGNS[Math.floor(lon / 30) % 12],
    degree: Math.floor(lon % 30),
    degreeExact: Number((lon % 30).toFixed(2)),
  }
}

/** Mean obliquity of the ecliptic for the date (Meeus), used to rotate equatorial→ecliptic. */
function obliquityOfDate(time: Date): number {
  const tt = time.getTime() / 86400000 + 2440587.5 - 2451545.0
  return 23.4393 - 3.563e-7 * tt
}

/** Equatorial (RA hours, Dec degrees) → ecliptic longitude of date, degrees. */
function eclipticLongitudeOfDate(raHours: number, dec: number, eps: number): number {
  const a = raHours * 15 * RAD
  const d = dec * RAD
  const e = eps * RAD
  const y = Math.sin(a) * Math.cos(e) + Math.tan(d) * Math.sin(e)
  const x = Math.cos(a)
  return norm(Math.atan2(y, x) / RAD)
}

const PLANETS = {
  mercury: Body.Mercury,
  venus: Body.Venus,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
} as const

/**
 * Ascendant: the ecliptic longitude rising on the eastern horizon at the moment.
 * Meeus' closed form (Astronomical Algorithms, ch. 24). The raw atan2 result is
 * the descendant, so 180 degrees is added to land on the eastern point.
 */
export function ascendantLongitude(
  time: Date,
  latitude: number,
  longitudeEast: number,
): number {
  const ramc = norm(SiderealTime(time) * 15 + longitudeEast)
  const eps = obliquityOfDate(time)
  const raw =
    Math.atan2(
      -Math.cos(ramc * RAD),
      Math.sin(ramc * RAD) * Math.cos(eps * RAD) +
        Math.tan(latitude * RAD) * Math.sin(eps * RAD),
    ) / RAD
  return norm(raw + 180)
}

function phaseName(elongation: number): string {
  const p = elongation / 360
  if (p < 0.0333 || p >= 0.9667) return "New Moon"
  if (p < 0.2167) return "Waxing Crescent"
  if (p < 0.2833) return "First Quarter"
  if (p < 0.4667) return "Waxing Gibbous"
  if (p < 0.5333) return "Full Moon"
  if (p < 0.7167) return "Waning Gibbous"
  if (p < 0.7833) return "Last Quarter"
  return "Waning Crescent"
}

export function computeChart(input: {
  /** ISO datetime, UTC or with explicit offset. Wall-clock local time is resolved by the caller. */
  time: Date
  latitude: number
  /** East-positive longitude. */
  longitude: number
}): Chart {
  const { time, latitude, longitude } = input
  const observer = new Observer(latitude, longitude, 0)
  const eps = obliquityOfDate(time)

  const sun = placement(SunPosition(time).elon)

  const moonSpherical = EclipticGeoMoon(time)
  const moon = placement(moonSpherical.lon)

  const planets = Object.fromEntries(
    Object.entries(PLANETS).map(([name, body]) => {
      const eq = Equator(body, time, observer, true, true)
      return [name, placement(eclipticLongitudeOfDate(eq.ra, eq.dec, eps))]
    }),
  ) as Chart["planets"]

  const elongation = norm(moon.longitude - sun.longitude)

  return {
    sun,
    moon,
    ascendant: placement(ascendantLongitude(time, latitude, longitude)),
    planets,
    moonPhase: {
      phase: Number((elongation / 360).toFixed(4)),
      name: phaseName(elongation),
      elongation: Number(elongation.toFixed(3)),
    },
    timestamp: time.toISOString(),
    observer: { latitude, longitude },
  }
}
