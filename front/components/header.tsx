import { MailCheck } from "lucide-react";

export function Header() {
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-blue-500 rounded-xl">
          <MailCheck className="size-9 text-white p-2" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg -mb-1 font-bold">Email AI</span>
          <span className="text-sm text-muted-foreground">Gerenciamento de respostas ao email</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
      </div>
    </div>
  )
}