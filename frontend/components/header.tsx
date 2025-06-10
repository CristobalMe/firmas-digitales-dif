"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useUser, deleteUserCookie } from "@/context/userContext";
import { useState } from "react"
import { LogOut } from "lucide-react"

export default function Header() {
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    deleteUserCookie();
    window.location.href = "/auth/login"; // Redirect to login page after logout
  };

  const isAuthenticated = user !== null && user !== undefined;

  return (
    <header className="w-full">
      <div className="bg-dif-orange w-full h-35 relative">
        <div className="absolute top-0 w-full h-full bg-white rounded-b-[100%]"></div>
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex items-center gap-4 px-8 py-2 rounded-lg relative z-10">
            <Image
              src="/DIF_logo.png?height=60&width=120"
              alt="Logo DIF Jalisco"
              width={120}
              height={60}
              className="object-contain mr-4 hidden sm:block"
            />
            <Image
              src="/ITESM_logo.svg?height=60&width=120"
              alt="Logo Jalisco"
              width={120}
              height={60}
              className="object-contain ml-4"
            />
          </div>
        </div>
      </div>

      <nav className="bg-dif-gray text-white w-full h-32 md:h-16 flex items-center shadow-md">
        <div className="container mx-auto px-4 flex flex-wrap justify-center items-center">
          <div className="flex items-center space-x-6">
            { isAuthenticated &&
                <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img src={'/place_holder_user.jpg'} alt="User Avatar" className="rounded-full h-9 w-9" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-50 rounded-md shadow-lg z-10 border border-gray-200 hover:border-none">
                  <button
                    className="block px-4 py-2 text-sm text-red-600 hover:rounded-md w-full text-left hover:border-2 hover:border-solid hover:border-red-600"
                    onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(false);
                    }}
                    >
                    <LogOut className="h-4 w-4 mr-2 inline-block" />
                    <p className="inline-block">Cerrar sesion</p>
                  </button>
                  </div>
                )}
              </div>
          }

            <Link href="/" className="font-medium hover:text-dif-orange transition-colors">
              Inicio
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-dif-orange hover:bg-transparent flex items-center gap-1 p-0"
                >
                  Servicios <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {isAuthenticated && <DropdownMenuItem asChild>
                  <Link href="/dashboard">Panel de Control</Link>
                </DropdownMenuItem>}
                <DropdownMenuItem asChild>
                  <Link href="/verify">Verificar Firmas</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="font-medium hover:text-dif-orange transition-colors py-4 px-3">
              Acerca de
            </Link>
          </div>

          {!isAuthenticated && <div className="flex items-center space-x-4 px-4">
            <Link href="/auth/login">
                <Button variant="ghost" className="text-white hover:text-dif-orange hover:bg-transparent border-2 border-white hover:border-dif-orange">
                  Iniciar Sesión
                </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-dif-orange hover:bg-dif-orange/90 text-white">Registrarse</Button>
            </Link>
          </div>}
          
        </div>
      </nav>
    </header>
  )
}
