"use client";

import { useQueryStates, parseAsString } from "nuqs";
import { format, parse, isBefore, isAfter, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { X } from "lucide-react";

export function FinancialFilters() {
  const today = new Date();
  const defaultStartDate = format(subDays(today, 7), "yyyy-MM-dd");
  const defaultEndDate = format(today, "yyyy-MM-dd");

  const [filters, setFilters] = useQueryStates(
    {
      startDate: parseAsString.withDefault(defaultStartDate),
      endDate: parseAsString.withDefault(defaultEndDate),
      category: parseAsString.withDefault("All Categories"),
      type: parseAsString.withDefault("All Types"),
    },
    {
      shallow: false,
    }
  );

  const handleStartDateChange = (date?: Date) => {
    if (!date) return;
    const dateStr = format(date, "yyyy-MM-dd");
    
    // Validation: if new start date is after current end date, update end date too
    const currentEnd = parse(filters.endDate, "yyyy-MM-dd", new Date());
    if (isAfter(date, currentEnd)) {
      setFilters({ startDate: dateStr, endDate: dateStr });
    } else {
      setFilters({ startDate: dateStr });
    }
  };

  const handleEndDateChange = (date?: Date) => {
    if (!date) return;
    const dateStr = format(date, "yyyy-MM-dd");
    
    // Validation: if new end date is before current start date, update start date too
    const currentStart = parse(filters.startDate, "yyyy-MM-dd", new Date());
    if (isBefore(date, currentStart)) {
      setFilters({ startDate: dateStr, endDate: dateStr });
    } else {
      setFilters({ endDate: dateStr });
    }
  };

  const clearFilters = () => {
    setFilters({
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      category: "All Categories",
      type: "All Types",
    });
  };

  const hasActiveFilters = 
    filters.category !== "All Categories" || 
    filters.type !== "All Types" || 
    filters.startDate !== defaultStartDate || 
    filters.endDate !== defaultEndDate;

  return (
    <div className="elevation-1 rounded-lg p-4 flex flex-col gap-4 lg:flex-row lg:items-end">
      <div className="flex-1 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-label-caps text-agri-on-surface-variant">Date Range</label>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <DatePicker 
              date={parse(filters.startDate, "yyyy-MM-dd", new Date())}
              setDate={handleStartDateChange}
              className="flex-1"
            />
            <span className="text-agri-on-surface-variant hidden sm:inline">-</span>
            <DatePicker 
              date={parse(filters.endDate, "yyyy-MM-dd", new Date())}
              setDate={handleEndDateChange}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-label-caps text-agri-on-surface-variant">Category</label>
          <Select 
            value={filters.category} 
            onValueChange={(val) => setFilters({ category: val })}
          >
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
          <Select 
            value={filters.type} 
            onValueChange={(val) => setFilters({ type: val })}
          >
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

      {hasActiveFilters && (
        <Button 
          variant="ghost"
          onClick={clearFilters}
          className="text-agri-secondary hover:bg-agri-secondary/5 flex items-center gap-2 px-3"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
