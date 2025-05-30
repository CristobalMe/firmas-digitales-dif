import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-dif-gray text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sistema de Gestión de Firmas</h3>
            <p className="text-gray-300 mb-4">
              Plataforma segura para la gestión de firmas electrónicas de funcionarios públicos del DIF Jalisco.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-dif-orange">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white hover:text-dif-orange">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white hover:text-dif-orange">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-dif-orange">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-dif-orange">
                  Panel de Control
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-gray-300 hover:text-dif-orange">
                  Verificar Firmas
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-dif-orange">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-dif-orange" />
                <span>Av. Alcalde 1220, Col. Miraflores, Guadalajara, Jalisco</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-dif-orange" />
                <span>(33) 3030-4700</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-dif-orange" />
                <span>contacto@difjalisco.gob.mx</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} DIF Jalisco. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
