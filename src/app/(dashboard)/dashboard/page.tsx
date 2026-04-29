import { IncomeCard, ExpenseCard } from "@/components/dashboard/income-expense-cards";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";
import { CurrentOperationsTable } from "@/components/dashboard/current-operations-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back. Here is the current status of your farm operations.
        </p>
      </div>

      {/* Top Row: Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <IncomeCard />
        <ExpenseCard />
        <UpcomingTasks />
      </div>

      {/* Bottom Row: Operations Table */}
      <div className="w-full">
        <CurrentOperationsTable />
      </div>
    </div>
  );
}
