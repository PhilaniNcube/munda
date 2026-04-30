import { use } from "react";
import { SummaryCard } from "./summary-card";

interface FinancialSummaryProps {
  summaryPromise: Promise<{
    netProfit: { value: number; trend: number };
    totalIncome: { value: number; trend: number };
    totalExpenses: { value: number; trend: number };
  }>;
}

export function FinancialSummary({ summaryPromise }: FinancialSummaryProps) {
  const summary = use(summaryPromise);

  if (!summary) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SummaryCard 
        title="NET PROFIT (YTD)" 
        value={summary.netProfit.value} 
        trend={summary.netProfit.trend} 
      />
      <SummaryCard 
        title="TOTAL INCOME" 
        value={summary.totalIncome.value} 
        trend={summary.totalIncome.trend} 
      />
      <SummaryCard 
        title="TOTAL EXPENSES" 
        value={summary.totalExpenses.value} 
        trend={summary.totalExpenses.trend} 
      />
    </div>
  );
}

