"use client";

import { useState, useEffect } from "react";
import { Bell, CalendarDays } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "Dashboard" }: HeaderProps) {
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-ZA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-agri-surface-container-low px-4">
      <SidebarTrigger className="-ml-1 text-agri-on-surface-variant hover:text-agri-on-surface" />
      <Separator orientation="vertical" className="mr-1 h-5" />

      <Breadcrumb className="flex-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-body-md font-medium text-agri-on-surface">
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <span className="hidden md:flex items-center gap-1.5 text-body-md text-agri-on-surface-variant">
          <CalendarDays className="h-4 w-4" />
          {today}
        </span>
        <Separator orientation="vertical" className="hidden md:block h-5" />
        <Button
          variant="ghost"
          size="icon"
          className="relative text-agri-on-surface-variant hover:text-agri-on-surface hover:bg-agri-surface-container-high"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-agri-error" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
