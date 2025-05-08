import { NextResponse } from "next/server"

// This is a mock implementation for demonstration purposes
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Correo electrónico y contraseña son requeridos" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Check if user exists
    // 2. Verify password hash
    // 3. Generate session/token

    // Mock successful response (for demo purposes, we'll accept any credentials)
    return NextResponse.json(
      {
        message: "Inicio de sesión exitoso",
        user: {
          id: "123",
          name: "Usuario Demo",
          email,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
