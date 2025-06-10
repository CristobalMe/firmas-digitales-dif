"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Eye, Calendar, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

type SignatureRecord = {
  id: string
  documentName: string
  signedAt: string
  status: "valid" | "revoked"
  documentType: string
}

export default function SignatureHistory() {
  const [records, setRecords] = useState<SignatureRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSignatureHistory = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data for demonstration
        const mockRecords: SignatureRecord[] = [
          {
            id: "1",
            documentName: "Contrato de Servicios.pdf",
            signedAt: "2023-05-15T14:30:00Z",
            status: "valid",
            documentType: "PDF",
          },
          {
            id: "2",
            documentName: "Acta de Reunión.docx",
            signedAt: "2023-05-10T09:15:00Z",
            status: "valid",
            documentType: "DOCX",
          },
          {
            id: "3",
            documentName: "Convenio de Colaboración.pdf",
            signedAt: "2023-04-28T16:45:00Z",
            status: "revoked",
            documentType: "PDF",
          },
        ]

        setRecords(mockRecords)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar el historial de firmas",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSignatureHistory()
  }, [toast])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-dif-orange/20 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-dif-orange/20 rounded mb-2"></div>
            <div className="h-4 w-32 bg-dif-orange/20 rounded"></div>
          </div>
        </div>
      ) : records.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-dif-orange" />
                      <span>{record.documentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-dif-gray" />
                      <span>{formatDate(record.signedAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-dif-gray" />
                      <span>{formatTime(record.signedAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={record.status === "valid" ? "default" : "destructive"}
                      className={record.status === "valid" ? "bg-green-500" : ""}
                    >
                      {record.status === "valid" ? "Válida" : "Revocada"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Ver documento</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Descargar documento</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay registros de firmas en su historial</p>
        </div>
      )}
    </div>
  )
}
