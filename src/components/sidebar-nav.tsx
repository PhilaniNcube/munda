"use client";

import {
  LayoutDashboard,
  Tractor,
  Banknote,
  Archive,
  Settings,
  CircleHelp,
  Leaf,
  Plus,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const topNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Crops & Livestock", href: "/dashboard/crops-livestock", icon: Tractor },
  { title: "Financial Ledger", href: "/dashboard/financial", icon: Banknote },
  { title: "Inventory", href: "/dashboard/inventory", icon: Archive },
];

const bottomNavItems = [
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Support", href: "/dashboard/support", icon: CircleHelp },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border bg-white">
      <SidebarHeader className="px-4 py-6 flex flex-col gap-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a3821] text-white">
            <Leaf className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900 leading-tight">
              Munda
            </span>
            <span className="text-xs text-gray-500 leading-tight">
              Farm Management
            </span>
          </div>
        </Link>
        <Button className="w-full bg-[#1a3821] hover:bg-[#1a3821]/90 text-white justify-start gap-2 h-10">
          <Plus className="h-4 w-4" />
          New Entry
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {topNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      className={
                        isActive
                          ? "bg-[#eaf5ed] text-[#154212] font-semibold hover:bg-[#eaf5ed] hover:text-[#154212]"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      }
                    >
                      <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="h-5 w-5" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-6">
        <SidebarMenu className="gap-2">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.title}
                  className={
                    isActive
                      ? "bg-[#eaf5ed] text-[#154212] font-semibold hover:bg-[#eaf5ed] hover:text-[#154212]"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }

                >
                  <Link href={item.href} className="flex items-center gap-3 px-3 py-2">
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
