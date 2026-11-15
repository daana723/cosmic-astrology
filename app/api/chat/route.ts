import { NextResponse } from "next/server"
import { generateText } from "ai"
import { aiErrorResponse } from "@/lib/ai/gateway"
import { astroModel } from "@/lib/ai/model"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const { text } = await generateText({
      model: astroModel(),
      messages: messages,
      temperature: 0.7,
      maxOutputTokens: 1000,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat API Error:", error)
    return aiErrorResponse(error, "Failed to process chat request")
  }
}
