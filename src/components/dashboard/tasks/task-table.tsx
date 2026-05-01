import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { getTasksByFarmId } from "@/data/task/queries";
import { TaskStatus, TaskPriority } from "@prisma/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  MoreVertical, 
  Sprout, 
  PawPrint, 
  Layout, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskTableProps {
  searchParamsPromise: Promise<{
    status?: string;
    priority?: string;
    category?: string;
    page?: string;
  }>;
  sessionPromise: Promise<any>;
}

export async function TaskTable({ searchParamsPromise, sessionPromise }: TaskTableProps) {
  const [params, session] = await Promise.all([
    searchParamsPromise,
    sessionPromise
  ]);

  const status = params.status as TaskStatus | undefined;
  const priority = params.priority as TaskPriority | undefined;
  const category = params.category;
  const page = params.page ? parseInt(params.page) : 1;

  if (!session?.user?.id) return null;

  const farms = await getFarmsByUserId(session.user.id);
  const farm = farms[0];
  if (!farm) return null;

  const { tasks, total, totalPages } = await getTasksByFarmId({
    farmId: farm.id,
    status,
    priority,
    category,
    page,
    limit: 10,
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "CRITICAL":
        return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200 uppercase font-bold text-[10px]"><AlertTriangle className="h-3 w-3 mr-1" /> CRITICAL</Badge>;
      case "HIGH":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200 uppercase font-bold text-[10px]">HIGH</Badge>;
      case "MEDIUM":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 uppercase font-bold text-[10px]">MEDIUM</Badge>;
      case "LOW":
        return <Badge variant="outline" className="text-gray-500 uppercase font-bold text-[10px]">LOW</Badge>;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "TODO":
        return <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">TODO</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">IN PROGRESS</Badge>;
      case "COMPLETED":
        return <Badge className="bg-green-100 text-green-700 border-green-200">COMPLETED</Badge>;
      case "CANCELLED":
        return <Badge variant="outline" className="bg-red-50 text-red-400 border-red-100">CANCELLED</Badge>;
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "-";
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="bg-white rounded-xl border border-agri-outline-variant overflow-hidden">
      <Table>
        <TableHeader className="bg-agri-surface">
          <TableRow>
            <TableHead className="font-bold text-agri-on-surface-variant text-[11px] uppercase tracking-wider">Task Title</TableHead>
            <TableHead className="font-bold text-agri-on-surface-variant text-[11px] uppercase tracking-wider">Asset / Location</TableHead>
            <TableHead className="font-bold text-agri-on-surface-variant text-[11px] uppercase tracking-wider">Priority</TableHead>
            <TableHead className="font-bold text-agri-on-surface-variant text-[11px] uppercase tracking-wider">Status</TableHead>
            <TableHead className="font-bold text-agri-on-surface-variant text-[11px] uppercase tracking-wider">Due Date</TableHead>
            <TableHead className="font-bold text-agri-on-surface-variant text-[11px] uppercase tracking-wider text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-agri-surface/50">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-agri-on-surface">{task.title}</span>
                    <span className="text-xs text-agri-on-surface-variant line-clamp-1">{task.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {task.cropId ? <Sprout className="h-4 w-4 text-agri-primary" /> : task.livestockId ? <PawPrint className="h-4 w-4 text-agri-secondary" /> : <Layout className="h-4 w-4 text-gray-400" />}
                    <span className="text-sm text-agri-on-surface">
                      {task.crop?.name || task.livestock?.type || "General Farm"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                <TableCell className="text-sm text-agri-on-surface">{formatDate(task.dueDate)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-32 text-center text-agri-on-surface-variant">
                No tasks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <div className="p-4 border-t border-agri-outline-variant flex items-center justify-between bg-agri-surface/30">
        <span className="text-sm text-agri-on-surface-variant font-medium">
          Showing <span className="text-agri-on-surface">{tasks.length}</span> of <span className="text-agri-on-surface">{total}</span> tasks
        </span>
        
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled={page <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button 
              key={i} 
              variant={page === i + 1 ? "default" : "outline"} 
              className={cn("h-8 w-8 p-0", page === i + 1 ? "bg-agri-primary hover:bg-agri-primary/90" : "")}
            >
              {i + 1}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="h-8 w-8" disabled={page >= totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function TaskTableSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-agri-outline-variant overflow-hidden animate-pulse">
      <Table>
        <TableHeader className="bg-agri-surface">
          <TableRow>
            <TableHead className="h-10 w-1/4 bg-agri-surface-container" />
            <TableHead className="h-10 w-1/6 bg-agri-surface-container" />
            <TableHead className="h-10 w-1/6 bg-agri-surface-container" />
            <TableHead className="h-10 w-1/6 bg-agri-surface-container" />
            <TableHead className="h-10 w-1/6 bg-agri-surface-container" />
            <TableHead className="h-10 w-10 bg-agri-surface-container" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((i) => (
            <TableRow key={i}>
              <TableCell><div className="h-8 w-full bg-agri-surface-container rounded" /></TableCell>
              <TableCell><div className="h-4 w-24 bg-agri-surface-container rounded" /></TableCell>
              <TableCell><div className="h-5 w-16 bg-agri-surface-container rounded-full" /></TableCell>
              <TableCell><div className="h-5 w-20 bg-agri-surface-container rounded-full" /></TableCell>
              <TableCell><div className="h-4 w-24 bg-agri-surface-container rounded" /></TableCell>
              <TableCell><div className="h-8 w-8 bg-agri-surface-container rounded-full ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
