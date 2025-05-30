import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sistema de Gestión de Firmas Electrónicas
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Plataforma segura para la gestión de firmas electrónicas de funcionarios públicos del DIF Jalisco
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/login">
              <Button className="bg-dif-orange hover:bg-dif-orange/90 text-white">Iniciar Sesión</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" className="border-dif-orange text-dif-orange hover:bg-dif-orange/10">
                Registrarse
              </Button>
            </Link>
            <Link href="/verify">
              <Button variant="ghost" className="text-dif-gray hover:bg-dif-gray/10">
                Verificar Firma
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md h-80 hidden md:block">
            <Image
              src="/firma_img.png?height=320&width=400"
              alt="Ilustración de firma electrónica"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="border-dif-orange/20">
          <CardHeader>
            <CardTitle className="text-dif-orange">Autenticación segura</CardTitle>
            <CardDescription>Acceso seguro para funcionarios públicos</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Sistema de autenticación robusto con encriptación avanzada para proteger la identidad de los usuarios.
            </p>
          </CardContent>
        </Card>
        <Card className="border-dif-pink/20">
          <CardHeader>
            <CardTitle className="text-dif-pink">Firma de documentos</CardTitle>
            <CardDescription>Firma electrónica de documentos oficiales</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Firme documentos digitalmente con la misma validez legal que una firma manuscrita.</p>
          </CardContent>
        </Card>
        <Card className="border-dif-gray/20">
          <CardHeader>
            <CardTitle className="text-dif-gray">Verificación de firmas</CardTitle>
            <CardDescription>Validación de autenticidad de firmas</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Verifique la autenticidad de documentos firmados electrónicamente por funcionarios del DIF Jalisco.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
