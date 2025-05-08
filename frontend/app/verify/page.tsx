"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCheck, User } from "lucide-react"
import FunctionarySearch from "@/components/functionary-search"
import VerifySignatureForm from "@/components/verify-signature-form"

export default function VerifyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Verificación de Firmas</h1>

      <Tabs defaultValue="verify" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="verify" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Verificar Documento</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Buscar Funcionario</span>
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

        <TabsContent value="search" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Buscar Funcionario Público</CardTitle>
              <CardDescription>Busque funcionarios públicos para verificar sus certificados digitales</CardDescription>
            </CardHeader>
            <CardContent>
              <FunctionarySearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
