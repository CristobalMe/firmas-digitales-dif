"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCheck } from "lucide-react"
import VerifySignatureForm from "@/components/verify-signature-form"

export default function VerifyPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Verificación de Firmas</h1>

        <Tabs defaultValue="verify" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="verify" className="flex items-center gap-2 justify-center">
              <FileCheck className="h-4 w-4" />
              <span>Verificar Documento</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Verificar Documento Firmado</CardTitle>
                <CardDescription>Verifique la autenticidad de un documento firmado electrónicamente</CardDescription>
              </CardHeader>
              <CardContent>
                <VerifySignatureForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
