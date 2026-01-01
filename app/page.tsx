"use client"

import * as React from "react"
import { PromptForm } from "@/components/prompt-form"
import { PromptOutput } from "@/components/prompt-output"

function formatResponse(text: string) {
  return text
    .split("\n")
    .map((line) => line.replace(/^#+\s*/, "").trim())
    .join("\n")
}

export default function Home() {
  const [result, setResult] = React.useState<string | null>(null)
  const [key, setKey] = React.useState(0) // Used to reset the form/scroll

  const handleResult = (val: string) => {
    setResult(formatResponse(val))
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Prompt Generator</h2>
        <p className="text-muted-foreground text-lg">
          Transform your vague ideas into expert-level, structured prompts for any AI generator.
        </p>
      </div>

      <div className="grid gap-8">
        <PromptForm key={key} onResult={handleResult} />
        {result && <PromptOutput result={result} onRegenerate={() => setKey((k) => k + 1)} />}
      </div>
    </div>
  )
}
