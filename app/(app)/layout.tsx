"use client";

import { useState } from "react";
import { Sidebar, MobileSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ToastProvider } from "@/components/ui/Toast";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-surface">
        <Sidebar />
        <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Header onMenuClick={() => setMobileOpen(true)} />
          <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
