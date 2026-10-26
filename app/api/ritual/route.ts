import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { intention, userData, moonPhase } = await request.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: `You are a spiritual guide who creates short, actionable rituals. Keep rituals concise with exactly 3-4 simple steps and one powerful affirmation. Do not use markdown formatting, bold text, asterisks, or headings. Write in plain text only.`,
      prompt: `Create a brief personalized ritual for:\n- Intention: ${intention}\n- Zodiac: ${userData.sign}\n- Moon Sign: ${userData.moonSign}\n- Current Moon Phase: ${moonPhase}\n\nFormat: Write in plain text without any markdown. Include: 3-4 simple steps (numbered), and 1 affirmation at the end. Keep each step to 1-2 sentences maximum.`,
      temperature: 0.8,
      maxTokens: 500,
    })

    return NextResponse.json({ ritual: text })
  } catch (error) {
    console.error("Ritual API Error:", error)
    return NextResponse.json({ error: "Failed to create ritual" }, { status: 500 })
  }
}
