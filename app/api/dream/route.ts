import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { dream, userData } = await request.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: `You are a mystical dream interpreter with deep knowledge of symbolism, psychology, and astrology. Analyze dreams in the context of the user's astrological profile: ${userData.sign} sun sign, ${userData.moonSign} moon sign, ${userData.risingSign} rising sign. Provide insights that connect dream symbols to their cosmic energy and life journey.`,
      prompt: `I had this dream: ${dream}\n\nPlease interpret it considering my astrological profile and what it might be telling me about my current life path.`,
      temperature: 0.8,
      maxTokens: 1500,
    })

    return NextResponse.json({ interpretation: text })
  } catch (error) {
    console.error("Dream API Error:", error)
    return NextResponse.json({ error: "Failed to interpret dream" }, { status: 500 })
  }
}
