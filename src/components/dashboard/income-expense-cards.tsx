import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { getFinancialSummary } from "@/data/transaction/queries";

async function getFarmData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return null;

  const farms = await getFarmsByUserId(session.user.id);
  const farm = farms[0];
  if (!farm) return null;

  return await getFinancialSummary(farm.id);
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export async function IncomeCard() {
  const data = await getFarmData();
  const income = data?.totalIncome || { value: 0, trend: 0 };

  return (
    <Card className="shadow-sm border-agri-outline-variant">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-semibold text-agri-on-surface mb-1">Total Income</h3>
            <div className="text-3xl font-bold text-agri-on-surface">
              {formatCurrency(income.value)}
            </div>
          </div>
          <div className="bg-agri-primary rounded-md p-1.5 flex items-center justify-center">
             <TrendingUp className="h-4 w-4 text-agri-on-primary" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-8 mt-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
            income.trend >= 0 
              ? "bg-agri-primary-container text-agri-on-primary-container" 
              : "bg-agri-error-container text-agri-on-error-container"
          }`}>
            {income.trend >= 0 ? "+" : ""}{income.trend}%
          </span>
          <span className="text-xs text-agri-on-surface-variant">vs last period</span>
        </div>

        <div className="h-24 flex items-end justify-between gap-2 mt-auto">
          {[20, 35, 25, 45, 40, 60].map((h, i) => (
            <div 
              key={i} 
              className={`w-full rounded-sm ${i === 5 ? "bg-agri-primary" : "bg-agri-primary-container opacity-60"}`}
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export async function ExpenseCard() {
  const data = await getFarmData();
  const expense = data?.totalExpenses || { value: 0, trend: 0 };

  return (
    <Card className="shadow-sm border-agri-outline-variant">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-semibold text-agri-on-surface mb-1">Total Expenses</h3>
            <div className="text-3xl font-bold text-agri-on-surface">
              {formatCurrency(expense.value)}
            </div>
          </div>
          <div className="bg-agri-secondary rounded-md p-1.5 flex items-center justify-center">
             <TrendingDown className="h-4 w-4 text-agri-on-secondary" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-8 mt-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
            expense.trend <= 0 
              ? "bg-agri-primary-container text-agri-on-primary-container" 
              : "bg-agri-error-container text-agri-on-error-container"
          }`}>
            {expense.trend > 0 ? "+" : ""}{expense.trend}%
          </span>
          <span className="text-xs text-agri-on-surface-variant">vs last period</span>
        </div>

        <div className="h-24 flex items-end justify-between gap-2 mt-auto">
          {[65, 55, 50, 40, 30, 20].map((h, i) => (
            <div 
              key={i} 
              className={`w-full rounded-sm ${i === 5 ? "bg-agri-secondary" : "bg-agri-secondary-container opacity-80"}`}
              style={{ height: `${h}%` }}
            ></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

