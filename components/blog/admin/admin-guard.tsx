"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Loader } from "@/components/Loader"
import { useAuth } from "@/context/AuthContext"
import { useSessionUser } from "@/hooks/useSessionUser"

// Keeps every blog admin page behind a login. Must be rendered inside AuthProvider.
export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user: sessionUser, loading: sessionLoading } = useSessionUser()
  const { currentUser, loading: authLoading } = useAuth()

  const checking = sessionLoading || authLoading
  const signedIn = Boolean(sessionUser || currentUser)

  useEffect(() => {
    if (!checking && !signedIn) {
      toast.error("Please login to access the blog admin dashboard")
      router.replace("/auth/login")
    }
  }, [checking, signedIn, router])

  if (checking || !signedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
