import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LivestockTableSkeleton() {
  return (
    <Card className="rounded-lg shadow-sm border-agri-outline-variant overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 bg-agri-surface-container-lowest border-b border-agri-outline-variant">
        <h2 className="text-h2 text-agri-on-surface">Livestock Inventory</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/30" />
          <div className="h-9 w-full bg-agri-surface-container-lowest border border-agri-outline-variant rounded-md flex items-center pl-9">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="table-zebra">
          <TableHeader>
            <TableRow className="border-b border-agri-outline-variant hover:bg-transparent">
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">TYPE</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">BREED</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">QUANTITY</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12">HEALTH STATUS</TableHead>
              <TableHead className="text-label-caps text-agri-on-surface-variant font-bold h-12 text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-agri-outline-variant/50 transition-colors">
                <TableCell className="py-4">
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell className="py-4">
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell className="py-4">
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell className="py-4">
                  <Skeleton className="h-6 w-24 rounded" />
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex justify-end">
                    <Skeleton className="size-8 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between p-4 bg-agri-surface-container-lowest border-t border-agri-outline-variant">
        <Skeleton className="h-4 w-40" />
        <div className="flex items-center gap-1">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>
      </div>
    </Card>
  );
}
