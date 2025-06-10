"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSignature, FileCheck, History } from "lucide-react"
import SignDocumentForm from "@/components/sign-document-form"
import VerifySignatureForm from "@/components/verify-signature-form"
import SignatureHistory from "@/components/signature-history"
import { useUser } from "@/context/userContext"


export default function DashboardPage() {
  const { user } = useUser();
  const isAuthenticated = user !== null && user !== undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      {!isAuthenticated && (
        <div className="text-center mb-8">
          <p className="text-red-500">Por favor, inicie sesión para acceder al panel de control.</p>
          <a href="/auth/login" className="text-blue-500 hover:underline">Iniciar Sesión</a>
        </div>
      )}
      {isAuthenticated && (
        <>
          <h1 className="text-3xl font-bold mb-8">Panel de Control</h1>

          <Tabs defaultValue="sign" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sign" className="flex items-center gap-2">
            <FileSignature className="h-4 w-4" />
            <span>Firmar Documento</span>
          </TabsTrigger>
          <TabsTrigger value="verify" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Verificar Firma</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Historial</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sign" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Firmar Documento</CardTitle>
              <CardDescription>Firme documentos electrónicamente utilizando su certificado digital</CardDescription>
            </CardHeader>
            <CardContent>
              <SignDocumentForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Verificar Firma</CardTitle>
              <CardDescription>Verifique la autenticidad de documentos firmados electrónicamente</CardDescription>
            </CardHeader>
            <CardContent>
              <VerifySignatureForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Firmas</CardTitle>
              <CardDescription>Consulte su historial de documentos firmados</CardDescription>
            </CardHeader>
            <CardContent>
              <SignatureHistory />
            </CardContent>
          </Card>
        </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
