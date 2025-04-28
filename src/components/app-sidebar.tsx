import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  Settings, 
  UserCircle, 
  LogOut,
  Wallet,
  PieChart,
  Receipt,
  Target,
  BotMessageSquare, 
  ChartColumnStacked 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Chat with Sensei", icon: BotMessageSquare, path: "/chat" },
  { name: "Transactions", icon: Receipt, path: "/transactions" },
  { name: "Analytics", icon: PieChart, path: "/analytics" },
  { name: "Budget", icon: Target, path: "/budget" },
  { name: "Budget Analytics", icon: ChartColumnStacked, path: "/budget-analytics" },
];

const accountItems = [
  { name: "Settings Comming-soon", icon: Settings, path: "#" },
  { name: "Profile Comming-soon", icon: UserCircle, path: "#" },
  { name: "Logout", icon: LogOut, path: "/logout" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    if (path === "/logout") {
      
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">Spend Sensei</span>
        </div>
        <SidebarTrigger className="absolute right-2 top-4 md:hidden" />
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      currentPath === item.path 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {currentPath === item.path && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      currentPath === item.path 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-muted",
                      item.name === "Logout" && "text-red-500 hover:bg-red-500/10"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      item.name === "Logout" && "text-red-500"
                    )} />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}