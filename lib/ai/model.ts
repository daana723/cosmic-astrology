import { createOpenAICompatible } from "@ai-sdk/openai-compatible"

/**
 * Which model answers the AI features.
 *
 * The v0 original hard-coded the string id "openai/gpt-4o-mini", which only
 * resolves through the Vercel AI Gateway and only ever worked on v0's internal
 * credits. The inference that actually belongs to this product is the Gemma 31B
 * fine-tune hosted on Adaption Labs, and Adaption speaks the OpenAI
 * chat-completions protocol — so it is wired directly here. No gateway, no
 * third-party metered account, and the existing Adaption allowance carries it
 * until there is revenue to justify more.
 *
 * Deliberately pointed at the plain model id and NOT at `stack:gemma-4-31b-it-1`,
 * even though the stack answers on the same key: an Adaption *stack* is an agent
 * bundle that carries its own system instructions and MCP tools (a probe of
 * /api/v1/responses with the stack came back with an `mcp_list_tools` item
 * listing a GitHub tool set). That is fine for a desktop app where the owner
 * types the input; it is not what you want behind a public web form where a
 * stranger types the input. Verified instead: `gemma-4-31b-it` on
 * /api/v1/chat/completions returns clean astrological prose.
 *
 * If ADAPTION_API_KEY is absent we fall back to the gateway string id, which
 * lib/ai/gateway.ts turns into an explicit 503 rather than an opaque 500.
 */
export const ASTRO_MODEL_ID = process.env.ASTRO_MODEL ?? "gemma-4-31b-it"

const ADAPTION_BASE_URL = process.env.ADAPTION_BASE_URL ?? "https://api.prod.adaptionlabs.ai/api/v1"

// The key is read when a model is resolved, not when this module is imported, so
// a build machine without the key still compiles. Note this version of
// openai-compatible takes `apiKey` as a plain string only: passing a function
// there ends up sent literally as `Authorization: Bearer () => ...`, which the
// provider rejects as a bad key. Build the provider per call instead.
function adaptionProvider() {
  return createOpenAICompatible({
    name: "adaption",
    baseURL: ADAPTION_BASE_URL,
    apiKey: process.env.ADAPTION_API_KEY ?? "",
  })
}

export function astroModel(): string | ReturnType<ReturnType<typeof adaptionProvider>["chatModel"]> {
  // `chatModel`, not `chat`, and version-matched: @ai-sdk/openai-compatible@3
  // emits spec-v4 models that ai@6 refuses, and Next's build skips type
  // validation — so only a runtime call catches either mistake.
  return process.env.ADAPTION_API_KEY ? adaptionProvider().chatModel(ASTRO_MODEL_ID) : "openai/gpt-4o-mini"
}

export function astroProviderName(): string {
  return process.env.ADAPTION_API_KEY ? `Adaption Labs (${ASTRO_MODEL_ID})` : "Vercel AI Gateway"
}
