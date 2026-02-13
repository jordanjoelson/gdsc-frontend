import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  {label: "Dashboard", icon: "🔥"},
  {label: "Classes", icon: "🔥"},
  {label: "Calendar", icon: "🔥"},
  {label: "Achievments", icon: "🔥"},
]

export function AppSidebar() {
  return (
    <Sidebar className={cn("bg-indigo-950 text-white")}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}