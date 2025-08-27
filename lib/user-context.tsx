"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { User } from "./types"

interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  isAdmin: boolean
  isManager: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Mock initial user - in real app this would come from authentication
  useEffect(() => {
    // For demo purposes, we'll set a default admin user
    const mockUser: User = {
      id: 1,
      username: "admin",
      email: "admin@autocare.co.tz",
      full_name: "Admin User",
      user_type: "admin",
      is_active: true,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    }
    setCurrentUser(mockUser)
  }, [])

  const isAdmin = currentUser?.user_type === "admin"
  const isManager = currentUser?.user_type === "office_manager"

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAdmin,
        isManager,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

// Helper function to switch users for demo purposes
export function createDemoUser(type: "admin" | "office_manager"): User {
  return {
    id: type === "admin" ? 1 : 2,
    username: type === "admin" ? "admin" : "manager",
    email: type === "admin" ? "admin@autocare.co.tz" : "manager@autocare.co.tz",
    full_name: type === "admin" ? "Admin User" : "Manager User", 
    user_type: type,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  }
}
