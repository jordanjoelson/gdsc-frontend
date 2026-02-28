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
  SidebarFooter,
} from "@/components/ui/sidebar"
import '../style.css';

const navItems = [ //Each of the items in the sidebar 
  {label: "Dashboard", icon: "🔥"},
  {label: "Classes", icon: "🔥"},
  {label: "Calendar", icon: "🔥"},
  {label: "Achievments", icon: "🔥"},
]
const logout = [
  {label: "Logout", icon:"🔥"}
]

export function AppSidebar() {
  return (
    //The sidebar is the outside wrapper. The className here is the color of the sidebar
    <Sidebar className="bg-indigo-950 text-white"> 
      <SidebarContent className="flex justify-center">
        <SidebarGroup className="w-full">
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton className="!bg-indigo-950 hover:!bg-buttonbg !py-10 text-lg font-onest font-bold flex items-center justify-center gap-2">
                    {/* <span>{item.icon}</span> */}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {logout.map((item) =>(
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton className="!bg-indigo-950 hover:!bg-indigo-900">
                {/* <span>{item.icon}</span> */}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          
          
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}