"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FinancialFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "2024-01-01");
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "2024-12-31");
  const [category, setCategory] = useState(searchParams.get("category") || "All Categories");
  const [type, setType] = useState(searchParams.get("type") || "All Types");

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    if (category) params.set("category", category);
    if (type) params.set("type", type);
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="elevation-1 rounded-lg p-4 flex flex-col gap-4 md:flex-row md:items-end">
      <div className="flex-1 grid gap-4 md:grid-cols-4">
        <div className="space-y-1.5">
          <label className="text-label-caps text-agri-on-surface-variant">Date Range</label>
          <div className="flex items-center gap-2">
            <Input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-agri-surface-container-low border-agri-outline-variant"
            />
            <span className="text-agri-on-surface-variant">-</span>
            <Input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-agri-surface-container-low border-agri-outline-variant"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-label-caps text-agri-on-surface-variant">Category</label>
          <Select value={category} onValueChange={(val) => val && setCategory(val)}>
            <SelectTrigger className="bg-agri-surface-container-low border-agri-outline-variant">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              <SelectItem value="Sales (Crops)">Sales (Crops)</SelectItem>
              <SelectItem value="Sales (Livestock)">Sales (Livestock)</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
              <SelectItem value="Feed & Seed">Feed & Seed</SelectItem>
              <SelectItem value="Labor">Labor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-label-caps text-agri-on-surface-variant">Type</label>
          <Select value={type} onValueChange={(val) => val && setType(val)}>
            <SelectTrigger className="bg-agri-surface-container-low border-agri-outline-variant">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={handleApply}
        className="bg-white border border-agri-secondary text-agri-secondary hover:bg-agri-secondary/5 font-semibold"
      >
        Apply Filters
      </Button>
    </div>
  );
}
