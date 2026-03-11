import { SidebarProvider } from "@/components/ui/sidebar"
import { UserDropdown } from "@/components/UserDropdown"
import { AppSidebar } from "@/components/app-sidebar"



//This is the layout page, it is where everything that will stay on the page regardless of the rest of the inside app

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="flex items-center justify-end gap-4 p-4 bg-[#352D51] shadow-none border-none" style={{ boxShadow: "none", border: "none" }}>
          <UserDropdown />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
