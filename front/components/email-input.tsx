'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Sparkles, Trash2, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type EmailInputProps = {
  isProcessing: boolean;
  setInputData: Dispatch<SetStateAction<{ type: "text" | "file", content: any } | undefined>>
}

export function EmailInput({ isProcessing, setInputData }: EmailInputProps) {
  const [emailContent, setEmailContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
    }
  }

  const handleFileSelect = () => {
    document.getElementById("fileInput")?.click();
  }

  const removeFile = () => {
    setFile(null);
  }

  return (
    <Card className="shadow-lg border-border/50">
      <CardHeader>
        <CardTitle>Entrada de Email</CardTitle>
        <CardDescription>Cole o conteúdo do email ou faça upload de um arquivo para análise</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="text" onValueChange={() => {
          setFile(null);
          setEmailContent("");
        }}>
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="text">Texto</TabsTrigger>
            <TabsTrigger value="file">Arquivo</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <div className="space-y-2">
              <Textarea
                placeholder="Cole o conteúdo do email aqui..."
                className="min-h-45 resize-none text-base leading-relaxed"
                value={emailContent}
                onChange={({ target }) => setEmailContent(target.value)}
                maxLength={2000}
              />
              <div className="flex justify-end">
                <span className="text-xs text-muted-foreground">
                  {emailContent.length}/2000
                </span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="file">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileSelect}
              className={`
                relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200
                ${isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
                }
              `}
            >
              <Upload
                className={`mx-auto h-10 w-10 mb-3 transition-colors
                  ${isDragging ? "text-primary" : "text-muted-foreground"}`
                }
              />
              <p className="text-sm font-medium text-foreground">
                Arraste e solte ou clique para fazer upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Suporta arquivos .txt ou .pdf
              </p>
            </div>

            <input
              type="file"
              accept=".txt,.pdf"
              className="hidden"
              id="fileInput"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) setFile(selectedFile);
              }}
            />

            {file && (
              <div className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">{file.name}</span>
                <Button
                  onClick={removeFile}
                  className="text-xs bg-transparent hover:bg-red-500/20"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full h-12 shadow-md hover:shadow-lg text-base transition-all text-white"
          onClick={() => setInputData({ type: file ? 'file' : 'text', content: file ?? emailContent })}
          disabled={isProcessing || (!emailContent && !file)}
        >
          {isProcessing
            ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Processar
              </>
            )
          }
        </Button>
      </CardFooter>
    </Card>
  )
}