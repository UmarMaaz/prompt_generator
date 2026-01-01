import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight">About PromptGen AI</h2>
        <p className="text-muted-foreground text-xl">
          Empowering non-technical users to build expert-level applications through structured prompt engineering.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Zap className="text-brand h-8 w-8" />
            <CardTitle className="mt-4">Lightning Fast</CardTitle>
            <CardDescription>Generate complex, structured prompts in seconds instead of hours.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <ShieldCheck className="text-brand h-8 w-8" />
            <CardTitle className="mt-4">Proven Structure</CardTitle>
            <CardDescription>
              Built using industry-standard prompt engineering frameworks for maximum AI accuracy.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CheckCircle2 className="text-brand h-8 w-8" />
            <CardTitle className="mt-4">No Code Required</CardTitle>
            <CardDescription>
              Simply describe what you want, and let our AI handle the technical detailing.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How it Works</CardTitle>
          <CardDescription>A simple 3-step process to transform your ideas.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex gap-4">
            <div className="bg-brand text-brand-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold">
              1
            </div>
            <div>
              <h4 className="font-semibold">Input your core idea</h4>
              <p className="text-muted-foreground">
                Start with a simple sentence like "Create a website for my coffee shop."
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-brand text-brand-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold">
              2
            </div>
            <div>
              <h4 className="font-semibold">Configure your preferences</h4>
              <p className="text-muted-foreground">
                Choose the target user, tech stack, and level of detail you need for your prompt.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-brand text-brand-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold">
              3
            </div>
            <div>
              <h4 className="font-semibold">Get your expert prompt</h4>
              <p className="text-muted-foreground">
                Copy the structured output into any AI tool to generate production-ready code or designs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
