"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginPage from "@/app/login/page"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (e.g., by checking local storage or a cookie)
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token")
      if (token) {
        setIsAuthenticated(true)
      } else {
        router.push("/login")
      }
    }
    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <>{children}</>
}

