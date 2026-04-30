import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function MetricCardSkeleton() {
  return (
    <Card className="shadow-sm border-agri-outline-variant">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        
        <div className="flex items-center gap-2 mb-8 mt-2">
          <Skeleton className="h-5 w-12 rounded" />
          <Skeleton className="h-3 w-20" />
        </div>

        <div className="h-24 flex items-end justify-between gap-2 mt-auto">
          {[...Array(6)].map((_, i) => (
            <Skeleton 
              key={i} 
              className="w-full rounded-sm" 
              style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TasksSkeleton() {
  return (
    <Card className="shadow-sm border-agri-outline-variant flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-agri-surface-container-low rounded-md border-l-4 border-agri-outline-variant">
            <Skeleton className="h-4 w-4 rounded-sm mt-0.5" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </CardContent>
      <div className="p-4 pt-2">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </Card>
  );
}

export function OperationsTableSkeleton() {
  return (
    <Card className="shadow-sm border-agri-outline-variant">
      <CardHeader className="bg-agri-surface-container-lowest border-b border-agri-outline-variant py-4 px-6">
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-agri-outline-variant">
              <TableHead className="px-6 py-4"><Skeleton className="h-3 w-16" /></TableHead>
              <TableHead className="px-6 py-4"><Skeleton className="h-3 w-24" /></TableHead>
              <TableHead className="px-6 py-4"><Skeleton className="h-3 w-16" /></TableHead>
              <TableHead className="px-6 py-4"><Skeleton className="h-3 w-20" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i} className="border-b-agri-outline-variant/50">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4"><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell className="px-6 py-4"><Skeleton className="h-5 w-20 rounded" /></TableCell>
                <TableCell className="px-6 py-4"><Skeleton className="h-4 w-16" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
