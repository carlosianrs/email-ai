'use client'

import { generateMessage } from "@/api/generate-message";
import { ClassificationResults } from "@/components/classification-results";
import { EmailInput } from "@/components/email-input";
import { LoadingResults } from "@/components/loading-results";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { BarChart3, Brain, Timer, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [inputData, setInputData] = useState<{ type: 'text' | 'file', content: any } | undefined>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<{ reason: string | null, message?: string, category: string | null } | undefined>();

  useEffect(() => {
    const generate = async () => {
      try{
        setResult(undefined);
        setIsProcessing(true);
        if (inputData) {
          const response = await generateMessage({ type: inputData.type, content: inputData.content });
          if (!response?.category) {
            toast.error('Falha', { description: 'Não foi possível gerar mensagem' })
            return;
          }
          setResult(response);
          toast.info('Sucesso', { description: 'Mensagem gerada com sucesso.' })
        }
      } finally {
        setIsProcessing(false)
      }
    }

    generate();
  }, [inputData])

  return (
    <div className="bg-background">
      <main className="space-y-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-balance">
            Automatize a analise e geracao de respostas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-md text-muted-foreground">
            Nosso sistema de inteligência artificial classifica automaticamente emails recebidos 
            e gera respostas profissionais, economizando tempo e aumentando a produtividade.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Brain, title: "IA Avançada", desc: "Entende contexto real" },
            { icon: Zap, title: "Ultra Rápido", desc: "Resultados em segundos" },
            { icon: Timer, title: "Automação", desc: "Menos tarefas manuais" },
            { icon: BarChart3, title: "Alta Precisão", desc: "92%+ confiança" }
          ].map((item, index) => (
            <Card key={index} className="p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <EmailInput setInputData={setInputData} isProcessing={isProcessing} />

           {(isProcessing || result) && (
              result ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ClassificationResults result={result} />
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <LoadingResults />
                </div>
              )
            )}
        </div>
      </main>
    </div>
  )
}