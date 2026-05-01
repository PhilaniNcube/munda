import { Suspense } from "react";
import { TaskSummaryCards, TaskSummarySkeleton } from "@/components/dashboard/tasks/task-summary-cards";
import { TaskTable, TaskTableSkeleton } from "@/components/dashboard/tasks/task-table";
import { TaskFilters, TaskFiltersSkeleton } from "@/components/dashboard/tasks/task-filters";
import { NewTaskDialog } from "@/components/dashboard/tasks/new-task-dialog";
import { WorkflowInsights } from "@/components/dashboard/tasks/workflow-insights";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId, getFarmById } from "@/data/farm/queries";
import { TaskStatus, TaskPriority } from "@prisma/client";

interface PageProps {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    category?: string;
    page?: string;
  }>;
}

export default function TasksPage({ searchParams }: PageProps) {
  // Start the headers and session work, but don't await
  const sessionPromise = headers().then((h) => 
    auth.api.getSession({
      headers: h,
    })
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-agri-on-surface-variant uppercase">Operational Overview</span>
          <h1 className="text-4xl font-bold text-agri-on-surface mt-1">Task Management</h1>
        </div>
        
        <Suspense fallback={<div className="h-10 w-32 bg-agri-surface-container animate-pulse rounded-md" />}>
          <NewTaskDialogWrapper sessionPromise={sessionPromise} />
        </Suspense>
      </div>

      <Suspense fallback={<TaskSummarySkeleton />}>
        <TaskSummaryCards sessionPromise={sessionPromise} />
      </Suspense>

      <div className="space-y-4">
        <Suspense fallback={<TaskFiltersSkeleton />}>
          <TaskFilters />
        </Suspense>
        <Suspense fallback={<TaskTableSkeleton />}>
          <TaskTable 
            searchParamsPromise={searchParams} 
            sessionPromise={sessionPromise}
          />
        </Suspense>
      </div>

      <WorkflowInsights />
    </div>
  );
}

async function NewTaskDialogWrapper({ sessionPromise }: { sessionPromise: Promise<any> }) {
  const session = await sessionPromise;
  if (!session?.user?.id) return null;

  const farms = await getFarmsByUserId(session.user.id);
  const farm = await getFarmById(farms[0].id);
  if (!farm) return null;

  return (
    <NewTaskDialog
      crops={farm.crops.map(c => ({ id: c.id, name: c.name }))}
      livestock={farm.livestock.map(l => ({ id: l.id, type: l.type }))}
    />
  );
}
