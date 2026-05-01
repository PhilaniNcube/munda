"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { List, LayoutGrid } from "lucide-react";
import { TaskStatus, TaskPriority } from "@prisma/client";

export function TaskFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-agri-surface-container-low rounded-xl border border-agri-outline-variant shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-agri-on-surface-variant uppercase tracking-wider mr-2">Filter By:</span>
        
        <Select 
          onValueChange={(v) => updateFilter("priority", v)} 
          defaultValue={searchParams.get("priority") || "all"}
        >
          <SelectTrigger className="w-[140px] h-9 bg-white">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {Object.values(TaskPriority).map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          onValueChange={(v) => updateFilter("status", v)} 
          defaultValue={searchParams.get("status") || "all"}
        >
          <SelectTrigger className="w-[140px] h-9 bg-white">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.values(TaskStatus).map((s) => (
              <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          onValueChange={(v) => updateFilter("category", v)} 
          defaultValue={searchParams.get("category") || "all"}
        >
          <SelectTrigger className="w-[140px] h-9 bg-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="CROPS">Crops</SelectItem>
            <SelectItem value="LIVESTOCK">Livestock</SelectItem>
            <SelectItem value="GENERAL">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 border-l border-agri-outline-variant pl-4 ml-auto">
        <Button variant="ghost" size="icon" className="h-9 w-9 bg-agri-surface-container text-agri-on-surface">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 text-agri-on-surface-variant">
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function TaskFiltersSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-agri-surface-container-low rounded-xl border border-agri-outline-variant shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <div className="h-3 w-16 bg-agri-outline-variant/30 animate-pulse rounded mr-2" />
        
        {/* Three dropdown skeletons */}
        <div className="w-[140px] h-9 bg-white border border-agri-outline-variant rounded-md animate-pulse" />
        <div className="w-[140px] h-9 bg-white border border-agri-outline-variant rounded-md animate-pulse" />
        <div className="w-[140px] h-9 bg-white border border-agri-outline-variant rounded-md animate-pulse" />
      </div>

      <div className="flex items-center gap-2 border-l border-agri-outline-variant pl-4 ml-auto">
        <div className="h-9 w-9 bg-agri-surface-container rounded-md animate-pulse" />
        <div className="h-9 w-9 bg-agri-surface-container rounded-md animate-pulse" />
      </div>
    </div>
  );
}
