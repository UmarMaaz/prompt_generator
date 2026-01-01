export default function HistoryPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Prompt History</h2>
        <p className="text-muted-foreground">Review and manage your previously generated professional prompts.</p>
      </div>
      <div className="flex h-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-center">
        <h3 className="text-lg font-semibold">History is temporarily unavailable</h3>
        <p className="text-muted-foreground text-sm">
          This feature is currently under construction.
        </p>
      </div>
    </div>
  )
}