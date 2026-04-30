import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AddTransactionDialog } from "./add-transaction-dialog";


export function FinancialHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-h1 text-agri-on-surface">Financial Ledger</h1>
        <p className="text-body-md text-agri-on-surface-variant">
          Review and manage all farm transactions for Fiscal Year 2024.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <AddTransactionDialog />
        <Button variant="outline" className="border-agri-primary text-agri-primary hover:bg-agri-primary/5">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

    </div>
  );
}
