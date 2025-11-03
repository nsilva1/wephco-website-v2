import type React from "react"
import { AdminSidebar } from "@/components/blog/admin/admin-sidebar"
import { AdminHeader } from "@/components/blog/admin/admin-header"
import { ToastContainer } from "react-toastify"
import { SessionProvider } from "next-auth/react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SessionProvider>
        <ToastContainer />
      <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
      </SessionProvider>
    </div>
  )
}
