"use client"

import { useUser } from "@/lib/user-context"
import { LoginForm } from "@/components/login-form"

interface AuthWrapperProps {
  children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated } = useUser()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <>{children}</>
}
