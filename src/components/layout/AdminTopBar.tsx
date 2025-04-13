
import { Bell, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  return (
    <header className="bg-white dark:bg-sidebar-accent border-b border-border px-4 py-2 flex items-center justify-between h-16">
      <div className="flex items-center">
        <Shield className="h-5 w-5 mr-2 text-primary" />
        <span className="font-medium">Admin Portal</span>
      </div>
      
      <div className="relative w-64 mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="search"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-full rounded-md border bg-background text-sm"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
};
