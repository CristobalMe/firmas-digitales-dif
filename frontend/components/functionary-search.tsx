"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Search, User, Mail, Building, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Functionary = {
  id: string
  name: string
  email: string
  department: string
  position: string
  publicKey: string
}

export default function FunctionarySearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [functionaries, setFunctionaries] = useState<Functionary[]>([])
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Ingrese un término de búsqueda",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      // In a real application, this would be a fetch to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data for demonstration
      const mockResults: Functionary[] = [
        {
          id: "1",
          name: "María González López",
          email: "maria.gonzalez@difjalisco.gob.mx",
          department: "Dirección General",
          position: "Directora General",
          publicKey:
            "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----",
        },
        {
          id: "2",
          name: "Juan Carlos Ramírez",
          email: "juan.ramirez@difjalisco.gob.mx",
          department: "Departamento Jurídico",
          position: "Director Jurídico",
          publicKey:
            "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n-----END PUBLIC KEY-----",
        },
      ].filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.position.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setFunctionaries(mockResults)

      if (mockResults.length === 0) {
        toast({
          title: "Sin resultados",
          description: "No se encontraron funcionarios que coincidan con su búsqueda",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al buscar funcionarios",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadPublicKey = (functionary: Functionary) => {
    const blob = new Blob([functionary.publicKey], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${functionary.name.replace(/\s+/g, "_")}_public_key.pem`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Descarga iniciada",
      description: "La clave pública se está descargando",
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Buscar Funcionario</Label>
          <div className="flex gap-2">
            <Input
              id="search"
              placeholder="Nombre, departamento o cargo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-dif-orange hover:bg-dif-orange/90" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4 animate-pulse" />
                  Buscando...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Buscar
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>

      {functionaries.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Resultados ({functionaries.length})</h3>

          <div className="grid gap-4">
            {functionaries.map((functionary) => (
              <Card key={functionary.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-dif-gray p-6 flex items-center justify-center md:w-1/4">
                      <Avatar className="h-20 w-20 bg-dif-orange text-white">
                        <AvatarFallback className="text-2xl">
                          {functionary.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="p-6 flex-1">
                      <h3 className="text-xl font-bold mb-2">{functionary.name}</h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-dif-orange" />
                          <div>
                            <p className="text-sm text-gray-500">Departamento</p>
                            <p>{functionary.department}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-dif-orange" />
                          <div>
                            <p className="text-sm text-gray-500">Cargo</p>
                            <p>{functionary.position}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-dif-orange" />
                          <div>
                            <p className="text-sm text-gray-500">Correo Electrónico</p>
                            <p>{functionary.email}</p>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => downloadPublicKey(functionary)}
                        className="bg-dif-gray hover:bg-dif-gray/90"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Descargar Clave Pública
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
