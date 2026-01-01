"use client"

import * as React from "react"
import { Check, Copy, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PromptOutput({ result, onRegenerate }: { result: string; onRegenerate: () => void }) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!result) return null

  return (
    <Card className="relative overflow-hidden border-brand/20 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="grid gap-1">
          <CardTitle className="text-xl">Generated Prompt</CardTitle>
          <CardDescription>Professional, structured output ready for use.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
            {result.length} characters
          </Badge>
          <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-8 w-8 bg-transparent">
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 relative mt-4 max-h-[600px] overflow-auto rounded-lg border p-4 font-mono text-sm">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      </CardContent>
      <div className="flex items-center justify-end gap-2 p-6 pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          className="text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className="mr-2 h-3 w-3" />
          Regenerate
        </Button>
      </div>
    </Card>
  )
}
