
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, Users, FileText, Settings, 
  LogOut, ChevronLeft, ChevronRight, Shield 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: Users,
      href: "/admin/users",
    },
    {
      title: "Invoices",
      icon: FileText,
      href: "/admin/invoices",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            <div className="text-xl font-bold text-sidebar-foreground">
              Admin
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group transition-colors",
                location.pathname === item.href && "bg-sidebar-accent",
                collapsed ? "justify-center" : ""
              )}
            >
              <item.icon className={cn("flex-shrink-0 h-5 w-5", location.pathname === item.href ? "text-sidebar-primary" : "")} />
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-2 border-t border-sidebar-border">
        <Link
          to="/logout"
          className={cn(
            "flex items-center px-3 py-2 text-sidebar-foreground rounded-md hover:bg-sidebar-accent group transition-colors",
            collapsed ? "justify-center" : ""
          )}
        >
          <LogOut className="flex-shrink-0 h-5 w-5" />
          {!collapsed && (
            <span className="ml-3 text-sm font-medium">Logout</span>
          )}
        </Link>
      </div>
    </div>
  );
};
