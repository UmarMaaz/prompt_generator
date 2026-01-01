import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { streamText } from "ai"
import { SYSTEM_PROMPT, buildGenerationPrompt, type PromptOptions } from "@/lib/ai/prompts"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
})

export async function POST(req: Request) {
  try {
    console.log("Received request to /api/generate")
    const { prompt, options }: { prompt: string; options: PromptOptions } = await req.json()
    console.log("Request body:", { prompt, options })

    if (!prompt) {
      console.error("Prompt is required")
      return new Response("Prompt is required", { status: 400 })
    }

    // The Gateway automatically handles authentication and quota for supported models.
    const result = streamText({
      model: google("models/gemini-2.5-flash-lite"),
      system: SYSTEM_PROMPT,
      prompt: buildGenerationPrompt(prompt, options),
    })

    console.log("streamText result:", result)

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Generation error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
