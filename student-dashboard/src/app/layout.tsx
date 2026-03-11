import { SidebarProvider } from "@/components/ui/sidebar"
import { UserDropdown } from "@/components/UserDropdown"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1">
        <div
          className="flex items-center justify-end gap-4 p-4 bg-[#352D51]"
          style={{ boxShadow: "none", border: "none" }}
        >
          <UserDropdown />
        </div>

        {/* THIS is where routed pages render */}
        <Outlet />

      </main>
    </SidebarProvider>
  )
}
