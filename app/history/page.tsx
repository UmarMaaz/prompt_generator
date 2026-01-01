import { createClient } from "@/lib/supabase/server"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export default async function HistoryPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-center">
        <h3 className="text-lg font-semibold">Sign in to view history</h3>
        <p className="text-muted-foreground text-sm">
          Your generated prompts are automatically saved when you are logged in.
        </p>
      </div>
    )
  }

  const { data: prompts } = await supabase
    .from("prompts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Prompt History</h2>
        <p className="text-muted-foreground">Review and manage your previously generated professional prompts.</p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Input Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Depth</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prompts?.map((prompt) => (
              <TableRow key={prompt.id}>
                <TableCell className="font-medium">
                  {formatDistanceToNow(new Date(prompt.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell className="max-w-[300px] truncate">{prompt.input_text}</TableCell>
                <TableCell>
                  <Badge variant="outline">{prompt.settings?.type || "N/A"}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {prompt.settings?.depth || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button className="text-brand text-xs font-medium hover:underline">View Prompt</button>
                </TableCell>
              </TableRow>
            ))}
            {(!prompts || prompts.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No prompt history found. Start generating to see them here!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
