import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { TransactionActions } from "./transaction-actions";

interface LedgerRowProps {
  id: string;
  date: Date;
  description: string;
  category: string;
  type: "INCOME" | "EXPENSE";
  amount: number;
  attachmentId?: string;
}

export function LedgerRow({ id, date, description, category, type, amount, attachmentId }: LedgerRowProps) {


  const isIncome = type === "INCOME";

  return (
    <tr className="border-b border-agri-outline-variant hover:bg-agri-surface-container-high transition-colors">
      <td className="py-4 px-4 text-data-table text-agri-on-surface whitespace-nowrap">
        {format(date, "MMM dd, yyyy")}
      </td>
      <td className="py-4 px-4 text-data-table text-agri-on-surface">
        {description}
      </td>
      <td className="py-4 px-4 text-data-table text-agri-on-surface">
        {category}
      </td>
      <td className="py-4 px-4">
        <Badge 
          variant="outline" 
          className={cn(
            "text-status-badge border-none flex items-center gap-1 w-fit px-2 py-0.5",
            isIncome 
              ? "bg-[#2d5a27]/10 text-[#2d5a27]" 
              : "bg-agri-error/10 text-agri-error"
          )}
        >
          {isIncome ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {isIncome ? "Income" : "Expense"}
        </Badge>
      </td>
      <td className={cn(
        "py-4 px-4 text-data-table text-right font-semibold",
        isIncome ? "text-agri-on-surface" : "text-agri-on-surface"
      )}>
        {isIncome ? "" : "-"}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td className="py-4 px-4">
        <TransactionActions 
          transactionId={id} 
          description={description} 
          attachmentId={attachmentId}
        />
      </td>
    </tr>
  );
}

