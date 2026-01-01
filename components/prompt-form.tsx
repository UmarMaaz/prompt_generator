"use client"

import * as React from "react"
import { useCompletion } from "@ai-sdk/react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { PromptOptions } from "@/lib/ai/prompts"
import { useToast } from "@/hooks/use-toast"

export function PromptForm({ onResult }: { onResult: (result: string) => void }) {
  const [input, setInput] = React.useState("")
  const [options, setOptions] = React.useState<PromptOptions>({
    depth: "detailed",
    type: "Website / Web App",
    tone: "Professional",
    targetUser: "Developers",
    techStack: "Next.js",
    designFocus: ["UI / UX", "Performance"],
  })

  const { toast } = useToast()

  const { complete, completion, isLoading } = useCompletion({
    api: "/api/generate",
    body: { options },
    onFinish: (prompt, result) => {
      console.log("onFinish called with result:", result)
      onResult(result)
    },
    onError: (err) => {
      console.error("onError called with error:", err)
      toast({
        variant: "destructive",
        title: "Error generating prompt",
        description: err.message,
      })
    },
  })

  React.useEffect(() => {
    if (completion) {
      console.log("completion state updated:", completion)
      onResult(completion)
    }
  }, [completion, onResult])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    complete(input)
  }

  const toggleDesignFocus = (focus: string) => {
    setOptions((prev) => ({
      ...prev,
      designFocus: prev.designFocus.includes(focus)
        ? prev.designFocus.filter((f) => f !== focus)
        : [...prev.designFocus, focus],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create a Prompt</CardTitle>
          <CardDescription>
            Describe your idea in simple words. The AI will expand it into a detailed prompt.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="input">Your Idea</Label>
            <Textarea
              id="input"
              placeholder="e.g., Create a modern landing page for a coffee shop..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Depth</Label>
              <Select value={options.depth} onValueChange={(v: any) => setOptions((o) => ({ ...o, depth: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="ultra">Ultra-Detailed (Expert)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Project Type</Label>
              <Select value={options.type} onValueChange={(v) => setOptions((o) => ({ ...o, type: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website / Web App">Website / Web App</SelectItem>
                  <SelectItem value="Mobile App">Mobile App</SelectItem>
                  <SelectItem value="Dashboard">Dashboard</SelectItem>
                  <SelectItem value="Landing Page">Landing Page</SelectItem>
                  <SelectItem value="SaaS Product">SaaS Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Tone</Label>
              <Select value={options.tone} onValueChange={(v) => setOptions((o) => ({ ...o, tone: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Target User</Label>
              <Select value={options.targetUser} onValueChange={(v) => setOptions((o) => ({ ...o, targetUser: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Non-technical">Non-technical</SelectItem>
                  <SelectItem value="Developers">Developers</SelectItem>
                  <SelectItem value="Designers">Designers</SelectItem>
                  <SelectItem value="Business Owners">Business Owners</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3">
            <Label>Design Focus</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {["UI / UX", "Performance", "Accessibility", "SEO", "Scalability"].map((focus) => (
                <div key={focus} className="flex items-center space-x-2">
                  <Checkbox
                    id={focus}
                    checked={options.designFocus.includes(focus)}
                    onCheckedChange={() => toggleDesignFocus(focus)}
                  />
                  <label
                    htmlFor={focus}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {focus}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-brand hover:bg-brand/90" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              "Generating..."
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Professional Prompt
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}