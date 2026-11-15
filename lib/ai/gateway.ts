import { NextResponse } from "next/server"

/**
 * Fallback path only. When ADAPTION_API_KEY is set the AI routes use this app's own
 * model (lib/ai/model.ts) and never reach this file. When it is not set they use the
 * string id "openai/gpt-4o-mini", which the `ai` package resolves through the Vercel
 * AI Gateway (@ai-sdk/gateway ships as a dependency of ai@6) and which needs a
 * credential: an AI_GATEWAY_API_KEY, or AI Gateway enabled for the Vercel project.
 *
 * These routes were generated against v0's own internal gateway credits, so on
 * this deployment every AI feature fails — and it failed as an opaque 500,
 * which is why it read as "broken" rather than "not configured". This turns
 * that specific case into a 503 that names the missing variable, and leaves
 * genuine runtime errors as 500s.
 */
const UNCONFIGURED =
  /api[ _-]?key|credential|authentication|unauthorized|forbidden|missing|no.*gateway/i

export function aiErrorResponse(error: unknown, fallback: string): NextResponse {
  const message = error instanceof Error ? error.message : String(error)
  const unconfigured = !process.env.AI_GATEWAY_API_KEY && UNCONFIGURED.test(message)
  return NextResponse.json(
    unconfigured
      ? {
          error: "AI provider not configured",
          hint: "The AI features are meant to run on this app's own model. Set ADAPTION_API_KEY (Adaption Labs, see lib/ai/model.ts) — or, if you would rather bill it through Vercel, enable AI Gateway for the project and set AI_GATEWAY_API_KEY.",
          detail: message,
        }
      : { error: fallback },
    { status: unconfigured ? 503 : 500 },
  )
}
