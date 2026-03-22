import { Card, CardContent, CardHeader } from "./ui/card";

export function LoadingResults() {
  return (
    <div className="space-y-4">
      <Card className="shadow-lg border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-muted animate-pulse" />
            <div className="h-5 w-32 rounded bg-muted animate-pulse" />
          </div>
          <div className="h-4 w-64 rounded bg-muted animate-pulse mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-muted animate-pulse" />
            <div className="h-5 w-40 rounded bg-muted animate-pulse" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}