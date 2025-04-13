
import React from "react";
import { SideNav } from "./AdminSideNav";
import { TopBar } from "./AdminTopBar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <SideNav />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
