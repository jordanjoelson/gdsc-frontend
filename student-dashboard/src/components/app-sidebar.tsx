//All of these imports are pulling in the sidebars 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import '../style.css';
import PomodoroTimer from './PomodoroTimer';
import { Link } from 'react-router-dom';
import logo from './icons/logo.svg';

const navItems = [ //Each of the items in the sidebar 
  {label: "Dashboard", path: "/dashboard"},
  {label: "Classes", path: "/classes"},
  {label: "Calendar", path: "/calendar"},
  {label: "Achievments", path: "/achievements"},
]

export function AppSidebar() {
  return (
    //The sidebar is the outside wrapper. The className here is the color of the sidebar
    <Sidebar className="bg-[#1F1C3D] text-white border-none">
      <SidebarHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "150px",
            overflow: "auto",
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "150px", height: "150px", objectFit: "contain" }} />
        </div>
        <SidebarContent className="flex justify-center">
          <SidebarGroup className="w-full">
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                      <SidebarMenuButton
                        variant="default"
                        className="text-lg font-onest font-bold flex items-center justify-center gap-2 w-full py-10"
                      >
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem className="mt-6 flex justify-center py-6">
                  <PomodoroTimer />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarHeader>
      <SidebarFooter>
        <SidebarMenu>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}