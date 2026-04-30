import { prisma } from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

export async function getTransactionById(id: string) {
  return await prisma.transaction.findUnique({
    where: { id },
    include: {
      attachments: true,
    },
  });
}

export async function getTransactionsByFarmId(farmId: string) {
  return await prisma.transaction.findMany({
    where: { farmId },
    include: {
      attachments: true,
    },
  });
}

export async function getFinancialSummary(farmId: string) {
  "use cache";
  cacheTag(`financial-summary-${farmId}`);
  cacheLife("minutes");

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const transactions = await prisma.transaction.findMany({
    where: {
      farmId,
      date: {
        gte: startOfYear,
      },
    },
  });

  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (t.type === "INCOME") {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
    }
  });

  const netProfit = totalIncome - totalExpenses;

  // In a real app, you would calculate trends by comparing with previous periods
  return {
    netProfit: {
      value: netProfit,
      trend: 12.4,
    },
    totalIncome: {
      value: totalIncome,
      trend: 8.2,
    },
    totalExpenses: {
      value: totalExpenses,
      trend: -2.1,
    },
  };
}

export type TransactionFilters = {
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: string;
};

export async function getFilteredTransactions(
  farmId: string,
  filters: TransactionFilters
) {
  "use cache";
  cacheTag(`transactions-${farmId}`);

  return await prisma.transaction.findMany({
    where: {
      farmId,
      date: {
        gte: filters.startDate ? new Date(filters.startDate) : undefined,
        lte: filters.endDate ? new Date(filters.endDate) : undefined,
      },
      category: filters.category && filters.category !== "All Categories" ? filters.category : undefined,
      type: filters.type && filters.type !== "All Types" ? (filters.type as any) : undefined,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      attachments: true,
    },
  });
}

