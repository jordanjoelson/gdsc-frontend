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
import PomodoroTimer from './PomodoroTimer';
import { Link } from 'react-router-dom';

const navItems = [ //Each of the items in the sidebar 
  {label: "Dashboard", icon: "🔥", path: "/dashboard"},
  {label: "Classes", icon: "🔥", path: "/classes"},
  {label: "Calendar", icon: "🔥", path: "/calendar"},
  {label: "Achievments", icon: "🔥", path: "/achievements"},
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
                  <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <SidebarMenuButton
                      variant="default"
                      className="text-lg font-onest font-bold flex items-center justify-center gap-2 w-full py-10"
                    >
                      {/* <span>{item.icon}</span> */}
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
              <PomodoroTimer />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {logout.map((item) =>(
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                variant="default"
                className="font-onest font-bold flex items-center justify-center gap-2 w-full py-10"
              >
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