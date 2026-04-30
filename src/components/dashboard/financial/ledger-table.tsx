import { use } from "react";
import { LedgerRow } from "./ledger-row";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LedgerTableProps {
  transactionsPromise: Promise<any[]>;
}

export function LedgerTable({ transactionsPromise }: LedgerTableProps) {
  const transactions = use(transactionsPromise);

  return (
    <div className="elevation-1 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-agri-surface-container-low border-b border-agri-outline-variant">
            <tr>
              <th className="py-3 px-4 text-label-caps text-agri-on-surface-variant">Date</th>
              <th className="py-3 px-4 text-label-caps text-agri-on-surface-variant">Description</th>
              <th className="py-3 px-4 text-label-caps text-agri-on-surface-variant">Category</th>
              <th className="py-3 px-4 text-label-caps text-agri-on-surface-variant">Type</th>
              <th className="py-3 px-4 text-label-caps text-agri-on-surface-variant text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="table-zebra">
            {transactions.map((t) => (
              <LedgerRow 
                key={t.id}
                date={t.date}
                description={t.description || "No description"}
                category={t.category}
                type={t.type}
                amount={t.amount}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-agri-outline-variant flex items-center justify-between bg-white">
        <p className="text-body-md text-agri-on-surface-variant">
          Showing 1 to {transactions.length} of {transactions.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 border-agri-outline-variant">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            <Button className="h-8 w-8 bg-agri-surface-dim text-agri-on-surface hover:bg-agri-surface-dim/80">1</Button>
            <Button variant="ghost" className="h-8 w-8">2</Button>
            <Button variant="ghost" className="h-8 w-8">3</Button>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8 border-agri-outline-variant">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
