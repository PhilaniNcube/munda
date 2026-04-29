"use client";

import {
  LayoutDashboard,
  MapPin,
  Sprout,
  Wrench,
  ListChecks,
  BarChart3,
  CloudSun,
  FileText,
  Settings,
  Leaf,
  ChevronUp,
  User2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Farm Operations",
    items: [
      { title: "Fields", href: "/dashboard/fields", icon: MapPin },
      { title: "Crops", href: "/dashboard/crops", icon: Sprout },
      { title: "Equipment", href: "/dashboard/equipment", icon: Wrench },
      { title: "Tasks", href: "/dashboard/tasks", icon: ListChecks },
    ],
  },
  {
    label: "Data & Reports",
    items: [
      { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { title: "Weather", href: "/dashboard/weather", icon: CloudSun },
      { title: "Reports", href: "/dashboard/reports", icon: FileText },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="px-4 py-5">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-agri-primary text-white transition-transform group-hover:scale-105">
            <Leaf className="h-4.5 w-4.5" />
          </div>
          <span className="text-h3 text-agri-on-surface group-data-[collapsible=icon]:hidden">
            Munda
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-label-caps text-agri-on-surface-variant px-3 mb-1">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        className={
                          isActive
                            ? "bg-agri-primary-container/15 text-agri-primary font-medium"
                            : "text-agri-on-surface-variant hover:bg-agri-surface-container-high hover:text-agri-on-surface"
                        }
                        render={<Link href={item.href} />}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="hover:bg-agri-surface-container-high"
                    />
                  }
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-agri-primary-container text-agri-on-primary-container text-xs font-semibold">
                      JM
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-agri-on-surface">
                      Jan Marais
                    </span>
                    <span className="truncate text-xs text-agri-on-surface-variant">
                      Farm Manager
                    </span>
                  </div>
                  <ChevronUp className="ml-auto h-4 w-4 text-agri-outline" />
                </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
              >
                <DropdownMenuItem>
                  <User2 className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
