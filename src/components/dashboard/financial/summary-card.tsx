import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number;
  trend: number;
  prefix?: string;
}

export function SummaryCard({ title, value, trend, prefix = "$" }: SummaryCardProps) {
  const isPositive = trend >= 0;
  
  return (
    <Card className="elevation-1 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-label-caps text-agri-on-surface-variant mb-4">{title}</p>
            <h3 className="text-h1 text-agri-on-surface">
              {prefix}{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
          </div>
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-sm text-status-badge",
            isPositive 
              ? "bg-[#2d5a27]/10 text-[#2d5a27]" 
              : "bg-agri-error/10 text-agri-error"
          )}>
            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{isPositive ? "+" : ""}{trend}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
