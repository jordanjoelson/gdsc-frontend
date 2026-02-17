//All of these imports are pulling in the sidebars 
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

const navItems = [ //Each of the items in the sidebar 
  {label: "Dashboard", icon: "🔥"},
  {label: "Classes", icon: "🔥"},
  {label: "Calendar", icon: "🔥"},
  {label: "Achievments", icon: "🔥"},
]

export function AppSidebar() {
  return (
    //The sidebar is the outside wrapper. The className here is the color of the sidebar
    <Sidebar className="bg-indigo-950 text-white"> 
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton className="!bg-indigo-950 hover:!bg-indigo-900 p-5 m-0">
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