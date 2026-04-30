import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFarmsByUserId } from "@/data/farm/queries";
import { getFinancialSummary, getFilteredTransactions } from "@/data/transaction/queries";
import { FinancialHeader } from "@/components/dashboard/financial/financial-header";
import { FinancialSummary } from "@/components/dashboard/financial/financial-summary";
import { FinancialFilters } from "@/components/dashboard/financial/financial-filters";
import { LedgerTable } from "@/components/dashboard/financial/ledger-table";
import { Skeleton } from "@/components/ui/skeleton";

async function getFarmId() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return null;

  const farms = await getFarmsByUserId(session.user.id);
  return farms[0]?.id || null;
}

export default function FinancialPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const farmIdPromise = getFarmId();

  // Chained promises for data fetching
  const summaryPromise = farmIdPromise.then((id) => {
    if (!id) return null;
    return getFinancialSummary(id);
  });

  const transactionsPromise = Promise.all([farmIdPromise, searchParams]).then(
    ([id, params]) => {
      if (!id) return [];
      return getFilteredTransactions(id, {
        startDate: params.startDate as string,
        endDate: params.endDate as string,
        category: params.category as string,
        type: params.type as string,
      });
    }
  );

  return (
    <div className="p-6 max-w-[1440px] mx-auto space-y-8">
      {/* This will render immediately as it doesn't depend on any promises */}
      <FinancialHeader />
      
      <Suspense fallback={<SummarySkeleton />}>
        <FinancialSummary summaryPromise={summaryPromise as any} />
      </Suspense>

      {/* FinancialFilters is a client component that handles its own state/navigation */}
      <Suspense fallback={<FiltersSkeleton />}>
        <FinancialFilters />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <LedgerTable transactionsPromise={transactionsPromise} />
      </Suspense>
    </div>
  );
}

function FiltersSkeleton() {
  return (
    <div className="elevation-1 rounded-lg p-4 flex flex-col gap-4 md:flex-row md:items-end">
      <div className="flex-1 grid gap-4 md:grid-cols-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-full" />
            <span className="text-agri-on-surface-variant">-</span>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-[120px]" />
    </div>
  );
}




function SummarySkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-[124px] w-full rounded-lg" />
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  );
}