import { Suspense } from "react";
import { IncomeCard, ExpenseCard } from "@/components/dashboard/income-expense-cards";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";
import { CurrentOperationsTable } from "@/components/dashboard/current-operations-table";
import { 
  MetricCardSkeleton, 
  TasksSkeleton, 
  OperationsTableSkeleton 
} from "@/components/dashboard/dashboard-skeletons";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title - static shell */}
      <div>
        <h1 className="text-2xl font-bold text-agri-on-surface">Dashboard Overview</h1>
        <p className="text-sm text-agri-on-surface-variant mt-1">
          Welcome back. Here is the current status of your farm operations.
        </p>
      </div>

      {/* Top Row: Cards - streamed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Suspense fallback={<MetricCardSkeleton />}>
          <IncomeCard />
        </Suspense>
        <Suspense fallback={<MetricCardSkeleton />}>
          <ExpenseCard />
        </Suspense>
        <Suspense fallback={<TasksSkeleton />}>
          <UpcomingTasks />
        </Suspense>
      </div>

      {/* Bottom Row: Operations Table - streamed */}
      <div className="w-full">
        <Suspense fallback={<OperationsTableSkeleton />}>
          <CurrentOperationsTable />
        </Suspense>
      </div>
    </div>
  );
}

