"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, MessageSquare, Target, Lightbulb } from "lucide-react"
import { useState } from "react"

interface ClassificationResultsProps {
  result: { reason: string | null, message?: string, category: string | null } | undefined;
}

export function ClassificationResults({ result }: ClassificationResultsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (result?.message) {
      await navigator.clipboard.writeText(result.message)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-lg border-border/50 overflow-hidden">
        <div className={`h-1 ${result?.category == 'Produtivo' ? 'bg-success' : 'bg-failed'}`} />
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="h-5 w-5 text-primary" />
              Classificação
            </CardTitle>
            <div className={`${result?.category == 'Produtivo' ? 'bg-success' : 'bg-failed'} rounded-sm text-success-foreground px-3 py-1 text-sm font-medium`}>
              <span className="text-white">{result?.category}</span>
            </div>
          </div>
          <CardDescription>Resultado da análise de inteligência artificial</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-1">
            <div className="rounded-xl bg-muted/50 p-4 border border-border/50">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Lightbulb className="h-4 w-4" />
                Motivo
              </div>
              <p className="text-sm font-medium leading-relaxed">{result?.reason ?? 'Não foi possível gerar motivo, tente novamente'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-5 w-5 text-primary" />
              Resposta Sugerida
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-success" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar
                </>
              )}
            </Button>
          </div>
          <CardDescription>
            Resposta gerada automaticamente pela IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl bg-muted/30 p-5 border border-border/50">
            <div className="text-sm leading-relaxed text-foreground">
              {(result?.message ?? 'Não foi possível gerar resposta, tente novamente!!')
                .split("\n")
                .map((line, index) => (
                  <p key={index}>{line || "\u00A0"}</p>
                ))
              }
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
