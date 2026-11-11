import type React from 'react';
import { AdminSidebar } from '@/components/blog/admin/admin-sidebar';
import { AdminHeader } from '@/components/blog/admin/admin-header';
import { AdminGuard } from '@/components/blog/admin/admin-guard';
import { AuthProvider } from '@/context/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminGuard>
        {/* pt-20 clears the fixed site navbar */}
        <div className="min-h-screen bg-background pt-20">
          <AdminHeader />
          <div className="flex">
            <AdminSidebar />
            <main className="flex-1 min-w-0 p-6">{children}</main>
          </div>
        </div>
      </AdminGuard>
    </AuthProvider>
  );
}
