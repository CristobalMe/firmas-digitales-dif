"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { FileUp, FileText, Check, Download } from "lucide-react"

export default function SignDocumentForm() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [signature, setSignature] = useState("")
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file && !data) {
      toast({
        title: "Error",
        description: "Debe proporcionar un archivo o datos para firmar",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Convert file to base64 if provided
      let dataToSign = data

      if (file) {
        const reader = new FileReader()
        const fileContents = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
        dataToSign = fileContents
      }

      const response = await fetch("/api/sign/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: dataToSign }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Error al firmar documento")
      }

      setSignature(result.signature)

      toast({
        title: "Documento firmado",
        description: "El documento ha sido firmado exitosamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Ocurrió un error al firmar el documento",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadSignature = () => {
    const element = document.createElement("a");
    const file = new Blob([signature], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "signed_document.sig";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="file">Archivo a firmar</Label>
        <div className="flex items-center gap-4">
          <Input id="file" type="file" onChange={handleFileChange} className="flex-1" />
          {file && (
            <div className="flex items-center gap-2 text-sm text-dif-gray">
              <FileText className="h-4 w-4" />
              <span>{file.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="data">Datos a firmar (opcional si se proporciona un archivo)</Label>
        <Textarea
          id="data"
          placeholder="Ingrese los datos que desea firmar"
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={5}
        />
      </div>

      <Button type="submit" className="bg-dif-orange hover:bg-dif-orange/90" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <FileUp className="h-4 w-4 animate-pulse" />
            Firmando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <FileUp className="h-4 w-4" />
            Firmar Documento
          </span>
        )}
      </Button>

      {signature && (
        <div className="mt-6 p-4 border border-dif-orange/20 rounded-md bg-dif-orange/5">
          <div className="flex items-center gap-2 mb-2 text-dif-orange">
            <Check className="h-5 w-5" />
            <h3 className="font-medium">Firma generada exitosamente</h3>
          </div>
            <div className="space-y-2">
            <Label htmlFor="signature">Firma Digital</Label>
            <Textarea id="signature" value={signature} readOnly rows={4} className="font-mono text-sm" />
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${signature}`} alt="QR Code" />
            <Button
              type="button"
              variant="outline"
              className="w-full border-dif-orange text-dif-orange hover:bg-dif-orange/10"
              onClick={() => {
              navigator.clipboard.writeText(signature)
              toast({
                title: "Copiado",
                description: "Firma copiada al portapapeles",
              })
              }}
            >
              Copiar Firma
            </Button>
             <Button
              type="button"
              variant="outline"
              className="w-full border-dif-orange text-dif-orange hover:bg-dif-orange/10 flex items-center justify-center gap-2"
              onClick={downloadSignature}
            >
              <Download className="h-4 w-4" />
              Descargar Firma
            </Button>
            </div>
        </div>
      )}
    </form>
  )
}
