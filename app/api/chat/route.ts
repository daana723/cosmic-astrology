import { NextResponse } from "next/server"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
