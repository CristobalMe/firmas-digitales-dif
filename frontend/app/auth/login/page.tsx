"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useUser } from "@/context/userContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser();
  const isAuthenticated = user !== null && user !== undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión")
      }

      // Save user data to cookie
      document.cookie = `user=${encodeURIComponent(JSON.stringify(data))}; path=/; max-age=3600`;

      toast.success("Inicio de sesión exitoso", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      window.location.href = "/dashboard"; 

    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Ocurrió un error al iniciar sesión", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      {isAuthenticated && (
        <div className="text-center mb-8">
          <p className="text-red-500">Ya ha iniciado sesión. Por favor, cierre sesión para acceder a esta página.</p>
          <Link href="/dashboard" className="text-blue-500 hover:underline">Ir al Panel de Control</Link>
        </div>
      )}

      {!isAuthenticated && (
        <>
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center">Ingrese sus credenciales para acceder al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-dif-orange hover:underline">
                      ¿Olvidó su contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-dif-orange hover:bg-dif-orange/90" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                ¿No tiene una cuenta?{" "}
                <Link href="/auth/register" className="text-dif-orange hover:underline">
                  Registrarse
                </Link>
              </div>
            </CardFooter>
          </Card>
          <ToastContainer />
        </>
      )}
    </div>
  )
}