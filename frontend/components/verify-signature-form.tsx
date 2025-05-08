"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { FileCheck, CheckCircle, XCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function VerifySignatureForm() {
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState("")
  const [signature, setSignature] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean
    message: string
    user?: { name: string; email: string }
  } | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if ((!file && !data) || !signature) {
      toast({
        title: "Error",
        description: "Debe proporcionar datos/archivo y firma para verificar",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Convert file to base64 if provided
      let dataToVerify = data

      if (file) {
        const reader = new FileReader()
        const fileContents = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
        dataToVerify = fileContents
      }

      const response = await fetch("/api/sign/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: dataToVerify,
          signature,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Error al verificar firma")
      }

      setVerificationResult({
        valid: result.valid,
        message: result.message,
        user: result.user,
      })

      toast({
        title: result.valid ? "Verificación exitosa" : "Verificación fallida",
        description: result.message,
        variant: result.valid ? "default" : "destructive",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Ocurrió un error al verificar la firma",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="verify-file">Archivo a verificar (opcional)</Label>
        <div className="flex items-center gap-4">
          <Input id="verify-file" type="file" onChange={handleFileChange} className="flex-1" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="verify-data">Datos a verificar (opcional si se proporciona un archivo)</Label>
        <Textarea
          id="verify-data"
          placeholder="Ingrese los datos originales que fueron firmados"
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signature">Firma Digital</Label>
        <Textarea
          id="signature"
          placeholder="Ingrese la firma digital para verificar"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          rows={4}
          className="font-mono text-sm"
        />
      </div>

      <Button type="submit" className="bg-dif-gray hover:bg-dif-gray/90" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 animate-pulse" />
            Verificando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Verificar Firma
          </span>
        )}
      </Button>

      {verificationResult && (
        <Alert
          variant={verificationResult.valid ? "default" : "destructive"}
          className={verificationResult.valid ? "border-green-500 bg-green-50" : ""}
        >
          <div className="flex items-start gap-2">
            {verificationResult.valid ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <div>
              <AlertTitle>{verificationResult.valid ? "Firma válida" : "Firma inválida"}</AlertTitle>
              <AlertDescription>
                {verificationResult.message}

                {verificationResult.valid && verificationResult.user && (
                  <div className="mt-2 p-2 bg-white rounded border border-green-200">
                    <p className="font-medium">Firmado por:</p>
                    <p>{verificationResult.user.name}</p>
                    <p className="text-sm text-gray-500">{verificationResult.user.email}</p>
                  </div>
                )}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}
    </form>
  )
}
