import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { UserProvider } from "@/context/userContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Gestión de Firmas | DIF Jalisco",
  description: "Sistema de gestión de firmas electrónicas para funcionarios públicos de DIF Jalisco",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <UserProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}
