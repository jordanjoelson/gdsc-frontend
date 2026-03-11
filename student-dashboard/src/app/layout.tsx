import { SidebarProvider } from "@/components/ui/sidebar"
import { UserDropdown } from "@/components/UserDropdown"
import { AppSidebar } from "@/components/app-sidebar"
import { useLocation } from "react-router-dom"

//This is the layout page, it is where everything that will stay on the page regardless of the rest of the inside app

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideSidebar = location.pathname === "/settings";

  return (
    <SidebarProvider>
      {!hideSidebar && <AppSidebar />}
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
