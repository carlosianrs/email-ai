import { MailCheck, Sparkles } from "lucide-react";

export function Header() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-primary rounded-xl shadow-lg">
          <MailCheck className="size-9 text-white p-2" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg -mb-1 font-bold sm:text-md">Email AI</span>
          <span className="text-sm text-muted-foreground">Gerenciamento de respostas ao email</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-row rounded-sm items-center gap-2 p-2">
          <Sparkles className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <span className="text-muted-foreground text-sm">Alimentado por IA</span>
        </div>
      </div>
    </div>
  )
}