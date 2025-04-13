
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, Users, FileText, CreditCard, 
  Settings, LogOut, ChevronLeft, ChevronRight 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Invoices",
      icon: FileText,
      href: "/invoices",
    },
    {
      title: "Clients",
      icon: Users,
      href: "/clients",
    },
    {
      title: "Payments",
      icon: CreditCard,
      href: "/payments",
    },
  ];

  const settingsNavItems = [
    {
      title: "Branding",
      icon: Settings,
      href: "/settings/branding",
    },
    {
      title: "Account",
      icon: Settings,
      href: "/settings/account",
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
          <div className="text-xl font-bold text-sidebar-foreground">
            FlexInvoice
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

        <div className="mt-10">
          {!collapsed && (
            <h3 className="px-3 text-xs font-semibold text-sidebar-foreground uppercase tracking-wider">
              Settings
            </h3>
          )}
          <nav className="mt-2 space-y-1 px-2">
            {settingsNavItems.map((item) => (
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
