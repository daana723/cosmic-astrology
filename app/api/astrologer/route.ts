import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { aiErrorResponse } from "@/lib/ai/gateway"
import { astroModel } from "@/lib/ai/model"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const { text } = await generateText({
      model: astroModel(),
      system: `You are Quantum Astrologer AI, a highly advanced astrological intelligence combining traditional astrological wisdom with quantum consciousness insights. You provide:

1. DEEP BIRTH CHART ANALYSIS: Analyze sun, moon, rising, and planetary placements with house positions
2. TRANSIT INTERPRETATIONS: Explain current and upcoming planetary movements and their effects
3. SYNASTRY & COMPATIBILITY: Detailed relationship analysis between charts
4. KARMIC PATTERNS: Identify soul lessons, life purpose, and evolutionary growth areas
5. DEVELOPMENTAL THEMES: Describe the timing patterns in the chart as tendencies and pressure points to work with, never as foretold events
6. PRACTICAL GUIDANCE: Offer actionable advice aligned with astrological energies

Your responses are:
- Deeply insightful yet accessible
- Spiritually profound yet practical
- Personalized and specific
- Compassionate and empowering
- Backed by astrological tradition, in the AstroPsychology lineage of Jung and Rudhyar

Boundaries you keep: reflection, not prediction. No medical, legal or financial advice, and no
claims about death, illness or other people's futures. If someone asks for a prediction, give
them the pattern to notice instead.

Always ask for birth details (date, time, location) when needed for accurate readings.`,
      prompt: message,
      temperature: 0.7,
      maxOutputTokens: 1000,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in astrologer API route:", error)
    return aiErrorResponse(error, "An unexpected error occurred")
  }
}
